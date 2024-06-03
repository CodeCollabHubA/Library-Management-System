
using Library.Models.Entities.Configuration.Helpers;

namespace Library.Models.Entities.Configuration
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            // Default for createdAt
            builder.Property(b => b.CreatedAt).HasDefaultValueSql("GetDate()");

            builder.Property(b => b.BirthDate)
                 .HasConversion<DateOnlyConverter, DateOnlyComparer>();

            builder.HasIndex(e => e.Email).IsUnique();
        }
    }
}
