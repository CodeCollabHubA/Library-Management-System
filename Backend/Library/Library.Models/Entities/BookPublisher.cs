

namespace Library.Models.Entities

    
{
    
    public class BookPublisher : BaseEntity
    {

        public int? BookId { get; set; }

        [ForeignKey(nameof(BookId))]
        public virtual Book BookNavigation { get; set; }


        public int? PublisherId { get; set; }

        [ForeignKey(nameof(PublisherId))]
        public virtual Publisher PublisherNavigation { get; set; }
    }
}
