"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
const jwt = require("jsonwebtoken");

const { app, runServer, closeServer } = require("../server");
const { User } = require("../users");
const { JWT_SECRET, TEST_DATABASE_URL } = require("../config");

const expect = chai.expect;

chai.use(chaiHttp);

describe("Protected endpoint", function() {
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

  const usernameB = "exampleUserB";
  const passwordB = "examplePassB";
  const firstNameB = "ExampleB";
  const middleInitialB = "B";
  const lastNameB = "UserB";
  const membershipChoiceB = "memberChoiceB";
  const memberTypeB = "examplememberTypeB";
  const street1B = "exampleStreet1B";
  const street2B = "exampleStreet2B";
  const cityB = "exampleCityB";
  const stateProvDeptB = "exampleStateB";
  const countryB = "exampleCountryB";
  const phoneB = "examplePhoneB";
  const altEmailB = "exampleAltEmailB";
  const faxB = "exampleFaxB";
  const genderB = "exampleGenderB";
  const affiliationB = "exampleAffiliationB";
  const positionB = "examplePositionB";
  const deptUnitB = "exampleDeptUnitB";
  const researchFocusB = "exampleResearchFocusB";
  const specificSNOInterestB = ["exampleSNOInt1B"];
  const postalCodeB = "94114";

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

  describe("/api/protected", function() {
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

    it("Should reject requests with no credentials", function() {
      return chai
        .request(app)
        .get("/api/protected")
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
        .get("/api/protected")
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
    it("Should reject requests with an expired token", function() {
      const token = jwt.sign(
        {
          user: {
            username,
            firstName,
            lastName
          },
          exp: Math.floor(Date.now() / 1000) - 10 // Expired ten seconds ago
        },
        JWT_SECRET,
        {
          algorithm: "HS256",
          subject: username
        }
      );

      return chai
        .request(app)
        .get("/api/protected")
        .set("authorization", `Bearer ${token}`)
        .then(() => expect.fail(null, null, "Request should not succeed"))
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(401);
        });
    });
    it("Should send protected data", function() {
      return chai
        .request(app)
        .get("/api/protected")
        .set("authorization", `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body.data).to.equal("rosebud");
        });
    });

    it("Should return an empty array initially", function() {
      return chai
        .request(app)
        .get("/api/users")
        .set("authorization", `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body).to.have.length(1);
        });
    });
    it("Should return an array of users", function() {
      return User.create({
        username: usernameB,
        password: passwordB,
        firstName: firstNameB,
        middleInitial: middleInitialB,
        lastName: lastNameB,
        membershipChoice: membershipChoiceB,
        memberType: memberTypeB,
        street1: street1B,
        street2: street2B,
        city: cityB,
        stateProvDept: stateProvDeptB,
        country: countryB,
        phone: phoneB,
        altEmail: altEmailB,
        fax: faxB,
        gender: genderB,
        affiliation: affiliationB,
        position: positionB,
        deptUnit: deptUnitB,
        researchFocus: researchFocusB,
        specificSNOInterest: specificSNOInterestB,
        postalCode: postalCodeB
      })
        .then(() =>
          chai
            .request(app)
            .get("/api/users")
            .set("authorization", `Bearer ${token}`)
        )

        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body).to.have.length(2);

          expect(res.body[1]).to.deep.equal({
            username,
            userID: res.body[1].userID,
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
          });
          expect(res.body[0]).to.deep.equal({
            username: usernameB,
            userID: res.body[0].userID,
            firstName: firstNameB,
            middleInitial: middleInitialB,
            lastName: lastNameB,
            membershipChoice: membershipChoiceB,
            memberType: memberTypeB,
            street1: street1B,
            street2: street2B,
            city: cityB,
            stateProvDept: stateProvDeptB,
            country: countryB,
            phone: phoneB,
            altEmail: altEmailB,
            fax: faxB,
            gender: genderB,
            affiliation: affiliationB,
            position: positionB,
            deptUnit: deptUnitB,
            researchFocus: researchFocusB,
            specificSNOInterest: specificSNOInterestB,
            postalCode: postalCodeB
          });
        });
    });
  });
});
