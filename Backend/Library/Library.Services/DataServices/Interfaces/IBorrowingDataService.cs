
using Library.Models.DTO.Borrowing;

namespace Library.Services.DataServices.Interfaces
{
    public interface IBorrowingDataService : IBaseDataService<Borrowing>
    {
        Task<BorrowBooksResponseDTO> BorrowBooksAsync(BorrowBooksRequestDTO borrowingCreateDto);
        Task<ReturnBooksResponseDTO> ReturnBooksAsync(ReturnBooksRequestDTO borrowingReturnRequestDTO);

    }
}
