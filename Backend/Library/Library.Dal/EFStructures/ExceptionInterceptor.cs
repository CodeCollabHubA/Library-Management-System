
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace Library.Dal.EFStructures
{
    public class ExceptionInterceptor : SaveChangesInterceptor
    {
        public override InterceptionResult<int> SavingChanges(DbContextEventData eventData, InterceptionResult<int> result)
        {

            try
            {

                return base.SavingChanges(eventData, result);
            }
            catch
            {
                throw ;
            }
        }

        public override ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData, InterceptionResult<int> result, CancellationToken cancellationToken = default)
        {
            try
            {

                return base.SavingChangesAsync(eventData, result, cancellationToken);
            }
            catch
            {
                throw;
            }


        }
    }
}
