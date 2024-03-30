
namespace Library.Api.Controllers
{
    public class PublisherController : BaseCrudController<Publisher, PublisherDTO, PublisherController>
    {
        public PublisherController(IAppLogging<PublisherController> logger, IPublisherRepo mainRepo, IMapper mapper) : base(logger, mainRepo, mapper)
        {
        }
    }
}
