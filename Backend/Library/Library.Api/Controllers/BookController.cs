

using Azure.Core;

namespace Library.Api.Controllers
{
    public class BookController : BaseCrudController<Book, BookRequestDTO, BookResponseDTO, BookController>
    {
        public BookController(IAppLogging<BookController> logger, IBookRepo mainRepo, IMapper mapper) : base(logger, mainRepo, mapper)
        {
        }


        /// <summary>
        /// Adds a single record
        /// </summary>
        /// <returns>Added record</returns>
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [SwaggerResponse(201, "The execution was successful")]
        [SwaggerResponse(400, "The request was invalid")]
        [SwaggerResponse(401, "Unauthorized access attempted")]
        //[ApiVersion("0.1-Beta")]
        [HttpPost]
        public async override Task<ActionResult<BookResponseDTO>> AddOneAsync([FromForm] BookRequestDTO entity)
        {

            ValidateImageUpload(entity);

            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }





            Book domainEntity;
            try
            {
                domainEntity = _mapper.Map<Book>(entity);
                await _mainRepo.AddAsync(domainEntity);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }


            return CreatedAtAction(nameof(GetOneAsync), new { id = _mapper.Map<BookResponseDTO>(domainEntity).Id }, _mapper.Map<BookResponseDTO>(domainEntity));
        }



        private void ValidateImageUpload(BookRequestDTO entity)
        {
            var allowedExtensions = new string[] { ".jpg", ".jpeg", ".png" };
            if (entity.Image == null)
            {
                return;
            }
            if (!allowedExtensions.Contains(Path.GetExtension(entity.Image.FileName)))
            {
                ModelState.AddModelError("file", "Unsupported file extension");
            }

            if (entity.Image.Length > 10485760)
            {
                ModelState.AddModelError("file", "File size more than 10MB, please upload a smaller size file.");
            }
        }
    }
}
