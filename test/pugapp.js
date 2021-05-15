const expect = require("chai").expect
const request = require('superagent')
const apiCall = require("../index")


//details that describe elements of the app
//describe('test title', function)

//Test Server
describe("API call to jobs", () => {
  beforeEach(() => {
    nock('http://localhost:3000').reply(200, response)
  })
  it("should return status 200", async () => {
    let res = await chai.request(apiCall).
    // let serverTest = 
    expect(response.statusCode).to.deep.equal(200)
  })
/*
    //expectations go into the body of the it function
    it("Returns status 200", function() {
        request(serverTest, function(error, response, body) {
          //use deep to test nested objects
          expect(response.statusCode).to.deep.equal(200)
          done()
        })
    })
    */
})