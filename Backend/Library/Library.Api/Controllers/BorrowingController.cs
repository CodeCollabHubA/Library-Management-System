

using Library.Dal.Exceptions;
using Library.Models.DTO.Borrowing;
using Library.Services.DataServices.Exceptions.Borrowing;
using Library.Services.DataServices.Exceptions.User;

namespace Library.Api.Controllers
{
    public class BorrowingController : BaseCrudController<Borrowing, BorrowingController, BorrowingDTO, BorrowingDTO, BorrowingResponseDTO>
    {
        private readonly IBorrowingDataService _borrwingDataService;

        public BorrowingController(
            IAppLogging<BorrowingController> logger,
            IBorrowingRepo mainRepo,
            IBorrowingDataService borrowingDataService,
            IMapper mapper
            ) : base(logger, mainRepo, mapper)
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
        [ProducesResponseType(StatusCodes.Status207MultiStatus)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [SwaggerResponse(201, "The resources has been created successfully")]
        [SwaggerResponse(207, "Some books has not been borrowed successfully")]
        [SwaggerResponse(400, "The request was invalid")]
        [SwaggerResponse(401, "Unauthorized access attempted")]
        [SwaggerResponse(403, "Forbidden access attempted")]
        [SwaggerResponse(500, "An internal server error has occurred")]
        //[ApiVersion("0.1-Beta")]
        [HttpPost("borrow-book")]
        public async Task<ActionResult<BorrowBooksResponseDTO>> BorrowBookAsync(BorrowBooksRequestDTO entity)

        {


            if (!ModelState.IsValid)
            {
                Dictionary<string, string[]> errors = ModelState.ToDictionary(
                     x => x.Key,
                     x => x.Value.Errors.Select(y => y.ErrorMessage).ToArray());

                throw new customWebExceptions.ValidationException(errors);
            }



            BorrowBooksResponseDTO borrowBooksResponseDto;
            try
            {

                borrowBooksResponseDto = await _borrwingDataService.BorrowBooksAsync(entity);
            }

            catch (BorrowingUserNotFoundException ex)
            {
                throw new customWebExceptions.NotFoundException(ex.Message)
                {
                    Code = "BorrowingUserNotFound"
                };
            }
            catch (UnknownDatabaseException ex)
            {
                throw new customWebExceptions.WebException(ex.Message)
                {
                    Code = "DatabaseError"
                };
            }

            if (!borrowBooksResponseDto.Errors.Any())
            {
                return CreatedAtAction(nameof(GetOneAsync), new { id = borrowBooksResponseDto.Success[0].Id }, borrowBooksResponseDto);
            }
            if (!borrowBooksResponseDto.Success.Any())
            {
                return BadRequest(borrowBooksResponseDto);
            }


            // Else
            // Add location header with the url of the first newly created resource
            HttpContext.Response.Headers.Add("Location", $"{Request.Scheme}://{Request.Host}/{nameof(GetOneAsync)}/{borrowBooksResponseDto.Success[0].Id}");
            var response = new ObjectResult(borrowBooksResponseDto)
            {
                StatusCode = 207
            };

            return response;




        }





        /// <summary>
        /// Return a list of borrowed book
        /// </summary>
        /// <param name="borrowingReturnRequestDTO">Contain the userId and books ids for the books to return</param>
        /// <returns>Single record</returns>
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status207MultiStatus)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [SwaggerResponse(200, "The execution was successful")]
        [SwaggerResponse(207, "Some books has not been returned successfully")]
        [SwaggerResponse(400, "The request was invalid")]
        [SwaggerResponse(401, "Unauthorized access attempted")]
        [SwaggerResponse(403, "Forbidden access attempted")]
        [SwaggerResponse(404, "The requested resource was not found")]
        [SwaggerResponse(500, "An internal server error has occurred")]
        //[ApiVersion("0.1-Beta")]
        [HttpPut("return-book")]
        public async Task<ActionResult<ReturnBooksResponseDTO>> ReturnBorrowedBookAsync(ReturnBooksRequestDTO entity)
        {
            if (!ModelState.IsValid)
            {

                Dictionary<string, string[]> errors = ModelState.ToDictionary(
                    x => x.Key,
                    x => x.Value.Errors.Select(y => y.ErrorMessage).ToArray());

                throw new customWebExceptions.ValidationException(errors);
            }


            ReturnBooksResponseDTO returnBooksResponseDTO;
            try
            {

                returnBooksResponseDTO = await _borrwingDataService.ReturnBooksAsync(entity);
            }

            catch (BorrowingUserNotFoundException ex)
            {
                throw new customWebExceptions.NotFoundException(ex.Message)
                {
                    Code = "BorrowingUserNotFound"
                };
            }
            catch (UnknownDatabaseException ex)
            {
                throw new customWebExceptions.WebException(ex.Message)
                {
                    Code = "DatabaseError"
                };
            }

            if (!returnBooksResponseDTO.Errors.Any())
            {
                return Ok(returnBooksResponseDTO);
            }
            if (!returnBooksResponseDTO.Success.Any())
            {
                return BadRequest(returnBooksResponseDTO);
            }


            // Else
            var response = new ObjectResult(returnBooksResponseDTO)
            {
                StatusCode = 207
            };

            return response;
        }

    }
}





