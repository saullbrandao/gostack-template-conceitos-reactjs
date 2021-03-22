import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

const App = () => {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  const handleAddRepository = async () => {
    const response = await api.post('repositories', {
      "title": `Test App ${Date.now()}`,
      "URL": "github.com/saullbrandao/test-app",
      "techs": ["reactjs"]
    })
    const repository = response.data
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => <li key={repo.id}>
          {repo.title}
          <button onClick={() => handleRemoveRepository(1)}>
            Remover
          </button>
        </li>)}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
