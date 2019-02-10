import types from '../../src/models/Types.json';
import currencies from '../../src/models/Currencies.json';

describe('Scrapper', function() {
  it('should fetch list of available types', function() {
    cy.request('/getTypes')
      .then(({ status, body }) => {
        expect(status).to.equal(200);
        expect(body.length).to.equal(types.length);
        expect(body).to.eql(types);
      });
  });
  
  it('should fetch list of available currencies', function() {
    cy.request('/getCurrencies')
      .then(({ status, body }) => {
        expect(status).to.equal(200);
        expect(body.length).to.equal(currencies.length);
        expect(body).to.eql(currencies);
      });
  });
  
  it('should fetch list of scrapped offers from provided hackers news ID', function() {
    cy.request('/scrapAskHnById?id=18589702')
      .then(({ status }) => {
        expect(status).to.equal(200);
      });
  });
  
  it('should timeout while provided with wrong ID', function() {
    cy.request({
      url: '/scrapAskHnById?id=18589702aaa',
      failOnStatusCode: false,
    })
    .then(({ status }) => {
      expect(status).to.equal(500);
    });
  });
  
  it('should timeout without provided ID', function() {
    cy.request({
      url: '/scrapAskHnById',
      failOnStatusCode: false,
    })
    .then(({ status }) => {
      expect(status).to.equal(500);
    });
  });
  
  it('should fetch list of properly formatted offers', function() {
    cy.request('/scrapAskHnById?id=18589702')
      .then(({ status, body }) => {
        expect(status).to.equal(200);

        // This id has over 700 items...
        body.slice(0, 50).forEach(offer => {
          expect(offer.text).to.be.a('string');
          expect(offer.id).to.be.a('number');
          expect(offer.remote).to.be.a('boolean');
          expect(offer.hasSalary).to.be.a('boolean');
          
          expect(offer.types).to.be.a('array');
          offer.types.forEach(type => {
            expect(type).to.be.a('string');
          });
          
          expect(offer.currencies).to.be.a('array');
          offer.currencies.forEach(curr => {
            expect(curr).to.be.a('string');
          });
        });
      });
  });
});
