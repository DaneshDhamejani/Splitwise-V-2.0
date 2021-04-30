const assert = require("chai").assert;
const index = require("./index");
const chai = require("chai");
chai.use(require("chai-http"));
const expect = require("chai").expect;
const agent = require("chai").request.agent(index);


describe("Splitwise-V-2.0", function () {
  describe("Get all users except self", function () {
    it("Incorrect Password", () => {
      agent
        .post("users/allusersexceptself")
        .send({useremail: "manoj@sjsu.edu" })
        .then(function (res) {
          expect(res.text).to.equal('{"message":"Got all users except self!"}');
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
)

  describe("Get group details", function () {
    it("Groups", () => {
      agent
        .post("groups/getallgroupsaccepted")
        .send({useremail:"manoj@sjsu.edu"})
        .then(function (res) {
          expect(res.text).to.equal('{"Got all groups accepted"}');
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
)

describe("Get name for dashboard", function () {
  it("Profile", () => {
    agent
      .post("/users/getnamefordashboard")
      .send({useremail:"manoj@sjsu.edu"})
      .then(function (res) {
        expect(res.text).to.equal('{"Got all my details of profile"}');
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
)

describe("Get Recent Activity", function () {
  it("Name for Dashboard", () => {
    agent
      .post("/bills/recentactivity")
      .send({useremail:"manoj@sjsu.edu"})
      .then(function (res) {
        expect(res.text).to.equal('{"Got recent activity"}');
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
)

describe("Get user all stats", function () {
  it("All stats", () => {
    agent
      .post("/transaction/allstats")
      .send({useremail:"manoj@sjsu.edu"})
      .then(function (res) {
        expect(res.text).to.equal('{"Got all stats"}');
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
)


})



