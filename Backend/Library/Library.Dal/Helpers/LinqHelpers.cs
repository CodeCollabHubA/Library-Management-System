

using System.Linq.Expressions;

namespace Library.Dal.Helpers
{
    public static class LinqHelpers
    {
        public static Expression<Func<T, bool>> BuildWherePredicate<T>(PropertyInfo propertyInfo, string filterQuery)
        {

            var parameter = Expression.Parameter(typeof(T), "x");

            var property = Expression.Property(parameter, propertyInfo);


            if (propertyInfo.PropertyType == typeof(string))
            {
                return BuildWherePredicateWithContains<T>(filterQuery, parameter, property);
            }
            // For date time properties, parse the filterQuery and use DateTime.CompareTo
            else if (propertyInfo.PropertyType == typeof(DateTime))
            {
                return BuildWherePredicateWithCompareTo<T>(filterQuery, parameter, property);
            }
            // For non-string, non-date properties, use the EqualityComparer.Default.Equals method
            else
            {
                return BuildWherePredicateWithEquals<T>(propertyInfo, filterQuery, parameter, property);
            }

        }

        private static Expression<Func<T, bool>> BuildWherePredicateWithCompareTo<T>(string filterQuery, ParameterExpression parameter, MemberExpression property)
        {
            // Parse the filterQuery as follow:
            // 1. If it is a single DateTime:
            //    a. Preceded with ">" then return entities with dates greater than it
            //    b. Preceded with "<" then return entities with dates lees than it
            //    c. Preceded with "=" then return entities with dates equal to it
            //    d. Preceded with ">=" then return entities with dates greater than or equal to it
            //    e. Preceded with "<=" then return entities with dates less than or equal to it
            // 2. If it is two date separated by a "~" then return entities with dates between them
            Expression<Func<T, bool>> lambda = Expression.Lambda<Func<T, bool>>(Expression.Constant(true), parameter);
            // Check if the string follow the expected format
            if (singleDateOperators.Contains(filterQuery[0].ToString()) || filterQuery.Contains("~"))
            {
                var compareToMethod = typeof(DateTime).GetMethod("CompareTo", new[] { typeof(DateTime) });

                lambda = BuildWherePredicateForSingleDate(filterQuery, parameter, property, lambda, compareToMethod);
                lambda = BuildWherePredicateForRangeOfDates(filterQuery, parameter, property, lambda, compareToMethod);
            }
            else
            {
                throw new FormatException("Please make sure to use the correct format for date. Please follow the following instructions for guidance: \n " +
                    "If you want to fetch records with:\n" +
                    "1. exact date, use the following format: =2022-01-01\n" +
                    "2. date greater than or equal to, use the following format: >=2022-01-01\n" +
                    "3. date less than or equal to, use the following format: <=2022-01-01\n" +
                    "4. date greater than, use the following format: >2022-01-01\n" +
                    "5. date less than, use the following format: <2022-01-01\n" +
                    "6. dates between two dates, use the following format: 2022-01-01~2022-01-02\n");
            }
            return lambda;
        }

        private static Expression<Func<T, bool>> BuildWherePredicateForRangeOfDates<T>(string filterQuery, ParameterExpression parameter, MemberExpression property, Expression<Func<T, bool>> lambda, MethodInfo? compareToMethod)
        {
            // Check if the string contains two dates
            if (filterQuery.Contains("~"))
            {
                var dates = filterQuery.Split("~");
                var date1 = DateTime.Parse(dates[0]);
                var date2 = DateTime.Parse(dates[1]);

                // Construct expressions for DateTime.CompareTo(date1) >= 0 and DateTime.CompareTo(date2) <= 0
                var compareToExpression1 = Expression.Call(property, compareToMethod, Expression.Constant(date1));
                var compareToExpression2 = Expression.Call(property, compareToMethod, Expression.Constant(date2));

                var greaterThanOrEqualExpression = Expression.GreaterThanOrEqual(compareToExpression1, Expression.Constant(0));
                var lessThanOrEqualExpression = Expression.LessThanOrEqual(compareToExpression2, Expression.Constant(0));

                // Combine expressions using AndAlso (&&) operator
                var binaryExpression = Expression.AndAlso(greaterThanOrEqualExpression, lessThanOrEqualExpression);


                lambda = Expression.Lambda<Func<T, bool>>(binaryExpression, parameter);
            }

            return lambda;
        }

        private static Expression<Func<T, bool>> BuildWherePredicateForSingleDate<T>(string filterQuery, ParameterExpression parameter, MemberExpression property, Expression<Func<T, bool>> lambda, MethodInfo? compareToMethod)
        {
            // Check if the string contains a single date
            if (singleDateOperators.Contains(filterQuery[0].ToString()))
            {
                // Get the symbol from the string
                var symbol = filterQuery[0].ToString();

                // Get the date from the string
                var dateString = filterQuery.Substring(1);

                ConstantExpression constant = Expression.Constant(DateTime.Parse(dateString));
                MethodCallExpression compareToExpression = Expression.Call(property, compareToMethod, constant);
                BinaryExpression binaryExpression;

                switch (symbol)
                {
                    case "=":
                        binaryExpression = Expression.Equal(compareToExpression, Expression.Constant(0));
                        lambda = Expression.Lambda<Func<T, bool>>(binaryExpression, parameter);
                        break;
                    case ">":
                        binaryExpression = Expression.GreaterThan(compareToExpression, Expression.Constant(0));
                        lambda = Expression.Lambda<Func<T, bool>>(binaryExpression, parameter);
                        break;
                    case "<":
                        binaryExpression = Expression.LessThan(compareToExpression, Expression.Constant(0));
                        lambda = Expression.Lambda<Func<T, bool>>(binaryExpression, parameter);
                        break;
                    case ">=":
                        binaryExpression = Expression.GreaterThanOrEqual(compareToExpression, Expression.Constant(0));
                        lambda = Expression.Lambda<Func<T, bool>>(binaryExpression, parameter);
                        break;
                    case "<=":
                        binaryExpression = Expression.LessThanOrEqual(compareToExpression, Expression.Constant(0));
                        lambda = Expression.Lambda<Func<T, bool>>(binaryExpression, parameter);
                        break;
                    default:
                        break;
                }
            }

            return lambda;
        }

        private static HashSet<string> singleDateOperators = new HashSet<string> { ">", "<", "=", ">=", "<=" };
        private static Expression<Func<T, bool>> BuildWherePredicateWithEquals<T>(PropertyInfo propertyInfo, string filterQuery, ParameterExpression parameter, MemberExpression property)
        {
            var constant = Expression.Constant(Convert.ChangeType(filterQuery, propertyInfo.PropertyType));

            var binaryExpression = Expression.Equal(property, constant);

            var lambda = Expression.Lambda<Func<T, bool>>(binaryExpression, parameter);
            return lambda;
        }

        private static Expression<Func<T, bool>> BuildWherePredicateWithContains<T>(string filterQuery, ParameterExpression parameter, MemberExpression property)
        {
            // Use String.Contains method for string comparison
            var toLowerMethod = typeof(string).GetMethod("ToLower", Type.EmptyTypes);
            var toLowerExpression = Expression.Call(property, toLowerMethod);
            var constant = Expression.Constant(filterQuery.ToLower());

            var containsMethod = typeof(string).GetMethod("Contains", new[] { typeof(string) });
            var methodCall = Expression.Call(toLowerExpression, containsMethod, constant);

            return Expression.Lambda<Func<T, bool>>(methodCall, parameter);
        }

        public static Expression<Func<T, object>> BuildOrderByFunction<T>(PropertyInfo propertyInfo)
        {
            var parameter = Expression.Parameter(typeof(T), "x");

            var property = Expression.Property(parameter, propertyInfo);

            var lambda = Expression.Lambda<Func<T, object>>(Expression.Convert(property, typeof(object)), parameter);

            return lambda;
        }
    }
}
