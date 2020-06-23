import React from "react"
import styled from "styled-components/macro"
import Icon from "./Icon"

function Header() {
  return (
    <StyledHeader>
      <Brand>Dinki Link</Brand>
      <Button>
        <Icon iconName="github" color="#4F5257" size={16} />
      </Button>
      <Button>
        <Icon iconName="daynight" color="#4F5257" size={20} />
      </Button>
    </StyledHeader>
  )
}

const StyledHeader = styled.div`
  height: 72px;
  min-height: 72px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0 36px;
  box-sizing: border-box;
  > :nth-child(2) {
    margin-left: auto;
    margin-right: 14px;
  }
`
const Brand = styled.div`
  font-size: 27px;
  color: #7db3ff;
  font-weight: 900;
`
const Button = styled.div`
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Header
