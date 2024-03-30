
namespace Library.Dal.Repos
{
    public class AuthorRepo : BaseRepo<Author>, IAuthorRepo
    {
        public AuthorRepo(ApplicationDbContext context) : base(context)
        {
        }
    }
}
