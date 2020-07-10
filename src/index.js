import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const getProjectsQuery = `
query getProjects {
  viewer {
    projects {
      id
    }
  }
}
`;

const App = () => {
  const [state, setState] = useState([]);

  const onClick = async () => {
    const response = await fetch('http://localhost:8080/api/graphql', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify({ query: getProjectsQuery })
    });
    const json = await response.json();
    const projectIds = json.data.viewer.projects.map(project => project.id);
    setState(projectIds);
  };

  return (
    <div>
      <button onClick={onClick}>Free Money!</button>
      <ul>
        {state.map(entry => <li key={entry}>{entry}</li>)}
      </ul>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
