const express = require('express');
let app = express();
const { getReposByUsername } = require('../helpers/github.js');
const { save, getTop25, getRepoCount } = require('../database/index.js');

app.use(express.static('./client/dist'));
app.use(express.json());

app.post('/repos', function (req, res) {
  var repoCount = 0;

  getReposByUsername(req.body.username)
  .then(repoResults => {
    repoCount = repoResults.data.length;
    return save(repoResults.data);
  })
  .then(top25 => {
    res.status(200).send();
  })
  .catch(err => {
    res.send('search error');
  })
});

app.get('/repos', function (req, res) {
  var top25 = [];
  return getTop25()
  .then(results => {
    top25 = results;
    return getRepoCount()
  })
  .then(repoCount => {
    res.status(200).send({ 'top25': top25, 'repoCount': repoCount });
  })
  .catch(err => {
    res.status(500).send('error loading repo list');
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});