

using System.Linq.Expressions;

namespace Library.Dal.Helpers
{
    public static class LinqHelpers
    {
        public static Expression<Func<T, bool>> BuildWherePredicateWithContains<T>(PropertyInfo propertyInfo, string filterQuery)
        {
            
            var parameter = Expression.Parameter(typeof(T), "x");
         
            var property = Expression.Property(parameter, propertyInfo);

            
            if (propertyInfo.PropertyType == typeof(string))
            {
                // Use String.Contains method for string comparison
                var toLowerMethod = typeof(string).GetMethod("ToLower", Type.EmptyTypes);
                var toLowerExpression = Expression.Call(property, toLowerMethod);
                var constant = Expression.Constant(filterQuery.ToLower());

                var containsMethod = typeof(string).GetMethod("Contains", new[] { typeof(string) });
                var methodCall = Expression.Call(toLowerExpression, containsMethod, constant);

                return Expression.Lambda<Func<T, bool>>(methodCall, parameter);
            }
            // For non-string properties, use the EqualityComparer.Default.Equals method
            else
            {
              
                var constant = Expression.Constant(Convert.ChangeType(filterQuery, propertyInfo.PropertyType));
               
                var binaryExpression = Expression.Equal(property, constant);
                
                var lambda = Expression.Lambda<Func<T, bool>>(binaryExpression, parameter);
                return lambda;

            }

        }


        public static Expression<Func<T, object>> BuildOrderByPredicate<T>(PropertyInfo propertyInfo)
        {
            var parameter = Expression.Parameter(typeof(T), "x");

            var property = Expression.Property(parameter, propertyInfo);
            
            var lambda = Expression.Lambda<Func<T, object>>(Expression.Convert(property, typeof(object)), parameter);

            return lambda;
        }
    }
}
