let expect = require("chai").expect;
let apiCall = require("../index")

describe("API call to jobs", function() {
    let serverTest = 'http://localhost:3000'

    it("Returns status 200", function() {
        request(serverTest, function(error, response, body) {
          expect(response.statusCode).to.equal(200)
          done()
        })
    })
})