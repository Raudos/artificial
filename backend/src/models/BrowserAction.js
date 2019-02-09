class BrowserAction {
  constructor(selector) {
    this.selector = selector;
    
    this.click = this.click.bind(this);
    this.type = this.type.bind(this);
    this.clickNthElement = this.clickNthElement.bind(this);
  }
  
  click(page = false) {
    if (page) {
      return page.click(this.selector);
    }
    
    cy.get(this.selector).click();
  }
  
  type(text, page = false) {
    if (page) {
      return page.type(this.selector, text);
    }
    
    cy.get(this.selector).type(text);
  }
  
  clickNthElement(child, page = false) {
    const childElem = `${this.selector}:nth-child(${child})`;
    
    if (page) {
      return page.click(childElem);
    }
    
    cy.get(childElem).click();
  }
}

module.exports = BrowserAction;
