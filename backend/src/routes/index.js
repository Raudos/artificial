const runBrowser = require('../browser/index');
const types = require('../models/Types.json');
const currencies = require('../models/Currencies.json');

module.exports = app => {
  app.get('/scrapAskHnById', async (req, res) => {
    runBrowser(req.query.id)
      .then(data => {
        res.send(data);
      })
      .catch(e => {
        res.status(500).send(e);
      });
  });
  
  app.get('/getTypes', async (req, res) => {
    res.send(types);
  });
  
  app.get('/getCurrencies', async (req, res) => {
    res.send(currencies);
  });
};
