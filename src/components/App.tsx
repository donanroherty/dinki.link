import React, { useState } from "react"
import styled, { createGlobalStyle } from "styled-components/macro"
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

  // useEvent("resize", () => {
  //   document.documentElement.style.setProperty(
  //     "--vh",
  //     `${window.innerHeight * 0.01}px`
  //   )
  // })

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
      <GlobalStyle />
      <Content>
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Hero theme={theme} />
        <Body theme={theme} />
        <Spacer></Spacer>
        <Footer theme={theme} />
      </Content>
    </StyledApp>
  )
}

const GlobalStyle = createGlobalStyle`
html{
    height:100%;
  }
  body{
    height:100%;
  }
  /* #root{
    height:100%;    
  } */

@media screen and (${devices.tablet}) {
  #root{
    height:100%;    
  }
}
`

const StyledApp = styled(motion.div)<{ bgColor: string; textColor: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ textColor }) => textColor};
  padding: 0 36px;
  box-sizing: border-box;
`
const Content = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto 1fr auto auto auto;
  max-width: 1080px;
  width: 100%;

  @media screen and (${devices.tablet}) {
    grid-template-rows: auto auto auto 1fr auto;
  }
  @media screen and (${devices.laptop}) {
    max-width: 1200px;
  }
`
const Spacer = styled.div`
  height: 100%;
`

export default App
