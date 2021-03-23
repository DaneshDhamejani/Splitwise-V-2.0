const assert = require("chai").assert;
const index = require("./index");
const chai = require("chai");
chai.use(require("chai-http"));
const expect = require("chai").expect;
const agent = require("chai").request.agent(index);


describe("Splitwise", function () {
  describe("Login Test", function () {
    it("Incorrect Password", () => {
      agent
        .post("/ologin")
        .send({ email: "danesh2497@sjsu.com", password: "12345" })
        .then(function (res) {
          expect(res.text).to.equal('{"message":"Invalid credentials!"}');
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
        .post("/getallbills")
        .send({groupname:"Apt 207"})
        .then(function (res) {
          expect(res.text).to.equal('{"Got all groups"}');
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
)

describe("Get name for profile page", function () {
  it("Profile", () => {
    agent
      .post("/profile")
      .send({useremail:"danesh2497@sjsu.com"})
      .then(function (res) {
        expect(res.text).to.equal('{"Got all my details of profile"}');
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
)

describe("Get name to display on dashboard", function () {
  it("Name for Dashboard", () => {
    agent
      .post("/getnamefordashboard")
      .send({useremail:"sai@gmail.com"})
      .then(function (res) {
        expect(res.text).to.equal('{"Got name for dashboard"}');
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
)

describe("Get name to display on dashboard", function () {
  it("Name for Dashboard", () => {
    agent
      .post("/fetchemails")
      .send({groupname:"Apt 207"})
      .then(function (res) {
        expect(res.text).to.equal('{"Got all emails of members in the group"}');
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
)


})



