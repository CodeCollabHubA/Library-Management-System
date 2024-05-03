


using Library.Api.Filters.Action;
using Library.Dal.Exceptions;
using Library.Services.DataServices.Exceptions.User;



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





        [ValidateImageUpload("entity")]
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
