

namespace Library.Models.DTO
{
    public class BorrowingStatusUpdateResponseDTO
    {
        public List<BorrowingResponseDTO> Success { get; set; } = new List<BorrowingResponseDTO>();
        public List<BorrowingRequestsErrors> Errors { get; set; } = new List<BorrowingRequestsErrors>();

    }

    public class BorrowingRequestsErrors
    {
        public int BorrowingId { get; set; }
        public string Message { get; set; }

    }
}
