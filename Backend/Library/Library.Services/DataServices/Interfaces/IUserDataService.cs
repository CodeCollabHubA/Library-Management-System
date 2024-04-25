



namespace Library.Services.DataServices.Interfaces
{
    public interface IUserDataService: IBaseDataService<User>
    {
        Task<string> LoginUserAsync(LoginUserRequestDTO userDTO, JwtOptions jwtOptions);
        Task<string> RegisterUserAsync(RegisterUserRequestDTO userDTO, JwtOptions jwtOptions);




    }
}
