import React from "react"
import styled from "styled-components/macro"
import Icon from "./Icon"
import { Theme, getTheme, ThemeDefinition } from "../theme/theme"
import { motion } from "framer-motion"

type Props = {
  theme: Theme
  toggleTheme: () => void
}

function Header(props: Props) {
  const { theme, toggleTheme } = props

  return (
    <StyledHeader>
      <Brand>Dinki Link</Brand>

      <MotionThemeWrapper
        themeDef={getTheme(theme)}
        render={(themeDef) => (
          <a
            href="https://github.com/donanroherty/dinki.link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="github" color={themeDef.textColor} size={22} />
          </a>
        )}
      />

      <MotionThemeWrapper
        onClick={toggleTheme}
        themeDef={getTheme(theme)}
        render={(themeDef) => (
          <Icon name="daynight" color={themeDef.textColor} size={24} />
        )}
      />
    </StyledHeader>
  )
}

// Wraps Icon to avoid provide theme props
const MotionThemeWrapper = (props: {
  render: (themeDef: ThemeDefinition) => JSX.Element
  themeDef: ThemeDefinition
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}) => <Button onClick={props.onClick}>{props.render(props.themeDef)}</Button>

const StyledHeader = styled.div`
  height: 72px;
  min-height: 72px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0 36px;
  box-sizing: border-box;
  z-index: 10;
  > :nth-child(2) {
    margin-left: auto;
    margin-right: 30px;
  }
`
const Brand = styled.div`
  font-size: 27px;
  color: #7db3ff;
  font-weight: 900;
`
const Button = styled(motion.div)`
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Header
