
namespace Library.Dal.Repos
{
    public class LoanRepo : BaseRepo<Loan>, ILoanRepo
    {
        public LoanRepo(ApplicationDbContext context) : base(context)
        {
        }
    }
}
