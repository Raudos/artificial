const types = [
  'javascript', 'react', 'python', 'node', 'ruby', 'rails', 'django', 'angular', 'php', 'java', 'golang', 'mysql', '.net', 'typescript', 'mongodb', 'express', 'flask', 'haskell', 'ember',
];

const currencies = [
  '$', '¥', '₠', '£',
];

class Offer {
  static getTypes(text) {
    return types.filter(type => text.includes(type));
  };
  
  static isRemote(text) {
    return text.includes('remote') || !text.includes('onsite');
  };
  
  static hasSalary(text) {
    return Boolean(currencies.filter(currency => text.includes(currency)).length);
  };
  
  constructor(text) {
    const lcText = text.toLowerCase();
    
    this.text = text;
    this.remote = Offer.isRemote(lcText);
    this.types = Offer.getTypes(lcText);
    this.hasSalary = Offer.hasSalary(lcText);
  };
}

module.exports = Offer;
