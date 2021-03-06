import { CForm, CInputGroup, CFormInput, CButton } from "@coreui/react";
import React, { useState } from "react";

const FilterForm: React.FC<{
  onSearch?: React.EventHandler<React.ChangeEvent<HTMLInputElement>>;
}> = ({ onSearch }) => {
  // asc = true, desc = false
  const [sort, setSort] = useState(true);
  const [searchEvent, setSearchEvent] =
    useState<React.ChangeEvent<HTMLInputElement>>();

  const handleSearch = (e: React.FormEvent) => {
    if (!e) return;

    e.preventDefault();

    if (!searchEvent || !onSearch) return;

    onSearch(searchEvent);
  };

  return (
    <div className="d-flex">
      <CForm onSubmit={handleSearch} className="w-100">
        <CInputGroup>
          <CFormInput
            placeholder="Search character"
            aria-label="Search character"
            onChange={setSearchEvent}
          />
          <CButton
            type="submit"
            color="secondary"
            variant="outline"
            id="button-search-icon"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </CButton>
        </CInputGroup>
      </CForm>

      <CButton
        type="button"
        color="secondary"
        variant="outline"
        id="button-search-icon"
        className="ms-2"
        onClick={() => setSort(!sort)}
      >
        {sort ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            id="ascending"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            id="descending"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
            />
          </svg>
        )}
      </CButton>
    </div>
  );
};

export default FilterForm;
