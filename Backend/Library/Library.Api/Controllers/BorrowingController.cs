

using Library.Models.DTO.Borrowing;

namespace Library.Api.Controllers
{
    public class BorrowingController : BaseCrudController<Borrowing, BorrowingController, BorrowingDTO, BorrowingDTO, BorrowingResponseDTO>
    {
        private readonly IBorrowingDataService _borrwingDataService;

        public BorrowingController(IAppLogging<BorrowingController> logger, IBorrowingRepo mainRepo, IBorrowingDataService borrowingDataService, IMapper mapper) : base(logger, mainRepo, mapper)
        {
            _borrwingDataService = borrowingDataService;
        }



        // Unused endpoints
        [ApiExplorerSettings(IgnoreApi = true)]
        public async override Task<ActionResult<BorrowingResponseDTO>> UpdateOneAsync(int id, BorrowingDTO entity)
        {
            return NoContent();
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        public async override Task<ActionResult<BorrowingResponseDTO>> AddOneAsync(BorrowingDTO entity)
        {
            return NoContent();

        }



        /// <summary>
        /// Borrow book or list of books
        /// </summary>
        /// <returns>Added borrowing record</returns>
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
        [HttpPost("borrow-book")]
        public async Task<ActionResult<BorrowingResponseDTO>> BorrowBookAsync(BorrowingCreateRequestDTO entity)

        {


            if (!ModelState.IsValid)
            {
                Dictionary<string, string[]> errors = ModelState.ToDictionary(
                     x => x.Key,
                     x => x.Value.Errors.Select(y => y.ErrorMessage).ToArray());

                throw new customWebExceptions.ValidationException(errors);
            }



            Borrowing domainEntity = await _borrwingDataService.BorrowBookAsync(entity);


            return CreatedAtAction(nameof(GetOneAsync), new { id = _mapper.Map<BorrowingResponseDTO>(domainEntity).Id }, _mapper.Map<BorrowingResponseDTO>(domainEntity));


        }





        /// <summary>
        /// Return a list of borrowed book
        /// </summary>
        /// <param name="borrowingId">Primary key of borrowing record</param>
        /// <param name="borrowingReturnRequestDTO">Contain the userId and books ids for the books to return</param>
        /// <returns>Single record</returns>
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
        [HttpPut("return-book/{borrowingId}")]
        public async Task<ActionResult<BorrowingResponseDTO>> ReturnBorrowedBookAsync(int borrowingId, BorrowedBookReturnRequestDTO entity)
        {
            if (!ModelState.IsValid)
            {

                Dictionary<string, string[]> errors = ModelState.ToDictionary(
                    x => x.Key,
                    x => x.Value.Errors.Select(y => y.ErrorMessage).ToArray());

                throw new customWebExceptions.ValidationException(errors);
            }

            if (borrowingId != entity.BorrwingId)
            {
                _logger.LogAppWarning("Id in route and body do not match");
                throw new ArgumentException("Id in route and body do not match", nameof(borrowingId));
            }


            Borrowing domainEntity = await _borrwingDataService.ReturnBorrowedBookAsync(entity);
            

            return Ok(_mapper.Map<BorrowingResponseDTO>(domainEntity));
        }

    }
}





