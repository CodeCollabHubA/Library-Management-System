

namespace Library.Models.DTO.Borrowing
{
    public class ReturnBooksResponseDTO
    {

        public List<BorrowingResponseDTO> Success { get; set; } = new List<BorrowingResponseDTO>();
        public List<ReturnBooksErrors> Errors { get; set; } = new List<ReturnBooksErrors>();

    }

    public class ReturnBooksErrors
    {
        public int BookId { get; set; }
        public string Message { get; set; }

    }
}
