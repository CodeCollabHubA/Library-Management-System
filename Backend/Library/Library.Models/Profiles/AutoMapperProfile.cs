
using AutoMapper;


namespace Library.Models.Profiles
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Book, BookDTO>().ReverseMap();
            CreateMap<Author, AuthorDTO>().ReverseMap();
            CreateMap<Publisher, PublisherDTO>().ReverseMap();
            CreateMap<Loan, LoanDTO>().ReverseMap();
            CreateMap<User, UserDTO>().ReverseMap();

        }
    }

}
