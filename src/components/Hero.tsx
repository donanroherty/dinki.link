import React, { useRef, useState } from "react"
import styled from "styled-components/macro"
import Icon from "./Icon"
import LinkInput from "./LinkInput"
import { Link } from "react-scroll"
import { useEvent } from "react-use"
import { motion } from "framer-motion"
import { Theme } from "../theme/theme"
import { THEME_ANIM_DURATION } from "./App"
import { devices } from "../theme/style"
import "styled-components/macro"

const clamp = (val: number, min: number, max: number) => {
  return val < min ? min : val > max ? max : val
}

type Props = {
  theme: Theme
}
function Hero(props: Props) {
  const { theme } = props

  const ref = useRef<HTMLDivElement>(null)
  const [flipAlpha, setFlipAlpha] = useState(0)

  const getElScrollAlpha = (rangeMin: number, rangeMax: number) => {
    const el = ref.current
    if (el) {
      const height = el.clientHeight
      const scrollHeight = window.scrollY
      const perc = scrollHeight / height
      const clamped = clamp(perc, rangeMin, rangeMax)
      const inputRange = rangeMax - rangeMin
      const alpha = (clamped - rangeMin) / inputRange
      return alpha
    }

    return 0
  }

  useEvent("scroll", (e: React.UIEvent<HTMLButtonElement, UIEvent>) => {
    const el = ref.current
    if (el) {
      setFlipAlpha(getElScrollAlpha(0.4, 0.7))
    }
  })

  return (
    <StyledHero ref={ref} id="hero">
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
        <motion.p>
          DinkyLink is a simple and free URL shortener built with React, Go and
          lots of coffee.
        </motion.p>
        <LinkInputWrapper>
          <LinkInput />
        </LinkInputWrapper>
      </InputAndTagWrapper>

      <StyledLink
        to={flipAlpha < 0.5 ? "scroll-button" : "hero"}
        smooth={true}
        duration={1000}
        delay={0}
        id="scroll-button"
      >
        <StyledIcon
          flipalpha={flipAlpha}
          name="triangle"
          size={25}
          color="#7db3ff"
        />
      </StyledLink>
    </StyledHero>
  )
}

const contentMargin = 36

const StyledHero = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  height: calc(var(--vh, 1vh) * 100);
  padding-bottom: 30px;
  margin-top: -72px;

  @media screen and (${devices.tablet}) {
    height: auto;
    flex-direction: row-reverse;
    justify-content: space-between;
    width: 100%;
  }
`
const IllustrationSection = styled.div`
  height: 100%;
  width: calc(100% + ${contentMargin}px + ${contentMargin}px);
  margin-left: -${contentMargin}px;
  margin-right: -${contentMargin}px;
  /* max-width: 536px; */
  padding-top: 60px;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  align-items: center;
  > div {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }

  @media screen and (${devices.tablet}) {
    width: 100%;
  }
`
const InputAndTagWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (${devices.tablet}) {
    align-items: flex-start;
    padding-right: 40px;
    max-width: 400px;
  }

  > p {
    display: none;
    @media screen and (${devices.tablet}) {
      display: block;
    }
  }
`
const TagLine = styled(motion.em)`
  font-size: 30px;
  font-weight: 100;
  margin-top: 20px;
  margin-bottom: 20px;
  @media screen and (${devices.tablet}) {
    font-size: 43px;
  }
`
const LinkInputWrapper = styled.div`
  width: 100%;
  @media screen and (${devices.tablet}) {
    font-size: 43px;
  }
`
const StyledLink = styled(Link)`
  margin-top: 42px;
  padding: 20px;

  @media screen and (${devices.tablet}) {
    display: none;
  }
`
const StyledIcon = styled(Icon)<{ flipalpha: number }>`
  transform: rotate(${({ flipalpha }) => flipalpha * 180}deg);
`

export default Hero
