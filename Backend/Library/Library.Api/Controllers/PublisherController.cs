
namespace Library.Api.Controllers
{
    public class PublisherController : BaseCrudController<Publisher, PublisherRequestDTO, PublisherResponseDTO, PublisherController>
    {
        public PublisherController(IAppLogging<PublisherController> logger, IPublisherRepo mainRepo, IMapper mapper) : base(logger, mainRepo, mapper)
        { }

    }
}
