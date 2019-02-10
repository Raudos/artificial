const types = require('./Types.json');
const currencies = require('./Currencies.json');

class Offer {
  static getTypes(text) {
    return types.filter(type => text.includes(type));
  };
  
  static isRemote(text) {
    return text.includes('remote') || !text.includes('onsite');
  };
  
  static getCurrencies(text) {
    return currencies.filter(currency => text.includes(currency));
  };
  
  constructor(id, text) {
    const lcText = text.trim().toLowerCase();
    
    this.id = parseInt(id, 10);
    this.text = text.trim();
    this.remote = Offer.isRemote(lcText);
    this.types = Offer.getTypes(lcText);
    this.currencies = Offer.getCurrencies(lcText);
    this.hasSalary = Boolean(this.currencies.length);
  };
}

module.exports = Offer;
