import "./styles.css";

interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail?: {
    path: string;
    extension: string;
  };
}

interface Props {
  char: Character;
}

const CharacterCard = ({ char }: Props) => {
  return (
    <div className="card">
      <div className="card-image">
        <div className="img">
          <img
            src={`${char.thumbnail?.path}${"." + char.thumbnail?.extension}`}
          />
        </div>
      </div>
      <div className="card-content">
        <h2 className="title">{char.name}</h2>
        {/* <p className="card-name">{char.description}</p> */}
      </div>
    </div>
  );
};

export default CharacterCard;
