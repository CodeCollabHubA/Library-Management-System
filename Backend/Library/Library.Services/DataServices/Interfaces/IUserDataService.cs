





namespace Library.Services.DataServices.Interfaces
{
    public interface IUserDataService: IBaseDataService<User>
    {
        Task<AuthResponseDTO> LoginUserAsync(LoginUserRequestDTO userDTO, JwtOptions jwtOptions);
        Task<AuthResponseDTO> RegisterUserAsync(RegisterUserRequestDTO userDTO, JwtOptions jwtOptions);
        Task<AuthResponseDTO> UpdatePasswordAsync(UpdatePasswordRequestDTO userDTO, JwtOptions jwtOptions);



    }
}
