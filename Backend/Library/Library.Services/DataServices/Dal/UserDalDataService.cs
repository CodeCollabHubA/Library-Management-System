


using Library.Services.DataServices.Exceptions.User;
using Library.Services.DataServices.Helpers;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

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
            // Get the user id and check his role from the token
            ClaimsIdentity identity = _httpContextAccessor.HttpContext.User.Identity as ClaimsIdentity;
            int userId = int.Parse(identity.FindFirst(ClaimTypes.NameIdentifier).Value);
            User authUser = await _mainRepo.FindAsNoTrackingAsync(userId);
            Role? userRole = authUser.UserRole;

            // Get the user in the body 
            User userToEdit = await _mainRepo.FindAsNoTrackingAsync(entity.Id);
            if (userToEdit == null)
            {
                _logger.LogAppWarning($"User with id {entity.Id} doesnot exist");
                throw new UserNotFoundException();
            }
            // Only conintue if the authenticated user is an admin or he is the same user in the request body
            if (!(userRole == Role.Admin || userId == entity.Id))
            {
                throw new UserForbidenExcepiton("Only an admin or the user himself this info, you are not authorized to do so");
            }
            // Only continue if the user isn't trying to change his role to admin or change his credit
            if (userRole != Role.Admin && (entity.Credit != null || entity.UserRole != userToEdit.UserRole))
            {
                throw new UserForbidenExcepiton("Only the admin can update the credit or the role");
            }

            // If image exist, upload it to the StaticFiles Folder and update the user with the new image
            if (entity.Image != null)
            {
                var imageName = Path.GetFileName(entity.Image.FileName);
                // Image path in the StaticFiles Folder
                var localImagePath = Path.Combine(Directory.GetCurrentDirectory(), "StaticFiles",
                "Images", "Users",
                $"{imageName}");
                // Image URI
                var imageUrl = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}{_httpContextAccessor.HttpContext.Request.PathBase}/StaticFiles/Images/Users/{imageName}";

                // Upload the image to the local StaticFiles Folder
                using var stream = new FileStream(localImagePath, FileMode.Create);
                // Write the image to the stream
                await entity.Image.CopyToAsync(stream);

                // Map the image to the user
                userToEdit.ImagePath = localImagePath;
                userToEdit.ImageURL = imageUrl;

            }

            // Map dto to the user
            userToEdit.TimeStamp = entity.TimeStamp;
            userToEdit.Name = entity.Name;
            userToEdit.Bio = entity.Bio != null ? entity.Bio : userToEdit.Bio;
            userToEdit.Address = entity.Address != null ? entity.Address : userToEdit.Address;
            userToEdit.UserSex = entity.UserSex != null ? entity.UserSex : userToEdit.UserSex;
            userToEdit.Email = entity.Email;
            userToEdit.Phone = entity.Phone != null ? entity.Phone : userToEdit.Phone;

            // Admin only fields
            userToEdit.UserRole = userRole == Role.Admin ? entity.UserRole : userToEdit.UserRole;
            userToEdit.Credit = (userRole == Role.Admin && entity.Credit != null) ? entity.Credit : userToEdit.Credit;

            await _mainRepo.UpdateAsync(userToEdit);
            return userToEdit;
        }

        public async Task<AuthResponseDTO> UpdatePasswordAsync(UpdatePasswordRequestDTO userDTO, JwtOptions jwtOptions)
        {
            // Get the user id and check his role from the token
            ClaimsIdentity identity = _httpContextAccessor.HttpContext.User.Identity as ClaimsIdentity;
            int userId = int.Parse(identity.FindFirst(ClaimTypes.NameIdentifier).Value);
            User authUser = await _mainRepo.FindAsync(userId);
            // Check if the provided password is correct
            bool passwordIsValid = JwtHelpers.VerifyPasswordHash(userDTO.OldPassword, authUser.PasswordHash);
            if (!passwordIsValid)
            {
                throw new InvalidUserException("Invalid Password");
            }
            authUser.PasswordHash = JwtHelpers.HashPassword(userDTO.NewPassword);
            await _mainRepo.SaveChangesAsync();
            return await LoginUserAsync(new LoginUserRequestDTO { Email = authUser.Email, Password = userDTO.NewPassword }, jwtOptions);
        }
    }
}
