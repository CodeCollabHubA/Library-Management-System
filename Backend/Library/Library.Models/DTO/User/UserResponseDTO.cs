

namespace Library.Models.DTO.User
{
    public class UserResponseDTO : BaseDTO
    {
        public string Name { get; set; }


        public string? Address { get; set; }

        public int Credit { get; set; }



        public string Email { get; set; }

        public string Phone { get; set; }

        public Role UserRole { get; set; }
    }
}
