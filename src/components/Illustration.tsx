import React from "react"
import styled from "styled-components"
import { Theme } from "../theme/theme"

type Props = {
  theme: Theme
}
const Illustration = (props: Props) => {
  const { theme } = props
  return (
    <StyledIllustration>
      <IllustrationWrapper>
        <img
          width="100%"
          src={
            theme === Theme.light
              ? "./assets/vector/illustration-day.svg"
              : "./assets/vector/illustration-night.svg"
          }
          alt="illustration"
        />
      </IllustrationWrapper>
    </StyledIllustration>
  )
}

const StyledIllustration = styled.div``

const IllustrationWrapper = styled.div`
  margin-top: 30px;
`

export default Illustration
