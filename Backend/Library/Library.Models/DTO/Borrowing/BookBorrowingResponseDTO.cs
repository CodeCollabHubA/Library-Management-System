
namespace Library.Models.DTO
{
    public class BookBorrowingResponseDTO : BaseDTO
    {
        public bool IsReturned { get; set; }

        public int BookId { get; set; }

        public BookResponseDTO BookNavigation { get; set; }

    }
}
