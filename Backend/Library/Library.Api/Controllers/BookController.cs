

using Library.Api.Filters.Action;
using Library.Dal.Exceptions;
using Library.Services.DataServices.Exceptions.Book;

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
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [SwaggerResponse(201, "The execution was successful")]
        [SwaggerResponse(400, "The request was invalid")]
        [SwaggerResponse(401, "Unauthorized access attempted")]
        [SwaggerResponse(403, "Forbidden access attempted")]
        [SwaggerResponse(500, "An internal server error has occurred")]
        //[ApiVersion("0.1-Beta")]
        [HttpPost]
        [ValidateImageUpload("entity")]
        public async override Task<ActionResult<BookResponseDTO>> AddOneAsync([FromForm] BookCreateRequestDTO entity)
        {


            if (!ModelState.IsValid)
            {
                Dictionary<string, string[]> errors = ModelState.ToDictionary(
                     x => x.Key,
                     x => x.Value.Errors.Select(y => y.ErrorMessage).ToArray());

                throw new customWebExceptions.ValidationException(errors);
            }


            Book domainEntity = _mapper.Map<Book>(entity);

            try
            {

                domainEntity = await _bookDataService.AddAsync(domainEntity);
            }
            catch (UnknownDatabaseException ex)
            {
                throw new customWebExceptions.WebException(ex.Message)
                {
                    Code = "DatabaseError"
                };
            }



            return CreatedAtAction(nameof(GetOneAsync), new { id = _mapper.Map<BookResponseDTO>(domainEntity).Id }, _mapper.Map<BookResponseDTO>(domainEntity));
        }



        /// <summary>
        /// Updates a single record
        /// </summary>
        /// <param name="id">Primary key of the record to update</param>
        /// <param name="entity">Entity to update</param>
        /// <returns>Updated record</returns>
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [SwaggerResponse(200, "The execution was successful")]
        [SwaggerResponse(400, "The request was invalid")]
        [SwaggerResponse(401, "Unauthorized access attempted")]
        [SwaggerResponse(403, "Forbidden access attempted")]
        [SwaggerResponse(404, "The requested resource was not found")]
        [SwaggerResponse(500, "An internal server error has occurred")]
        //[ApiVersion("0.1-Beta")]
        [HttpPut("{id}")]
        public async override Task<ActionResult<BookResponseDTO>> UpdateOneAsync(int id, BookUpdateRequestDTO editedBookDto)
        {
            if (!ModelState.IsValid)
            {

                Dictionary<string, string[]> errors = ModelState.ToDictionary(
                    x => x.Key,
                    x => x.Value.Errors.Select(y => y.ErrorMessage).ToArray());

                throw new customWebExceptions.ValidationException(errors);
            }

            if (id != editedBookDto.Id)
            {
                _logger.LogAppWarning("Id in route and body do not match");
                throw new ArgumentException("Id in route and body do not match", nameof(id));
            }

            Book editedBook;
            try
            {
                editedBook = await _bookDataService.UpdateBookAndItsPublishersAndAuthorsAsync(editedBookDto);
            }
            catch (BookNotFoundException ex)
            {
                throw new customWebExceptions.NotFoundException(ex.Message)
                {
                    Code = "BookNotFound"
                };
            }
            catch (BookUpdateConflictException ex)
            {
                throw new customWebExceptions.ConflictException(ex.Message)
                {
                    Code = "BookUpdateConflict"
                };
            }
            catch (DbUpdateConcurrencyException ex)
            {
                throw new customWebExceptions.WebException(ex.Message)
                {
                    Code = "ConcurrencyError"
                };

            }
            catch (UnknownDatabaseException ex)
            {
                throw new customWebExceptions.WebException(ex.Message)
                {
                    Code = "DatabaseError"
                };
            }



            return Ok(_mapper.Map<BookResponseDTO>(editedBook));
        }




    }
}
