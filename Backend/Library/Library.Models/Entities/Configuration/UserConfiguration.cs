
namespace Library.Models.Entities.Configuration
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            
            builder.HasIndex(e => e.Email).IsUnique();
        }
    }
}
