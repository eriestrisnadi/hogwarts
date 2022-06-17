import React, { useState } from "react";
import styled from "@emotion/styled";

export interface CharacterModel {
  name?: string;
  species?: string;
  gender?: string;
  poster?: string;
  active?: boolean;
}

const cardPositionMap = {
  name: {
    bottom: 50,
    left: 10,
  },
  species: {
    bottom: 10,
    right: 10,
  },
  gender: {
    bottom: 30,
    left: 10,
  },
};

const Card = styled("div")(() => ({
  backgroundColor: "#fff",
  boxShadow: "0px 0px 25px rgba(0, 0, 0, 0.1)",
  backgroundPosition: "center",
  overflow: "hidden",
  position: "relative",
  borderRadius: 10,
  "& .character-poster": {
    transition: "all linear 0.25s",
    borderRadius: 10,
    width: "100%",
    objectFit: "cover",
    aspectRatio: "3/4",
    filter: "grayscale(100%)",
    "&.active": {
      filter: "none",
    },
  },
  "& .character-name": {
    ...cardPositionMap.name,
    position: "absolute",
    fontSize: 18,
    color: "#FFF",
    textShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
    fontWeight: "bold",
    transition: "all linear 0.25s",
  },
  "& .character-species": {
    ...cardPositionMap.species,
    position: "absolute",
    color: "#FFF",
    transition: "all linear 0.25s",
  },
  "& .character-gender": {
    position: "absolute",
    ...cardPositionMap.gender,
    color: "#FFF",
    fontSize: 14,
    transition: "all linear 0.25s",
  },
  "&:hover": {
    "& .character-poster": {
      filter: "none",
    },
    "& .character-name": {
      bottom: cardPositionMap.name.bottom + 10,
    },
    "& .character-species": {
      right: cardPositionMap.species.right + 10,
    },
    "& .character-gender": {
      bottom: cardPositionMap.gender.bottom + 10,
    },
  },
}));

const CharacterCard: React.FC<CharacterModel> = ({
  name,
  species,
  gender,
  poster,
  active,
}) => {
  const [sourcePoster, setSourcePoster] = useState(poster);

  return (
    <>
      <Card className="character-card">
        <img
          src={sourcePoster}
          onError={() => setSourcePoster("/images/img-placeholder.png")}
          className={["character-poster", ...(active ? ["active"] : [])].join(
            " "
          )}
        />
        {name && <div className="character-name">{name}</div>}
        {gender && <div className="character-gender">{gender}</div>}
        {species && <div className="character-species">{species}</div>}
      </Card>
    </>
  );
};

export default CharacterCard;
