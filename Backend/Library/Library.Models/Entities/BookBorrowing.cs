

namespace Library.Models.Entities
{
    public class BookBorrowing:BaseEntity
    {
        public bool IsReturned { get; set; }

        public int? BookId { get; set; }

        [ForeignKey(nameof(BookId))]
        public virtual Book BookNavigation { get; set; }


        public int? BorrowingId { get; set; }



        [ForeignKey(nameof(BorrowingId))]
        public virtual Borrowing BorrowingNavigation { get; set; }

    }
}
