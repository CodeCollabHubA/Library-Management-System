
namespace Library.Api.Controllers
{
    public class PublisherController : BaseCrudController<Publisher, PublisherCreateRequestDTO, PublisherUpdateRequestDTO,PublisherResponseDTO, PublisherController>
    {
        public PublisherController(IAppLogging<PublisherController> logger, IPublisherRepo mainRepo, IMapper mapper) : base(logger, mainRepo, mapper)
        { }

    }
}
