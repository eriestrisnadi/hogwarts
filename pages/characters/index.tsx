import { CCol, CContainer, CRow } from "@coreui/react";
import type { NextPage } from "next";
import CharacterCard from "components/cards/CharacterCard";
import FilterForm from "components/form/FilterForm";
import { shadowedChunk } from "utils/shadowedChunk";
import Link from "next/link";

const CharacterPage: NextPage = () => {
  const dumps = shadowedChunk(
    new Array(7).fill({
      name: "Harry Potter",
      species: "human",
      gender: "male",
      poster: "http://hp-api.herokuapp.com/images/harry.jpg",
    }),
    5
  );

  return (
    <>
      <CContainer sm>
        <h2 className="text-center mb-3">Hogwarts Characters</h2>
        <p className="text-center">Find your favorite character</p>

        <div className="mb-3">
          <FilterForm />
        </div>

        {dumps.map((group, groupIndex) => (
          <CRow className="g-3 mb-3" key={groupIndex}>
            {group.map((characterProps, characterIndex) => (
              <CCol key={characterIndex} xs={6} md={4} lg>
                {characterProps && (
                  <Link href={"/characters/" + characterIndex}>
                    <a>
                      <CharacterCard {...characterProps} />
                    </a>
                  </Link>
                )}
              </CCol>
            ))}
          </CRow>
        ))}
      </CContainer>
    </>
  );
};

export default CharacterPage;
