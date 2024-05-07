
namespace Library.Models.Entities.Configuration
{
    public class BorrowingConfiguration : IEntityTypeConfiguration<Borrowing>
    {
        public void Configure(EntityTypeBuilder<Borrowing> builder)
        {
            // Set the default of the DateOut to be the current date
            builder.Property(l => l.DateOut).HasDefaultValueSql("GetDate()");

            // Set the default of the DueDate to be 15 days after the DateOut
            builder.Property(l => l.DueDate).HasDefaultValueSql("DateAdd(day, 15, GetDate())");

            // Set the default status to "Pending"
            builder.Property(l => l.Status).HasDefaultValue(BorrowingStatus.Pending);
        }
    }
}
