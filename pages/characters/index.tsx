import {
  CCol,
  CContainer,
  CFormSelect,
  CPagination,
  CPaginationItem,
  CRow,
} from "@coreui/react";
import type { NextPage } from "next";
import CharacterCard, { CharacterModel } from "components/cards/CharacterCard";
import FilterForm from "components/form/FilterForm";
import { shadowedChunk } from "utils/shadowedChunk";
import Link from "next/link";
import { useSession } from "next-auth/react";
import AccessDenied from "components/AccessDenied";
import React, { useEffect, useState } from "react";

const CharacterPage: NextPage = () => {
  const { data: session, status } = useSession();
  const [content, setContent] = useState<CharacterModel[]>();
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<Record<string, any>>();
  const loading = status === "loading";

  const isCanGoToPrevious = () => {
    return (pagination?.currentPage || 1) > 1;
  };

  const isCanGoToNext = () => {
    return (pagination?.currentPage || 1) < (pagination?.totalPages || 1);
  };

  const isPageSameAsCurrent = (page: number) => {
    return page === (pagination?.currentPage || 1);
  };

  const nextPage = () => {
    if (!isCanGoToNext()) return;

    setPage((pagination?.currentPage || 1) + 1);
  };

  const previousPage = () => {
    if (!isCanGoToPrevious()) return;

    setPage((pagination?.currentPage || 1) - 1);
  };

  const fetchData = async () => {
    const params = new URLSearchParams({
      page: String(page),
    }).toString();
    const res = await fetch(`/api/characters?${params}`);
    const json = await res.json();
    if (json.results) {
      setContent(json.results);
    }
    if (json.pagination) {
      setPagination(json.pagination);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!session) return;

    fetchData();
  }, [session, page]);

  if (!session) return <AccessDenied />;

  return (
    <>
      <CContainer sm>
        <h2 className="text-center mb-3">Hogwarts Characters</h2>
        <p className="text-center">Find your favorite character</p>

        <div className="mb-3">
          <FilterForm />
        </div>

        {content ? (
          shadowedChunk(content, 5).map((group, groupIndex) => (
            <CRow className="g-3 mb-3" key={groupIndex}>
              {group.map((character) => (
                <CCol key={character.id} xs={6} md={4} lg>
                  {character && (
                    <Link href={"/characters/" + character.id}>
                      <a>
                        <CharacterCard
                          poster={character.image}
                          name={character.name}
                          gender={character.gender}
                          species={character.species}
                        />
                      </a>
                    </Link>
                  )}
                </CCol>
              ))}
            </CRow>
          ))
        ) : (
          <p className="text-center">Loading...</p>
        )}

        {pagination && (
          <CPagination
            aria-label="Page navigation characters"
            className="justify-content-end"
          >
            <CPaginationItem
              disabled={!isCanGoToPrevious()}
              style={{ cursor: "pointer" }}
              onClick={previousPage}
            >
              Previous
            </CPaginationItem>
            {(pagination.pages || []).map((p: number) => (
              <CPaginationItem
                key={p}
                disabled={isPageSameAsCurrent(p)}
                onClick={() => setPage(p)}
                style={{ cursor: "pointer" }}
              >
                {p}
              </CPaginationItem>
            ))}
            <li className="page-item">
              <CFormSelect
                aria-label="Select page"
                value={page}
                onChange={(e) =>
                  setPage(isNaN(+e.target.value) ? 1 : +e.target.value)
                }
              >
                {Array.from({ length: pagination.totalPages }, (_, i) => (
                  <option value={i + 1}>{i + 1}</option>
                ))}
              </CFormSelect>
            </li>
            <CPaginationItem
              disabled={!isCanGoToNext()}
              style={{ cursor: "pointer" }}
              onClick={nextPage}
            >
              Next
            </CPaginationItem>
          </CPagination>
        )}
      </CContainer>
    </>
  );
};

export default CharacterPage;
