
using Library.Models.DTO.Borrowing;

namespace Library.Services.DataServices.Interfaces
{
    public interface IBorrowingDataService : IBaseDataService<Borrowing>
    {
        Task<Borrowing> BorrowBookAsync(BorrowingCreateRequestDTO borrowingCreateDto);
        Task<Borrowing> ReturnBorrowedBookAsync(BorrowedBookReturnRequestDTO borrowingReturnRequestDTO);

    }
}
