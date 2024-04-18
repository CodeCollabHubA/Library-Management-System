


using Azure.Core;
using Microsoft.AspNetCore.Http;
using static System.Net.Mime.MediaTypeNames;


namespace Library.Dal.Repos
{
    public class BookRepo : BaseRepo<Book>, IBookRepo
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public BookRepo(ApplicationDbContext context, 
            IHttpContextAccessor httpContextAccessor
            ) : base(context)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public override async Task<int> AddAsync(Book entity, bool persist = true)
        {
            if(entity.Image != null)
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


    }
}
