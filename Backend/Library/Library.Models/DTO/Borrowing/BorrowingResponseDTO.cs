
namespace Library.Models.DTO
{
    public class BorrowingResponseDTO :BaseDTO
    {
        public int? UserId { get; set; }



        public ICollection<BookBorrowingResponseDTO> BookBorrowings { get; set; }



       
        public DateTime DateOut { get; set; }


        public DateTime DueDate { get; set; }





    }
}
