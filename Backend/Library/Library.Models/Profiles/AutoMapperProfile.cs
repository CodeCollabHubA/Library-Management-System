
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

            // ResponseDTOs
            CreateMap<Book, BookResponseDTO>().ReverseMap();
            CreateMap<Author, AuthorResponseDTO>().ReverseMap();
            CreateMap<Publisher, PublisherResponseDTO>().
                ReverseMap();
            CreateMap<Loan, LoanResponseDTO>().
                ReverseMap();



            // RequestDTOs
            CreateMap<Book, BookRequestDTO>().ReverseMap();
            CreateMap<Author, AuthorRequestDTO>().ReverseMap();
            CreateMap<Publisher, PublisherRequestDTO>().ReverseMap();
            CreateMap<Loan, LoanRequestDTO>().ReverseMap();



        }
    }

}
