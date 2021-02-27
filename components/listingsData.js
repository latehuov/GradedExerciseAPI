let listings = [
    {
        "id":"de417aed-d998-4854-9fb1-3852381dfaba",
        "title":"Snow plough",
        "category":"outdoors",
        "city":"oulu",
        "imgSRC": [],
        "price": 900 ,
        "dateOrigin": "2020-09-12",
        "acquire" : "pick-up",
        "description": "a snow plough",
        "userinfo" : {
            "id":"e36e8ddd-7763-4fe9-b872-e24bde31a32d",
            "firstName": "joe",
            "lastName": "smith",
            "email":"dude@gmail.com",
            "phone": 0456531441,
        }
    },    
    {
        "id":"b0433c52-c0d7-422c-aa00-b3249953e50b",
        "title":"skis",
        "category":"outdoors",
        "city":"joensuu",
        "imgSRC": [],
        "price": 10 ,
        "dateOrigin": "2021-01-01",
        "acquire" : "mail",
        "description": "a pair of skis",
        "userinfo" : {
            "id":"e36e8ddd-7763-4fe9-b872-e24bde31a32d",
            "firstName": "joe",
            "lastName": "smith",
            "email":"dude@gmail.com",
            "phone": 0456531441,
        }
    },
    {
        "id":"075336e5-dff5-4e0d-8257-fee1e9938c75",
        "title":"tennis racket",
        "category":"sports",
        "city":"helsinki",
        "imgSRC": [],
        "price": 8 ,
        "dateOrigin": "2018-06-19",
        "acquire" : "pick-up",
        "description": "a worn down tennis racket",
        "userinfo" : {
            "id":"e36e8ddd-7763-4fe9-b872-e24bde31a32d",
            "firstName": "joe",
            "lastName": "smith",
            "email":"dude@gmail.com",
            "phone": 0456531441,
        }
    },
]

module.exports = {
    getAll: ()=>listings.slice(),
    getCity: (city_S) => listings.filter(listing => listing.city.toLowerCase() == city_S.toLowerCase()),
    getCategory: (category_S) => listings.filter(listing =>listing.category == category_S),
    getDates: (date_S, date_E) => listings.filter(listing =>listing.dateOrigin <= date_E && listing.dateOrigin >= date_S),
    getDate: (date_S) => listings.filter(listing =>listing.dateOrigin > date_S)

}