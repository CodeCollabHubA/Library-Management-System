

namespace Library.Models.Entities
{
    [EntityTypeConfiguration(typeof(LoanConfiguration))]
    public class Loan : BaseEntity
    {



        public int? UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public User UserNavigation { get; set; }



        // Many books can be involved in a single loan
        [InverseProperty(nameof(Book.Loans))]
        public ICollection<Book> Books { get; set; } = new List<Book>();

        [InverseProperty(nameof(BookLoan.LoanNavigation))]
        public ICollection<BookLoan> BookLoans { get; set; }



        // Book borrowed on DueDate

        [Required]
        public DateTime DateOut { get; set; }



        // Book should be returned by DueDate
        [NotMapped]
        public DateTime DueDate => DateOut.AddDays(14);




    }
}
