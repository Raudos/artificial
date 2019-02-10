const apiUrl = Cypress.config('apiUrl');

function checkFilter(type, index = 0) {
  cy.visit('/');
  cy.wait(15000);
  cy.get('[data-testid="nbrOfElements"]').invoke('text').then(numberOfElements => {
    cy.get(`[data-testid="${type}"] [data-testid="filterButton"]`).eq(index).as('clickedFilter');
    cy.get('@clickedFilter').click();
    
    cy.get('[data-testid="nbrOfElements"]').invoke('text').then(updatedNumber => {
      expect(updatedNumber).to.not.equal(numberOfElements);
    });
  
    cy.get('@clickedFilter').should('have.class', 'filterButton--active')
  });
}

describe('Offers list', function() {
  beforeEach(function() {
    cy.server();
  });
  
  it('should show loaders for filters and list', function() {
    cy.visit('/');
    cy.get('[data-testid="loader"]').should('have.length', 2);
  });
  
  it('should fetch types list', function() {
    cy.route(`${apiUrl}/getTypes`).as('getTypes');
    cy.visit('/');
    cy.wait('@getTypes')
      .then(({ status }) => {
        expect(status).to.equal(200);
        // Offers endpoint takes quite long, hence one loader
        cy.get('[data-testid="loader"]').should('have.length', 1);
      });
  });
  
  it('should fetch currencies list', function() {
    cy.route(`${apiUrl}/getCurrencies`).as('getCurrencies');
    cy.visit('/');
    cy.wait('@getCurrencies')
      .then(({ status }) => {
        expect(status).to.equal(200);
        // Offers endpoint takes quite long, hence one loader
        cy.get('[data-testid="loader"]').should('have.length', 1);
      });
  });

  it('should fetch offers list based on initial input', function() {
    cy.get('[data-testid="hackerId"]').then($elem => {
      cy.route(`${apiUrl}/scrapAskHnById?id=${$elem[0].value}`).as('getOffers');
      cy.visit('/');
      cy.wait('@getOffers')
        .then(({ status }) => {
          expect(status).to.equal(200);
          cy.get('[data-testid="loader"]').should('not.exist');
        });
    });
  });

  it('should allow user to check other news site', function() {
    const id = '17663077';

    cy.visit('/');
    cy.wait(15000);
    cy.get('[data-testid="hackerId"]').clear().type(id);
    cy.get('[data-testid="loader"]').should('have.length', 1);

    cy.route(`${apiUrl}/scrapAskHnById?id=${id}`).as('getCustomOffers');
    cy.wait('@getCustomOffers')
      .then(({ status }) => {
        expect(status).to.equal(200);
        cy.get('[data-testid="loader"]').should('not.exist');
      });
  });

  it('should show error component when user entered wrong ID', function() {
    const wrongId = 'asdasdsadsad';

    cy.visit('/');
    cy.wait(15000);
    cy.get('[data-testid="hackerId"]').clear().type(wrongId);
    cy.get('[data-testid="loader"]').should('have.length', 1);

    cy.route(`${apiUrl}/scrapAskHnById?id=${wrongId}`).as('getCustomOffers');
    cy.wait('@getCustomOffers')
      .then(({ status }) => {
        expect(status).to.equal(500);
        cy.get('[data-testid="loader"]').should('not.exist');
        cy.get('[data-testid="loaderError"]').should('exist');
      });
  });

  it('should allow user to change type filter', function() {
    checkFilter('types');
  });

  it('should allow user to change currencies filter', function() {
    checkFilter('currencies');
  });

  it('should allow user to change remote filter', function() {
    checkFilter('currencies', 5);
  });
  
  it('should allow user to show more offers', function() {
    cy.visit('/');
    cy.wait(15000);
    cy.get('[data-testid="offerElement"]').then($elems => {
      cy.get('[data-testid="showMore"]').click();
  
      cy.get('[data-testid="offerElement"]').then($updatedElems => {
        expect($elems.length).to.be.lessThan($updatedElems.length);
      });
    });
  });
});
