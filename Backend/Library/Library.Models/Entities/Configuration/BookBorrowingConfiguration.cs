using System;
using System.Collections.Generic;


namespace Library.Models.Entities.Configuration
{
    public class BookBorrowingConfiguration : IEntityTypeConfiguration<BookBorrowing>
    {
        public void Configure(EntityTypeBuilder<BookBorrowing> builder)
        {
           builder.Property(bb => bb.IsReturned).HasDefaultValue(false);
        }
    }
}
