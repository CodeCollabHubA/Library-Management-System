

namespace Library.Models.Entities
{

    [EntityTypeConfiguration(typeof(BookConfiguration))]
    public class Book : BaseEntity
    {
        [Required]
        public string Title { get; set; }

        public string? Description { get; set; }

        [Required]
        public int NumberOfCopiesOwned { get; set; }

        [Required]
        public int NumberOfCopiesExist { get; set; }



        // Loans where a copy of the book involved
        // Many-To-Many with the Loan entity
        [InverseProperty(nameof(Loan.Books))]
        public IEnumerable<Loan> Loans { get; set; } = new List<Loan>();

        // join table
        [InverseProperty(nameof(BookLoan.BookNavigation))]
        public IEnumerable<BookLoan> BookLoans { get; set; }



        // Many-To-Many with Author entity
        [InverseProperty(nameof(Author.Books))]
        public virtual IEnumerable<Author> Authors { get; set; } = new List<Author>();

        [InverseProperty(nameof(BookAuthor.BookNavigation))]
        public IEnumerable<BookAuthor> BookAuthors { get; set; }



        // Many-To-Many with the Publisher entity
        [InverseProperty(nameof(Publisher.Books))]
        public virtual IEnumerable<Publisher> Publishers { get; set; } = new List<Publisher>();

        [InverseProperty(nameof(BookPublisher.BookNavigation))]
        public IEnumerable<BookPublisher> BookPublishers { get; set; }
    }
}
