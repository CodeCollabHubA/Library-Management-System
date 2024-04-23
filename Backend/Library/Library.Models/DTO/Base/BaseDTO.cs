
namespace Library.Models.DTO.Base
{
    public class BaseDTO
    {

        
        public int Id { get; set; }

        [Timestamp]
        public byte[]? TimeStamp { get; set; }
    }
}
