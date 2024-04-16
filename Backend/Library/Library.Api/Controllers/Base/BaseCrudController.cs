






using Microsoft.AspNetCore.Authorization;

namespace Library.Api.Controllers.Base
{
    [ApiController]
    [Route("api/[controller]")]
    //[Route("api/v{version:apiVersion}/[controller]")]
    public class BaseCrudController<TEntity, TDto, TController> : ControllerBase
        where TEntity : BaseEntity, new()
        where TDto : BaseDTO, new()
        where TController : class
    {
        protected readonly IBaseRepo<TEntity> MainRepo;
        protected readonly IAppLogging<TController> Logger;
        private readonly IMapper _mapper;


        protected BaseCrudController(IAppLogging<TController> logger, IBaseRepo<TEntity> mainRepo, IMapper mapper)
        {
            MainRepo = mainRepo;
            Logger = logger;
            _mapper = mapper;


        }

        /// <summary>
        /// Gets all records
        /// </summary>
        /// <returns>All records</returns>
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [SwaggerResponse(200, "The execution was successful")]
        [SwaggerResponse(400, "The request was invalid")]
        [SwaggerResponse(401, "Unauthorized access attempted")]
        //[ApiVersion("0.1-Beta")]
        [HttpGet]
        //[Authorize (Roles = "Admin")]
        public ActionResult<IEnumerable<TDto>> GetAll(
            [FromQuery] string? filterOn, [FromQuery] string? filterQuery, // Filtering
            [FromQuery] string? sortBy, [FromQuery] bool? isAscending,    // Sorting
            [FromQuery] int pageSize = 10, [FromQuery] int pageNumber = 1 // Pagination
            )
        {

            return Ok(_mapper.Map<IEnumerable<TDto>>(MainRepo.GetAllIgnoreQueryFilters(
                filterOn, filterQuery,
                sortBy, isAscending ?? true,
                pageSize, pageNumber
                )));
        }


        /// <summary>
        /// Gets a single record
        /// </summary>
        /// <param name="id">Primary key of the record</param>
        /// <returns>Single record</returns>
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [SwaggerResponse(200, "The execution was successful")]
        [SwaggerResponse(204, "No content")]
        [SwaggerResponse(400, "The request was invalid")]
        [SwaggerResponse(401, "Unauthorized access attempted")]
        //[ApiVersion("0.1-Beta")]
        [HttpGet("{id}")]
        public async Task<ActionResult<TDto>> GetOneAsync(int id)
        {
            var entity = await MainRepo.FindAsync(id);

            if (entity == null)
            {
                return NoContent();
            }
            return Ok(_mapper.Map<TDto>(entity));
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
        public async Task<ActionResult<TDto>> UpdateOneAsync(int id, TEntity entity)
        {
            if (id != entity.Id)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }

            try
            {
                await MainRepo.UpdateAsync(entity);
            }

            catch (Exception ex)
            {
                return BadRequest(ex);
            }

            return Ok(_mapper.Map<TDto>(entity));
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
        public async Task<ActionResult<TDto>> AddOneAsync(TEntity entity)
        {
            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }

            try
            {
                await MainRepo.AddAsync(entity);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

            return CreatedAtAction(nameof(GetOneAsync), new { id = _mapper.Map<TDto>(entity).Id }, entity);
        }




        /// <summary>
        /// Deletes a single record
        /// </summary>
        /// <remarks>
        /// Sample body:
        /// <pre>
        /// {
        ///   "Id": 1,
        ///   "TimeStamp": "AAAAAAAAB+E="
        /// }
        /// </pre>
        /// </remarks>
        /// <returns>Nothing</returns>
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [SwaggerResponse(200, "The execution was successful")]
        [SwaggerResponse(400, "The request was invalid")]
        [SwaggerResponse(401, "Unauthorized access attempted")]
        //[ApiVersion("0.1-Beta")]
        [HttpDelete("{id}")]
        public async virtual Task<ActionResult<TDto>> DeleteOneAsync(int id, TEntity entity)
        {
            if (id != entity.Id)
            {
                return BadRequest();
            }

            try
            {
                await MainRepo.DeleteAsync(entity);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.GetBaseException()?.Message);
            }

            return Ok();
        }

    }
}
