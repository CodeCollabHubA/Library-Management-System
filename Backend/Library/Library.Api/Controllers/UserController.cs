



using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

using System.Security.Claims;

namespace Library.Api.Controllers
{
    public class UserController : BaseCrudController<User, UserDTO, UserController>
    {

        public UserController(IAppLogging<UserController> logger, IUserRepo mainRepo, IMapper mapper) : base(logger, mainRepo, mapper)
        {
        }

    }
}
