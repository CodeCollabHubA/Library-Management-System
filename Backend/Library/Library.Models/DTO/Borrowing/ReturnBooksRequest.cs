﻿
namespace Library.Models.DTO
{
    public class ReturnBooksRequestDTO
    {
        public int UserId { get; set; }

        public List<int> BookIds { get; set; }

    }
}