import React from "react";
import styled from "styled-components";

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

const StyledLink = styled.a`
  text-decoration: none;
  padding: 7px 30px;
  margin: 0 20px;
  background-color: #eee;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const Navbar = () => (
  <StyledNav>
    <div>PomodoroFocused</div>
    <StyledUl>
      <StyledLi>
        <StyledLink href="#">settings</StyledLink>
      </StyledLi>
      <StyledLi>
        <StyledLink href="#">login</StyledLink>
      </StyledLi>
    </StyledUl>
  </StyledNav>
);
export default Navbar;
