import {
  CNavbar,
  CContainer,
  CNavbarBrand,
  CNavbarToggler,
  CCollapse,
  CNavbarNav,
  CNavItem,
  CNavLink,
  CButton,
} from "@coreui/react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      <CNavbar expand="lg" colorScheme="light" className="bg-light">
        <CContainer fluid>
          <Link href="/" passHref>
            <CNavbarBrand>Hogwarts</CNavbarBrand>
          </Link>
          <CNavbarToggler
            aria-label="Toggle navigation"
            aria-expanded={visible}
            onClick={() => setVisible(!visible)}
          />
          <CCollapse className="navbar-collapse" visible={visible}>
            <CNavbarNav className="me-auto mb-2 mb-lg-0">
              <CNavItem>
                <Link href="/characters" passHref>
                  <CNavLink>Characters</CNavLink>
                </Link>
              </CNavItem>
            </CNavbarNav>
            {!session ? (
              <Link href="/">
                <a className="btn btn-outline-primary d-flex">Sign In</a>
              </Link>
            ) : (
              <CButton
                className="d-flex"
                type="button"
                variant="outline"
                onClick={() => signOut()}
              >
                Sign Out
              </CButton>
            )}
          </CCollapse>
        </CContainer>
      </CNavbar>
    </>
  );
};

export default Navbar;
