



namespace Library.Models.DTO
{
    public class BookDTO : BaseDTO
    {
        [Required]
        public string Title { get; set; }

        public string? Description { get; set; }

        public Genre? BookGenre { get; set; }


        public int Credit { get; set; }


        [Required]
        public int NumberOfTotalCopies { get; set; }

        [Required]
        public int NumberOfAvailableCopies { get; set; }

    }
}
