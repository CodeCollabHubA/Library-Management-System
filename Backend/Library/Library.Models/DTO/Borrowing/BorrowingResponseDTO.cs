
namespace Library.Models.DTO
{
    public class BorrowingResponseDTO : BaseDTO
    {

        public bool IsReturned { get; set; }

        public DateTime DateOut { get; set; }

        public DateTime DueDate { get; set; }


        public UserResponseDTO UserNavigation { get; set; }

        public BookResponseDTO BookNavigation { get; set; }





    }
}
