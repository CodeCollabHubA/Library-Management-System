
namespace Library.Models.Entities.Configuration
{
    public class LoanConfiguration : IEntityTypeConfiguration<Loan>
    {
        public void Configure(EntityTypeBuilder<Loan> builder)
        {
            builder.Property(l => l.DateOut).HasDefaultValue(DateTime.Now);
        }
    }
}
