
namespace Library.Dal.Repos
{
    public class LoanRepo : BaseRepo<Borrowing>, ILoanRepo
    {
        public LoanRepo(ApplicationDbContext context) : base(context)
        {
        }
    }
}
