import React, { useState, useEffect } from "react"
import styled, { createGlobalStyle } from "styled-components/macro"
import Hero from "./Hero"
import Footer from "./Footer"
import Header from "./Header"
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

  useEffect(() => {
    document.body.style.backgroundColor = theme.backgroundColor
  }, [theme])

  return (
    <StyledApp textColor={getTheme(themeName).textColor}>
      <GlobalStyle bgColor={getTheme(themeName).backgroundColor} />
      <Content>
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Hero theme={theme} />
        <Footer theme={theme} />
      </Content>
    </StyledApp>
  )
}

const GlobalStyle = createGlobalStyle<{ bgColor: string }>`
html body{
    width:100%;
    height:100vh;
    display:flex;
    justify-content:center;
    background-color: ${({ bgColor }) => bgColor};
    transition: background-color 0.5s;
  }

  #root{
    height:100%; 
    width:100%;   
  }

@media screen and (${devices.tablet}) {
  #root{
    height:100%;    
  }
}
`

const StyledApp = styled(motion.div)<{ textColor: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ textColor }) => textColor};
  padding: 0 36px;
  box-sizing: border-box;
`
const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  max-width: 768px;
  width: 100%;
`

export default App
