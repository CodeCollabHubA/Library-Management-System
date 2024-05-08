

namespace Library.Models.DTO
{
    public class BorrowingResponseDTO : BaseDTO
    {

        public BorrowingStatus Status { get; set; }
    
        public DateTime DateOut { get; set; }

        public DateTime DueDate { get; set; }

        public DateTime CreatedAt { get; set; }

        public BookResponseDTO BookNavigation { get; set; }


        // Approved by
        public MinimalUserResponseDTO? ApprovedByNavigation { get; set; }

        // Returned by
        public MinimalUserResponseDTO? ReturnedByNavigation { get; set; }

        // Rejected by
        public MinimalUserResponseDTO? RejectedByNavigation { get; set; }

        // Requested to be borrowed/borrowed by
        public MinimalUserResponseDTO UserNavigation { get; set; }






    }
}
