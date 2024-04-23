


using System.Text.Json.Serialization;

namespace Library.Models.Entities
{
    [EntityTypeConfiguration(typeof(UserConfiguration))]
    public class User : BaseEntity
    {

        [Required]
        public string Name { get; set; }


        public string? Address { get; set; }


        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [Phone]
        public string Phone { get; set; }


        [Required]
        [Column("Role")]
        public Role UserRole { get; set; }

        [InverseProperty(nameof(Loan.UserNavigation))]
        public ICollection<Loan> Loans { get; set; } = new List<Loan>();


        [JsonIgnore]
        public string PasswordHash { get; set; }

    }

    public enum Role
    {
        Admin,
        User
    }

}
