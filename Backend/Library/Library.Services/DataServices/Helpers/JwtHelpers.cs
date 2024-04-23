
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Library.Services.DataServices.Helpers
{
    public static class JwtHelpers
    {

        public static string GenerateJwtToken(User user, JwtOptions jwtOptions)
        {
            // Generate the token
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDesciptor = new SecurityTokenDescriptor
            {
                Issuer = jwtOptions.Issuer,
                Audience = jwtOptions.Audience,
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.SignKey)),
                    SecurityAlgorithms.HmacSha256
                ),

                Subject = new ClaimsIdentity(new Claim[]
                {
                    new(ClaimTypes.NameIdentifier, user.Name),
                    new(ClaimTypes.Email, user.Email),
                    new(ClaimTypes.Role, user.UserRole.ToString()),
                }),

                Expires = DateTime.Now.AddMinutes(jwtOptions.Lifetime),

            };
            // token as object
            var securityToken = tokenHandler.CreateToken(tokenDesciptor);

            // token as string
            var accessToken = tokenHandler.WriteToken(securityToken);

            return accessToken;
        }




        public static int? ValidateJwtToken(string token)
        {
            throw new NotImplementedException();
        }


        public static string HashPassword(string password)
        {

            // Generate a salt for the password hash
            var salt = BCrypt.Net.BCrypt.GenerateSalt();

            // Hash the password using bcrypt with a work factor of 12
            return BCrypt.Net.BCrypt.HashPassword(password, salt);
        }


        public static bool VerifyPasswordHash(string password, string storedHash)
        {
            // Use BCrypt to verify the password hash
            return BCrypt.Net.BCrypt.Verify(password, storedHash);
        }
    }
}
