import { CContainer } from "@coreui/react";
import type { NextPage } from "next";

import LoginForm from "components/form/LoginForm";
import { useSession } from "next-auth/react";
import Link from "next/link";

const HomePage: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <CContainer fluid>
        <h2 className="text-center mb-3">Welcome to Hogwarts</h2>
        <p className="text-center">
          {session ? (
            <>
              {"Let's explore now, you may look in to "}
              <Link href="/characters">
                <a>Characters</a>
              </Link>
            </>
          ) : (
            "Getting started by logging in here"
          )}
        </p>
      </CContainer>

      <LoginForm />
    </>
  );
};

export default HomePage;
