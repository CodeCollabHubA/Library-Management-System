



namespace Library.Services.DataServices.Interfaces
{
    public interface IBookDataService: IBaseDataService<Book>
    {
        Task<Book> UpdateBookAndItsPublishersAndAuthorsAsync(BookUpdateRequestDTO editedBookDto, bool persist = true);

    }
}
