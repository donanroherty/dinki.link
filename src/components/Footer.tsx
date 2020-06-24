import React from "react"
import styled from "styled-components/macro"

function Footer() {
  return (
    <StyledFooter>
      <div>
        <a href="http://ronandoherty.com">
          <em>ronandoherty.com</em>
        </a>
        <div>© Ronan Doherty 2020</div>
      </div>
    </StyledFooter>
  )
}

const StyledFooter = styled.div`
  height: 70px;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > div {
    text-align: center;
    > * {
      padding: 6px;
    }
  }
`

export default Footer
