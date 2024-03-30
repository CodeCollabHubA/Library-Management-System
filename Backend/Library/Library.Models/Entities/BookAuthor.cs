

namespace Library.Models.Entities
{
    public class BookAuthor:BaseEntity
    {
        public int? BookId { get; set; }

        [ForeignKey(nameof(BookId))]
        public virtual Book BookNavigation { get; set; }



        public int? AuthorId { get; set; }

        [ForeignKey(nameof(AuthorId))]
        public virtual Author AuthorNavigation { get; set; }

    }
}
