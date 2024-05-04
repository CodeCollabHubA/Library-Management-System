
namespace Library.Models.DTO
{
    public class BorrowBooksRequestDTO
    {
        public int UserId { get; set; }

        public List<int> BookIds { get; set; }

    }
}
