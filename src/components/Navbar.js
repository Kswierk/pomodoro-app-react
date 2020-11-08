import React, { useState } from "react";
import styled from "styled-components";

import SettingsModal from "./SettingsModal";

const StyledNav = styled.nav`
  display: flex;
  background-color: #ddd;
  justify-content: space-around;
  align-items: center;
  max-width: 700px;
  margin: 0 auto;
`;

const StyledUl = styled.ul`
  display: flex;
`;

const StyledLi = styled.li`
  list-style: none;
`;

const StyledNavButton = styled.button`
  padding: 7px 30px;
  margin: 0 20px;
  background-color: #eee;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
`;

const Navbar = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const toggleSettingsModal = () => setIsModalOpened(!isModalOpened);
  return (
    <>
      {isModalOpened ? (
        <SettingsModal toggleBackdrop={toggleSettingsModal} />
      ) : null}
      <StyledNav>
        <div>PomodoroFocused</div>
        <StyledUl>
          <StyledLi>
            <StyledNavButton onClick={toggleSettingsModal}>
              settings
            </StyledNavButton>
          </StyledLi>
          <StyledLi>
            <StyledNavButton>login</StyledNavButton>
          </StyledLi>
        </StyledUl>
      </StyledNav>
    </>
  );
};
export default Navbar;
