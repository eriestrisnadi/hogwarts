import { CContainer } from "@coreui/react";
import LoginForm from "components/form/LoginForm";

const AccessDenied = () => {
  return (
    <>
      <CContainer fluid>
        <h2 className="text-center mb-3">Access Denied</h2>
        <p className="text-center">Please login to continue</p>
      </CContainer>

      <LoginForm />
    </>
  );
};

export default AccessDenied;
