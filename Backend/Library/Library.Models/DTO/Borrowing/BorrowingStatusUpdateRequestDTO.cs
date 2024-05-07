

namespace Library.Models.DTO
{
    public class BorrowingStatusUpdateRequestDTO
    {
        public BorrowingAction Action { get; set; }
        public List<int> BorrowingIds { get; set; }
    }

    public enum BorrowingAction
    {
        Request,
        Confirm,
        Cancel,
        Approve,
        Reject,
        Return
    }
}
