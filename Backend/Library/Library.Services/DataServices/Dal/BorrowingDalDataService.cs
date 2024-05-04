using AutoMapper;
using Library.Models.DTO;
using Library.Models.DTO.Borrowing;
using Library.Services.DataServices.Exceptions.Borrowing;
using Library.Services.DataServices.Exceptions.User;

namespace Library.Services.DataServices.Dal
{
    public class BorrowingDalDataService : BaseDalDataService<Borrowing, BorrowingDalDataService>, IBorrowingDataService
    {
        private readonly IBookRepo _bookRepo;
        private readonly IUserRepo _userRepo;
        private readonly IMapper _mapper;

        public BorrowingDalDataService(
            IBorrowingRepo mainRepo,
            IBookRepo bookRepo,
            IUserRepo userRepo,
            IAppLogging<BorrowingDalDataService> logger,
            IMapper mapper) : base(mainRepo, logger)
        {
            _bookRepo = bookRepo;
            _userRepo = userRepo;
            _mapper = mapper;
        }
        public async Task<BorrowBooksResponseDTO> BorrowBooksAsync(BorrowBooksRequestDTO borrowingCreateDto)
        {

            // Instanciate the borrowing response DTO
            BorrowBooksResponseDTO borrowBooksResponseDTO = new BorrowBooksResponseDTO();

            // List of Successfull borrowings
            List<Borrowing> successfulBorrowings = new List<Borrowing>();


            // Find user 
            User user = await _userRepo.FindAsync(borrowingCreateDto.UserId);
            if (user == null)
            {
                _logger.LogAppWarning("User does not exist");
                throw new BorrowingUserNotFoundException($"User with id {borrowingCreateDto.UserId} does not exist");

            }

            // Check the books for the availability and borrow if user has enough credit
            foreach (var bookId in borrowingCreateDto.BookIds)
            {
                // Find book
                Book bookToBorrow = await _bookRepo.FindAsync(bookId);

                // Check if the book is available
                if (bookToBorrow == null || bookToBorrow.NumberOfAvailableCopies <= 0)
                {

                    borrowBooksResponseDTO.Errors.Add(new()
                    {
                        BookId = bookId,
                        Message = "Book with id " + bookId + " is not available for borrowing"
                    });

                    continue;
                }

                // Check if the user has enough credit
                if (user.Credit < bookToBorrow.Credit)
                {
                    borrowBooksResponseDTO.Errors.Add(new()
                    {
                        BookId = bookId,
                        Message = "User does not have enough credit to borrow this book"
                    });

                    continue;
                }

                // The borrowing process
                // Borrow the book
                Borrowing newBorrowing = new Borrowing()
                {
                    UserId = borrowingCreateDto.UserId,
                    BookId = bookId,
                };

                await _mainRepo.AddAsync(newBorrowing);
                // Save changes
                await _userRepo.SaveChangesAsync();


                // If borrowing was successfull
                // Update the number of available copies
                bookToBorrow.NumberOfAvailableCopies -= 1;

                // Subtract the credit from the user
                user.Credit -= bookToBorrow.Credit;

                // Save changes
                await _userRepo.SaveChangesAsync();

                // Add the succesfull borrowing to the list
                successfulBorrowings.Add(newBorrowing);
            }



            // include the book and the user navigation in each borrowing
            var borrowingIds = successfulBorrowings.Select(b => b.Id).ToList();
            _mainRepo.Context.Borrowings
                .Where(b => borrowingIds.Contains(b.Id))
                .Include(b => b.BookNavigation)
                .Include(b => b.UserNavigation);


            borrowBooksResponseDTO.Success.AddRange(_mapper.Map<List<BorrowingResponseDTO>>(successfulBorrowings));


            return borrowBooksResponseDTO;
        }

        public async Task<ReturnBooksResponseDTO> ReturnBooksAsync(ReturnBooksRequestDTO borrowingReturnRequestDTO)
        {



            // Check if the user exists
            User? user = await _userRepo.FindAsync(borrowingReturnRequestDTO.UserId);
            if (user == null)
            {
                _logger.LogAppWarning("User does not exist");
                throw new BorrowingUserNotFoundException($"User with id {borrowingReturnRequestDTO.UserId} does not exist");
            }

            // Instantiate the response
            ReturnBooksResponseDTO returnBorrowedBooksResponseDTO = new ReturnBooksResponseDTO();

            // List of successfull returned borrowings
            List<Borrowing> successfulBorrowings = new List<Borrowing>();

            foreach (var bookId in borrowingReturnRequestDTO.BookIds)
            {

                // Check if the book exists
                Book? bookToReturn = await _bookRepo.FindAsync(bookId);
                if (bookToReturn == null)
                {
                    returnBorrowedBooksResponseDTO.Errors.Add(
                        new()
                        {
                            BookId = bookId,
                            Message = "Book with this id does not exist"
                        });
                    continue;
                }
                // Fetch the borrowing

                Borrowing? borrowing = await _mainRepo.Context.Borrowings
                    .OrderByDescending(b => b.DueDate)
                    .Where(b => b.BookId == bookId && b.UserId == borrowingReturnRequestDTO.UserId && !b.IsReturned)
                    .FirstOrDefaultAsync();


                if (borrowing == null)
                {

                    returnBorrowedBooksResponseDTO.Errors.Add(
                        new()
                        {
                            BookId = bookId,
                            Message = $"Book with title {bookToReturn.Title} is not borrowed by this user"
                        });

                    continue;
                }


                // Return the book
                borrowing.IsReturned = true;
                await _mainRepo.SaveChangesAsync();

                // If successfull increase the number of books avaliable
                bookToReturn.NumberOfAvailableCopies++;
                await _bookRepo.SaveChangesAsync();

                // Add the succesfull borrowing to the response
                successfulBorrowings.Add(borrowing);

            }

            // include the book and the user navigation in each borrowing
            var borrowingIds = successfulBorrowings.Select(b => b.Id).ToList();
            _mainRepo.Context.Borrowings
                .Where(b => borrowingIds.Contains(b.Id))
                .Include(b => b.BookNavigation)
                .Include(b => b.UserNavigation);


            returnBorrowedBooksResponseDTO.Success.AddRange(_mapper.Map<List<BorrowingResponseDTO>>(successfulBorrowings));

            return returnBorrowedBooksResponseDTO;


        }
    }
}
