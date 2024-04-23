



namespace Library.Services.DataServices.Interfaces
{
    public interface IBookDataService: IDataServiceBase<Book>
    {
        Task<Book> UpdateBookAndItsPublishersAndAuthorsAsync(Book editedBook, bool persist = true);

    }
}
