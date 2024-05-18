

using Microsoft.AspNetCore.Http;

namespace Library.Models.Entities
{

    [EntityTypeConfiguration(typeof(BookConfiguration))]
    public class Book : BaseEntity
    {
        [Required]
        public string Title { get; set; }

        public string? Description { get; set; }

        [Column("Genre")]
        public Genre? BookGenre { get; set; }

        public int Credit { get; set; }

        public string? ImageURL { get; set; }
        public string? ImagePath { get; set; }
        [NotMapped]
        public IFormFile? Image { get; set; }


        [Required]
        public int NumberOfTotalCopies { get; set; }

        [Required]
        public int NumberOfAvailableCopies { get; set; }


        // One to Many with the Borrowing
        [InverseProperty(nameof(Borrowing.BookNavigation))]
        public virtual ICollection<Borrowing> Borrowings { get; set; } = new List<Borrowing>();



        // Many-To-Many with Author entity
        [InverseProperty(nameof(Author.Books))]
        public virtual ICollection<Author> Authors { get; set; } = new List<Author>();

        [InverseProperty(nameof(BookAuthor.BookNavigation))]
        public ICollection<BookAuthor> BookAuthors { get; set; }



        // Many-To-Many with the Publisher entity
        [InverseProperty(nameof(Publisher.Books))]
        public virtual ICollection<Publisher> Publishers { get; set; } = new List<Publisher>();

        [InverseProperty(nameof(BookPublisher.BookNavigation))]
        public ICollection<BookPublisher> BookPublishers { get; set; }

        public DateTime CreatedAt { get; set; }
    }

    [Flags]
    public enum Genre : long
    {
        None = 0L,
        SelfHelp = 1L << 0,        // 1
        Fiction = 1L << 1,         // 2
        Education = 1L << 2,       // 4
        Business = 1L << 3,        // 8
        Technology = 1L << 4,      // 16
        Medicine = 1L << 5,        // 32
        History = 1L << 6,         // 64
        Politics = 1L << 7,        // 128
        Arts = 1L << 8,            // 256
        Law = 1L << 9,             // 512
        Science = 1L << 10,        // 1024
        Psychology = 1L << 11,     // 2048
        Religion = 1L << 12,       // 4096
        Travel = 1L << 13,         // 8192
        Music = 1L << 14,          // 16384
        Film = 1L << 15,           // 32768
        Drama = 1L << 16,          // 65536
        Comedy = 1L << 17,         // 131072
        Animation = 1L << 18,      // 262144
        Game = 1L << 19,           // 524288
        Anime = 1L << 20,          // 1048576
        Cartoon = 1L << 21,        // 2097152
        Children = 1L << 22,       // 4194304
        Comics = 1L << 23,         // 8388608
        Fantasy = 1L << 24,        // 16777216
        Horror = 1L << 25,         // 33554432
        ScienceFiction = 1L << 26, // 67108864
        Romance = 1L << 27,        // 134217728
        Thriller = 1L << 28,       // 268435456
        Mystery = 1L << 29,        // 536870912
        Historical = 1L << 30,     // 1073741824
        Biography = 1L << 31,      // 2147483648
        Poetry = 1L << 32,         // 4294967296
        Cooking = 1L << 33,        // 8589934592
        Health = 1L << 34,         // 17179869184
        Art = 1L << 35,            // 34359738368
        Other = 1L << 36           // 68719476736
    }

}
