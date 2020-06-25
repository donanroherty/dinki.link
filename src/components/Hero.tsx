import React from "react"
import styled from "styled-components/macro"
import Icon from "./Icon"
import LinkInput from "./LinkInput"
import { Link } from "react-scroll"

function Hero() {
  return (
    <StyledHero>
      <IllustrationContainer>
        <div>Illustration</div>
      </IllustrationContainer>

      <TagLine>Make your linky dinki</TagLine>

      <LinkInputWrapper>
        <LinkInput />
      </LinkInputWrapper>

      <StyledLink
        data-testid="scroll-button"
        to="body"
        smooth={true}
        duration={1000}
        delay={0}
      >
        <Icon name="triangle" size={25} color="#7db3ff" />
      </StyledLink>
    </StyledHero>
  )
}

const contentMargin = 36

const StyledHero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 0 ${contentMargin}px;
  padding-bottom: 40px;
  box-sizing: border-box;
  margin-top: -72px;
`
const IllustrationContainer = styled.div`
  height: 100%;
  width: calc(100% + ${contentMargin}px + ${contentMargin}px);
  margin-left: -${contentMargin}px;
  margin-right: -${contentMargin}px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const TagLine = styled.em`
  font-size: 30px;
  font-weight: 100;
  color: #4f5257;
  margin-top: 20px;
`
const LinkInputWrapper = styled.div`
  width: 100%;
  height: 100px;
  margin-top: 20px;
`
const StyledLink = styled(Link)`
  margin-top: 42px;
  padding: 20px;
`

export default Hero
