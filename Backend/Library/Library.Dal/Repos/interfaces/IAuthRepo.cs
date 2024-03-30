
using Library.Models.Options.JwtOptions;

namespace Library.Dal.Repos.interfaces
{
    public interface IAuthRepo
    {
        Task<string> LoginUserAsync(LoginUserRequestDTO userDTO, JwtOptions jwtOptions);

        Task<string> RegisterUserAsync(RegisterUserRequestDTO userDTO, JwtOptions jwtOptions);

    }
}
