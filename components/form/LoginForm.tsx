import React from "react";
import {
  CFormInput,
  CForm,
  CCardBody,
  CCardTitle,
  CCard,
  CButton,
} from "@coreui/react";
import CompactContainer from "components/containers/CompactContainer";

const LoginForm: React.FC<{ title?: string }> = ({ title }) => {
  return (
    <>
      <CompactContainer>
        <CCard>
          <CCardBody>
            <CCardTitle className="text-center mb-5 fs-5 fw-light">
              {title ? title : "Login"}
            </CCardTitle>
            <CForm>
              <div className="mb-3">
                <CFormInput
                  type="email"
                  id="inputEmail"
                  label="Email"
                  placeholder="your@email.com"
                />
              </div>
              <div className="mb-4">
                <CFormInput
                  type="password"
                  id="inputPassword"
                  label="Password"
                  placeholder="Password"
                />
              </div>
              <div className="d-grid mb-3">
                <CButton>Login</CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CompactContainer>
    </>
  );
};

export default LoginForm;
