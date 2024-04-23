



using Library.Services.DataServices.Interfaces;

namespace Library.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly JwtOptions _jwtOptions;
        private readonly IUserDataService _userDataService;

        public AuthController(JwtOptions jwtOptions, IUserDataService userDataService)
        {
            _jwtOptions = jwtOptions;
            _userDataService = userDataService; 
        }


        // POST: /api/Auth/Register
        [HttpPost]
        [Route("Register")]
        public async Task<ActionResult<string>> Register([FromBody] RegisterUserRequestDTO registerRequestDto)
        {

            // TODO: Validate first, and look if the database already contains the user
            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);

            }

            // TODO: handle the error better
            string accessToken = await _userDataService.RegisterUserAsync(registerRequestDto, _jwtOptions);


            return Ok(accessToken);
        }


        // POST: /api/Auth/Login
        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult<string>> Login([FromBody] LoginUserRequestDTO user)
        {


            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);

            }


            // handle the error better
           string accessToken = await _userDataService.LoginUserAsync(user, _jwtOptions);


            return Ok(accessToken);
        }
    }
}
