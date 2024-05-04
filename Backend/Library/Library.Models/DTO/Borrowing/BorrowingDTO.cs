
namespace Library.Models.DTO
{
    public class BorrowingDTO : BaseDTO
    {
        public int? UserId { get; set; }

        public UserDTO UserNavigation { get; set; }

        public int? BookId { get; set; }

        public BookDTO BookNavigation { get; set; }

        // Book borrowed on DueDate

        public DateTime DateOut { get; set; }


        // Books should be returned by DueDate
        public DateTime DueDate { get; set; }

        public bool IsReturned { get; set; }

    }


}
