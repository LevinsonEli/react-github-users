import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
    const [githubUser, setGithubUser] = useState(mockUser);
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollowers] = useState(mockFollowers);
    const [requests, setRequests] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({ show: false, msg: ''});
    
    const searchGithubUser = async (user) => {
      toogleError();
      setIsLoading(true);
      const response = await axios(`${rootUrl}/users/${user}`).catch(err => console.log(err));
      if (response) {
        setGithubUser(response.data);
        const { login, followers_url } = response.data;
        await Promise.allSettled([
          axios(`${rootUrl}/users/${login}/repos?pre_page=100`),
          axios(`${followers_url}?per_page=100`),
        ]).then((results) => {
          const [repos, followers] = results;
          if (repos.status === 'fulfilled') 
            setRepos(repos.value.data);
          if (followers.status === 'fulfilled')
            setFollowers(followers.value.data);
        });
      } else {
        toogleError(true, 'no user with such a name');
      }
      setIsLoading(false);
      checkRequests();
    }
    
    const checkRequests = () => {
      axios(`${rootUrl}/rate_limit`)
        .then(({ data }) => {
          let { rate: { remaining } } = data;
          setRequests(remaining);
          if (remaining === 0)
          toogleError(true, 'hourly rate limit exeeded');
        })
        .catch(err => console.log(err));
    }

    function toogleError(show = false, msg = '') {
      setError({ show, msg });
    }

    useEffect(checkRequests, []);

    return (
      <GithubContext.Provider
        value={{
          githubUser,
          setGithubUser,
          repos,
          setRepos,
          followers,
          setFollowers,
          requests,
          error,
          searchGithubUser,
          isLoading,
        }}
      >
        {children}
      </GithubContext.Provider>
    );
}

export {
    GithubProvider,
    GithubContext,
}
