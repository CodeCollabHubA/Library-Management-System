
namespace Library.Models.DTO
{
    public class BorrowingDTO : BaseDTO
    {
        public int? UserId { get; set; }

        // Book borrowed on DueDate

        [Required]
        public DateTime DateOut { get; set; }


        // Books should be returned by DueDate
        
        public DateTime DueDate => DateOut.AddDays(14);
    }
}
