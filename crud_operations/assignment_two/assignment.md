1. Insert multiple companies (company data of your choice) into a collection
    - both with insertONe() and insertMany()
    - db.companies.insertOne({_id: 1, name: "Company 1", address: "123 Willow Lane", city: "Fake City", zipCode: 12345})
    - db.companies.insertOne({_id: 2, name: "Company 2", address: "456 Willow Lane", city: "Fake City", zipCode: 12345})
2. Deliberately insert duplicate ID data and "fix" failing additions with unordered inserts
    - db.companies.insertMany([{_id: 2, name: "Company 3", address: "789 Willow Lane", city: "Fake City", zipCode: 12345}, {_id: 4, name: "Company 4", address: "098 Willow Lane", city: "Fake City", zipCode: 12345}], {ordered: false}) // Company 4 will get written but Company 3 will not due to duplicate id
3. Write data for a new company with both journaling being gauranteed and not being guaranteed
    {writeConcern: {j: true}}
 
