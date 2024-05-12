

namespace Library.Models.Entities
{
    [EntityTypeConfiguration(typeof(BorrowingConfiguration))]
    public class Borrowing : BaseEntity
    {


        // One to Many with User
        public int? UserId { get; set; }


        [ForeignKey(nameof(UserId))]
        public User UserNavigation { get; set; }



        // One to Many with Book
        public int? BookId { get; set; }


        [ForeignKey(nameof(BookId))]
        public Book BookNavigation { get; set; }



        // Book borrowed on DueDate

        [Required]
        public DateTime DateOut { get; set; }



        // Book should be returned by DueDate
        public DateTime DueDate { get; set; }

        public BorrowingStatus Status { get; set; }

        // Approved by
        public int? ApprovedById { get; set; }

        [ForeignKey(nameof(ApprovedById))]
        public User ApprovedByNavigation { get; set; }

        // Returned by
        public int? ReturnedById { get; set; }

        [ForeignKey(nameof(ReturnedById))]
        public User ReturnedByNavigation { get; set; }

        // Rejected by
        public int? RejectedById { get; set; }

        [ForeignKey(nameof(RejectedById))]
        public User RejectedByNavigation { get; set; }

        public DateTime CreatedAt { get; set; }

    }

    public enum BorrowingStatus
    {
        Pending,
        Cancelled,
        Approved,
        Rejected,
        Borrowed,
        Returned
    }
}
