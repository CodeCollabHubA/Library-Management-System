


namespace Library.Api.Controllers
{

    public class AuthorController : BaseCrudController<Author, AuthorRequestDTO, AuthorResponseDTO, AuthorController>
    {
        public AuthorController(IAppLogging<AuthorController> logger, IAuthorRepo mainRepo, IMapper mapper) : base(logger, mainRepo, mapper)
        {
        }



    }
}
