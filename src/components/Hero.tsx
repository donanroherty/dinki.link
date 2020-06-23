import React from "react"
import styled from "styled-components/macro"

function Hero() {
  return (
    <StyledHero>
      <IllustrationContainer>
        <div>Illustration</div>
      </IllustrationContainer>
      <LinkInputWrapper>
        <div>LinkInput</div>
      </LinkInputWrapper>
    </StyledHero>
  )
}

const StyledHero = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  background-color: lightcoral;
`
const IllustrationContainer = styled.div`
  height: 100%;
  background-color: lightgreen;
  padding: 20px;
  > div {
    background-color: lightblue;
    width: 100%;
    height: 100%;
  }
`
const LinkInputWrapper = styled.div`
  height: 100px;
  background-color: lightgoldenrodyellow;
  margin-top: auto;
  padding: 20px;
  > div {
    background-color: lightblue;
    width: 100%;
    height: 100%;
  }
`

export default Hero
