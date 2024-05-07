


namespace Library.Models.DTO
{
    public class PendingBorrowingResponseDTO
    {
        public List<BorrowingResponseDTO> Success { get; set; } = new List<BorrowingResponseDTO>();
        public List<BorrowBooksErrors> Errors { get; set; } = new List<BorrowBooksErrors>();

    }

    public class BorrowBooksErrors
    {
        public int BookId { get; set; }
        public string Message { get; set; }

    }



}
