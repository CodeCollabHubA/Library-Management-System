


using Library.Models.Entities;

namespace Library.Api.Controllers
{
    public class BookController : BaseCrudController<Book, BookCreateRequestDTO, BookUpdateRequestDTO, BookResponseDTO, BookController>
    {
        private readonly IAuthorRepo _authorRepo;
        private readonly IPublisherRepo _publisherRepo;

        public BookController(IAppLogging<BookController> logger, IBookRepo mainRepo, IAuthorRepo authorRepo, IPublisherRepo publisherRepo, IMapper mapper) : base(logger, mainRepo, mapper)
        {
            _authorRepo = authorRepo;
            _publisherRepo = publisherRepo;
        }


        /// <summary>
        /// Updates a single record
        /// </summary>
        /// <remarks>
        /// Sample body:
        /// <pre>
        /// {
        ///   "Id": 1,
        ///   "TimeStamp": "AAAAAAAAB+E="
        ///   "MakeId": 1,
        ///   "Color": "Black",
        ///   "PetName": "Zippy",
        ///   "MakeColor": "VW (Black)",
        /// }
        /// </pre>
        /// </remarks>
        /// <param name="id">Primary key of the record to update</param>
        /// <param name="entity">Entity to update</param>
        /// <returns>Single record</returns>
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [SwaggerResponse(200, "The execution was successful")]
        [SwaggerResponse(400, "The request was invalid")]
        [SwaggerResponse(401, "Unauthorized access attempted")]
        //[ApiVersion("0.1-Beta")]
        [HttpPut("{id}")]
        public async override Task<ActionResult<BookResponseDTO>> UpdateOneAsync(int id, BookUpdateRequestDTO editedBookDto)
        {
            if (id != editedBookDto.Id)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }


            Book editedBook;


            try
            {

                // Map all but Authors and Publishers
                editedBook = _mapper.Map<Book>(editedBookDto);

                await _mainRepo.UpdateAsync(editedBook);
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(_mapper.Map<BookResponseDTO>(editedBook));
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
        public async override Task<ActionResult<BookResponseDTO>> AddOneAsync([FromForm] BookCreateRequestDTO entity)
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



        private void ValidateImageUpload(BookCreateRequestDTO entity)
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
