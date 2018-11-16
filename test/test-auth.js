"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
const jwt = require("jsonwebtoken");

const { app, runServer, closeServer } = require("../server");
const { User } = require("../users");
const { JWT_SECRET, TEST_DATABASE_URL } = require("../config");

const expect = chai.expect;

// This let's us make HTTP requests in our tests.
// see: https://github.com/chaijs/chai-http
chai.use(chaiHttp);

describe("Auth endpoints", function() {
  const username = "exampleUser";
  const password = "01234567890clear";
  const firstName = "exampleFName";
  const middleInitial = "E";
  const lastName = "exampleLName";
  const membershipChoice = "memberChoice";
  const memberType = "examplememberType";
  const street1 = "exampleStreet1";
  const street2 = "exampleStreet2";
  const city = "exampleCity";
  const stateProvDept = "exampleState";
  const country = "exampleCountry";
  const phone = "examplePhone";
  const altEmail = "exampleAltEmail";
  const fax = "exampleFax";
  const gender = "exampleGender";
  const affiliation = "exampleAffiliation";
  const position = "examplePosition";
  const deptUnit = "exampleDeptUnit";
  const researchFocus = "exampleResearchFocus";
  const specificSNOInterest = ["exampleSNOInt1", "exampleSNOInt2"];
  const postalCode = "10011";

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  after(function() {
    return closeServer();
  });

  beforeEach(function() {
    return User.hashPassword(password).then(password =>
      User.create({
        username,
        password,
        firstName,
        middleInitial,
        lastName,
        membershipChoice,
        memberType,
        street1,
        street2,
        city,
        stateProvDept,
        country,
        phone,
        altEmail,
        fax,
        gender,
        affiliation,
        position,
        deptUnit,
        researchFocus,
        specificSNOInterest,
        postalCode
      })
    );
  });

  afterEach(function() {
    return User.deleteMany({});
  });

  describe("/api/auth/login", function() {
    it("Should reject requests with no credentials", function() {
      return chai
        .request(app)
        .post("/api/auth/login")
        .then(() => expect.fail(null, null, "Request should not succeed"))
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(400);
        });
    });
    it("Should reject requests with incorrect usernames", function() {
      return chai
        .request(app)
        .post("/api/auth/login")
        .send({ username: "wrongUsername", password })
        .then(() => expect.fail(null, null, "Request should not succeed"))
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(401);
        });
    });
    it("Should reject requests with incorrect passwords", function() {
      return chai
        .request(app)
        .post("/api/auth/login")
        .send({ username, password: "wrongPassword" })
        .then(() => expect.fail(null, null, "Request should not succeed"))
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(401);
        });
    });
    it("Should return a valid auth token", function() {
      return chai
        .request(app)
        .post("/api/auth/login")
        .send({ username, password })
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          const token = res.body.authToken;
          expect(token).to.be.a("string");
          const payload = jwt.verify(token, JWT_SECRET, {
            algorithm: ["HS256"]
          });

          expect(payload.user).to.deep.equal({
            username,
            firstName,
            middleInitial,
            lastName,
            membershipChoice,
            memberType,
            street1,
            street2,
            city,
            stateProvDept,
            country,
            phone,
            altEmail,
            fax,
            gender,
            affiliation,
            position,
            deptUnit,
            researchFocus,
            // dummy comparison to verify everything else
            userID: payload.user.userID,
            specificSNOInterest,
            postalCode
          });
        });
    });
  });

  describe("/api/auth/refresh", function() {
    it("Should reject requests with no token", function() {
      return chai
        .request(app)
        .post("/api/auth/refresh")
        .then(() => expect.fail(null, null, "Request should not succeed"))
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(401);
        });
    });
    it("Should reject requests with an invalid token", function() {
      const token = jwt.sign(
        {
          username,
          firstName,
          lastName
        },
        "wrongSecret",
        {
          algorithm: "HS256",
          expiresIn: "7d"
        }
      );

      return chai
        .request(app)
        .post("/api/auth/refresh")
        .set("Authorization", `Bearer ${token}`)
        .then(() => expect.fail(null, null, "Request should not succeed"))
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(401);
        });
    });
    // it('Should reject requests with an expired token', function () {
    //     const token = jwt.sign(
    //         {
    //             user: {
    //                 username,
    //                 firstName,
    //                 lastName
    //             },
    //         },
    //         JWT_SECRET,
    //         {
    //             algorithm: 'HS256',
    //             subject: username,
    //             expiresIn: Math.floor(Date.now() / 1000) - 1000 // Expired ten seconds ago
    //         }
    //     );

    //     return chai
    //         .request(app)
    //         .post('/api/auth/refresh')
    //         .set('authorization', `Bearer ${token}`)
    //         .then(() =>
    //             expect.fail(null, null, 'Request should not succeed')
    //         )
    //         .catch(err => {
    //             if (err instanceof chai.AssertionError) {
    //                 throw err;
    //             }

    //             const res = err.response;
    //             expect(res).to.have.status(401);
    //         });
    // });

    it("Should return a valid auth token with a newer expiry date", function() {
      const token = jwt.sign(
        {
          user: {
            username,
            firstName,
            lastName
          }
        },
        JWT_SECRET,
        {
          algorithm: "HS256",
          subject: username,
          expiresIn: "7d"
        }
      );
      const decoded = jwt.decode(token);

      return chai
        .request(app)
        .post("/api/auth/refresh")
        .set("authorization", `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          const token = res.body.authToken;
          expect(token).to.be.a("string");
          const payload = jwt.verify(token, JWT_SECRET, {
            algorithm: ["HS256"]
          });
          expect(payload.user).to.deep.equal({
            username,
            firstName,
            lastName
          });
          expect(payload.exp).to.be.at.least(decoded.exp);
        });
    });
  });
});
