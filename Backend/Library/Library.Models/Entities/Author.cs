


namespace Library.Models.Entities
{
    public class Author:BaseEntity
    {
        [Required]
        public string Name { get; set; }


        [InverseProperty(nameof(Book.Authors))]
        public IEnumerable<Book> Books { get; set; } = new List<Book>();

        [InverseProperty(nameof(BookAuthor.AuthorNavigation))]
        public IEnumerable<BookAuthor> BookAuthors { get; set; }
    }
}
