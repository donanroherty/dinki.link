import React, { useRef, useState } from "react"
import styled from "styled-components/macro"
import Icon from "./Icon"
import LinkInput from "./LinkInput"
import { Link } from "react-scroll"
import { useEvent } from "react-use"

const clamp = (val: number, min: number, max: number) => {
  return val < min ? min : val > max ? max : val
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const [flipAlpha, setFlipAlpha] = useState(0)

  useEvent("scroll", (e: React.UIEvent<HTMLButtonElement, UIEvent>) => {
    const el = ref.current
    if (el) {
      const height = el.clientHeight
      const scrollHeight = window.scrollY
      const perc = scrollHeight / height
      const min = 0.5
      const max = 0.8
      const clamped = clamp(perc, min, max)
      const inputRange = max - min
      const alpha = (clamped - min) / inputRange
      setFlipAlpha(alpha)
    }
  })

  return (
    <StyledHero ref={ref} id="hero" flipalpha={flipAlpha} data-testid="hero">
      <IllustrationContainer>
        <div>Illustration</div>
      </IllustrationContainer>

      <TagLine>Make your linky dinki</TagLine>

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

const StyledHero = styled.div<{ flipalpha: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 0 ${contentMargin}px;
  // TODO: Animate padding-bottom to 0 on scroll
  padding-bottom: ${({ flipalpha }) => (flipalpha * -1 + 1) * 40}px;
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
