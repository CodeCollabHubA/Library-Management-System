


namespace Library.Api.Controllers
{

    public class AuthorController : BaseCrudController<Author, AuthorController, AuthorCreateRequestDTO, AuthorUpdateRequestDTO,AuthorResponseDTO>
    {
        public AuthorController(IAppLogging<AuthorController> logger, IAuthorRepo mainRepo, IMapper mapper) : base(logger, mainRepo, mapper)
        {
        }



    }
}
