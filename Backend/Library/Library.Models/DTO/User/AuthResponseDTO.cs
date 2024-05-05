

namespace Library.Models.DTO
{
    public class AuthResponseDTO
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public Role UserRole { get; set; }
        public string? ImageUrl { get; set; }
        public string AccessToken { get; set; }

    }
}
