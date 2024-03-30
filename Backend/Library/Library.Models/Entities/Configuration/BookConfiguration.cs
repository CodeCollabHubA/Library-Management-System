

namespace Library.Models.Entities.Configuration
{
    public class BookConfiguration : IEntityTypeConfiguration<Book>
    {
        public void Configure(EntityTypeBuilder<Book> builder)
        {

            // Many-to-Many relationship between Books and Authors
            // using the BookAuthor entity
            builder
            .HasMany(b => b.Authors)
            .WithMany(a => a.Books)
            .UsingEntity<BookAuthor>(
                l => l
                   .HasOne(ba => ba.AuthorNavigation)
                   .WithMany(a => a.BookAuthors)
                   .HasForeignKey(nameof(BookAuthor.AuthorId))
                   .OnDelete(DeleteBehavior.Cascade),
               r => r
                   .HasOne(ba => ba.BookNavigation)
                   .WithMany(b => b.BookAuthors)
                   .HasForeignKey(nameof(BookAuthor.BookId))
                   .OnDelete(DeleteBehavior.Cascade),
               
               j =>
               {
                   j.HasKey(ba => new { ba.BookId, ba.AuthorId });
               });




            // Many-to-Many relationship between Books and Publishers
            // using the BookPublisher entity
            builder
            .HasMany(b => b.Publishers)
            .WithMany(a => a.Books)
            .UsingEntity<BookPublisher>(
                l => l
                   .HasOne(ba => ba.PublisherNavigation)
                   .WithMany(a => a.BookPublishers)
                   .HasForeignKey(nameof(BookPublisher.PublisherId))
                   .OnDelete(DeleteBehavior.Cascade),
               r => r
                   .HasOne(ba => ba.BookNavigation)
                   .WithMany(b => b.BookPublishers)
                   .HasForeignKey(nameof(BookPublisher.BookId))
                   .OnDelete(DeleteBehavior.Cascade),

               j =>
               {
                   j.HasKey(ba => new { ba.BookId, ba.PublisherId });
               });




            // Many-to-Many relationship between Books and Loans
            // using the BookLoan entity
            builder
            .HasMany(b => b.Loans)
            .WithMany(a => a.Books)
            .UsingEntity<BookLoan>(
                l => l
                   .HasOne(ba => ba.LoanNavigation)
                   .WithMany(a => a.BookLoans)
                   .HasForeignKey(nameof(BookLoan.LoanId))
                   .OnDelete(DeleteBehavior.Cascade),
               r => r
                   .HasOne(ba => ba.BookNavigation)
                   .WithMany(b => b.BookLoans)
                   .HasForeignKey(nameof(BookLoan.BookId))
                   .OnDelete(DeleteBehavior.Cascade),

               j =>
               {
                   j.HasKey(ba => new { ba.BookId, ba.LoanId });
               });








        }
    }
}
