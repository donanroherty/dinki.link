import React, { useRef } from "react"
import styled from "styled-components/macro"
import LinkInput from "./LinkInput"
import { motion } from "framer-motion"
import { Theme } from "../theme/theme"
import { THEME_ANIM_DURATION } from "./App"
import { devices } from "../theme/style"
import "styled-components/macro"

type Props = {
  theme: Theme
}
function Hero(props: Props) {
  const { theme } = props

  const ref = useRef<HTMLDivElement>(null)

  return (
    <StyledHero ref={ref} id="hero">
      <Content>
        <IllustrationSection>
          <div>
            <img
              width="100%"
              src="./assets/vector/illustration-night.svg"
              alt="illustration-night"
            />
          </div>
          <div>
            <motion.img
              width="100%"
              src="./assets/vector/illustration-day.svg"
              alt="illustration-day"
              initial={{ opacity: theme.name === "dark" ? 0 : 1 }}
              animate={{
                opacity: theme.name === "dark" ? 0 : 1,
              }}
              transition={{ duration: THEME_ANIM_DURATION }}
            />
          </div>
        </IllustrationSection>

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
  padding-bottom: 40px;

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
    /* justify-content: space-between; */
    width: 100%;
    margin-top: 0;
    height: 500px;
  }
`
const IllustrationSection = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  align-items: center;
  height: 100%;

  @media screen and (${devices.tablet}) {
    width: 100%;
    padding-top: 0;
    margin-top: auto;
    margin-bottom: auto;
  }

  > div {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    display: flex;
    width: 100%;
    height: 100%;
    > img {
      margin-left: auto;
      max-width: 600px;
    }
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
