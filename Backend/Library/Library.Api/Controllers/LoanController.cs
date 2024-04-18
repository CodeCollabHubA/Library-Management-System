
namespace Library.Api.Controllers
{
    public class LoanController : BaseCrudController<Loan, LoanDTO, LoanDTO, LoanController>
    {
        public LoanController(IAppLogging<LoanController> logger, ILoanRepo mainRepo, IMapper mapper) : base(logger, mainRepo, mapper)
        {
        }

    }
}





