


using Library.Services.DataServices.Exceptions.User;
using Library.Services.DataServices.Helpers;
using Microsoft.AspNetCore.Http;

namespace Library.Services.DataServices.Dal
{
    public class UserDalDataService : BaseDalDataService<User, UserDalDataService>, IUserDataService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserDalDataService(IUserRepo mainRepo, IHttpContextAccessor httpContextAccessor, IAppLogging<UserDalDataService> logger) : base(mainRepo, logger)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<AuthResponseDTO> LoginUserAsync(LoginUserRequestDTO userDTO, JwtOptions jwtOptions)
        {

            // check if a user with this email exists

            User user = await ((IUserRepo)_mainRepo).FindByEmailAsync(userDTO.Email);

            if (user == null)
            {
                _logger.LogAppWarning("Invalid email!");
                throw new InvalidUserException();
            }

            // check if the provided password is correct
            bool passwordIsValid = JwtHelpers.VerifyPasswordHash(userDTO.Password, user.PasswordHash);

            if (!passwordIsValid)
            {
                _logger.LogAppWarning("Invalid Password");
                throw new InvalidUserException();
            }

            // Generate Jwt token 
            string accessToken = JwtHelpers.GenerateJwtToken(user, jwtOptions);
            AuthResponseDTO authResponse = new AuthResponseDTO
            {
                AccessToken = accessToken,
                UserId = user.Id,
                UserName = user.Name,
                UserRole = user.UserRole,
                ImageUrl = user.ImageURL,
            };

            return authResponse;



        }

        public async Task<AuthResponseDTO> RegisterUserAsync(RegisterUserRequestDTO userDTO, JwtOptions jwtOptions)
        {


            // check if a user with this email already exists
            User user = await ((IUserRepo)_mainRepo).FindByEmailAsync(userDTO.Email);

            if (!(user == null))
            {
                _logger.LogAppWarning("User with the same email already exists");
                throw new UserAlreadyExistException();
            }


            // Default image
            string imageName = "User.png";
            var localImagePath = Path.Combine(Directory.GetCurrentDirectory(), "StaticFiles",
                    "Images", "Users",
                    $"{imageName}");

            var imageUrl = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}{_httpContextAccessor.HttpContext.Request.PathBase}/StaticFiles/Images/Users/{imageName}";


            // Map the DTO to a user
            user = new User
            {
                Name = userDTO.Name,
                Email = userDTO.Email,
                PasswordHash = JwtHelpers.HashPassword(userDTO.Password),
                UserRole = Role.User,
                ImagePath = localImagePath,
                ImageURL = imageUrl
            };


            // Add the new user to the database
            await _mainRepo.AddAsync(user);
            await _mainRepo.SaveChangesAsync();

            // Generate Jwt token
            string accessToken = JwtHelpers.GenerateJwtToken(user, jwtOptions);

            AuthResponseDTO authResponse = new AuthResponseDTO
            {
                AccessToken = accessToken,
                UserId = user.Id,
                UserName = user.Name,
                UserRole = user.UserRole,
                ImageUrl = user.ImageURL,
            };

            return authResponse;


        }

        public override async Task<User> UpdateAsync(User entity, bool persist = true)
        {

            // check if user with this id exist
            User user = await _mainRepo.FindAsNoTrackingAsync(entity.Id);
            if (user == null)
            {
                _logger.LogAppWarning($"User with id {entity.Id} doesnot exist");
                throw new UserNotFoundException();
            }


            // Set image paths for a fallback image
            string imageName = "User.png";
            var localImagePath = Path.Combine(Directory.GetCurrentDirectory(), "StaticFiles",
                    "Images", "Users",
                    $"{imageName}");

            var imageUrl = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}{_httpContextAccessor.HttpContext.Request.PathBase}/StaticFiles/Images/Users/{imageName}";

            // If image exist, register it for user
            if (entity.Image != null)
            {
                var newImageName = Path.GetFileName(entity.Image.FileName);


                localImagePath = localImagePath.Replace(imageName, newImageName);

                // Upload the image to the local StaticFiles Folder
                using var stream = new FileStream(localImagePath, FileMode.Create);

                await entity.Image.CopyToAsync(stream);

                imageUrl = imageUrl.Replace(imageName, newImageName);

            }

            entity.ImagePath = localImagePath;
            entity.ImageURL = imageUrl;



            entity.PasswordHash = user.PasswordHash;

            await _mainRepo.UpdateAsync(entity, persist);
            return entity;
        }


    }
}
