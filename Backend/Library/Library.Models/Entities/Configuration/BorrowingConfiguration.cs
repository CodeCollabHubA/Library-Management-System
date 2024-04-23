
namespace Library.Models.Entities.Configuration
{
    public class BorrowingConfiguration : IEntityTypeConfiguration<Borrowing>
    {
        public void Configure(EntityTypeBuilder<Borrowing> builder)
        {
            builder.Property(l => l.DateOut).HasDefaultValue(DateTime.Now);
        }
    }
}
