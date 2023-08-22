describe('Landing page', () => {

        describe('When you visit home', () => {

            it('Should load index page', () => {
                cy.visit('/')
            });

            describe('get all hotels', () => {
                it('Should open the mmenu', () => {
                    cy.visit('/');
                    cy.get('[data-cy=hotels-id-1]').click();
                    // cy.visit('/hotel/1')
                    cy.url().should('include', '/hotel/1')
                })
        })
    })
})