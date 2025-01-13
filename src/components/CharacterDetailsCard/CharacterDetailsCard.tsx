import { useParams } from "react-router-dom";
import { getDetailedCharacter } from "../../services/characterService";
import { useEffect, useState } from "react";
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

const CharacterDetailsCard = () => {
  const { id } = useParams<{ id: string }>();

  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCharacters = async () => {
    setLoading(true);
    try {
      const newCharacters = await getDetailedCharacter(Number(id));
      setCharacter(newCharacters);
    } catch (error) {
      console.error("Error fetching characters:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, [id]);

  return (
    <>
      <div className="button-voltar">
        <div className="voltarButton" onClick={() => "voltar"}>
          Voltar
        </div>
      </div>
      <div>
        <h1>Character Details</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          character && (
            <div>
              <div className="hero-img">
                <img
                  src={`${character.thumbnail?.path}${
                    "." + character.thumbnail?.extension
                  }`}
                />{" "}
              </div>
              <h2>{character.name}</h2>
              <p>{character.description}</p>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default CharacterDetailsCard;
