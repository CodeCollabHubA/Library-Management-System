

namespace Library.Services.DataServices.Interfaces
{
    public interface IBorrowingDataService : IBaseDataService<Borrowing>
    {
        Task<PendingBorrowingResponseDTO> CreatePendingBorrowingAsync(PendingBorrowingRequestDTO userBorrowingRequest);
        Task<BorrowingStatusUpdateResponseDTO> UpdateBorrowingStatusAsync(BorrowingStatusUpdateRequestDTO borrowingStatusRequestDTO);

    }
}
