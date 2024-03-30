

namespace Library.Models.Entities
{
    public class BookLoan:BaseEntity
    {

        public int? BookId { get; set; }

        [ForeignKey(nameof(BookId))]
        public virtual Book BookNavigation { get; set; }


        public int? LoanId { get; set; }

        [ForeignKey(nameof(LoanId))]
        public virtual Loan LoanNavigation { get; set; }
    }
}
