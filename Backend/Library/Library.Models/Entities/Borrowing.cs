

namespace Library.Models.Entities
{
    [EntityTypeConfiguration(typeof(BorrowingConfiguration))]
    public class Borrowing : BaseEntity
    {



        public int? UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public User UserNavigation { get; set; }



        // Many books can be involved in a single loan
        [InverseProperty(nameof(Book.Borrowings))]
        public ICollection<Book> Books { get; set; } = new List<Book>();

        [InverseProperty(nameof(BookBorrowing.BorrowingNavigation))]
        public ICollection<BookBorrowing> BookBorrowings { get; set; }



        // Book borrowed on DueDate

        [Required]
        public DateTime DateOut { get; set; }



        // Book should be returned by DueDate
        [NotMapped]
        public DateTime DueDate => DateOut.AddDays(14);




    }
}
