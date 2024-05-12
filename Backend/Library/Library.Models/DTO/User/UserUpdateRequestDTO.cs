
using Microsoft.AspNetCore.Http;

namespace Library.Models.DTO
{
    public class UserUpdateRequestDTO : BaseDTO, IImageUploadable
    {
        public string Name { get; set; }
        public string? Bio { get; set; }
        public string? Address { get; set; }

        public int? Credit { get; set; }

        public IFormFile? Image { get; set; }



        [EmailAddress]
        public string Email { get; set; }

        [Phone]
        public string? Phone { get; set; }


        [Column("Role")]
        public Role UserRole { get; set; }
    }
}
