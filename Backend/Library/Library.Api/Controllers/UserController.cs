



using Microsoft.AspNetCore.Mvc.ModelBinding;


namespace Library.Api.Controllers
{
    public class UserController : BaseCrudController<User, UserController, UserDTO, UserUpdateRequestDTO,UserResponseDTO>
    {
        private readonly IUserDataService _userDataService;

        public UserController(IAppLogging<UserController> logger, IUserRepo mainRepo,IUserDataService userDataService, IMapper mapper) : base(logger, mainRepo, mapper)
        {
            _userDataService = userDataService;
        }


        // Unused endppoints
        [ApiExplorerSettings(IgnoreApi = true)]
        public async override Task<ActionResult<UserResponseDTO>> AddOneAsync(UserDTO entity)
        { 
            return NoContent();
        }


        public async override Task<ActionResult<UserResponseDTO>> UpdateOneAsync(int id, UserUpdateRequestDTO entity)
        {
            if (!ModelState.IsValid)
            {
                // check if the role is a valid role
                if(ModelState["$.userRole"].ValidationState == ModelValidationState.Invalid)
                {
                    _logger.LogAppWarning("Client provided invalid role for the user");
                    throw new ArgumentException("Invalid user role, (User/Admin) are the only roles allowed");
                }

                return ValidationProblem(ModelState);
            }


            if (id != entity.Id)
            {
                _logger.LogAppWarning("Id in the route and the entity do not match");
                throw new ArgumentException
                    ("Id in the route and the entity do not match");
            }

            
            User domainEntity;

            try
            {
                domainEntity = _mapper.Map<User>(entity);

                domainEntity = await _userDataService.UpdateAsync(domainEntity);
            }

            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }

            return Ok(_mapper.Map<UserUpdateRequestDTO>(domainEntity));
        }


    }
}
