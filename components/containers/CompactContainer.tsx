import React from "react";
import { CRow, CCol, CContainer } from "@coreui/react";

const CompactContainer: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <CContainer sm>
        <CRow>
          <CCol sm={9} md={7} lg={5} xl={4} className="mx-auto">
            {children}
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
};

export default CompactContainer;
