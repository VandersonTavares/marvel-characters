import { Link, useParams } from "react-router-dom";
import { getDetailedCharacter } from "../../services/characterService";
import { getComic } from "../../services/comicService";
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

interface Comic {
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

const CharacterDetailsCard = () => {
  const { id } = useParams<{ id: string }>();

  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [comicLoading, setComicLoading] = useState(true);
  const [comic, setComic] = useState<Comic[]>([]);

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

  const fetchComics = async () => {
    setComicLoading(true);
    try {
      const newComics = await getComic(Number(id));
      setComic(newComics);
    } catch (error) {
      console.error("Error fetching comics:", error);
    } finally {
      setComicLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
    fetchComics();
  }, [id]);

  console.log("COMIS DO GET", comic);

  return (
    <>
      <div className="button-voltar">
        <div className="voltarButton">
          <Link to={"/"}>Voltar</Link>
        </div>
      </div>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          character && (
            <>
              <h1>{character.name}</h1>
              <div className="character-details">
                <div className="hero-img">
                  <img
                    src={`${character.thumbnail?.path}${
                      "." + character.thumbnail?.extension
                    }`}
                  />{" "}
                </div>
                <div className="hero-details">
                  <p>{character.description}</p>
                  {!character.description && <p>Sem descrição</p>}
                </div>
              </div>
            </>
          )
        )}
      </div>
      <div className="my-comic-container">
        <h1>Comics</h1>
        {comicLoading ? (
          <p className="load-more-button">Loading comics...</p>
        ) : (
          <div className="my-comic-list">
            {comic.map((comic) => (
              <div key={comic.title}>
                <img
                  src={`${comic.thumbnail?.path}${
                    "." + comic.thumbnail?.extension
                  }`}
                  alt={comic.title}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CharacterDetailsCard;
