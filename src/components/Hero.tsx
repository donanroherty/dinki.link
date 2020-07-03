import React, { useRef, useState } from "react"
import styled from "styled-components/macro"
import Icon from "./Icon"
import LinkInput from "./LinkInput"
import { Link } from "react-scroll"
import { useEvent } from "react-use"
import { motion } from "framer-motion"
import { Theme, getTheme } from "../theme/theme"

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
    <StyledHero ref={ref} id="hero" data-testid="hero">
      <IllustrationSection>
        <div>
          <img
            width="100%"
            src="./assets/vector/illustration-night.svg"
            alt="illustration"
          />
        </div>
        <div>
          <motion.img
            width="100%"
            src="./assets/vector/illustration-day.svg"
            alt="illustration"
            animate={{
              opacity: theme === Theme.dark ? 0 : 1,
            }}
          />
        </div>
      </IllustrationSection>

      <TagLine animate={{ color: getTheme(theme).textColor }}>
        Make your linky dinki
      </TagLine>

      <LinkInput />

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
  padding: 0 ${contentMargin}px;
  padding-bottom: 30px;
  margin-top: -72px;
`
const IllustrationSection = styled.div`
  height: 100%;
  width: calc(100% + ${contentMargin}px + ${contentMargin}px);
  margin-left: -${contentMargin}px;
  margin-right: -${contentMargin}px;
  padding-top: 60px;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  align-items: center;
  > div {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }
`
const TagLine = styled(motion.em)`
  font-size: 30px;
  font-weight: 100;
  color: #4f5257;
  margin-top: 20px;
  margin-bottom: 20px;
`
const StyledLink = styled(Link)`
  margin-top: 42px;
  padding: 20px;
`
const StyledIcon = styled(Icon)<{ flipalpha: number }>`
  transform: rotate(${({ flipalpha }) => flipalpha * 180}deg);
`

export default Hero
