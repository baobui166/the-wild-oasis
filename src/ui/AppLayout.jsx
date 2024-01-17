import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";

const StyledApp = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
`;
const StyledMain = styled.main`
  padding: 1.5rem 2rem;
  background-color: var(--color-grey-50);
  overflow-y: scroll;
  &::-webkit-scrollbar,
  ::-webkit-scrollbar {
    display: none;
    scroll-behavior: smooth;
  }
`;
const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

function AppLayout() {
  return (
    <StyledApp>
      <Sidebar />
      <Header />
      <StyledMain>
        <Container>
          <Outlet />
        </Container>
      </StyledMain>
    </StyledApp>
  );
}

export default AppLayout;
