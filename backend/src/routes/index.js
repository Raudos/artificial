const runBrowser = require('../browser/index');

module.exports = app => {
  app.get('/scrapAskHnById', async (req, res) => {
    runBrowser(req.query.id)
      .then(data => {
        res.send(JSON.stringify(data, undefined, 2));
      })
      .catch(e => {
        res.status(500).send(e);
      });
  });
};
