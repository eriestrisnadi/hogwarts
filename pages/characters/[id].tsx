import { CCard, CCardBody, CCol, CContainer, CRow } from "@coreui/react";
import AccessDenied from "components/AccessDenied";
import CharacterCard, { CharacterModel } from "components/cards/CharacterCard";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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
  const { data: session, status } = useSession();
  const [content, setContent] = useState<CharacterModel>();
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { id } = router.query;

  const fetchData = async () => {
    const res = await fetch(`/api/characters/${id}`);
    const json = await res.json();
    if (json.results) {
      setContent(json.results);
    }
  };

  useEffect(() => {
    if (status === "loading") return;
    if (!session) return;

    fetchData();
  }, [session, page]);

  if (!session) return <AccessDenied />;
  if (!content) return <p className="text-center">Loading...</p>;

  return (
    <>
      <CContainer sm>
        <CRow className="g-3">
          <CCol sm={3}>
            <CharacterCard active poster={content?.image} />
          </CCol>
          <CCol sm={9}>
            <CCard>
              <CCardBody>
                <h2>{content?.name}</h2>
                <h5>{content?.alternate_names.join()}</h5>
                <hr />
                <Fieldset title="Species">{content?.species || "-"}</Fieldset>
                <Fieldset title="Gender">{content?.gender || "-"}</Fieldset>
                <Fieldset title="House">{content?.house || "-"}</Fieldset>
                <Fieldset title="Date Of Birth">
                  {content?.dateOfBirth || "-"}
                </Fieldset>
                <Fieldset title="Year Of Birth">
                  {content?.yearOfBirth || "-"}
                </Fieldset>
                <Fieldset title="Wizard">
                  {humanizeBoolean(content?.wizard)}
                </Fieldset>
                <Fieldset title="Ancestry">{content?.ancestry || "-"}</Fieldset>
                <Fieldset title="Eye Color">
                  {content?.eyeColour || "-"}
                </Fieldset>
                <Fieldset title="Hair Color">
                  {content?.hairColour || "-"}
                </Fieldset>
                <Fieldset title="Wand Detail">
                  <br />
                  <br />
                  <Fieldset title="Wood">{content?.wand.wood || "-"}</Fieldset>
                  <Fieldset title="Core">{content?.wand.core || "-"}</Fieldset>
                  <Fieldset title="Length">
                    {content?.wand.length
                      ? content?.wand.length + " inches"
                      : "-"}
                  </Fieldset>
                  <hr />
                </Fieldset>
                <Fieldset title="Actor">{content?.actor || "-"}</Fieldset>
                <Fieldset title="Alternate Actors">
                  {content?.alternate_actors.join() || "-"}
                </Fieldset>
                <Fieldset title="Alive">
                  {humanizeBoolean(content?.alive)}
                </Fieldset>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
};

export default CharacterDetailPage;
