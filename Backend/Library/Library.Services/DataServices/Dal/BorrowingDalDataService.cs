

using Library.Models.DTO.Borrowing;
using Library.Services.DataServices.Exceptions.Borrowing;

namespace Library.Services.DataServices.Dal
{
    public class BorrowingDalDataService : BaseDalDataService<Borrowing, BorrowingDalDataService>, IBorrowingDataService
    {
        private readonly IBookRepo _bookRepo;
        private readonly IUserRepo _userRepo;

        public BorrowingDalDataService(IBorrowingRepo mainRepo, IBookRepo bookRepo, IUserRepo userRepo, IAppLogging<BorrowingDalDataService> logger) : base(mainRepo, logger)
        {
            _bookRepo = bookRepo;
            _userRepo = userRepo;
        }
        public async Task<Borrowing> BorrowBookAsync(BorrowingCreateRequestDTO borrowingCreateDto)
        {


            // Check if books for avalability and record books and their cumulative cost
            List<Book> booksToBorrow = new List<Book>();
            int cumulativeCost = 0;
            foreach (var bookId in borrowingCreateDto.BookIds)
            {
                Book book = await _bookRepo.FindAsync(bookId);
                if (book == null || book.NumberOfCopiesExist <= 0)
                {
                    _logger.LogAppWarning($"Book with id {bookId} is not available for borrowing");
                    throw new BorrowingNotAllowedException($"Book with id {bookId} is not available for borrowing");
                }



                // subtract the number of existing books by one 
                book.NumberOfCopiesExist -= 1;

                booksToBorrow.Add(book);
                cumulativeCost += book.Credit;

            }

            // Check if user has enough credit
            User user = await _userRepo.FindAsync(borrowingCreateDto.UserId);
            if (user == null)
            {
                _logger.LogAppWarning("User does not exist");
                throw new BorrowingNotAllowedException("User with id does not exist");

            }
            if (user.Credit < cumulativeCost)
            {
                _logger.LogAppWarning("User does not have enough credit");
                throw new BorrowingNotAllowedException("User does not have enough credit");
            }


            // Create new borrowing for the books

            Borrowing newBorrowing = new Borrowing()
            {
                Books = booksToBorrow,
                UserNavigation = user,

            };





            int rows = await _mainRepo.AddAsync(newBorrowing);

            if (rows > 0)
            {
                // subtract credit from user if borrwoing was successfull
                user.Credit -= cumulativeCost;
                await _userRepo.SaveChangesAsync();
            }

            return newBorrowing;
        }

        public async Task<Borrowing> ReturnBorrowedBookAsync(BorrowedBookReturnRequestDTO borrowingReturnRequestDTO)
        {

            // check is the user has borrowed the book
            Borrowing borrowing = await _mainRepo.FindAsync(borrowingReturnRequestDTO.BorrwingId);

            if (borrowing == null)
            {
                _logger.LogAppWarning("Borrowing does not exist");
                throw new BorrowingNotFoundException();
            }

            // check if the book is borrowed by this user
            if (borrowing.UserId != borrowingReturnRequestDTO.UserId)
            {
                _logger.LogAppWarning($"Borrowing with id = {borrowingReturnRequestDTO.BorrwingId} is not associated with user with id {borrowingReturnRequestDTO.UserId}");
                throw new ReturnBorrowingNotAllowedException($"Borrowing with id = {borrowingReturnRequestDTO.BorrwingId} is not associated with user with id {borrowingReturnRequestDTO.UserId}");
            }

            var books = borrowing.Books;
            foreach (Book book in books)
            {
                // check if the book is associated has been requested to be deleted
                if (borrowingReturnRequestDTO.BookIds.Contains(book.Id))
                {
                    // check if the book is returned or not
                    bool bookIsNotReturnedYet = borrowing.BookBorrowings.Where(bb => bb.BookId == book.Id).FirstOrDefault().IsReturned == false;
                    if (bookIsNotReturnedYet)
                    {
                        // add the number of existing books by one
                        book.NumberOfCopiesExist += 1;

                        // Set IsReturned to true   
                        borrowing.BookBorrowings.Where(bb => bb.BookId == book.Id).FirstOrDefault().IsReturned = true;

                    }
                    else
                    {
                        _logger.LogAppWarning($"Book with id {book.Id} is already returned");
                        throw new ReturnBorrowingNotAllowedException($"Book with id {book.Id} is already returned");
                    }

                }

            }

            await _mainRepo.SaveChangesAsync();


            return borrowing;


        }
    }
}
