

using Library.Dal.Exceptions;
using Library.Services.DataServices.Exceptions.Borrowing;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

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


        /// <summary>
        /// Gets all records
        /// </summary>
        /// <returns>All records</returns>
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [SwaggerResponse(200, "The execution was successful")]
        [SwaggerResponse(401, "Unauthorized access attempted")]
        [SwaggerResponse(403, "Forbidden access attempted")]
        [SwaggerResponse(404, "The requested resource was not found")]
        [SwaggerResponse(500, "An internal server error has occurred")]
        //[ApiVersion("0.1-Beta")]
        [HttpGet]
        [Authorize]
        public override async Task<ActionResult<IEnumerable<BorrowingResponseDTO>>> GetAll(
            [FromQuery] string? filterOn, [FromQuery] string? filterQuery, // Filtering
            [FromQuery] string? sortBy, [FromQuery] bool? isAscending,    // Sorting
            [FromQuery] int pageSize = 10, [FromQuery] int pageNumber = 1 // Pagination
            )
        {
            

            IEnumerable<Borrowing> entities;
            try
            {
                entities = await _borrwingDataService.GetAllAsync(
                    filterOn, filterQuery,
                    sortBy, isAscending ?? true,
                    pageSize, pageNumber
                    );
            }
            catch (FormatException ex)
            {
                throw new customWebExceptions.ValidationException(ex.Message)
                {
                    Code = "BadFilterQueryFormat"
                };
            }
            catch (ArgumentException ex)
            {
                throw new customWebExceptions.ValidationException(ex.Message)
                {
                    Code = "BadFilterOnArgument"
                };
            }


            if (entities == null)
            {
                throw new customWebExceptions.NotFoundException("The requested resource was not found");
            }


            var entityResponseDto = _mapper.Map<IEnumerable<BorrowingResponseDTO>>(entities);
            return Ok(entityResponseDto);
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
        /// Initiate a borrowing request for one or more books
        /// </summary>
        /// <returns>
        /// Either:
        /// 1. 201 with the successfully created pending borrowing records
        /// 2. 400 with the errors for the unsuccessful requests
        /// 3. 207 with the some successfully created pending borrowing records and some errors for the unsuccessful requests
        /// </returns>
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status207MultiStatus)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [SwaggerResponse(201, "The resources has been created successfully")]
        [SwaggerResponse(207, "Some books has not been requested successfully")]
        [SwaggerResponse(400, "The request was invalid")]
        [SwaggerResponse(401, "Unauthorized access attempted")]
        [SwaggerResponse(403, "Forbidden access attempted")]
        [SwaggerResponse(500, "An internal server error has occurred")]
        //[ApiVersion("0.1-Beta")]
        [HttpPost("initiate")]
        [Authorize]
        public async Task<ActionResult<PendingBorrowingResponseDTO>> InitiateBorrowingAsync(PendingBorrowingRequestDTO userBorrowingRequest)
        {

            if (!ModelState.IsValid)
            {
                Dictionary<string, string[]> errors = ModelState.ToDictionary(
                     x => x.Key,
                     x => x.Value.Errors.Select(y => y.ErrorMessage).ToArray());

                throw new customWebExceptions.ValidationException(errors);
            }


            // Try borrowing the books
            PendingBorrowingResponseDTO borrowBooksResponseDto;
            try
            {

                borrowBooksResponseDto = await _borrwingDataService.CreatePendingBorrowingAsync(userBorrowingRequest);
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

            // If all books has been borrowed return 201 Created
            if (!borrowBooksResponseDto.Errors.Any())
            {
                return CreatedAtAction(nameof(GetOneAsync), new { id = borrowBooksResponseDto.Success[0].Id }, borrowBooksResponseDto);
            }
            // If no book has been borrowed return 400 Bad Request
            if (!borrowBooksResponseDto.Success.Any())
            {
                return BadRequest(borrowBooksResponseDto);
            }


            // Else
            // Create 207 Multi-Status response
            // and add location header with the url of the first newly created resource
            HttpContext.Response.Headers.Add("Location", $"{Request.Scheme}://{Request.Host}/{nameof(GetOneAsync)}/{borrowBooksResponseDto.Success[0].Id}");
            var response = new ObjectResult(borrowBooksResponseDto)
            {
                StatusCode = 207
            };

            return response;




        }





        /// <summary>
        /// Handle one or more borrowings by performing actions like Approve, Reject, Cancel, Confirm, or Return.
        /// </summary>
        /// <param name="borrowingStatusUpdateRequest">Contain the action to perform and the borrowing ids for the borrowings to update perform an actions on them</param>
        /// <returns>
        /// Either:
        /// 1. A 200 OK response with the updated borrowing records
        /// 2. A 400 Bad Request response with the errors
        /// 3. A 207 Multi-Status response with the updated borrowing records and some errors for the reason for the unsuccessful actions
        /// </returns>
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status207MultiStatus)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [SwaggerResponse(200, "The execution was successful")]
        [SwaggerResponse(207, "Some borrowings has not been updated successfully")]
        [SwaggerResponse(400, "The request was invalid")]
        [SwaggerResponse(401, "Unauthorized access attempted")]
        [SwaggerResponse(403, "Forbidden access attempted")]
        [SwaggerResponse(404, "The requested resource was not found")]
        [SwaggerResponse(500, "An internal server error has occurred")]
        //[ApiVersion("0.1-Beta")]
        [Authorize]
        [HttpPut("act-on-borrowing-status")]
        public async Task<ActionResult<BorrowingStatusUpdateResponseDTO>> ActOnBorrowingStatusAsync(BorrowingStatusUpdateRequestDTO borrowingStatusUpdateRequest)
        {
            if (!ModelState.IsValid)
            {

                Dictionary<string, string[]> errors = ModelState.ToDictionary(
                    x => x.Key,
                    x => x.Value.Errors.Select(y => y.ErrorMessage).ToArray());

                throw new customWebExceptions.ValidationException(errors);
            }
            
            // Try updating the status of the borrowings
            BorrowingStatusUpdateResponseDTO borrowingStatusUpdateResponse;
            try
            {

                borrowingStatusUpdateResponse = await _borrwingDataService.UpdateBorrowingStatusAsync(borrowingStatusUpdateRequest);
            }

            catch (BorrowingUserNotFoundException ex)
            {
                throw new customWebExceptions.NotFoundException(ex.Message)
                {
                    Code = "BorrowingUserNotFound"
                };
            }
            catch (BorrowingActionForbiddenException ex)
            {
                throw new customWebExceptions.ForbiddenException(ex.Message)
                {
                    Code = "BorrowingActionForbidden"
                };
            }
            catch (UnknownDatabaseException ex)
            {
                throw new customWebExceptions.WebException(ex.Message)
                {
                    Code = "DatabaseError"
                };
            }

            // If all actions has been performed successfully, return 200 OK
            if (!borrowingStatusUpdateResponse.Errors.Any())
            {
                return Ok(borrowingStatusUpdateResponse);
            }
            // If all actions has not been performed successfully, return 400 Bad Request
            if (!borrowingStatusUpdateResponse.Success.Any())
            {
                return BadRequest(borrowingStatusUpdateResponse);
            }

            // Else
            // Create 207 Multi-Status response
            var response = new ObjectResult(borrowingStatusUpdateResponse)
            {
                StatusCode = 207
            };

            return response;
        }

    }
}





