import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';

const Repos = () => {
  const { repos } = React.useContext(GithubContext);
  const languagesMap = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;
    if (!language)
      return total;
    if (!total[language])
      total[language] = { label: language, value: 1, stars: stargazers_count };
    else {
      total[language].value += 1;
      total[language].stars += stargazers_count;
    }
    return total;
  }, {});

  const languagesChartArr = Object.values(languagesMap)
    .sort((lang1, lang2) => {
      return lang2.value - lang1.value;
    })
    .slice(0, 5);
  const starsChartArr = Object.values(languagesChartArr).sort((a,b) => b.stars - a.stars).map(item => {
    return {...item, value: item.stars};
  }).slice(0, 5);

  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count, name, forks } = item;
      total.stars[stargazers_count] = { label: name, value: stargazers_count };
      total.forks[forks] = { laabel: name, value: forks };
      return total;
    },
    {
      stars: {},
      forks: {},
    }
  );

  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        {/* <ExampleChart data={chartData} /> */}
        <div>
          <Pie3D data={languagesChartArr} />
        </div>
        <div>
          <Doughnut2D data={starsChartArr} />
        </div>
        <div>
          <Column3D data={stars} />
        </div>
        <div>
          <Bar3D data={starsChartArr} />
        </div>
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
