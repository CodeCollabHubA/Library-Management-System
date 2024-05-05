
namespace Library.Models.DTO
{
    public class RegisterUserRequestDTO
    {


        [Required]
        public string Name { get; set; }



        [Required]
        [EmailAddress]
        public string Email { get; set; }

   
        [Required]
        public string Password { get; set; }

    }
}
