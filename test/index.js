let server = require("../index.js")
let chai = require("chai")
let chaiHttp = require("chai-http")

chai.should()
chai.use(chaiHttp)

describe('Poker REST API', () => {
    describe("Test GET route /eval7", () => {
        it("It should give a 200 on AdKdQdQsTs4d3s and the response should contain a score of 3767", () => {
            chai.request(server)
                .get("/eval7?hand=AdKdQdQsTs4d3s")
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.an('object')
                    response.body.should.have.property('score').be.a('number').eq(3767)
            })
        })
        it("It should give a 400 on missing hand queryparameter", () => {
            chai.request(server)
                .get("/eval7")
                .end((err, response) => {
                    response.should.have.status(400)
                    response.body.should.be.empty
                })
        })
        it("It should give a 400 on empty hands queryparameter", () => {
            chai.request(server)
                .get("/eval7?hand=")
                .end((err, response) => {
                    response.should.have.status(400)
                    response.body.should.be.empty
                })
        })
        it("It should give a 400 on hands with duplicates", () => {
            chai.request(server)
                .get("/eval7?hand=AdAdQsKs9s9d7d")
                .end((err, response) => {
                    response.should.have.status(400)
                    response.body.should.be.empty
                })
        })
    })
})