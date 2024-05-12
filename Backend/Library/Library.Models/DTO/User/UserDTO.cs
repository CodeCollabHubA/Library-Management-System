


namespace Library.Models.DTO
{
    public class UserDTO : BaseDTO
    {

        [Required]
        public string Name { get; set; }


        public string? Address { get; set; }

        public int? Credit { get; set; }



        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Phone]
        public string? Phone { get; set; }


        [Required]
        public Role UserRole { get; set; }
    }
}
