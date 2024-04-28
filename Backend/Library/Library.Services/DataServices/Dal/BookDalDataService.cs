

using AutoMapper;
using Microsoft.AspNetCore.Http;

namespace Library.Services.DataServices.Dal
{
    public class BookDalDataService : BaseDalDataService<Book, BookDalDataService>, IBookDataService

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



        public async Task<Book> UpdateBookAndItsPublishersAndAuthorsAsync(BookUpdateRequestDTO editedBookDto, bool persist = true)
        {



            // Look if the book exists
            Book existingBook = await _mainRepo.FindAsync(editedBookDto.Id);

            bool timestampValid = (existingBook.TimeStamp).SequenceEqual(editedBookDto.TimeStamp);

            if (!timestampValid)
            {
                _logger.LogAppWarning("Book has already been deleted or modified, try again using updated book data");
                throw new Exception("Book has already been deleted or modified, try again using updated book data");
            }
            if (existingBook == null)
            {
                _logger.LogAppWarning("Book not Found");
                throw new Exception("Book not Found");
            }


            // Map all but Authors and Publishers
            _mapper.Map(editedBookDto, existingBook);

            // Map Authors:
            await AddAuthorToBook(editedBookDto, existingBook);

            DeleteAuthorFromBook(editedBookDto, existingBook);

            // Map Publishers:
            await AddPublisherToBook(editedBookDto, existingBook);
            DeletePublisherFromBook(editedBookDto, existingBook);



            if (persist)
            {
                await _mainRepo.SaveChangesAsync();
            }

            

            return existingBook;
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

        private static void DeletePublisherFromBook(BookUpdateRequestDTO editedBookDto, Book existingBook)
        {
            // delete publisher from the list of existing book publishers
            var existingBookPublishers = existingBook.Publishers.ToList();

            for (int Id = existingBookPublishers.Count - 1; Id >= 0; Id--)
            {
                Publisher publisher = existingBookPublishers[Id];
                if (!editedBookDto.PublishersIds.Any(id => id == publisher.Id))
                {
                    existingBook.Publishers.Remove(publisher);
                }
            }
        }

        private async Task AddPublisherToBook(BookUpdateRequestDTO editedBookDto, Book existingBook)
        {
            // Add new publisher to the list of existing book publishers 
            foreach (int publisherId in editedBookDto.PublishersIds)
            {
                // Add Publishr: check if author exists and only add it if it does not exist
                // in the existing book publishers
                if (!existingBook.Publishers.Any(a => a.Id == publisherId))
                {
                    Publisher newPublisher = await _publisherRepo.FindAsync(publisherId);
                    if (newPublisher == null)
                    {
                        _logger.LogAppWarning("Can not a add publisher that does not exist in the database");
                        throw new Exception("Can not a add publisher that does not exist in the database");
                    }
                    // Add the publisher
                    existingBook.Publishers.Add(newPublisher);
                }
            }

        }

        private static void DeleteAuthorFromBook(BookUpdateRequestDTO editedBookDto, Book existingBook)
        {
            // delete author from the list of existing book authors
            var existingBookAuthors = existingBook.Authors.ToList();
            for (int Id = existingBookAuthors.Count - 1; Id >= 0; Id--)
            {
                Author author = existingBookAuthors[Id];
                if (!editedBookDto.AuthorsIds.Any(id => id == author.Id))
                {
                    existingBook.Authors.Remove(author);

                }

            }
        }

        private async Task AddAuthorToBook(BookUpdateRequestDTO editedBookDto, Book existingBook)
        {
            // Add new author to the list of existing book authors 
            foreach (int authorId in editedBookDto.AuthorsIds)
            {
                // Add Author: check if author exists and only add it if it does not exist
                // in the existing book authors
                if (!existingBook.Authors.Any(a => a.Id == authorId))
                {

                    Author newAuthor = await _authorRepo.FindAsync(authorId);
                    if (newAuthor == null)
                    {

                        _logger.LogAppWarning("Can not add an author that does not exist in the database");
                        throw new Exception("Can not add an author that does not exist in the database");
                    }

                    // Add the author
                    existingBook.Authors.Add(newAuthor);


                }
            }
        }





    }
}
