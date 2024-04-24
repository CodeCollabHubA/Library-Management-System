
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Library.Dal.Repos
{
    public class BorrowingRepo : BaseRepo<Borrowing>, IBorrowingRepo
    {
        public BorrowingRepo(ApplicationDbContext context) : base(context)
        {
        }


        public override IEnumerable<Borrowing> GetAllIgnoreQueryFilters(
            string? filterOn = null, string? filterQuery = null,
            string? sortBy = null, bool isAscending = true,
            int pageSize = 10, int pageNumber = 1
            )
        {
            var table = base.GetAllIgnoreQueryFilters(filterOn, filterQuery, sortBy, isAscending, pageSize, pageNumber);


            table = Table.Where(b => table.Select(x => x.Id).Contains(b.Id))
                    .Include(b => b.Books)
                    .Include(b => b.BookBorrowings)
                    .ToList();

            return Table;
        }

        public override async Task<Borrowing> FindAsync(int id)
        => await Table
            .Include(b => b.Books)
            .Include(b => b.BookBorrowings)
            .FirstOrDefaultAsync(x => x.Id == id);

       
    }
}
