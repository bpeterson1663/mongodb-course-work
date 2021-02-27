Numeric Data
- Integers - Range of -2,147,483,648 to 2,147,483,647 - Full numbers
- Longs - Range of -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 - Full numbers
- Doubles - Decimal / default value unless specified
- High Precision Doubles - up to 34 decimal digits

db.persons.insertOne({age: NumberInt("29")}) // always pass in a string when using the number constructors

if incrementing a number, make sure to increment with the same type otherwise mongo will convert it 

use NumberDecimal for more precision when adding or subtracting decimals

Modelling Number/ Monetary Data in MongoDB: https://docs.mongodb.com/manual/tutorial/model-monetary-data/
