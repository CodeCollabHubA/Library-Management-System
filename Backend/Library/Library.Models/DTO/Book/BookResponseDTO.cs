



namespace Library.Models.DTO
{
    public class BookResponseDTO: BaseDTO
    {
        [Required]
        public string Title { get; set; }

        public string? Description { get; set; }

        public int Credit { get; set; }

        public string? ImageURL { get; set; }

        public IEnumerable<AuthorResponseDTO>? Authors { get; set; } 

        public IEnumerable<PublisherResponseDTO>? Publishers { get; set;}

        [Required]
        public int NumberOfTotalCopies { get; set; }

        [Required]
        public int NumberOfAvailableCopies { get; set; }

    }
}


