



namespace Library.Services.DataServices.Interfaces
{
    public interface IBookDataService: IBaseDataService<Book>
    {
        Task<Book> UpdateBookAndItsPublishersAndAuthorsAsync(Book editedBook, bool persist = true);

    }
}
