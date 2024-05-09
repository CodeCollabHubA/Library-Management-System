


using Microsoft.AspNetCore.Http;
using System.Text.Json.Serialization;

namespace Library.Models.Entities
{
    [EntityTypeConfiguration(typeof(UserConfiguration))]
    public class User : BaseEntity
    {

        [Required]
        public string Name { get; set; }

        public string? Bio { get; set; }

        public string? Address { get; set; }

        public int? Credit { get; set; }

        public string? ImageURL { get; set; }
        public string? ImagePath { get; set; }
        [NotMapped]
        public IFormFile? Image { get; set; }



        [Required]
        [EmailAddress]
        public string Email { get; set; }


        [Phone]
        public string? Phone { get; set; }


        [Required]
        [Column("Role")]
        public Role UserRole { get; set; }

        [InverseProperty(nameof(Borrowing.UserNavigation))]
        public ICollection<Borrowing> Borrowings { get; set; } = new List<Borrowing>();


        [JsonIgnore]
        public string PasswordHash { get; set; }

        public DateTime CreatedAt { get; set; }


    }

    public enum Role
    {
        Admin,
        User
    }

}
