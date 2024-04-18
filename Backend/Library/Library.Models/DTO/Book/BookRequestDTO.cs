



using Microsoft.AspNetCore.Http;

namespace Library.Models.DTO
{
    public class BookRequestDTO
    {
        [Required]
        public string Title { get; set; }

        public string? Description { get; set; }
        public IFormFile? Image { get; set; }


        [Required]
        public int NumberOfCopiesOwned { get; set; }

        [Required]
        public int NumberOfCopiesExist { get; set; }

    }
}


