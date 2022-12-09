const express = require('express');
let app = express();
const { getReposByUsername } = require('../helpers/github.js');
const { save } = require('../database/index.js');

app.use(express.static('./client/dist'));
app.use(express.json());

app.post('/repos', function (req, res) {
  var username = req.body.username;
  var repos;
  return getReposByUsername(username)
  .then(repoResults => {
    // console.log(repoResults);
    repos = repoResults;
    save(repoResults);
  })
  .then(ifSaved => {
    res.render('/repos');
  })
  .catch(err => {
    console.log(err);
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

