import { CContainer, CFooter } from "@coreui/react";
import { FC } from "react";
import Image from "next/image";

const Footer: FC = () => {
  return (
    <>
      <CFooter position="fixed">
        <CContainer fluid>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="d-flex align-items-center justify-content-center">
              <span>Powered by </span>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </div>
          </a>
        </CContainer>
      </CFooter>
    </>
  );
};

export default Footer;
