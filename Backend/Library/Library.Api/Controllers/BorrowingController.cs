
namespace Library.Api.Controllers
{
    public class BorrowingController : BaseCrudController<Borrowing, BorrowingDTO, BorrowingDTO, BorrowingDTO, BorrowingController>
    {
        public BorrowingController(IAppLogging<BorrowingController> logger, ILoanRepo mainRepo, IMapper mapper) : base(logger, mainRepo, mapper)
        {
        }

    }
}





