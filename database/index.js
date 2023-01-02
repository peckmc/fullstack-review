const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  name: String,
  html_url: {
    type: String,
    unique: true
  },
  forks: Number,
});

let Repo = mongoose.model('Repo', repoSchema);

module.exports.save = (repos) => {
  var promises = repos.map((repo) => {
    const repoObj = { name: repo.name, html_url: repo.html_url, forks: repo.forks };
    return Repo.create(repoObj)
    .catch(err => {
      throw new Error(err.message);
    })
  });
  return Promise.all(promises);
}

module.exports.getTop25 = () => {
  return Repo.find({}).limit(25).sort('-forks')
  .catch(err => {
    throw new Error(err.message);
  })
}

module.exports.getRepoCount = () => {
  return Repo.count({})
  .catch(err => {
    throw new Error(err.message);
  })
}