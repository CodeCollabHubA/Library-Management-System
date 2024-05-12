
namespace Library.Models.DTO
{
    public class BorrowingDTO : BaseDTO
    {

        // Book borrowed on DueDate
        public DateTime DateOut { get; set; }


        // Books should be returned by DueDate
        public DateTime DueDate { get; set; }

        public BorrowingStatus Status { get; set; }

        public int? UserId { get; set; }


        public BookResponseDTO BookNavigation { get; set; }


        // Approved by
        public UserResponseDTO? ApprovedByNavigation { get; set; }

        // Returned by
        public UserResponseDTO? ReturnedByNavigation { get; set; }

        // Rejected by
        public UserResponseDTO? RejectedByNavigation { get; set; }

        // Requested to be borrowed/borrowed by
        public UserResponseDTO UserNavigation { get; set; }


        public int? BookId { get; set; }


      

    }


}
