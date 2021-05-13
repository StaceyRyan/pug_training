let expect = require("chai").expect;
let apiCall = require("../index")

//details that describe elements of the app
//describe('test title', function)

//Test Server
describe("API call to jobs", function() {
    let serverTest = 'http://localhost:3000'

    //expectations go into the body of the it function
    it("Returns status 200", function() {
        request(serverTest, function(error, response, body) {
          //use deep to test nested objects
          expect(response.statusCode).to.deep.equal(200)
          done()
        })
    })
})