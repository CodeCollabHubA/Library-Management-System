





using Library.Models.DTO.User;

namespace Library.Api.Controllers
{
    // fix this
    public class UserController : BaseCrudController<User, UserController, UserDTO, UserDTO,UserResponseDTO>
    {

        public UserController(IAppLogging<UserController> logger, IUserRepo mainRepo, IMapper mapper) : base(logger, mainRepo, mapper)
        {
        }

    }
}
