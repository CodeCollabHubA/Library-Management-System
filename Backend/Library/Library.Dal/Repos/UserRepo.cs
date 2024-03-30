

namespace Library.Dal.Repos
{
    public class UserRepo : BaseRepo<User>, IUserRepo
    {
        public UserRepo(ApplicationDbContext context) : base(context)
        {
        }
    }
}
