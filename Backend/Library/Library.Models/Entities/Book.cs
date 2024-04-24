

using Microsoft.AspNetCore.Http;

namespace Library.Models.Entities
{

    [EntityTypeConfiguration(typeof(BookConfiguration))]
    public class Book : BaseEntity
    {
        [Required]
        public string Title { get; set; }

        public string? Description { get; set; }

        public int Credit { get; set; }

        public string? ImageURL { get; set; }
        public string? ImagePath { get; set; }
        [NotMapped]
        public IFormFile? Image { get; set; }


        [Required]
        public int NumberOfCopiesOwned { get; set; }

        [Required]
        public int NumberOfCopiesExist { get; set; }



        // Borrowings where a copy of the book involved
        // Many-To-Many with the Borrowing entity
        [InverseProperty(nameof(Borrowing.Books))]
        public ICollection<Borrowing> Borrowings { get; set; } = new List<Borrowing>();

        // join table
        [InverseProperty(nameof(BookBorrowing.BookNavigation))]
        public ICollection<BookBorrowing> BookBorrowings { get; set; }



        // Many-To-Many with Author entity
        [InverseProperty(nameof(Author.Books))]
        public virtual ICollection<Author> Authors { get; set; } = new List<Author>();

        [InverseProperty(nameof(BookAuthor.BookNavigation))]
        public ICollection<BookAuthor> BookAuthors { get; set; }



        // Many-To-Many with the Publisher entity
        [InverseProperty(nameof(Publisher.Books))]
        public virtual ICollection<Publisher> Publishers { get; set; } = new List<Publisher>();

        [InverseProperty(nameof(BookPublisher.BookNavigation))]
        public ICollection<BookPublisher> BookPublishers { get; set; }
    }
}
