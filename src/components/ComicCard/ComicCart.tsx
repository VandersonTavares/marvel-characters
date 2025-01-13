import React from "react";
import "./styles.css";

interface Comic {
  id: number;
  title: string;
}

interface ComicCardProps {
  comics: Comic[];
}

const ComicCard: React.FC<ComicCardProps> = ({ comics }) => {
  return (
    <div className="comic-card">
      {comics.map((comic) => (
        <div key={comic.id} className="comic-item">
          {comic.title}
        </div>
      ))}
    </div>
  );
};

export default ComicCard;
