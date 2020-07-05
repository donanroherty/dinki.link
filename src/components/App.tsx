import React, { useState } from "react"
import styled from "styled-components/macro"
import Hero from "./Hero"
import Footer from "./Footer"
import Header from "./Header"
import Body from "./Body"
import { ThemeName, getTheme } from "../theme/theme"
import { motion } from "framer-motion"
import { devices } from "../theme/style"

export const THEME_ANIM_DURATION = 0.5
export const DEFAULT_THEME: ThemeName = "light"

function App() {
  const [themeName, setThemeName] = useState<ThemeName>(DEFAULT_THEME)

  const toggleTheme = () => {
    setThemeName((t: ThemeName) => (t === "light" ? "dark" : "light"))
  }

  const theme = getTheme(themeName)

  return (
    <StyledApp
      bgColor={getTheme(themeName).backgroundColor}
      textColor={getTheme(themeName).textColor}
      animate={{
        color: theme.textColor,
        backgroundColor: theme.backgroundColor,
      }}
      transition={{ ease: "easeInOut", duration: THEME_ANIM_DURATION }}
    >
      <Content>
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Hero theme={theme} />
        <Body theme={theme} />
        <Footer theme={theme} />
      </Content>
    </StyledApp>
  )
}

const StyledApp = styled(motion.div)<{ bgColor: string; textColor: string }>`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ textColor }) => textColor};
`
const Content = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto 1fr auto auto;
  max-width: 1080px;
  padding: 0 36px;
  @media screen and (${devices.tablet}) {
    grid-template-rows: auto auto auto auto;
  }
`

export default App
