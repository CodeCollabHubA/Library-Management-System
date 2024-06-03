
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;


namespace Library.Models.Entities.Configuration.Helpers;
public class DateOnlyConverter : ValueConverter<DateOnly, DateTime>
{
    public DateOnlyConverter() : base(
            dateOnly => dateOnly.ToDateTime(TimeOnly.MinValue),
            dateTime => DateOnly.FromDateTime(dateTime))
    {
    }
}

