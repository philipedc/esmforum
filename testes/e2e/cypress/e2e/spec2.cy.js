describe('To-Do List Test', () => {
  it('Impede a adição de tarefas vazias ou apenas com espaços', () => {
	cy.visit('http://127.0.0.1:3000');
  
	cy.get('.new-todo')
	  .type('{enter}');
  
	cy.get('.todo-list li')
	  .should('not.exist');
  
	cy.get('.new-todo')
	  .type('   {enter}');
  
	cy.get('.todo-list li')
	  .should('not.exist');
  });
  
  it('Edita uma tarefa existente', () => {
	cy.visit('http://127.0.0.1:3000');
  
	cy.get('.new-todo')
	  .type('Estudar Cypress{enter}');
  
	cy.get('.todo-list li')
	  .dblclick();
  
	cy.get('.todo-list li .edit')
	  .clear()
	  .type('Estudar Cypress aprofundadamente{enter}');
  
	cy.get('.todo-list li')
	  .should('have.length', 1)
	  .and('contain', 'Estudar Cypress aprofundadamente');
  });
  it('Filtra tarefas em um cenário mais complexo', () => {
	cy.visit('http://127.0.0.1:3000');
  
	cy.get('.new-todo')
	  .type('Tarefa 1{enter}')
	  .type('Tarefa 2{enter}')
	  .type('Tarefa 3{enter}');
  
	cy.get('.todo-list li .toggle')
	  .eq(1)
	  .click();
  
	cy.contains('Active').click();
	cy.get('.todo-list li')
	  .should('have.length', 2)
	  .and('not.contain', 'Tarefa 2');
  
	cy.contains('Completed').click();
	cy.get('.todo-list li')
	  .should('have.length', 1)
	  .and('contain', 'Tarefa 2');
  
	cy.contains('All').click();
	cy.get('.todo-list li')
	  .should('have.length', 3);
  });
});