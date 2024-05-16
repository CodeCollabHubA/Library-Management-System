


using Library.Api.Filters.Action;
using Library.Dal.Exceptions;
using Library.Services.DataServices.Exceptions.User;
using Microsoft.AspNetCore.Authorization;



namespace Library.Api.Controllers
{
    public class UserController : BaseCrudController<User, UserController, UserDTO, UserUpdateRequestDTO, UserResponseDTO>
    {
        private readonly IUserDataService _userDataService;

        public UserController(IAppLogging<UserController> logger, IUserRepo mainRepo, IUserDataService userDataService, IMapper mapper) : base(logger, mainRepo, mapper)
        {
            _userDataService = userDataService;
        }


        // Unused endppoints
        [ApiExplorerSettings(IgnoreApi = true)]
        public async override Task<ActionResult<UserResponseDTO>> AddOneAsync(UserDTO entity)
        {
            return NoContent();
        }

        /// <summary>
        /// Updates a single record
        /// </summary>
        /// <param name="id">Primary key of the record to update</param>
        /// <param name="entity">Entity to update</param>
        /// <returns>Updated record</returns>
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [SwaggerResponse(200, "The execution was successful")]
        [SwaggerResponse(400, "The request was invalid")]
        [SwaggerResponse(401, "Unauthorized access attempted")]
        [SwaggerResponse(403, "Forbidden access attempted")]
        [SwaggerResponse(404, "The requested resource was not found")]
        [SwaggerResponse(500, "An internal server error has occurred")]
        [HttpPut("{id}")]
        [ValidateImageUpload("entity")]
        [Authorize]
        public async override Task<ActionResult<UserResponseDTO>> UpdateOneAsync(int id, [FromForm] UserUpdateRequestDTO entity)
        {

            if (!ModelState.IsValid)
            {
                Dictionary<string, string[]> errors = ModelState.ToDictionary(
                    x => x.Key,
                    x => x.Value.Errors.Select(y => y.ErrorMessage).ToArray());

                throw new customWebExceptions.ValidationException(errors);
            }
            if (id != entity.Id)
            {
                _logger.LogAppWarning("Id in the route and the entity do not match");
                throw new customWebExceptions.ConflictException
                    ("Id in the route and the entity do not match");
            }

            User domainEntity = _mapper.Map<User>(entity);
            try
            {
                domainEntity = await _userDataService.UpdateAsync(domainEntity);
            }
            catch(UserForbidenExcepiton ex)
            {
                throw new customWebExceptions.ForbiddenException(ex.Message)
                {
                    Code = "UserUpdateForbidden"
                };
            }
            catch (UserNotFoundException ex)
            {
                throw new customWebExceptions.NotFoundException(ex.Message)
                {
                    Code = "UserNotFound"
                };
            }
            catch (DbUpdateConcurrencyException ex)
            {
                throw new customWebExceptions.WebException(ex.Message)
                {
                    Code = "ConcurrencyError"
                };
            }
            catch (UnknownDatabaseException ex)
            {
                throw new customWebExceptions.WebException(ex.Message)
                {
                    Code = "DatabaseError"
                };
            }

            return Ok(_mapper.Map<UserResponseDTO>(domainEntity));
        }




    }
}
