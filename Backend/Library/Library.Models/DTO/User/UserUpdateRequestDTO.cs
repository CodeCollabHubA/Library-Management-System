
namespace Library.Models.DTO
{
    public class UserUpdateRequestDTO : BaseDTO
    {
        public string Name { get; set; }


        public string? Address { get; set; }

        public int Credit { get; set; }



        [EmailAddress]
        public string Email { get; set; }

        [Phone]
        public string Phone { get; set; }


        [Column("Role")]
        public Role UserRole { get; set; }
    }
}
