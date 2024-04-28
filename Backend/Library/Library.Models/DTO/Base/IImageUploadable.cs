using Microsoft.AspNetCore.Http;

namespace Library.Models.DTO.Base
{
    public interface IImageUploadable
    {

        IFormFile? Image { get; set; }
    }
}
