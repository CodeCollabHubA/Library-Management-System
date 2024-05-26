

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
        /// Gets all records with optional filtering, sorting, and pagination.
        /// </summary>
        /// <param name="filterOn">The property to filter records on. Supports filtering by various formats:.  
        /// - Nested property filtering: Use syntax => {Property.NestedProperty}.  
        /// - Boolean property filtering: Exact value: true.  
        /// - String property filtering: Contains: "value".  
        /// - Date Time property filtering:.  
        ///     * Exact date: =2022-01-01.  
        ///     * Date greater than or equal to: &gt;=2022-01-01.  
        ///     * Date less than or equal to: &lt;=2022-01-01.  
        ///     * Dates between two dates: 2022-01-01~2022-01-02.  
        /// - Numeric property filtering:.  
        ///     * Exact value: =42.  
        ///     * Greater than or equal to: &gt;=100.  
        ///     * Less than or equal to: &lt;=50.  
        ///     * Range between two values: 10~20.  
        /// </param>
        /// <param name="filterQuery">The query string for filtering based on the specified property.</param>
        /// <param name="sortBy">The property to sort records by.</param>
        /// <param name="isAscending">Specifies the sort order (ascending or descending).</param>
        /// <param name="pageSize">The number of records to return per page (default is 10).</param>
        /// <param name="pageNumber">The page number to retrieve (default is 1).</param>
        /// <remarks>
        /// Supports various filtering formats, including nested properties, boolean values, string matching, date comparisons, and numeric comparisons.
        /// </remarks>
        /// <returns>All records matching the specified criteria.</returns>
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
        /// Initiate a borrowing request for one or more books.
        /// </summary>
        /// <param name="userBorrowingRequest">The borrowing request containing the IDs of the books to be borrowed.</param>
        /// <returns>
        /// Either:
        /// - 201 (Created): The borrowing request was successfully created, and pending borrowing records were generated for the requested books.
        /// - 207 (Multi-Status): Some books were successfully requested for borrowing, while others encountered errors.
        /// - 400 (Bad Request): The request was invalid. Check the response body for details on the encountered errors.
        /// </returns>
        /// <remarks>
        /// This endpoint allows a user to initiate a borrowing request for one or more books by providing their IDs in the request payload.
        /// The response will indicate the outcome of the borrowing request:
        /// - If all requested books were successfully processed, a 201 (Created) status code will be returned along with the details of the pending borrowing records.
        /// - If some books were processed successfully while others encountered errors (e.g., due to unavailable or invalid book IDs), a 207 (Multi-Status) status code will be returned.
        /// - If the request payload was invalid or incomplete, a 400 (Bad Request) status code will be returned with details about the encountered errors.
        /// </remarks>
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status207MultiStatus)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [SwaggerResponse(201, "The borrowing request was successfully created")]
        [SwaggerResponse(207, "Some books were not requested successfully")]
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
        /// <param name="borrowingStatusUpdateRequest">The request containing the action to perform and the borrowing IDs to update.</param>
        /// <returns>
        /// Either:
        /// - 200 (OK): The borrowing actions were successfully performed, and the borrowing records have been updated.
        /// - 207 (Multi-Status): Some borrowing actions were successful, while others encountered errors. Check the response body for details.
        /// - 400 (Bad Request): The request was invalid. Check the response body for details on the encountered errors.
        /// </returns>
        /// <remarks>
        /// This endpoint allows performing various actions on one or more borrowing records:
        /// - Before approval/rejection by an admin:
        ///   - Users can "Cancel" their borrowing requests.
        ///   - Admins can "Approve" or "Reject" pending borrowing requests initiated by users.
        /// - After approval/rejection:
        ///   - Users can "Confirm" that they received the requested book.
        ///   - Admins can still "Reject" the request at this stage.
        /// - After the book is borrowed (user confirmed receipt):
        ///   - Admins can "Return" the book.
        /// </remarks>
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





