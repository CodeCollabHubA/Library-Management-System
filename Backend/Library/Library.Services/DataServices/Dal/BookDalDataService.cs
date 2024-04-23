

using AutoMapper;
using Microsoft.AspNetCore.Http;

namespace Library.Services.DataServices.Dal
{
    public class BookDalDataService : DalDataServiceBase<Book, BookDalDataService>, IBookDataService

    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMapper _mapper;
        private readonly IAuthorRepo _authorRepo;
        private readonly IPublisherRepo _publisherRepo;

        public BookDalDataService(
            IBookRepo mainRepo,
            IAuthorRepo authorRepo,
            IPublisherRepo publisherRepo,
            IAppLogging<BookDalDataService> logger,
            IHttpContextAccessor httpContextAccessor,
            IMapper mapper
            ) : base(mainRepo, logger)
        {
            _httpContextAccessor = httpContextAccessor;
            _mapper = mapper;
            _authorRepo = authorRepo;
            _publisherRepo = publisherRepo;

        }



        public async Task<Book> UpdateBookAndItsPublishersAndAuthorsAsync(Book editedBook, bool persist = true)
        {

            // Look if the book exists
            Book existingBook = await _mainRepo.FindAsync(editedBook.Id);

            bool timestampValid = (existingBook.TimeStamp).SequenceEqual(editedBook.TimeStamp);

            if (!timestampValid)
            {
                throw new Exception("Book has already been deleted or modified, try again using updated book data");
            }
            if (existingBook == null)
            {
                throw new Exception("Book not Found");
            }

            // Map all but Authors and Publishers
            _mapper.Map(editedBook, existingBook);

            // Map Authors:
            await AddAuthorToBook(editedBook, existingBook);

            DeleteAuthorFromBook(editedBook, existingBook);

            // Map Publishers:
            await AddPublisherToBook(editedBook, existingBook);
            DeletePublisherFromBook(editedBook, existingBook);



            if (persist)
            {
                await _mainRepo.SaveChangesAsync();
            }

            // Map the new book to the editBook to return it back in the response later
            _mapper.Map(existingBook, editedBook);

            return editedBook;
        }

        public override async Task<Book> AddAsync(Book entity, bool persist = true)
        {

            if (entity.Image != null)
            {
                string imageName = Path.GetFileName(entity.Image.FileName);

               
                var localImagePath = Path.Combine(Directory.GetCurrentDirectory(), "StaticFiles",
                    "Images", "Books",
                    $"{imageName}");

                // Upload the image to the local StaticFiles Folder
                using var stream = new FileStream(localImagePath, FileMode.Create);
                await entity.Image.CopyToAsync(stream);

                var imageUrl = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}{_httpContextAccessor.HttpContext.Request.PathBase}/StaticFiles/Images/Books/{imageName}";

                entity.ImagePath = localImagePath;
                entity.ImageURL = imageUrl;

            }
            await _mainRepo.AddAsync(entity, persist);
            return entity;
        }








        // Utils

        private static void DeletePublisherFromBook(Book editedBook, Book existingBook)
        {
            // delete publisher from the list of existing book publishers
            var existingBookPublishers = existingBook.Publishers.ToList();
            for (int Id = existingBookPublishers.Count - 1; Id >= 0; Id--)
            {
                Publisher publisher = existingBookPublishers[Id];
                if (!editedBook.Publishers.Any(a => a.Id == publisher.Id))
                {
                    existingBook.Publishers.Remove(publisher);
                }
            }
        }

        private async Task AddPublisherToBook(Book editedBook, Book existingBook)
        {
            // Add new publisher to the list of existing book publishers 
            foreach (Publisher publisher in editedBook.Publishers)
            {
                // Add Publishr: check if author exists and only add it if it does not exist
                // in the existing book publishers
                if (!existingBook.Publishers.Any(a => a.Id == publisher.Id))
                {
                    if (publisher.Id != null)
                    {
                        Publisher newPublisher = await _publisherRepo.FindAsync(publisher.Id);
                        if (newPublisher == null)
                        {
                            throw new Exception("Can not a add publisher that does not exist in the database");
                        }
                        // Add the publisher
                        existingBook.Publishers.Add(newPublisher);
                    }
                }
            }
        }

        private static void DeleteAuthorFromBook(Book editedBook, Book existingBook)
        {
            // delete author from the list of existing book authors
            var existingBookAuthors = existingBook.Authors.ToList();
            for (int Id = existingBookAuthors.Count - 1; Id >= 0; Id--)
            {
                Author author = existingBookAuthors[Id];
                if (!editedBook.Authors.Any(a => a.Id == author.Id))
                {
                    existingBook.Authors.Remove(author);

                }

            }
        }

        private async Task AddAuthorToBook(Book editedBook, Book existingBook)
        {
            // Add new author to the list of existing book authors 
            foreach (Author author in editedBook.Authors)
            {
                // Add Author: check if author exists and only add it if it does not exist
                // in the existing book authors
                if (!existingBook.Authors.Any(a => a.Id == author.Id))
                {
                    if (author.Id != null)
                    {
                        Author newAuthor = await _authorRepo.FindAsync(author.Id);
                        if (newAuthor == null)
                        {
                            throw new Exception("Can not add an author that does not exist in the database");
                        }

                        // Add the author
                        existingBook.Authors.Add(newAuthor);

                    }
                }
            }
        }





    }
}
