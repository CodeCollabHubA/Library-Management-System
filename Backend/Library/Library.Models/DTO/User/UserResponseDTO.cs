﻿

namespace Library.Models.DTO
{
    public class UserResponseDTO : BaseDTO
    {
        public string Name { get; set; }

        public string? Bio { get; set; }

        public string? ImageURL { get; set; }

        public string? Address { get; set; }
        
        public Sex? UserSex { get; set; }

        public int? Credit { get; set; }

        public string Email { get; set; }

        public string? Phone { get; set; }

        public Role UserRole { get; set; }

        public DateTime CreatedAt { get; set; }

    }
}
