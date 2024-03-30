


namespace Library.Dal.Repos
{
    public class BookRepo : BaseRepo<Book>, IBookRepo
    {
        public BookRepo(ApplicationDbContext context) : base(context)
        {
        }
    }
}
