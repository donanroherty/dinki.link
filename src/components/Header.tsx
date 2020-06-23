import React from "react"
import styled from "styled-components/macro"

function Header() {
  return (
    <StyledHeader>
      <Brand>Dinki Link</Brand>
    </StyledHeader>
  )
}

const StyledHeader = styled.div`
  height: 72px;
  min-height: 72px;
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 36px;
  box-sizing: border-box;
  > div {
  }
`

const Brand = styled.div`
  font-size: 27px;
  color: #7db3ff;
  font-weight: 900;
`

export default Header
