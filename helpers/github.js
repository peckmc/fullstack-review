const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
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
      console.log('axios err', err);
    })
  });

  return axiosReq;
}

module.exports.getReposByUsername = getReposByUsername;