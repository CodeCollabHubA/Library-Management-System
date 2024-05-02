
namespace Library.Api.Middlewares
{

    public class RateLimitMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IMemoryCache _cache;

        public RateLimitMiddleware(RequestDelegate next, IMemoryCache cache)
        {
            _next = next;
            _cache = cache;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var ipAddress = context.Connection.RemoteIpAddress.ToString();
            var cacheKey = $"{ipAddress}";

            if (!_cache.TryGetValue(cacheKey, out RateLimit rateLimit))
            {
                rateLimit = new RateLimit
                {
                    LastRequest = DateTime.UtcNow,
                    Requests = 0
                };

                _cache.Set(cacheKey, rateLimit, TimeSpan.FromMinutes(1));
            }

            var timeSinceLastRequest = DateTime.UtcNow - rateLimit.LastRequest;

            if (timeSinceLastRequest.TotalMinutes >= 1) 
            {
                rateLimit.Requests = 0;
                rateLimit.LastRequest = DateTime.UtcNow;
                _cache.Set(cacheKey, rateLimit, TimeSpan.FromMinutes(1)); 
            }

            if (rateLimit.Requests >= 200) 
            {
                throw new customWebExceptions.RateLimitExceededException("Rate limit exceeded, please try again later");
                
            }

            rateLimit.Requests++;
            _cache.Set(cacheKey, rateLimit, TimeSpan.FromMinutes(1)); 

            await _next(context);
        }
    }

    public class RateLimit
    {
        public DateTime LastRequest { get; set; }
        public int Requests { get; set; }
    }

}
