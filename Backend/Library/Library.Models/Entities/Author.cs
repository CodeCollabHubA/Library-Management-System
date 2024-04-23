


namespace Library.Models.Entities
{
    public class Author:BaseEntity
    {
        [Required]
        public string Name { get; set; }


        [InverseProperty(nameof(Book.Authors))]
        public ICollection<Book> Books { get; set; } = new List<Book>();

        [InverseProperty(nameof(BookAuthor.AuthorNavigation))]
        public ICollection<BookAuthor> BookAuthors { get; set; }
    }
}
