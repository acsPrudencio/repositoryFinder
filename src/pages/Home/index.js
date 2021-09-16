import React, {useState} from 'react';
import axios from 'axios';
import * as S from './styled'
import { useHistory } from 'react-router-dom';

function App(props) {
  const history = useHistory();
  const [ usuario, setUsuario] = useState('');
  const [ erro, setErro ] = useState(false);
  function handlePesquisa(){
    axios.get(`https://api.github.com/users/${usuario}/repos`).then(response => {
      const repositories = response.data;
      const repositoriesName = []; 
      repositories.map((repository) =>{
        repositoriesName.push(repository.name);
      });
        localStorage.setItem('repositoriesName', JSON.stringify(repositoriesName));
        setErro(false);
        history.push('/repositories');
    })
    .catch(err => {
      setErro(true);
    });
  }

  return (
    <S.HomeContainer>
     <S.Img src="https://github.githubassets.com/images/modules/logos_page/Octocat.png" alt='logo-mascote-github' />
      <S.Contente>
          <S.Input className="usuarioIput" value={usuario}placeholder="Usuário" onChange={ e => setUsuario(e.target.value)}/>
          <S.Button type="button" onClick={handlePesquisa}>Pesquisar</S.Button>
        </S.Contente>
        { erro ? <S.ErroMsg>Ocorreu um erro. Tente novamente</S.ErroMsg>: ''}
    </S.HomeContainer>
  );
}

export default App;
