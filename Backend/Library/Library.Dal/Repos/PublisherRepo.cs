
namespace Library.Dal.Repos
{
    public class PublisherRepo : BaseRepo<Publisher>, IPublisherRepo
    {
        public PublisherRepo(ApplicationDbContext context) : base(context)
        {
        }
    }
}
