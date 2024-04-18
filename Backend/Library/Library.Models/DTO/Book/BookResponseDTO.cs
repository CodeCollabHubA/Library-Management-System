



namespace Library.Models.DTO
{
    public class BookResponseDTO: BaseDTO
    {
        [Required]
        public string Title { get; set; }

        public string? Description { get; set; }
        public string? ImageURL { get; set; }



        [Required]
        public int NumberOfCopiesOwned { get; set; }

        [Required]
        public int NumberOfCopiesExist { get; set; }

    }
}


