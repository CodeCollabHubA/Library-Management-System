

namespace Library.Models.Entities
{
    public class Publisher : BaseEntity
    {

        [Required]
        public string Name { get; set; }


        [EmailAddress]
        public string? Email { get; set; }


        public string? Address { get; set; }

        [InverseProperty(nameof(Book.Publishers))]
        public virtual IEnumerable<Book> Books { get; set; } = new List<Book>();

        [InverseProperty(nameof(BookPublisher.PublisherNavigation))]
        public IEnumerable<BookPublisher> BookPublishers { get; set; }
    }
}
