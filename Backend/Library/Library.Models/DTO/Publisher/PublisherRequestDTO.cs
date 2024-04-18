

namespace Library.Models.DTO
{
    public class PublisherRequestDTO 
    {
        [Required]
        public string Name { get; set; }


        [EmailAddress]
        public string? Email { get; set; }


        public string? Address { get; set; }
    }
}
