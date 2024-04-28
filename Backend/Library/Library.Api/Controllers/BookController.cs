



using Library.Api.Filters.Action;

namespace Library.Api.Controllers
{
    public class BookController : BaseCrudController<Book, BookController, BookCreateRequestDTO, BookUpdateRequestDTO, BookResponseDTO>
    {

        private readonly IBookDataService _bookDataService;

        public BookController(IAppLogging<BookController> logger, IBookRepo mainRepo, IBookDataService bookDataService, IMapper mapper) : base(logger, mainRepo, mapper)
        {

            _bookDataService = bookDataService;
        }

        /// <summary>
        /// Adds a single record
        /// </summary>
        /// <returns>Added record</returns>
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [SwaggerResponse(201, "The execution was successful")]
        [SwaggerResponse(400, "The request was invalid")]
        [SwaggerResponse(401, "Unauthorized access attempted")]
        //[ApiVersion("0.1-Beta")]
        [HttpPost]
        [ValidateImageUpload("entity")]
        public async override Task<ActionResult<BookResponseDTO>> AddOneAsync([FromForm] BookCreateRequestDTO entity)
        {

            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }

            Book domainEntity;
            try
            {
                domainEntity = _mapper.Map<Book>(entity);
                domainEntity = await _bookDataService.AddAsync(domainEntity);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }


            return CreatedAtAction(nameof(GetOneAsync), new { id = _mapper.Map<BookResponseDTO>(domainEntity).Id }, _mapper.Map<BookResponseDTO>(domainEntity));
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
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [SwaggerResponse(200, "The execution was successful")]
        [SwaggerResponse(400, "The request was invalid")]
        [SwaggerResponse(401, "Unauthorized access attempted")]
        //[ApiVersion("0.1-Beta")]
        [HttpPut("{id}")]
        public async override Task<ActionResult<BookResponseDTO>> UpdateOneAsync(int id, BookUpdateRequestDTO editedBookDto)
        {
            if (id != editedBookDto.Id)
            {
                _logger.LogAppWarning("Id in route and body do not match");
                throw new ArgumentException("Id in route and body do not match", nameof(id));
            }

            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }


            Book editedBook;


            try
            {

               editedBook =  await _bookDataService.UpdateBookAndItsPublishersAndAuthorsAsync(editedBookDto);
            }

            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return Ok(_mapper.Map<BookResponseDTO>(editedBook));
        }


      
    
    }
}
