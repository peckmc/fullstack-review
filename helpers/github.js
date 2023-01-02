const axios = require('axios');
const config = require('../config.js');

module.exports.getReposByUsername = (username) => {
  let options = {
    url: `http://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  const axiosReq = new Promise(function(resolve, reject) {
    axios.get(options.url, options.headers)
    .then(userData => {
      resolve(userData);
    })
    .catch(err => {
      reject(err);
    })
  });

  return axiosReq;
}