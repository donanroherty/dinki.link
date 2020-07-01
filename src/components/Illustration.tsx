import React from "react"
import styled from "styled-components"

const Illustration = () => {
  return (
    <StyledIllustration>
      <IllustrationWrapper>
        <img src="./assets/vector/illustration-day.svg" alt="illustration" />
      </IllustrationWrapper>
    </StyledIllustration>
  )
}

const StyledIllustration = styled.div``

const IllustrationWrapper = styled.div`
  margin-top: 30px;
`

export default Illustration
