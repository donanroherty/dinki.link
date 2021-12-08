import React from "react"
import styled from "styled-components/macro"
import LinkInput from "./LinkInput"
import { motion } from "framer-motion"
import { Theme } from "../theme/theme"
import { devices } from "../theme/style"
import Illustration from "./Illustration"
import "styled-components/macro"

type Props = {
  theme: Theme
}
function Hero(props: Props) {
  const { theme } = props

  return (
    <StyledHero id="hero">
      <Content>
        <Illustration theme={theme} />

        <InputAndTagWrapper>
          <TagLine>Make your linky dinki</TagLine>
          <p>DinkyLink is a URL shortener built with React, Go, Docker and lots of coffee.</p>
          <LinkInputWrapper>
            <LinkInput />
          </LinkInputWrapper>
        </InputAndTagWrapper>
      </Content>
    </StyledHero>
  )
}

const StyledHero = styled(motion.div)`
  height: 100%;
  padding-bottom: 80px;

  @media screen and (${devices.tablet}) {
    height: 100%;
    width: 100%;
    margin-top: 0;
  }
`
const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (${devices.tablet}) {
    flex-direction: row-reverse;
    width: 100%;
    margin-top: 0;
    height: 500px;
  }
`
const InputAndTagWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;

  > p {
    max-width: 400px;
    text-align: center;
  }

  @media screen and (${devices.tablet}) {
    align-items: flex-start;
    padding-right: 40px;
    max-width: 400px;
    margin-top: 0;
    > p {
      text-align: left;
    }
  }
`
const TagLine = styled.em`
  font-size: 30px;
  font-weight: 100;
  margin-top: 20px;
  margin-bottom: 20px;
  @media screen and (${devices.tablet}) {
    font-size: 38px;
  }
`
const LinkInputWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  @media screen and (${devices.tablet}) {
    font-size: 43px;
  }
`

export default Hero
