import axios from 'axios';
// TODO: Better error handling
// Battling users that do not exist causes a TypeError in Results.js

const getProfile = async username => {
  const profile = await axios.get(`http://api.github.com/users/${username}`).catch(handleError);

  return profile.data;
};

const getRepos = username => {
  return axios.get(
    `http://api.github.com/users/${username}/repos?&per_page=100`
  ).catch(handleError)
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

const getUserData = async player => {
  const [profile, repos] = await Promise.all([
    getProfile(player),
    getRepos(player)
  ]).catch(handleError);

  return {
    profile,
    score: calculateScore(profile, repos)
  };
};

const sortPlayers = players => {
  return players.sort((a, b) => b.score - a.score);
};

const battle = async players => {
  const results = await Promise.all(players.map(getUserData)).catch(
    handleError
  );

  return results === null ? results : sortPlayers(results);
};

const fetchPopularRepos = async lang => {
  const encodeURI = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${lang}&sort=stars&order=desc&type=Repositories`
  );

  const repos = await axios.get(encodeURI).catch(handleError);

  return repos.data.items;
};

export { fetchPopularRepos, battle };
