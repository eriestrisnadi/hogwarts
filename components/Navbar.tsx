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
import Link from "next/link";
import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [visible, setVisible] = useState(false);

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
            <CButton className="d-flex" type="submit" variant="outline">
              Sign In
            </CButton>
          </CCollapse>
        </CContainer>
      </CNavbar>
    </>
  );
};

export default Navbar;
