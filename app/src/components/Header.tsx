import React from "react"
import styled from "styled-components/macro"
import Icon from "./Icon"
import { Theme } from "../theme/theme"

type Props = {
  theme: Theme
  toggleTheme: () => void
}

function Header(props: Props) {
  const { theme, toggleTheme } = props

  const navigateToRepo = () => {
    window.open(
      "https://github.com/donanroherty/dinki.link",
      "_blank",
      "noopener noreferrer"
    )
  }

  return (
    <StyledHeader>
      <div>
        <Brand color={theme.brandColor}>
          Dinki Link <sup>v1.0.0-alpha</sup>
        </Brand>
        {/* <Version>aplha</Version> */}
      </div>

      <IconWrapper role="button" title="github repo" onClick={navigateToRepo}>
        <MotionThemeWrapper
          theme={theme}
          render={themeDef => (
            <Icon name="github" color={themeDef.textColor} size={22} />
          )}
        />
      </IconWrapper>

      <IconWrapper role="button" title="toggle theme" onClick={toggleTheme}>
        <MotionThemeWrapper
          theme={theme}
          render={themeDef => (
            <Icon name="daynight" color={themeDef.textColor} size={24} />
          )}
        />
      </IconWrapper>
    </StyledHeader>
  )
}

// Wraps Icon to avoid provide theme props
const MotionThemeWrapper = (props: {
  render: (themeDef: Theme) => JSX.Element
  theme: Theme
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}) => props.render(props.theme)

const StyledHeader = styled.div`
  height: 72px;
  min-height: 72px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  /* padding: 0 36px; */
  box-sizing: border-box;
  z-index: 10;
  > :nth-child(2) {
    margin-left: auto;
    margin-right: 20px;
  }
`
const Brand = styled.span<{ color: string }>`
  font-size: 27px;
  color: ${({ color }) => color};
  font-weight: 900;
  > sup {
    font-size: 10px;
  }
`

const IconWrapper = styled.button`
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  padding: 10px;
  box-sizing: content-box;
`

export default Header
