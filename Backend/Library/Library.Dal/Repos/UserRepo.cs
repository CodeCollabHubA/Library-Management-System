


namespace Library.Dal.Repos
{
    public class UserRepo : BaseRepo<User>, IUserRepo
    {
        public UserRepo(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<User> FindByEmailAsync(string email)
        {
            return await Table.FirstOrDefaultAsync(x => x.Email.Equals(email));
        }
    }
}
