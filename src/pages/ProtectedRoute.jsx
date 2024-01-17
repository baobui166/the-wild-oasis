import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //1. Load the authenticated user
  const { isAuthentical, isLoading } = useUser();

  // 2.If there No autenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isAuthentical && !isLoading) navigate("/login");
    },
    [isAuthentical, isLoading, navigate]
  );

  //3.While loading, show the Spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //4.If there is User, render the app
  if (isAuthentical) return children;
}

export default ProtectedRoute;
