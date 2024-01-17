import styled from "styled-components";
import LogoutButon from "../features/authentication/LogoutButon";
import { useNavigate } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi";
import DarkmodeToggle from "./DarkmodeToggle";
import ButtonIcon from "./ButtonIcon";

const StyledHeaderMenu = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1.2rem;
`;

function HeadingMenu() {
  const navigate = useNavigate();
  function handleUser() {
    navigate("/accounts");
  }

  return (
    <StyledHeaderMenu>
      <li onClick={handleUser}>
        <ButtonIcon>
          <HiOutlineUser />
        </ButtonIcon>
      </li>

      <li>
        <DarkmodeToggle />
      </li>
      <li>
        <LogoutButon />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeadingMenu;
