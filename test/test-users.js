'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../server');
const { User } = require('../users');
const { TEST_DATABASE_URL } = require('../config');

const expect = chai.expect;

// This lets us make HTTP requests in our tests.
// see: https://github.com/chaijs/chai-http

chai.use(chaiHttp);

describe('/api/user', function () {
  const username = 'exampleUser';
  const password = '01234567890clear';
  const firstName = 'exampleFName';
  const middleInitial = 'E';
  const lastName = 'exampleLName';
  const membershipChoice = 'memberChoice';
  const memberType = 'examplememberType';
  const street1 = 'exampleStreet1';
  const street2 = 'exampleStreet2';
  const city = 'exampleCity';
  const stateProvDept = 'exampleState';
  const country = 'exampleCountry';
  const phone = 'examplePhone';
  const altEmail = 'exampleAltEmail';
  const fax = 'exampleFax';
  const gender = 'exampleGender';
  const affiliation = 'exampleAffiliation';
  const position = 'examplePosition';
  const deptUnit = 'exampleDeptUnit';
  const researchFocus = 'exampleResearchFocus';
  const specificSNOInterest = ['exampleSNOInt1','exampleSNOInt2'];

  const usernameB = 'exampleUserB';
  const passwordB = 'examplePassB';
  const firstNameB = 'ExampleB';
  const middleInitialB = 'B';
  const lastNameB = 'UserB';
  const membershipChoiceB = 'memberChoiceB';
  const memberTypeB = 'examplememberTypeB';
  const street1B = 'exampleStreet1B';
  const street2B = 'exampleStreet2B';
  const cityB = 'exampleCityB';
  const stateProvDeptB = 'exampleStateB';
  const countryB = 'exampleCountryB';
  const phoneB = 'examplePhoneB';
  const altEmailB= 'exampleAltEmailB';
  const faxB = 'exampleFaxB';
  const genderB = 'exampleGenderB';
  const affiliationB = 'exampleAffiliationB';
  const positionB = 'examplePositionB';
  const deptUnitB = 'exampleDeptUnitB';
  const researchFocusB = 'exampleResearchFocusB';
  const specificSNOInterestB = ['exampleSNOInt1B'];


  before(function () {
    return runServer(TEST_DATABASE_URL);
  });

  after(function () {
    return closeServer();
  });

  beforeEach(function () { });

  afterEach(function () {
    return User.remove({});
  });

  describe('/api/users', function () {
    describe('POST', function () {
      it('Should reject users with missing username', function () {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            password,
            firstName,
            lastName
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal('Missing field');
            expect(res.body.location).to.equal('username');
          });
      });
      it('Should reject users with missing password', function () {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            username,
            firstName,
            lastName
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal('Missing field');
            expect(res.body.location).to.equal('password');
          });
      });
      it('Should reject users with non-string username', function () {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            username: 1234,
            password,
            firstName,
            lastName
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Incorrect field type: expected string'
            );
            expect(res.body.location).to.equal('username');
          });
      });
      it('Should reject users with non-string password', function () {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            username,
            password: 1234,
            firstName,
            lastName
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Incorrect field type: expected string'
            );
            expect(res.body.location).to.equal('password');
          });
      });
      it('Should reject users with non-string first name', function () {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            username,
            password,
            firstName: 1234,
            lastName
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Incorrect field type: expected string'
            );
            expect(res.body.location).to.equal('firstName');
          });
      });
      it('Should reject users with non-string last name', function () {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            username,
            password,
            firstName,
            lastName: 1234
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Incorrect field type: expected string'
            );
            expect(res.body.location).to.equal('lastName');
          });
      });
      it('Should reject users with non-trimmed username', function () {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            username: ` ${username} `,
            password,
            firstName,
            lastName
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Cannot start or end with whitespace'
            );
            expect(res.body.location).to.equal('username');
          });
      });
      it('Should reject users with non-trimmed password', function () {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            username,
            password: ` ${password} `,
            firstName,
            lastName
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Cannot start or end with whitespace'
            );
            expect(res.body.location).to.equal('password');
          });
      });
      it('Should reject users with empty username', function () {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            username: '',
            password,
            firstName,
            lastName
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Must be at least 1 characters long'
            );
            expect(res.body.location).to.equal('username');
          });
      });
      it('Should reject users with password less than ten characters', function () {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            username,
            password: '123456789',
            firstName,
            lastName
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Must be at least 10 characters long'
            );
            expect(res.body.location).to.equal('password');
          });
      });
      it('Should reject users with password greater than 72 characters', function () {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            username,
            password: new Array(73).fill('a').join(''),
            firstName,
            lastName
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Must be at most 72 characters long'
            );
            expect(res.body.location).to.equal('password');
          });
      });

      it('Should reject users with duplicate username', function () {
        // Create an initial user
        return User.create({
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
            specificSNOInterest
        })
          .then(() =>
            // Try to create a second user with the same username
            chai.request(app).post('/api/users').send({
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
                specificSNOInterest
            })
          )
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            console.log(res);
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Username already taken'
            );
            expect(res.body.location).to.equal('username');
          });
      });
      it('Should create a new user', function () {
        return chai
          .request(app)
          .post('/api/users')
          .send({
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
            specificSNOInterest
      })
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.keys(
              'username',
              'userID',
              'firstName',
              'middleInitial',
              'lastName',
              'membershipChoice',
              'memberType',
              'street1',
              'street2',
              'city',
              'stateProvDept',
              'country',
              'phone',
              'altEmail',
              'fax',
              'gender',
              'affiliation',
              'position',
              'deptUnit',
              'researchFocus',
              'specificSNOInterest'
            );
            console.log(res.body);
            expect(res.body.username).to.equal(username);
            expect(res.body.firstName).to.equal(firstName);
            expect(res.body.middleInitial).to.equal(middleInitial);
            expect(res.body.lastName).to.equal(lastName);
            expect(res.body.membershipChoice).to.equal(membershipChoice);
            expect(res.body.memberType).to.equal(memberType);
            expect(res.body.street1).to.equal(street1);
            expect(res.body.street2).to.equal(street2);
            expect(res.body.city).to.equal(city);
            expect(res.body.stateProvDept).to.equal(stateProvDept);
            expect(res.body.country).to.equal(country);
            expect(res.body.phone).to.equal(phone);
            expect(res.body.altEmail).to.equal(altEmail);
            expect(res.body.fax).to.equal(fax);
            expect(res.body.gender).to.equal(gender);
            expect(res.body.affiliation).to.equal(affiliation);
            expect(res.body.position).to.equal(position);
            expect(res.body.deptUnit).to.equal(deptUnit);
            expect(res.body.researchFocus).to.equal(researchFocus);
            expect(res.body.specificSNOInterest).to.deep.equal(specificSNOInterest);

            return User.findOne({
              username
            });
          })
          .then(user => {
            expect(user).to.not.be.null;
            expect(user.firstName).to.equal(firstName);
            expect(user.middleInitial).to.equal(middleInitial);
            expect(user.lastName).to.equal(lastName);
            expect(user.membershipChoice).to.equal(membershipChoice);
            expect(user.memberType).to.equal(memberType);
            expect(user.street1).to.equal(street1);
            expect(user.street2).to.equal(street2);
            expect(user.city).to.equal(city);
            expect(user.stateProvDept).to.equal(stateProvDept);
            expect(user.country).to.equal(country);
            expect(user.phone).to.equal(phone);
            expect(user.altEmail).to.equal(altEmail);
            expect(user.fax).to.equal(fax);
            expect(user.gender).to.equal(gender);
            expect(user.affiliation).to.equal(affiliation);
            expect(user.position).to.equal(position);
            expect(user.deptUnit).to.equal(deptUnit);
            expect(user.researchFocus).to.equal(researchFocus);
            expect(user.specificSNOInterest).to.deep.equal(specificSNOInterest);
            return user.validatePassword(password);
          })
          .then(passwordIsCorrect => {
            expect(passwordIsCorrect).to.be.true;
          });
      });
      it.skip('Should trim firstName and lastName', function () {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            username,
            password,
            firstName: ` ${firstName} `,
            lastName: ` ${lastName} `
          })
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.keys(
              'username',
              'firstName',
              'lastName'
            );
            expect(res.body.username).to.equal(username);
            expect(res.body.firstName).to.equal(firstName);
            expect(res.body.lastName).to.equal(lastName);
            return User.findOne({
              username
            });
          })
          .then(user => {
            expect(user).to.not.be.null;
            expect(user.firstName).to.equal(firstName);
            expect(user.lastName).to.equal(lastName);
          });
      });
    });

    describe('GET', function () {
      it.skip('Should return an empty array initially', function () {
        return chai.request(app).get('/api/users').then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.length(0);
        });
      });
      it.skip('Should return an array of users', function () {
        return User.create(
          {
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
            specificSNOInterest
           },
          {
            usernameB,
            passwordB,
            firstNameB,
            middleInitialB,
            lastNameB,
            membershipChoiceB,
            memberTypeB,
            street1B,
            street2B,
            cityB,
            stateProvDeptB,
            countryB,
            phoneB,
            altEmailB,
            faxB,
            genderB,
            affiliationB,
            positionB,
            deptUnitB,
            researchFocusB,
            specificSNOInterestB
        }
        )
          .then(() => chai.request(app).get('/api/users'))
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.length(2);
            expect(res.body[0]).to.deep.equal({
              username,
              firstName,
              lastName
            });
            expect(res.body[1]).to.deep.equal({
              username: usernameB,
              firstName: firstNameB,
              lastName: lastNameB
            });
          });
      });
    });
  });
});
