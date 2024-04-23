


using AutoMapper;
using Azure.Core;
using Microsoft.AspNetCore.Http;
using System.Linq;
using static System.Net.Mime.MediaTypeNames;


namespace Library.Dal.Repos
{
    public class BookRepo : BaseRepo<Book>, IBookRepo
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMapper _mapper;

        public BookRepo(ApplicationDbContext context,
            IHttpContextAccessor httpContextAccessor,
            IMapper mapper
            ) : base(context)
        {
            _httpContextAccessor = httpContextAccessor;
            _mapper = mapper;
        }



        public virtual IEnumerable<Book> GetAllIgnoreQueryFilters(
            string? filterOn = null, string? filterQuery = null,
            string? sortBy = null, bool isAscending = true,
            int pageSize = 10, int pageNumber = 1
            )
        {

            var table = Table.
                IgnoreQueryFilters().AsQueryable();

            // Filtering
            if (!String.IsNullOrWhiteSpace(filterOn) && !String.IsNullOrWhiteSpace(filterQuery))
            {
                // Get the PropertyInfo object for the property to filter on using reflection
                var propertyInfo = typeof(Book).GetProperty(filterOn, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
                if (propertyInfo != null)
                {
                    // Construct the predicate dynamically
                    var predicate = LinqHelpers.BuildWherePredicateWithContains<Book>(propertyInfo, filterQuery);

                    // Apply the predicate to filter the query
                    table = table.Where(predicate);
                }
            }


            // Sorting
            if (!String.IsNullOrWhiteSpace(sortBy))
            {
                var propertyInfo = typeof(Book).GetProperty(sortBy, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);

                if (propertyInfo != null)
                {

                    var predicate = LinqHelpers.BuildOrderByPredicate<Book>(propertyInfo);

                    table = isAscending ? table.OrderBy(predicate) : table.OrderByDescending(predicate);
                }


            }

            // Pagination
            int toSkip = (pageNumber - 1) * pageSize;
            table = table.Skip(toSkip).Take(pageSize);

            // include the authors and publishers names
            table = table
                    .Include(b => b.Authors)
                    .Include(b => b.Publishers);


            return table
                .ToList();
        }



        public override async Task<Book> FindAsync(int id)
           => await Table
                    .Include(b => b.Authors)
                    .Include(b => b.Publishers)
                    .FirstOrDefaultAsync(x => x.Id == id);



        public override async Task<int> AddAsync(Book entity, bool persist = true)
        {
            if (entity.Image != null)
            {
                string imageName = Path.GetFileName(entity.Image.FileName);
                string imageExtension = Path.GetExtension(entity.Image.FileName);
                //var localFilePath = Path.Combine(webHostEnvironment.ContentRootPath, "Images",
                //$"{image.FileName}{image.FileExtension}");
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

            await Table.AddAsync(entity);
            return persist ? await SaveChangesAsync() : 0;
        }



        public override async Task<int> UpdateAsync(Book editedBook, bool persist = true)
        {

            // Look if the book exists
            Book existingBook = await Table
                    .Include(b => b.Authors)
                    .Include(b => b.Publishers)
                    .FirstOrDefaultAsync(x => x.Id == editedBook.Id);

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


            int rowsEffected = persist ? await SaveChangesAsync() : 0;
            Context.ChangeTracker.DetectChanges();
            Console.WriteLine(Context.ChangeTracker.DebugView.LongView);
            // Map the new book to the editBook to return it back in the response later
            _mapper.Map(existingBook, editedBook);
            

            return rowsEffected;
        }

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
                        Publisher newPublisher = await Context.Publishers.FirstOrDefaultAsync(x => x.Id == publisher.Id);
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
                        Author newAuthor = await Context.Authors.FirstOrDefaultAsync(x => x.Id == author.Id);
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
