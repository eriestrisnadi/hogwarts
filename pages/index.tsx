import { CContainer } from "@coreui/react";
import type { NextPage } from "next";
import LoginForm from "components/form/LoginForm";

const HomePage: NextPage = () => {
  return (
    <>
      <CContainer fluid>
        <h2 className="text-center mb-3">Welcome to Hogwarts</h2>
        <p className="text-center">Getting started by logging in here</p>
      </CContainer>
      <LoginForm />
    </>
  );
};

export default HomePage;
