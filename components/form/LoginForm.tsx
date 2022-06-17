import React, { useEffect, useState } from "react";
import {
  CFormInput,
  CForm,
  CCardBody,
  CCardTitle,
  CCard,
  CButton,
  CAlert,
} from "@coreui/react";
import { signIn, useSession } from "next-auth/react";
import CompactContainer from "components/containers/CompactContainer";
import { useRouter } from "next/router";
import validator from "validator";

const LoginForm: React.FC<{ title?: string }> = ({ title }) => {
  const { data: session } = useSession();
  const [touched, setTouched] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const router = useRouter();

  /**
   * Simple Response Validation Effect
   */
  useEffect(() => {
    if (router.query.error) {
      setLoginError(router.query.error as string);
      setEmail(router.query.email as string);
    }
  }, [router]);

  /**
   * Simple Client Validation Effect
   */
  useEffect(() => {
    setTouched(true);

    if (!touched) return;

    if (!validator.isEmail(email as string))
      return setLoginError("Email is not valid");

    if (!validator.isStrongPassword(password as string))
      return setLoginError(
        "Password must contain at least lowercase, uppercase, number, special characters and minimal length is 8"
      );

    setLoginError("");
  }, [email, password]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoggingIn(true);

    signIn("credentials", {
      email,
      password,
      ...(loginError ? { callbackUrl: "/" } : {}),
    });
  };

  if (session) return null;

  return (
    <>
      <CompactContainer>
        <CCard>
          <CCardBody>
            {loginError && <CAlert color="danger">{loginError}</CAlert>}
            <CCardTitle className="text-center mb-5 fs-5 fw-light">
              {title ? title : "Login"}
            </CCardTitle>
            <CForm onSubmit={handleLogin}>
              <div className="mb-3">
                <CFormInput
                  type="email"
                  id="inputEmail"
                  label="Email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <CFormInput
                  type="password"
                  id="inputPassword"
                  label="Password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-grid mb-3">
                <CButton disabled={isLoggingIn} type="submit">
                  Login
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CompactContainer>
    </>
  );
};

export default LoginForm;
