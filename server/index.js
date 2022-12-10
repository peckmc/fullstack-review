const express = require('express');
let app = express();
const { getReposByUsername } = require('../helpers/github.js');
const { save, getTop25 } = require('../database/index.js');

app.use(express.static('./client/dist'));
app.use(express.json());

app.post('/repos', function (req, res) {
  var username = req.body.username;
  var repos;
  getReposByUsername(username)
  .then(repoResults => {
    repos = repoResults.data;
    save(repoResults.data);
  })
  .then(ifSaved => {
    res.send(repos);
  })
  .catch(err => {
    console.log(err);
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  return getTop25()
  .then(results => {
    res.send(results);
  })
  .catch(err => {
    console.log(err);
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

