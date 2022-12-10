const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  name: String,
  html_url: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = async (repos) => {
  await Repo.deleteMany({});
  for (const repo of repos) {
    const dupeExists = await Repo.exists({ html_url: repo.html_url }).exec();
    if(!dupeExists) {
      const repoObj = { name: repo.name, url: repo.html_url, forks: repo.forks };
      await Repo.create(repoObj);
    }
  }
}

let getTop25 = async () => {
  var results = await Repo.find().limit(25).sort('-forks').exec();
  return results;
}

module.exports.save = save;
module.exports.getTop25 = getTop25;