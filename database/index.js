const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  name: String,
  html_url: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

module.exports.save = (repos) => {
  var promises = repos.map((repo) => {
    return new Promise(function (resolve, reject) {
      Repo.exists({ html_url: repo.html_url })
      .then(dupeExists => {
        if(!dupeExists) {
          const repoObj = { name: repo.name, html_url: repo.html_url, forks: repo.forks };
          Repo.create(repoObj);
        }
      })
      .then(() => {
        resolve();
      })
      .catch()
    })
  })
  return Promise.all(promises);
}

module.exports.getTop25 = () => {
  const top25Promise = new Promise(function (resolve, reject) {
    Repo.find({}).limit(25).sort('-forks')
    .then(results => {
      resolve(results);
    })
    .catch(err => {
      console.log('top 25 error', err);
    })
  });
  return top25Promise;
}

module.exports.getRepoCount = () => {
  const countPromise = new Promise(function (resolve, reject) {
    Repo.count({})
    .then(count => {
      resolve(count);
    })
    .catch(err => {
      console.log('top 25 error', err);
    })
  });
  return countPromise;
}