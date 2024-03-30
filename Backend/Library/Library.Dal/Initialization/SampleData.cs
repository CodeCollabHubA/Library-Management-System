

namespace Library.Dal.Initialization
{
    public static class SampleData
    {
        public static List<Book> Books => new()
        {
            new() { Id = 1, Title = "To Kill a Mockingbird", Description = "A novel by Harper Lee. Set in the 1930s, it explores the irrationality of adult attitudes toward race and class in the Deep South of the United States.", NumberOfCopiesOwned = 25, NumberOfCopiesExist = 24 },
            new() { Id = 2, Title = "1984", Description = "A dystopian social science fiction novel by George Orwell. It follows the life of Winston Smith, a low-ranking member of the ruling Party in a totalitarian superstate.", NumberOfCopiesOwned = 18, NumberOfCopiesExist = 17 },
            new() { Id = 3, Title = "The Great Gatsby", Description = "A novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby.", NumberOfCopiesOwned = 12, NumberOfCopiesExist = 10 },
            new() { Id = 4, Title = "Pride and Prejudice", Description = "A romantic novel of manners written by Jane Austen. The novel follows the character development of Elizabeth Bennet, the dynamic protagonist of the book.", NumberOfCopiesOwned = 15, NumberOfCopiesExist = 15 },
            new() { Id = 5, Title = "To the Lighthouse", Description = "A novel by Virginia Woolf. It centers on the Ramsay family and their visits to the Isle of Skye in Scotland between 1910 and 1920.", NumberOfCopiesOwned = 10, NumberOfCopiesExist = 10 }
        };

        public static List<Author> Authors => new()
        {
            new() { Id = 1, Name = "Harper Lee" },
            new() { Id = 2, Name = "George Orwell" },
            new() { Id = 3, Name = "F. Scott Fitzgerald" },
            new() { Id = 4, Name = "Jane Austen" },
            new() { Id = 5, Name = "Virginia Woolf" }
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
            new() { Id = 1, Name = "Ahmed Yassin", Address = "Sharja, Majaz 3", Email = "ahmed@example.com", Phone = "123-456-7890", UserRole = Role.Admin, PasswordHash = "$2b$10$d2KSh3GsKUXDvcjQ0aVdu.D45ZXtR84SQ4bq7h6vX/UTnVfke769C" },
            new() { Id = 2, Name = "Mohammed Ismaiel", Address = "Sharja, Nahda", Email = "moahmed@example.com", Phone = "456-789-1234", UserRole = Role.Admin, PasswordHash = "$2b$10$d2KSh3GsKUXDvcjQ0aVdu.D45ZXtR84SQ4bq7h6vX/UTnVfke769C" },
            new() { Id = 3, Name = "Ali Hassan", Address = "789 Oak St", Email = "ali@example.com", Phone = "789-123-4567", UserRole = Role.User, PasswordHash = "$2b$10$d2KSh3GsKUXDvcjQ0aVdu.D45ZXtR84SQ4bq7h6vX/UTnVfke769C" },
            new() { Id = 4, Name = "Osman Elamin", Email = "osman@example.com", Phone = "987-654-3210", UserRole = Role.User, PasswordHash = "$2b$10$d2KSh3GsKUXDvcjQ0aVdu.D45ZXtR84SQ4bq7h6vX/UTnVfke769C" },
            new() { Id = 5, Name = "khojalei abbas", Email = "khojalei@example.com", Phone = "321-654-9870", UserRole = Role.User, PasswordHash = "$2b$10$d2KSh3GsKUXDvcjQ0aVdu.D45ZXtR84SQ4bq7h6vX/UTnVfke769C" }
        };
        public static List<Loan> Loans => new()
        {
            new() { Id = 1, UserId = 3, DateOut = DateTime.Now.AddDays(1)},
            new() { Id = 2, UserId = 4, DateOut = DateTime.Now.AddDays(3)},
            new() { Id = 3, UserId = 5, DateOut = DateTime.Now}

        };

        public static List<BookLoan> BookLoans => new()
        {
            new() { Id = 1, BookId = 1, LoanId = 1},
            new() { Id = 2, BookId = 2, LoanId = 2},
            new() { Id = 3, BookId = 3, LoanId = 2},
            new() { Id = 4, BookId = 3, LoanId = 3}



        };

       

    }
}
