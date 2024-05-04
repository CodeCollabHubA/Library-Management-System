



using Microsoft.AspNetCore.Http;

namespace Library.Models.DTO
{
    public class BookUpdateRequestDTO : BaseDTO
    {
        public string Title { get; set; }

        public string? Description { get; set; }

        public int Credit { get; set; }

        public List<int>? AuthorsIds { get; set; }

        public List<int>? PublishersIds { get; set; }

        public int NumberOfTotalCopies { get; set; }

        public int NumberOfAvailableCopies { get; set; }
    }
}


