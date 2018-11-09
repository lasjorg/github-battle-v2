import axios from 'axios';
// TODO: Better error handling
// Battling users that do not exist causes a TypeError in Results.js

const getProfile = async username => {
  const response = await fetch(`http://api.github.com/users/${username}`);

  return response.json();
};

const getRepos = async username => {
  const response = await fetch(
    `http://api.github.com/users/${username}/repos?&per_page=100`
  )
  return response.json();
};

const getStarCount = repos => {
  return repos.reduce(
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

  const response = await fetch(encodeURI).catch(handleError);

  const repos = await response.json();

  return repos.items;
};

export { fetchPopularRepos, battle };
