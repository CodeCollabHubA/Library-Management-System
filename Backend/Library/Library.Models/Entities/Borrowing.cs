

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

        public bool IsReturned { get; set; }


    }
}
