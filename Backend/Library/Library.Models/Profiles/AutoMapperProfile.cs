
using AutoMapper;


namespace Library.Models.Profiles
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
          

            // ResponseDTOs
            CreateMap<Book, BookResponseDTO>()
                .ReverseMap();

            CreateMap<Author, AuthorResponseDTO>()
                .ReverseMap();

            CreateMap<Publisher, PublisherResponseDTO>()
                .ReverseMap();
            
            CreateMap<Borrowing, BorrowingResponseDTO>()
                .ReverseMap();

            CreateMap<User, UserResponseDTO>()
                .ReverseMap();

            CreateMap<User, MinimalUserResponseDTO>()
               .ReverseMap();
            


            // CreateRequestDTOs
            CreateMap<Book, BookCreateRequestDTO>().ReverseMap();
            CreateMap<Author, AuthorCreateRequestDTO>().ReverseMap();
            CreateMap<Publisher, PublisherCreateRequestDTO>().ReverseMap();


            // UpdateRequestDTOs
            CreateMap<BookUpdateRequestDTO, Book>();
            CreateMap<AuthorUpdateRequestDTO, Author>();
            CreateMap<PublisherUpdateRequestDTO, Publisher>();
            CreateMap<UserUpdateRequestDTO, User>().ReverseMap();


            // Map from the BaseDTO, as it's the DTO for the delete
            CreateMap<BaseDTO, Book>();
            CreateMap<BaseDTO, Author>();
            CreateMap<BaseDTO, Publisher>();
            CreateMap<BaseDTO, Borrowing>();
            CreateMap<BaseDTO, User>();


            // Same type mappers
            CreateMap<Book, Book>()
                .IgnoreAllMembers()
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.NumberOfAvailableCopies, opt => opt.MapFrom(src => src.NumberOfAvailableCopies))
                .ForMember(dest => dest.NumberOfTotalCopies, opt => opt.MapFrom(src => src.NumberOfTotalCopies))
                .ForMember(dest => dest.TimeStamp, opt => opt.MapFrom(src => src.TimeStamp));
                
          



        }
        
    }

    public static class MapperExtensions
    {
        public static IMappingExpression<TSource, TDestination> IgnoreAllMembers<TSource, TDestination>(this IMappingExpression<TSource, TDestination> expr)
        {
            var destinationType = typeof(TDestination);

            foreach (var property in destinationType.GetProperties())
                expr.ForMember(property.Name, opt => opt.Ignore());

            return expr;
        }
    }

}
