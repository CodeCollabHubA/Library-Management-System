using Library.Services.DataServices.Exceptions.Borrowing;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Library.Services.DataServices.Dal
{
    public class BorrowingDalDataService : BaseDalDataService<Borrowing, BorrowingDalDataService>, IBorrowingDataService
    {
        private readonly IBookRepo _bookRepo;
        private readonly IUserRepo _userRepo;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public BorrowingDalDataService(
            IBorrowingRepo mainRepo,
            IBookRepo bookRepo,
            IUserRepo userRepo,
            IAppLogging<BorrowingDalDataService> logger,
            IHttpContextAccessor httpContextAccessor,
            IMapper mapper) : base(mainRepo, logger)
        {
            _bookRepo = bookRepo;
            _userRepo = userRepo;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }


        public async Task<PendingBorrowingResponseDTO> CreatePendingBorrowingAsync(PendingBorrowingRequestDTO userBorrowingRequest)
        {
            // Instantiate the response DTO
            PendingBorrowingResponseDTO borrowBooksResponseDTO = new PendingBorrowingResponseDTO();

            // List of pending  borrowings
            List<Borrowing> pendingBorrowings = new List<Borrowing>();

            // Get the user from the access token
            User user = await GetUserFromTokenAsync();

            // Check the books for the availability and make a pending borrowing if user has enough credit
            foreach (var bookId in userBorrowingRequest.BookIds)
            {
                // Find book
                Book bookToBorrow = await _bookRepo.FindAsync(bookId);

                // Check if the book is available
                if (bookToBorrow == null || bookToBorrow.NumberOfAvailableCopies <= 0)
                {

                    borrowBooksResponseDTO.Errors.Add(new()
                    {
                        BookId = bookId,
                        Message = $"The book with Id {bookId} is not found or not available for borrowing"
                    });

                    continue;
                }

                // Check if the user has enough credit
                if (user.Credit < bookToBorrow.Credit)
                {
                    borrowBooksResponseDTO.Errors.Add(new()
                    {
                        BookId = bookId,
                        Message = $"You do not have enough credit to borrow the book titled {bookToBorrow.Title}"
                    });

                    continue;
                }

                //// The borrowing process
                // Add borrowing to the list of pending borrowings
                Borrowing newPendingBorrowing = new Borrowing()
                {
                    UserId = user.Id,
                    BookId = bookId,
                };

                int rows = await _mainRepo.AddAsync(newPendingBorrowing);

                // Update the number of available copies
                bookToBorrow.NumberOfAvailableCopies -= 1;

                // Subtract the credit from the user
                user.Credit -= bookToBorrow.Credit;

                // Save changes
                await _userRepo.SaveChangesAsync();

                // Add the pending borrowing to the list
                pendingBorrowings.Add(newPendingBorrowing);
            }

            // include the book and the user navigation in each borrowing
            var borrowingIds = pendingBorrowings.Select(b => b.Id).ToList();
            _mainRepo.Context.Borrowings
                .Where(b => borrowingIds.Contains(b.Id))
                .Include(b => b.BookNavigation)
                    .Include(b => b.BookNavigation.Authors)
                    .Include(b => b.BookNavigation.Publishers)
                .Include(b => b.UserNavigation)
                .Include(b => b.ApprovedByNavigation)
                .Include(b => b.RejectedByNavigation)
                .Include(b => b.ReturnedByNavigation);


            borrowBooksResponseDTO.Success.AddRange(_mapper.Map<List<BorrowingResponseDTO>>(pendingBorrowings));


            return borrowBooksResponseDTO;
        }

        public async Task<BorrowingStatusUpdateResponseDTO> UpdateBorrowingStatusAsync(BorrowingStatusUpdateRequestDTO borrowingStatusRequestDTO)
        {

            // Instantiate the response DTO
            BorrowingStatusUpdateResponseDTO borrowingRequestResponseDTO = new BorrowingStatusUpdateResponseDTO();

            // List of approved/rejected/returned  borrowings
            List<Borrowing> borrowings = new List<Borrowing>();

            // Check if the action is user or admin action
            bool isAdminAction = AdminActions.Contains(borrowingStatusRequestDTO.Action);


            // Get the user from access token
            User userFromToken = await GetUserFromTokenAsync();

            if (isAdminAction && userFromToken.UserRole != Role.Admin)
            {
                throw new BorrowingActionForbiddenException($"Only an admin can perform this action!");
            }

            if (borrowingStatusRequestDTO.Action != BorrowingAction.Request)
            {

                // Fetch and process the borrowings in the request 
                foreach (var borrowingId in borrowingStatusRequestDTO.BorrowingIds)
                {
                    // Find the borrowing
                    Borrowing? borrowing = await _mainRepo.FindAsync(borrowingId);

                    // Check if the borrowing exists 
                    if (borrowing == null)
                    {
                        borrowingRequestResponseDTO.Errors.Add(new()
                        {
                            BorrowingId = borrowingId,
                            Message = $"Borrowing with id {borrowingId} does not exist "
                        });
                        continue;
                    }

                    bool shouldContinue = true;
                    // Approve/reject/return/cancel the borrowing
                    switch (borrowingStatusRequestDTO.Action)
                    {
                        case BorrowingAction.Approve:
                            shouldContinue = HandleApprove(borrowingRequestResponseDTO, userFromToken, borrowingId, borrowing, shouldContinue);
                            break;
                        case BorrowingAction.Reject:
                            shouldContinue = HandleReject(borrowingRequestResponseDTO, userFromToken, borrowingId, borrowing, shouldContinue);
                            break;
                        case BorrowingAction.Confirm:
                            shouldContinue = HandleConfirm(borrowingRequestResponseDTO, userFromToken, borrowingId, borrowing, shouldContinue);
                            break;
                        case BorrowingAction.Cancel:
                            shouldContinue = HandleCancel(borrowingRequestResponseDTO, userFromToken, borrowingId, borrowing, shouldContinue);
                            break;
                        case BorrowingAction.Return:
                            shouldContinue = HandleReturn(borrowingRequestResponseDTO, userFromToken, borrowingId, borrowing, shouldContinue);
                            break;
                        default:
                            continue;
                    }

                    if (!shouldContinue)
                    {
                        continue;
                    }

                    // Save changes
                    await _mainRepo.SaveChangesAsync();

                    // Add the borrowing to the list
                    borrowings.Add(borrowing);
                }
            }

            borrowingRequestResponseDTO.Success.AddRange(_mapper.Map<List<BorrowingResponseDTO>>(borrowings));

            return borrowingRequestResponseDTO;
        }

        private static bool HandleReturn(BorrowingStatusUpdateResponseDTO borrowingRequestResponseDTO, User userFromToken, int borrowingId, Borrowing borrowing, bool shouldContinue)
        {
            // Proceed only if the borrowing is in the borrowed state
            if (borrowing.Status != BorrowingStatus.Borrowed)
            {
                borrowingRequestResponseDTO.Errors.Add(new()
                {
                    BorrowingId = borrowingId,
                    Message = $"Borrowing with id {borrowingId} is not borrowed "
                });
                shouldContinue = false;
            }
            if (shouldContinue)
            {
                ReturnBorrowing(borrowingRequestResponseDTO, userFromToken, borrowingId, borrowing);
            }

            return shouldContinue;
        }

        private static bool HandleCancel(BorrowingStatusUpdateResponseDTO borrowingRequestResponseDTO, User userFromToken, int borrowingId, Borrowing borrowing, bool shouldContinue)
        {
            // Proceed only if the borrowing is associated with the current authenticated user or if the user is an admin
            if (borrowing.UserId != userFromToken.Id && userFromToken.UserRole != Role.Admin)
            {
                borrowingRequestResponseDTO.Errors.Add(new()
                {
                    BorrowingId = borrowingId,
                    Message = $"You are not authorized to cancel this borrowing, only admin or the borrower can cancel it "
                });
                shouldContinue = false;
            }
            // Proceed only if the borrowing is pending
            if (shouldContinue && borrowing.Status != BorrowingStatus.Pending)
            {
                borrowingRequestResponseDTO.Errors.Add(new()
                {
                    BorrowingId = borrowingId,
                    Message = $"Borrowing with id {borrowingId} is not pending "
                });
                shouldContinue = false;
            }
            if (shouldContinue)
            {
                CancelBorrowing(borrowingRequestResponseDTO, borrowingId, borrowing);
            }

            return shouldContinue;
        }

        private static bool HandleConfirm(BorrowingStatusUpdateResponseDTO borrowingRequestResponseDTO, User userFromToken, int borrowingId, Borrowing borrowing, bool shouldContinue)
        {
            // Proceed only if the the borrowing is associated with the current authenticated user
            if (borrowing.UserId != userFromToken.Id)
            {
                borrowingRequestResponseDTO.Errors.Add(new()
                {
                    BorrowingId = borrowingId,
                    Message = $"You are not authorized to confirm this borrowing, only the user who sent the request can confirm it "
                });
                shouldContinue = false;
            }
            // Proceed only if the borrowing is approved
            if (shouldContinue && borrowing.Status != BorrowingStatus.Approved)
            {
                borrowingRequestResponseDTO.Errors.Add(new()
                {
                    BorrowingId = borrowingId,
                    Message = $"To confirm the borrowing you need to request the book then wait for approval by an admin. Borrowing with id {borrowingId} is not approved,it might be rejected, borrowed or already returned. Please check and try again"
                });
                shouldContinue = false;
            }
            if (shouldContinue)
            {
                ConfirmBorrowing(borrowing);
            }

            return shouldContinue;
        }

        private static bool HandleReject(BorrowingStatusUpdateResponseDTO borrowingRequestResponseDTO, User userFromToken, int borrowingId, Borrowing borrowing, bool shouldContinue)
        {
            // Proceed only if the borrowing is pending or approved
            if (borrowing.Status != BorrowingStatus.Pending || borrowing.Status != BorrowingStatus.Approved)
            {
                borrowingRequestResponseDTO.Errors.Add(new()
                {
                    BorrowingId = borrowingId,
                    Message = $"Borrowing with id {borrowingId} is not pending nor approved "
                });
                shouldContinue = false;
            } 
           
            if (shouldContinue)
            {
                RejectBorrowing(borrowingRequestResponseDTO, userFromToken, borrowingId, borrowing);
            }

            return shouldContinue;
        }

        private static bool HandleApprove(BorrowingStatusUpdateResponseDTO borrowingRequestResponseDTO, User userFromToken, int borrowingId, Borrowing borrowing, bool shouldContinue)
        {
            // Proceed only if the borrowing is pending
            if (borrowing.Status != BorrowingStatus.Pending)
            {
                borrowingRequestResponseDTO.Errors.Add(new()
                {
                    BorrowingId = borrowingId,
                    Message = $"Borrowing with id {borrowingId} is not pending "
                });
                shouldContinue = false;
            }
            if (shouldContinue)
            {
                ApproveBorrowing(borrowingRequestResponseDTO, userFromToken, borrowingId, borrowing);

            }

            return shouldContinue;
        }

        private static HashSet<BorrowingAction> AdminActions = new HashSet<BorrowingAction>
        {
            BorrowingAction.Approve,
            BorrowingAction.Reject,
            BorrowingAction.Return,
        };

        private static void ConfirmBorrowing(Borrowing borrowing)
        {
            borrowing.Status = BorrowingStatus.Borrowed;
        }

        private static void ReturnBorrowing(BorrowingStatusUpdateResponseDTO borrowingRequestResponseDTO, User userFromToken, int borrowingId, Borrowing borrowing)
        {

            borrowing.Status = BorrowingStatus.Returned;
            borrowing.ReturnedById = userFromToken.Id;
        }

        private static void CancelBorrowing(BorrowingStatusUpdateResponseDTO borrowingRequestResponseDTO, int borrowingId, Borrowing borrowing)
        {


            borrowing.Status = BorrowingStatus.Cancelled;

            // Return the credit to the user
            borrowing.UserNavigation.Credit += borrowing.BookNavigation.Credit;

            // Increment the number of available copies
            borrowing.BookNavigation.NumberOfAvailableCopies += 1;
        }

        private static void RejectBorrowing(BorrowingStatusUpdateResponseDTO borrowingRequestResponseDTO, User userFromToken, int borrowingId, Borrowing borrowing)
        {


            borrowing.Status = BorrowingStatus.Rejected;
            borrowing.RejectedById = userFromToken.Id;

            // Return the credit to the user
            borrowing.UserNavigation.Credit += borrowing.BookNavigation.Credit;

            // Increment the number of available copies
            borrowing.BookNavigation.NumberOfAvailableCopies += 1;
        }

        private static void ApproveBorrowing(BorrowingStatusUpdateResponseDTO borrowingRequestResponseDTO, User userFromToken, int borrowingId, Borrowing borrowing)
        {

            borrowing.Status = BorrowingStatus.Approved;
            borrowing.ApprovedById = userFromToken.Id;
        }

        private async Task<User> GetUserFromTokenAsync()
        {
            // Get the user id from token and fetch it for later
            ClaimsIdentity identity = _httpContextAccessor.HttpContext.User.Identity as ClaimsIdentity;
            int userId = int.Parse(identity.FindFirst(ClaimTypes.NameIdentifier).Value);

            // Fetch user 
            User userFromToken = await _userRepo.FindAsync(userId);
            if (userFromToken == null)
            {
                throw new BorrowingUserNotFoundException($"User with id {userId} does not exist");
            }

            return userFromToken;
        }




    }
}
