import axios from 'axios';
// TODO: Better error handling
// Battling users that do not exist causes a TypeError in Results.js

const getProfile = username => {
  return axios
    .get(`http://api.github.com/users/${username}`)
    .then(({ data }) => data);
};

const getRepos = username => {
  return axios.get(
    `http://api.github.com/users/${username}/repos?&per_page=100`
  );
};

const getStarCount = repos => {
  return repos.data.reduce(
    (count, { stargazers_count }) => count + stargazers_count,
    0
  );
};

const calculateScore = ({ followers }, repos) => {
  return followers * 3 + getStarCount(repos);
};

const handleError = error => {
  console.warn(error);
  return null;
};

const getUserData = player => {
  return Promise.all([getProfile(player), getRepos(player)]).then(
    ([profile, repos]) => ({
      profile,
      score: calculateScore(profile, repos)
    })
  );
};

const sortPlayers = players => {
  return players.sort((a, b) => b.score - a.score);
};

const battle = players => {
  return Promise.all(players.map(getUserData))
    .then(sortPlayers)
    .catch(handleError);
};

const fetchPopularRepos = lang => {
  const encodeURI = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${lang}&sort=stars&order=desc&type=Repositories`
  );

  return axios.get(encodeURI).then(({ data }) => data.items);
};

export { fetchPopularRepos, battle };
