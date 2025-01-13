import { useParams } from 'react-router-dom';

const CharacterDetailsCard = () => {
  const { id } = useParams<{ id: string }>(); 

  return (
    <div>
      <h1>Character Details</h1>
      <p>Character ID: {id}</p>
      {/* Aqui você pode usar o id para fazer uma requisição de dados ou exibir informações do personagem */}
    </div>
  );
};

export default CharacterDetailsCard;
