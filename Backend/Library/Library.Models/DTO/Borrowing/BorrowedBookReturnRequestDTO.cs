

namespace Library.Models.DTO.Borrowing
{
    public class BorrowedBookReturnRequestDTO
    {

        public int BorrwingId { get; set; }
        public int UserId { get; set; }

        public List<int> BookIds { get; set; }

    }
}
