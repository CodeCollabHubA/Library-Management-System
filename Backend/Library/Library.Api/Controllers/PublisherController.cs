
namespace Library.Api.Controllers
{
    public class PublisherController : BaseCrudController<Publisher, PublisherController, PublisherCreateRequestDTO, PublisherUpdateRequestDTO, PublisherResponseDTO>
    {
        public PublisherController(IAppLogging<PublisherController> logger, IPublisherRepo mainRepo, IMapper mapper) : base(logger, mainRepo, mapper)
        { }

    }
}
