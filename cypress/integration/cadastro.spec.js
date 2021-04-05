/// <reference types="cypress" />

let Chance = require('chance');
let chance = new Chance ();

context('Cadastro', () => {
    it('Cadastro de usuário no site', () => {
        cy.visit('index.php');

        // clicar no botão Sign In
        cy.get('.login').click();

        // Preencher as informações de e-mail (não pode ser repetido)
        cy.get('#email_create').type(chance.email());

        // Clicar no botão Create an Account
        cy.get('#SubmitCreate > span').click();

        // Preencher as informações do formulário de cadastro
        // Personal Information
        cy.get('#id_gender1').check();
        cy.get('#customer_firstname').type(chance.first());
        cy.get('#customer_lastname').type(chance.last());
        cy.get('#passwd').type('testeagilizei1010');
        cy.get('select#days').select('20');
        cy.get('select#months').select('August');
        cy.get('select#years').select('1992');

        // Your Address
        cy.get('#company').type('Empresa Fictícia');
        cy.get('#address1').type('777 Brockton Avenue, Abington MA 2351, Empresa Fictícia');
        cy.get('#city').type('San Francisco');
        cy.get('select#id_state').select('5' , { force: true });
        cy.get('#postcode').type('99705');
        cy.get('#phone_mobile').type(chance.phone({ formatted: false}));
        cy.get('#alias').type('Address Alias');

        // Clicar no botão Register
        cy.get('#submitAccount').click();

        // Validar que foi redirecionado para a url correta
        cy.url().should('contain', 'controller=my-account');

        // Validar exibição do texto 'Welcome to your account'
        cy.get('.info-account').should('contain', 'Welcome to your account');

    });    
});