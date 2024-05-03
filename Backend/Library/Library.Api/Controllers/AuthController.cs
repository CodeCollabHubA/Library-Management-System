using Library.Dal.Exceptions;
using Library.Services.DataServices.Exceptions.User;

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

            if (!ModelState.IsValid)
            {

                Dictionary<string, string[]> errors = ModelState.ToDictionary(
                    x => x.Key,
                    x => x.Value.Errors.Select(y => y.ErrorMessage).ToArray());

                throw new customWebExceptions.ValidationException(errors);
            }



            string accessToken;
            try
            {

            accessToken = await _userDataService.RegisterUserAsync(registerRequestDto, _jwtOptions);
            }
            catch(UserAlreadyExistException ex)
            {
                throw new customWebExceptions.ConflictException(ex.Message)
                {
                    Code = "UserConflict"
                };
            }
            catch (UnknownDatabaseException ex)
            {
                throw new customWebExceptions.WebException(ex.Message)
                {
                    Code = "DatabaseError"
                };
            }



            return Ok(accessToken);
        }


        // POST: /api/Auth/Login
        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult<string>> Login([FromBody] LoginUserRequestDTO user)
        {


            if (!ModelState.IsValid)
            {

                Dictionary<string, string[]> errors = ModelState.ToDictionary(
                    x => x.Key,
                    x => x.Value.Errors.Select(y => y.ErrorMessage).ToArray());

                throw new customWebExceptions.ValidationException(errors);

            }




            string accessToken;
            try
            {

            accessToken= await _userDataService.LoginUserAsync(user, _jwtOptions);
            }
            catch(InvalidUserException ex)
            {
                throw new customWebExceptions.UnauthorizedException(ex.Message);
            }




            return Ok(accessToken);
        }
    }
}
