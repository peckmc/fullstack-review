const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  name: String,
  html_url: String,
  watchers_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = async (repos) => {
  for (const repo of repos) {
    var dupeExists = await Repo.exists({ html_url: repo.html_url });
    if(!dupeExists) {
      const repoObj = { name: repo.name, url: repo.html_url, watchers_count: repo.watchers_count }
      await Repo.create({ repoObj });
    }
  }
}

module.exports = save;