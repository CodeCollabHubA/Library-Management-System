using Library.Dal.Exceptions;
using Library.Services.DataServices.Exceptions.User;
using Microsoft.AspNetCore.Authorization;

namespace Library.Api.Controllers
{
    [Route("api/[controller]")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1.0-Beta")]
    public class AuthController : ControllerBase
    {

        private readonly JwtOptions _jwtOptions;
        private readonly IUserDataService _userDataService;

        public AuthController(JwtOptions jwtOptions, IUserDataService userDataService)
        {
            _jwtOptions = jwtOptions;
            _userDataService = userDataService;
        }


        /// <summary>
        /// Registers a new user with the provided registration details.
        /// </summary>
        /// <param name="registerRequestDto">The request DTO containing the user's registration information.</param>
        /// <returns>An ActionResult containing an AuthResponseDTO with authentication details upon successful registration.</returns>
        /// <remarks>
        /// This endpoint allows the registration of a new user by processing the provided registration details.
        /// The registration request includes user-specific information such as email, password.
        /// Upon successful registration, the endpoint returns an authentication response DTO containing authentication details
        /// such as jwt access token, expiration time, and user information.
        /// </remarks>
        /// <param name="registerRequestDto">The request DTO containing the user's registration information.</param>
        /// <returns>An ActionResult containing an AuthResponseDTO with authentication details upon successful registration.</returns>
        [HttpPost]
        [Route("Register")]
        public async Task<ActionResult<AuthResponseDTO>> Register([FromBody] RegisterUserRequestDTO registerRequestDto)
        {

            if (!ModelState.IsValid)
            {

                Dictionary<string, string[]> errors = ModelState.ToDictionary(
                    x => x.Key,
                    x => x.Value.Errors.Select(y => y.ErrorMessage).ToArray());

                throw new customWebExceptions.ValidationException(errors);
            }



            AuthResponseDTO authResponse;
            try
            {

                authResponse = await _userDataService.RegisterUserAsync(registerRequestDto, _jwtOptions);
            }
            catch (UserAlreadyExistException ex)
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



            return Ok(authResponse);
        }


        /// <summary>
        /// Logs in a user with the provided credentials.
        /// </summary>
        /// <param name="user">The request DTO containing the user's login credentials (email and password).</param>
        /// <returns>An ActionResult containing an AuthResponseDTO with authentication details upon successful login.</returns>
        /// <remarks>
        /// This endpoint allows a registered user to log in by providing their email and password.
        /// Upon successful login, the endpoint returns an authentication response DTO containing authentication details
        /// such as jwt access token, expiration time, and user information.
        /// </remarks>
        /// <param name="user">The request DTO containing the user's login credentials (email and password).</param>
        /// <returns>An ActionResult containing an AuthResponseDTO with authentication details upon successful login.</returns>
        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult<AuthResponseDTO>> Login([FromBody] LoginUserRequestDTO user)
        {


            if (!ModelState.IsValid)
            {

                Dictionary<string, string[]> errors = ModelState.ToDictionary(
                    x => x.Key,
                    x => x.Value.Errors.Select(y => y.ErrorMessage).ToArray());

                throw new customWebExceptions.ValidationException(errors);

            }




            AuthResponseDTO authResponse;
            try
            {

                authResponse = await _userDataService.LoginUserAsync(user, _jwtOptions);
            }
            catch (InvalidUserException ex)
            {
                throw new customWebExceptions.UnauthorizedException(ex.Message);
            }




            return Ok(authResponse);
        }


        /// <summary>
        /// Changes the password for the authenticated user.
        /// </summary>
        /// <param name="user">The request DTO containing the user's current password and new password.</param>
        /// <returns>An ActionResult containing an AuthResponseDTO with authentication details upon successful password change.</returns>
        /// <remarks>
        /// This endpoint allows an authenticated user to change their password by providing their current password and new password.
        /// Upon successful password change, the endpoint returns an authentication response DTO containing updated authentication details
        /// such as access token, expiration time, and user information.
        /// </remarks>
        /// <param name="user">The request DTO containing the user's current password and new password.</param>
        /// <returns>An ActionResult containing an AuthResponseDTO with authentication details upon successful password change.</returns>
        [HttpPut]
        [Route("ChangePassword")]
        [Authorize]
        public async Task<ActionResult<AuthResponseDTO>> ChangePassword([FromBody] UpdatePasswordRequestDTO user)
        {
            if (!ModelState.IsValid)
            {

                Dictionary<string, string[]> errors = ModelState.ToDictionary(
                    x => x.Key,
                    x => x.Value.Errors.Select(y => y.ErrorMessage).ToArray());

                throw new customWebExceptions.ValidationException(errors);
            }
            AuthResponseDTO authResponse;
            try
            {
                authResponse = await _userDataService.UpdatePasswordAsync(user, _jwtOptions);
            }
            catch (InvalidUserException ex)
            {
                throw new customWebExceptions.ForbiddenException(ex.Message)
                {
                    Code = "InvalidOldPassword"
                };
            }
            return Ok(authResponse);
        }
    }
}
