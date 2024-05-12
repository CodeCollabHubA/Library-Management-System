



namespace Library.Dal.EFStructures
{
    public partial class ApplicationDbContext : DbContext

    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }



        public DbSet<Book> Books { get; set; }
        public DbSet<Publisher> Publishers { get; set; }
        public DbSet<BookPublisher> BookPublishers { get; set; }

        public DbSet<Author> Authors { get; set; }
        public DbSet<BookAuthor> BookAuthors { get; set; }
        
        public DbSet<Borrowing> Borrowings { get; set; }

        public DbSet<User> Users { get; set; }
        public DbSet<SeriLogEntry> SeriLogEntries { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            // Default database schema
            modelBuilder.HasDefaultSchema("libr");


            // Entity specific configurations
            new SeriLogEntryConfiguration().Configure(modelBuilder.Entity<SeriLogEntry>());
            new BorrowingConfiguration().Configure(modelBuilder.Entity<Borrowing>());
            new BookConfiguration().Configure(modelBuilder.Entity<Book>());
            new UserConfiguration().Configure(modelBuilder.Entity<User>());

        }



    }


}
