import { CCard, CCardBody, CCol, CContainer, CRow } from "@coreui/react";
import CharacterCard from "components/cards/CharacterCard";
import type { NextPage } from "next";
import React from "react";
import { humanizeBoolean } from "utils/humanizeBoolean";

const Fieldset: React.FC<{
  title?: React.ReactNode;
  children?: React.ReactNode;
}> = ({ title, children }) => (
  <>
    <fieldset className="row mb-3">
      <legend className="col-form-label col-sm-2 pt-0 fw-bold text-capitalize">
        {title}
      </legend>
      <CCol sm={10} className="text-capitalize">
        {children}
      </CCol>
    </fieldset>
  </>
);

const CharacterDetailPage: NextPage = () => {
  const dump = {
    name: "Marcus Belby",
    alternate_names: [],
    species: "human",
    gender: "male",
    house: "Ravenclaw",
    dateOfBirth: "",
    yearOfBirth: "",
    wizard: true,
    ancestry: "",
    eyeColour: "",
    hairColour: "",
    wand: {
      wood: "",
      core: "",
      length: "",
    },
    patronus: "",
    hogwartsStudent: true,
    hogwartsStaff: false,
    actor: "Robert Knox",
    alternate_actors: [],
    alive: true,
    image: "",
  };

  return (
    <>
      <CContainer sm>
        <CRow className="g-3">
          <CCol sm={3}>
            <CharacterCard active poster={dump.image} />
          </CCol>
          <CCol sm={9}>
            <CCard>
              <CCardBody>
                <h2>{dump.name}</h2>
                <h5>{dump.alternate_names.join()}</h5>
                <hr />
                <Fieldset title="Species">{dump.species || "-"}</Fieldset>
                <Fieldset title="Gender">{dump.gender || "-"}</Fieldset>
                <Fieldset title="House">{dump.house || "-"}</Fieldset>
                <Fieldset title="Date Of Birth">
                  {dump.dateOfBirth || "-"}
                </Fieldset>
                <Fieldset title="Year Of Birth">
                  {dump.yearOfBirth || "-"}
                </Fieldset>
                <Fieldset title="Wizard">
                  {humanizeBoolean(dump.wizard)}
                </Fieldset>
                <Fieldset title="Ancestry">{dump.ancestry || "-"}</Fieldset>
                <Fieldset title="Eye Color">{dump.eyeColour || "-"}</Fieldset>
                <Fieldset title="Hair Color">{dump.hairColour || "-"}</Fieldset>
                <Fieldset title="Wand Detail">
                  <br />
                  <br />
                  <Fieldset title="Wood">{dump.wand.wood || "-"}</Fieldset>
                  <Fieldset title="Core">{dump.wand.core || "-"}</Fieldset>
                  <Fieldset title="Length">
                    {dump.wand.length ? dump.wand.length + " inches" : "-"}
                  </Fieldset>
                  <hr />
                </Fieldset>
                <Fieldset title="Actor">{dump.actor || "-"}</Fieldset>
                <Fieldset title="Alternate Actors">
                  {dump.alternate_actors.join() || "-"}
                </Fieldset>
                <Fieldset title="Alive">{humanizeBoolean(dump.alive)}</Fieldset>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
};

export default CharacterDetailPage;
