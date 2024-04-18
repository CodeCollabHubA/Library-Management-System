

namespace Library.Models.DTO
{
    public class PublisherDTO : BaseDTO
    {
        [Required]
        public string Name { get; set; }


        [EmailAddress]
        public string? Email { get; set; }


        public string? Address { get; set; }
    }
}
