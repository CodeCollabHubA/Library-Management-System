



using Microsoft.AspNetCore.Http;

namespace Library.Models.DTO
{
    public class BookUpdateRequestDTO : BaseDTO
    {
        public string Title { get; set; }

        public string? Description { get; set; }

        public int Credit { get; set; }

        public IEnumerable<AuthorUpdateRequestDTO>? Authors { get; set; }

        public IEnumerable<PublisherUpdateRequestDTO>? Publishers { get; set; }

        public int NumberOfCopiesOwned { get; set; }

        public int NumberOfCopiesExist { get; set; }
    }
}


