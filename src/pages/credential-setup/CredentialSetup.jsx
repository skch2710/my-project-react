import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const CredentialSetup = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("link-token");

  useEffect(() => {
    if (token) {
      //API Validate the token and set up credentials
      console.log("Token received:", token);
    }
  }, [token]);

  return <div>{token}</div>;
};

export default CredentialSetup;
