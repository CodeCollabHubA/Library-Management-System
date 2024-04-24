
namespace Library.Models.DTO
{
    public class BorrowingCreateRequestDTO
    {
        public int UserId { get; set; }

        public List<int> BookIds { get; set; }

    }
}
