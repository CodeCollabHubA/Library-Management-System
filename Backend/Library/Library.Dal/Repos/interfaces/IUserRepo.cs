

namespace Library.Dal.Repos
{
    public interface IUserRepo:IBaseRepo<User>
    {
        Task<User> FindByEmailAsync(string email);

    }
}
