

namespace Library.Api.Controllers
{
    public class BookController : BaseCrudController<Book, BookDTO, BookController>
    {
        public BookController(IAppLogging<BookController> logger, IBookRepo mainRepo, IMapper mapper) : base(logger, mainRepo, mapper)
        {
        }
    }
}
