
namespace Library.Models.Entities.Configuration
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            // Default for createdAt
            builder.Property(b => b.CreatedAt).HasDefaultValueSql("GetDate()");

            builder.HasIndex(e => e.Email).IsUnique();
        }
    }
}
