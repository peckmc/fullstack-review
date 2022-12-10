const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  name: String,
  html_url: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  const savePromise = new Promise(function (resolve, reject) {
    Repo.deleteMany({})
    .then(onDelete => {
      for (const repo of repos) {
        Repo.exists({ html_url: repo.html_url }).exec()
        .then(dupeExists => {
          if(!dupeExists) {
            console.log('inside for loop!');
            const repoObj = { name: repo.name, html_url: repo.html_url, forks: repo.forks };
            Repo.create(repoObj);
          }
        })
      }
    })
    .then(onceSaved => {
      resolve();
    })
    .catch(err => {
      console.log('save error', err);
    })
  });
  return savePromise;
}

let getTop25 = () => {
  const top25Promise = new Promise(function (resolve, reject) {
    Repo.find({}).limit(25).sort('-forks').exec()
    .then(results => {
      resolve(results);
    })
    .catch(err => {
      console.log('top 25 error', err);
    })
  });
  return top25Promise;
}

module.exports.save = save;
module.exports.getTop25 = getTop25;