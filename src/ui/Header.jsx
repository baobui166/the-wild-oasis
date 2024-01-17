import styled from "styled-components";
import HeadingMenu from "./HeadingMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);
  padding: 1.3rem 1rem;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1.2rem;
`;

function Header() {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeadingMenu />
    </StyledHeader>
  );
}

export default Header;
