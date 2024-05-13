using System.Linq.Expressions;

namespace Library.Dal.Helpers
{
    public static class LinqHelpers
    {
        public static Expression<Func<T, bool>> BuildWherePredicate<T>(PropertyInfo propertyInfo, string filterQuery)
        {


            // For string properties, parse the filterQuery and use String.Contains 
            if (propertyInfo.PropertyType == typeof(string))
            {
                return BuildWherePredicateForStringProperty<T>(propertyInfo, filterQuery);
            }
            // For date time properties, parse the filterQuery and use DateTime.CompareTo
            else if (propertyInfo.PropertyType == typeof(DateTime))
            {
                return BuildWherePredicateForDateTimeProperty<T>(propertyInfo, filterQuery);
            }
            // For int properties, user 
            else if (propertyInfo.PropertyType == typeof(int))
            {
                return BuildWherePredicateForIntProperty<T>(propertyInfo, filterQuery);
            }
            // For bool properties
            else if (propertyInfo.PropertyType == typeof(bool))
            {
                return BuildWherePredicateForBoolProperty<T>(propertyInfo, filterQuery);
            }
            else
            {
                throw new ArgumentException("Filtering on this property is not supported");
            }

        }

        private static Expression<Func<T, bool>> BuildWherePredicateForBoolProperty<T>(PropertyInfo propertyInfo, string filterQuery)
        {
            var parameter = Expression.Parameter(typeof(T), "x");
            var property = Expression.Property(parameter, propertyInfo);
            var boolConstant = Expression.Constant(bool.Parse(filterQuery));

            var binaryExpression = Expression.Equal(property, boolConstant);

            return Expression.Lambda<Func<T, bool>>(binaryExpression, parameter);

        }

        private static Expression<Func<T, bool>> BuildWherePredicateForDateTimeProperty<T>(PropertyInfo propertyInfo, string filterQuery)
        {
            // Parse the filterQuery as follow:
            // 1. If it is a single DateTime:
            //    a. Preceded with ">" then return entities with dates greater than it
            //    b. Preceded with "<" then return entities with dates lees than it
            //    c. Preceded with "=" then return entities with dates equal to it
            //    d. Preceded with ">=" then return entities with dates greater than or equal to it
            //    e. Preceded with "<=" then return entities with dates less than or equal to it
            // 2. If it is two date separated by a "~" then return entities with dates between them


            var compareToMethod = typeof(DateTime).GetMethod("CompareTo", new[] { typeof(DateTime) });
            var parameter = Expression.Parameter(typeof(T), "x");
            var property = Expression.Property(parameter, propertyInfo);

            Expression<Func<T, bool>> lambda = Expression.Lambda<Func<T, bool>>(Expression.Constant(true), parameter);
            // Check if the string follows the expected format
            if (singleOperandOperators.Contains(filterQuery[0].ToString()) || filterQuery.Contains("~"))
            {
                // Check if the string contains a single date and the a correct operator
                if (singleOperandOperators.Contains(filterQuery[0].ToString()))
                {
                    string symbol = "";
                    // Get the symbol from the string
                    foreach (string op in singleOperandOperators)
                    {
                        if (filterQuery.Contains(op))
                        {
                            symbol = op;
                        }
                    }
                    // Get the date from the string
                    var dateString = filterQuery.Substring(symbol.Length);

                    DateTime date = DateTime.Parse(dateString);

                    lambda = BuildWherePredicateForSingleDate(parameter, property, compareToMethod, lambda, symbol, date);
                }

                // Check if the string contains two dates
                if (filterQuery.Contains("~"))
                {
                    var dates = filterQuery.Split("~");

                    var date1 = DateTime.Parse(dates[0]);
                    var date2 = DateTime.Parse(dates[1]);

                    lambda = BuildWherePredicateForRangeOfDates(parameter, property, compareToMethod, lambda, date1, date2);
                }
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

        private static Expression<Func<T, bool>> BuildWherePredicateForRangeOfDates<T>(ParameterExpression parameter, MemberExpression property, MethodInfo compareToMethod, Expression<Func<T, bool>> lambda, DateTime date1, DateTime date2)
        {
            // Construct expressions for DateTime.CompareTo(date1) >= 0 and DateTime.CompareTo(date2) <= 0
            var compareToExpression1 = Expression.Call(property, compareToMethod, Expression.Constant(date1));
            var compareToExpression2 = Expression.Call(property, compareToMethod, Expression.Constant(date2));

            var greaterThanOrEqualExpression = Expression.GreaterThanOrEqual(compareToExpression1, Expression.Constant(0));
            var lessThanOrEqualExpression = Expression.LessThanOrEqual(compareToExpression2, Expression.Constant(0));

            // Combine expressions using AndAlso (&&) operator
            var binaryExpression = Expression.AndAlso(greaterThanOrEqualExpression, lessThanOrEqualExpression);


            lambda = Expression.Lambda<Func<T, bool>>(binaryExpression, parameter);


            return lambda;
        }

        private static Expression<Func<T, bool>> BuildWherePredicateForSingleDate<T>(ParameterExpression parameter, MemberExpression property, MethodInfo compareToMethod, Expression<Func<T, bool>> lambda, string symbol, DateTime date)
        {

            ConstantExpression constant = Expression.Constant(date);
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


            return lambda;
        }

        private static HashSet<string> singleOperandOperators = new HashSet<string> { ">", "<", "=", ">=", "<=" };
        private static Expression<Func<T, bool>> BuildWherePredicateForIntProperty<T>(PropertyInfo propertyInfo, string filterQuery)
        {

            // Parse the filterQuery as follow:
            // If it is a single int:
            //    a. Preceded with ">" then return entities with ints greater than it
            //    b. Preceded with "<" then return entities with ints lees than it
            //    c. Preceded with "=" then return entities with ints equal to it
            //    d. Preceded with ">=" then return entities with ints greater than or equal to it
            //    e. Preceded with "<=" then return entities with ints less than or equal to it
            // 2. If it is two ints separated by a "~" then return entities with ints between them


            var parameter = Expression.Parameter(typeof(T), "x");
            var property = Expression.Property(parameter, propertyInfo);

            Expression<Func<T, bool>> lambda = Expression.Lambda<Func<T, bool>>(Expression.Constant(true), parameter);

            // Check if the string follows the expected format
            if (singleOperandOperators.Contains(filterQuery[0].ToString()) || filterQuery.Contains("~"))
            {
                // Check if the string contains a single int and the a correct operator
                if (singleOperandOperators.Contains(filterQuery[0].ToString()))
                {
                    string symbol = "";
                    // Get the symbol from the string
                    foreach (string op in singleOperandOperators)
                    {
                        if (filterQuery.Contains(op))
                        {
                            symbol = op;
                        }
                    }

                    // Get the int from the string
                    var intString = filterQuery.Substring(symbol.Length);

                    var int1 = int.Parse(intString);

                    lambda = BuildWherePredicateForSingleInt(parameter, property, lambda, symbol, int1);
                }

                // Check if the string contains two ints
                if (filterQuery.Contains("~"))
                {
                    var ints = filterQuery.Split("~");

                    var int1 = int.Parse(ints[0]);
                    var int2 = int.Parse(ints[1]);

                    lambda = BuildWherePredicateForRangeOfInts(parameter, property, lambda, int1, int2);
                }
            }
            else
            {
                throw new FormatException("Please make sure to use the correct format for date. Please follow the following instructions for guidance: \n " +
                    "If you want to fetch records with:\n" +
                    "1. exact number, use the following format: =100\n" +
                    "2. numbers greater than or equal to, use the following format: >=100\n" +
                    "3. numbers less than or equal to, use the following format: <=100\n" +
                    "4. numbers greater than, use the following format: >100\n" +
                    "5. numbers less than, use the following format: <100\n" +
                    "6. numbers between two dates, use the following format: 100~200\n");
            }
            return lambda;
        }

        private static Expression<Func<T, bool>> BuildWherePredicateForRangeOfInts<T>(ParameterExpression parameter, MemberExpression property, Expression<Func<T, bool>> lambda, int int1, int int2)
        {
            var intConstant1 = Expression.Constant(int1);
            var intConstant2 = Expression.Constant(int2);

            var greaterThanOrEqualExpression = Expression.GreaterThanOrEqual(property, intConstant1);
            var lessThanOrEqualExpression = Expression.LessThanOrEqual(property, intConstant2);

            // Combine expressions using AndAlso (&&) operator
            var binaryExpression = Expression.AndAlso(greaterThanOrEqualExpression, lessThanOrEqualExpression);

            lambda = Expression.Lambda<Func<T, bool>>(binaryExpression, parameter);

            return lambda;
        }

        private static Expression<Func<T, bool>> BuildWherePredicateForSingleInt<T>(ParameterExpression parameter, MemberExpression property, Expression<Func<T, bool>> lambda, string symbol, int int1)
        {
            ConstantExpression constant = Expression.Constant(int1);
            BinaryExpression binaryExpression;

            switch (symbol)
            {
                case "=":
                    binaryExpression = Expression.Equal(property, constant);
                    lambda = Expression.Lambda<Func<T, bool>>(binaryExpression, parameter);
                    break;
                case ">":
                    binaryExpression = Expression.GreaterThan(property, constant);
                    lambda = Expression.Lambda<Func<T, bool>>(binaryExpression, parameter);
                    break;
                case "<":
                    binaryExpression = Expression.LessThan(property, constant);
                    lambda = Expression.Lambda<Func<T, bool>>(binaryExpression, parameter);
                    break;
                case ">=":
                    binaryExpression = Expression.GreaterThanOrEqual(property, constant);
                    lambda = Expression.Lambda<Func<T, bool>>(binaryExpression, parameter);
                    break;
                case "<=":
                    binaryExpression = Expression.LessThanOrEqual(property, constant);
                    lambda = Expression.Lambda<Func<T, bool>>(binaryExpression, parameter);
                    break;
                default:
                    break;
            }

            return lambda;
        }

        private static Expression<Func<T, bool>> BuildWherePredicateForStringProperty<T>(PropertyInfo propertyInfo, string filterQuery)
        {

            var parameter = Expression.Parameter(typeof(T), "x");
            var property = Expression.Property(parameter, propertyInfo);

            // Use String.Contains method for string comparison
            var toLowerMethod = typeof(string).GetMethod("ToLower", Type.EmptyTypes);
            var toLowerExpression = Expression.Call(property, toLowerMethod);
            var constant = Expression.Constant(filterQuery.ToLower());

            var containsMethod = typeof(string).GetMethod("Contains", new[] { typeof(string) });
            var methodCall = Expression.Call(toLowerExpression, containsMethod, constant);

            var testCombile = Expression.Lambda<Func<T, bool>>(methodCall, parameter).Compile();
            return Expression.Lambda<Func<T, bool>>(methodCall, parameter);
        }

        public static string BuildWherePredicateForNestedProperty<T>(string filterOn, string filterQuery)
        {
            // Get the first and second parts of the property name
            string[] segments = filterOn.Split('.');
            if (!(segments.Length == 2))
            {
                throw new ArgumentException("Invalid filterOn property");
            }
            string constructedLambdaString = "x => true";
            // Construct the types of the from the segments
            // Get the type of the first segment (the nested property type)
            Type nestedPropertyType = typeof(T).GetProperty(segments[0], BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance).PropertyType;
            bool isCollection = nestedPropertyType.IsGenericType && nestedPropertyType.GetGenericTypeDefinition() == typeof(ICollection<>);
            if (isCollection)
            {
                nestedPropertyType = nestedPropertyType.GetGenericArguments()[0];
                // For nested properties that are collections, use the Any method
                constructedLambdaString = $"{segments[0]}.Any({segments[1]})";
            }
            else
            {
                // For non-collection properties, use the property name
                constructedLambdaString = $"{segments[0]}.{segments[1]}";
            }
            // Try getting the type of deeply nested property
            PropertyInfo deeplyNestedPropertyInfo = nestedPropertyType.GetProperty(segments[1], BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
            Type deeplyNestedPropertyType = deeplyNestedPropertyInfo.PropertyType;
            if (deeplyNestedPropertyType == null)
            {
                throw new ArgumentException("Invalid filterOn property");
            }
            else if (deeplyNestedPropertyType == typeof(string))
            {
                constructedLambdaString = constructedLambdaString.Replace($"{segments[1]}", $"{segments[1]}.ToLower().Contains(\"{filterQuery}\")");
            }
            else if (deeplyNestedPropertyType == typeof(int))
            {
                // Parse the filterQuery as follow:
                // If it is a single int:
                //    a. Preceded with ">" then return entities with ints greater than it
                //    b. Preceded with "<" then return entities with ints lees than it
                //    c. Preceded with "=" then return entities with ints equal to it
                //    d. Preceded with ">=" then return entities with ints greater than or equal to it
                //    e. Preceded with "<=" then return entities with ints less than or equal to it
                // 2. If it is two ints separated by a "~" then return entities with ints between them
                string symbol = "";
                // Get the symbol from the string
                foreach (string op in singleOperandOperators)
                {
                    if (filterQuery.Contains(op))
                    {
                        symbol = op;
                    }
                }
                // Check if the string contains a single int and the a correct operator
                if (!string.IsNullOrEmpty(symbol) && int.TryParse(filterQuery.Substring(symbol.Length), out int queryInt))
                {
                    switch (symbol)
                    {
                        case "=":
                            constructedLambdaString = constructedLambdaString.Replace($"{segments[1]}", $"{segments[1]} == {queryInt}");
                            break;
                        case ">":
                        case "<":
                        case ">=":
                        case "<=":
                            constructedLambdaString = constructedLambdaString.Replace($"{segments[1]}", $"{segments[1]} {symbol} {queryInt}");
                            break;
                        default:
                            break;
                    }

                }
                // Check if the string contains two ints
                else if (filterQuery.Contains("~") && int.TryParse(filterQuery.Split("~")[0], out int queryInt1) && int.TryParse(filterQuery.Split("~")[1], out int queryInt2))
                {

                    if (isCollection)
                    {
                        // x.SomeCollection.Any(y => y.Id >= 2 AndAlso y.Id <= 5)
                        constructedLambdaString = constructedLambdaString.Replace($"{segments[1]}", $"{segments[1]} >= {queryInt1} AndAlso {segments[1]} <= {queryInt2}");

                    }
                    else
                    {
                        // x.Id >= 2 AndAlso x.Id <= 5
                        constructedLambdaString = constructedLambdaString.Replace($"{segments[1]}", $"{segments[1]} >= {queryInt1} AndAlso {segments[0]}.{segments[1]} <= {queryInt2}");
                    }
                }
                // Else throw exception with instructions for correct format
                else
                {
                    throw new FormatException("Please make sure to use the correct format for date. Please follow the following instructions for guidance: \n " +
                         "If you want to fetch records with:\n" +
                         "1. exact number, use the following format: =100\n" +
                         "2. numbers greater than or equal to, use the following format: >=100\n" +
                         "3. numbers less than or equal to, use the following format: <=100\n" +
                         "4. numbers greater than, use the following format: >100\n" +
                         "5. numbers less than, use the following format: <100\n" +
                         "6. numbers between two numbers, use the following format: 100~200\n");
                }

            }
            else
            {
                throw new ArgumentException("Filtering on this property is not supported");
            }
            return constructedLambdaString;
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
