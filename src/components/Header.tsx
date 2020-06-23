import React from "react"
import styled from "styled-components"

function Header() {
  return <StyledHeader>Header</StyledHeader>
}

const StyledHeader = styled.div`
  height: 72px;
  min-height: 72px;
  width: 100%;
  background-color: lightgray;
`

export default Header
