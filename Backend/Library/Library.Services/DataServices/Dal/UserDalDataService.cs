


using Library.Services.DataServices.Helpers;

namespace Library.Services.DataServices.Dal
{
    public class UserDalDataService : BaseDalDataService<User, UserDalDataService>, IUserDataService
    {
        public UserDalDataService(IUserRepo mainRepo, IAppLogging<UserDalDataService> logger) : base(mainRepo, logger)
        {
        }
        public async Task<string> LoginUserAsync(LoginUserRequestDTO userDTO, JwtOptions jwtOptions)
        {

            // check if a user with this email exists
            
            User user = await ((IUserRepo)_mainRepo).FindByEmailAsync(userDTO.Email);

            if (user == null)
            {
                throw new Exception("Invalid email!");
            }

            // check if the provided password is correct
            bool passwordIsValid = JwtHelpers.VerifyPasswordHash(userDTO.Password, user.PasswordHash);

            if (!passwordIsValid)
            {
                throw new Exception("Invalid Password");
            }

            // Generate Jwt token 
            string accessToken = JwtHelpers.GenerateJwtToken(user, jwtOptions);

            return accessToken;



        }

        public async Task<string> RegisterUserAsync(RegisterUserRequestDTO userDTO, JwtOptions jwtOptions)
        {


            // check if a user with this email already exists
            User user = await ((IUserRepo)_mainRepo).FindByEmailAsync(userDTO.Email);

            if (!(user == null))
            {
                throw new Exception("User with the same email already exists");
            }

            // Map the DTO to a user
            user = new User
            {
                Name = userDTO.Name,
                Email = userDTO.Email,
                Address = userDTO.Address,
                Phone = userDTO.Phone,
                PasswordHash = JwtHelpers.HashPassword(userDTO.Password),
                UserRole = Role.User,
            };


            // Add the new user to the database
            await _mainRepo.AddAsync(user);
            await _mainRepo.SaveChangesAsync();

            // Generate Jwt token
            string accessToken = JwtHelpers.GenerateJwtToken(user, jwtOptions);

            return accessToken;


        }
    }
}
