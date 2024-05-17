

namespace Library.Dal.Initialization
{
    public static class SampleData
    {
        public static List<Book> Books => new()
        {
            new() { Id = 1, Title = "The Old Man and the Sea", Description = "A novel by Ernest Hemingway. It tells the story of an aging Cuban fisherman who struggles with a giant marlin far out in the Gulf Stream.",Credit = 50, ImageURL = "https://m.media-amazon.com/images/I/71RXc0OoEwL._AC_UF894,1000_QL80_.jpg", ImagePath = "https://m.media-amazon.com/images/I/71RXc0OoEwL._AC_UF894,1000_QL80_.jpg", NumberOfTotalCopies = 25, NumberOfAvailableCopies = 24, CreatedAt = new DateTime(2024, 1, 1) },
            new() { Id = 2, Title = "1984", Description = "A dystopian social science fiction novel by George Orwell. It follows the life of Winston Smith, a low-ranking member of the ruling Party in a totalitarian superstate.",Credit = 80, ImageURL = "https://book-website.com/wp-content/uploads/2023/10/nineteen-eighty-four-1984-george.jpg", ImagePath= "https://book-website.com/wp-content/uploads/2023/10/nineteen-eighty-four-1984-george.jpg" , NumberOfTotalCopies = 18, NumberOfAvailableCopies = 17, CreatedAt = new DateTime(2024,2,1) },
            new() { Id = 3, Title = "The 7 Habits of Highly Effective People", Description = "A self-help book by Stephen R. Covey. It provides a holistic approach to personal and interpersonal effectiveness.",Credit = 30, ImageURL = "https://m.media-amazon.com/images/I/71y1NKGcGKL._AC_UF894,1000_QL80_DpWeblab_.jpg", ImagePath= "https://m.media-amazon.com/images/I/71y1NKGcGKL._AC_UF894,1000_QL80_DpWeblab_.jpg" , NumberOfTotalCopies = 12, NumberOfAvailableCopies = 10, CreatedAt = new DateTime(2024, 3, 1) },
            new() { Id = 4, Title = "How to Win Friends & Influence People", Description = "A self-help book by Dale Carnegie. It offers practical advice on how to successfully navigate social and business interactions.",Credit = 20, ImageURL = "https://m.media-amazon.com/images/I/71vK0WVQ4rL._AC_UF894,1000_QL80_.jpg", ImagePath= "https://m.media-amazon.com/images/I/71vK0WVQ4rL._AC_UF894,1000_QL80_.jpg" , NumberOfTotalCopies = 20, NumberOfAvailableCopies = 20, CreatedAt = new DateTime(2024, 4, 1) },
            new() { Id = 5, Title = "Atomic Habits", Description = "A self-help book by James Clear. It provides practical strategies for building good habits, breaking bad ones, and mastering the tiny behaviors that lead to remarkable results.",Credit = 5, ImageURL = "https://m.media-amazon.com/images/I/81YkqyaFVEL._AC_UF1000,1000_QL80_.jpg", ImagePath = "https://m.media-amazon.com/images/I/81YkqyaFVEL._AC_UF1000,1000_QL80_.jpg", NumberOfTotalCopies = 15, NumberOfAvailableCopies = 15, CreatedAt = new DateTime(2024, 8, 1) },
        };

        public static List<Author> Authors => new()
        {
            new() { Id = 1, Name = "Ernest Hemingway" },
            new() { Id = 2, Name = "George Orwell" },
            new() { Id = 3, Name = "Stephen R. Covey" },
            new() { Id = 4, Name = "Dale Carnegie" },
            new() { Id = 5, Name = "James Clear" },
        };

        public static List<BookAuthor> BookAuthors => new()
        {
            new() {Id = 1, BookId = 1, AuthorId = 1},
            new() {Id = 2, BookId = 2, AuthorId = 2},
            new() {Id = 3, BookId = 3, AuthorId = 3},
            new() {Id = 4, BookId = 4, AuthorId = 4},
            new() {Id = 5, BookId = 5, AuthorId = 5}

        };
        public static List<Publisher> Publishers => new()
        {
            new() { Id = 1, Name = "HarperCollins Publishers", Email = "info@harpercollins.com", Address = "195 Broadway, New York, NY 10007" },
            new() { Id = 2, Name = "Secker & Warburg", Email = "info@secker.co.uk", Address = "Carmelite House, 50 Victoria Embankment, London, EC4Y 0DZ" },
            new() { Id = 3, Name = "Scribner", Email = "info@scribner.com", Address = "1230 Avenue of the Americas, New York, NY 10020" },
            new() { Id = 4, Name = "Penguin Classics", Email = "info@penguin.co.uk", Address = "80 Strand, London, WC2R 0RL" },
            new() { Id = 5, Name = "Hogarth Press", Email = "info@hogarth.co.uk", Address = "20 Vauxhall Bridge Rd, Westminster, London SW1V 2SA" }
        };

        public static List<BookPublisher> BookPublishers => new()
        {
            new() {Id = 1, BookId = 1, PublisherId = 1},
            new() {Id = 2, BookId = 2, PublisherId = 2},
            new() {Id = 3, BookId = 3, PublisherId = 3},
            new() {Id = 4, BookId = 4, PublisherId = 4},
            new() {Id = 5, BookId = 5, PublisherId = 5}
        };

        public static List<User> Users => new()
         {
            new() { Id = 1, Name = "Ahmed Yassin",Bio ="Co-Founder | Software Engineer | .NET Backend Developer ",ImageURL = "https://cdn-icons-png.flaticon.com/512/149/149071.png", ImagePath= "https://cdn-icons-png.flaticon.com/512/149/149071.png",Credit = 1000000000, Address = "Sharja, UAE",UserSex = Sex.Male, Email = "ahmedyassin@backend.dev", Phone = "+971567680570", UserRole = Role.Admin, PasswordHash = "$2b$10$TdH.ez4lF75n657iD0L6hOTppMFEFjvaKQMklrgZyDFevRPd0txfC" },
            new() { Id = 2, Name = "Mohammed Ismaiel",Bio ="Co-Founder | Software Engineer | React Frontend Developer ",ImageURL = "https://cdn-icons-png.flaticon.com/512/149/149071.png", ImagePath= "https://cdn-icons-png.flaticon.com/512/149/149071.png",Credit = 100, Address = "Dubai, UAE",UserSex = Sex.Male, Email = "moahmed@frontend.dev", Phone = "456-789-1234", UserRole = Role.Admin, PasswordHash = "$2b$10$TdH.ez4lF75n657iD0L6hOTppMFEFjvaKQMklrgZyDFevRPd0txfC" },
            new() { Id = 3, Name = "Musab Obada",Bio ="Co-Founder | Software Engineer | React Frontend Developer ",ImageURL = "https://cdn-icons-png.flaticon.com/512/149/149071.png", ImagePath= "https://cdn-icons-png.flaticon.com/512/149/149071.png",Credit = 50, Address = "Cairo, Egypt",UserSex = Sex.Male, Email = "mudab@frontend.dev", Phone = "789-123-4567", UserRole = Role.User, PasswordHash = "$2b$10$TdH.ez4lF75n657iD0L6hOTppMFEFjvaKQMklrgZyDFevRPd0txfC" },
            new() { Id = 4, Name = "Osman Elamin",ImageURL = "https://cdn-icons-png.flaticon.com/512/149/149071.png", ImagePath= "https://cdn-icons-png.flaticon.com/512/149/149071.png",Credit = 30, Email = "osman@example.com", Phone = "987-654-3210", UserRole = Role.User, PasswordHash = "$2b$10$2ZCWHccbE3OdeHuk2GelC.35KSbLXtlEE5Hx4eEO1NIPVvsAWV4ia" },
            new() { Id = 5, Name = "khojalei abbas",ImageURL = "https://cdn-icons-png.flaticon.com/512/149/149071.png", ImagePath= "https://cdn-icons-png.flaticon.com/512/149/149071.png",Credit = 10, Email = "khojalei@example.com", Phone = "321-654-9870", UserRole = Role.User, PasswordHash = "$2b$10$2ZCWHccbE3OdeHuk2GelC.35KSbLXtlEE5Hx4eEO1NIPVvsAWV4ia" }
        };
        public static List<Borrowing> Borrowings => new()
        {
            new() { Id = 1, UserId = 3,BookId = 1, DateOut = DateTime.Now.AddDays(1), Status=BorrowingStatus.Borrowed, ApprovedById = 1},
            new() { Id = 2, UserId = 4,BookId = 2 , DateOut = DateTime.Now.AddDays(3), Status=BorrowingStatus.Borrowed, ApprovedById = 1},
            new() { Id = 3, UserId = 4,BookId = 3 , DateOut = DateTime.Now.AddDays(3), Status=BorrowingStatus.Borrowed, ApprovedById = 1},
            new() { Id = 4, UserId = 5,BookId = 3 , DateOut = DateTime.Now, Status=BorrowingStatus.Borrowed, ApprovedById = 1},
            new() { Id = 5, UserId = 4,BookId = 4 , DateOut = DateTime.Now.Subtract(TimeSpan.FromDays(30)), Status=BorrowingStatus.Returned, ApprovedById = 1, RejectedById = 1},


        };


    }
}
