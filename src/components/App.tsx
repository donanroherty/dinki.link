import React, { useState } from "react"
import styled from "styled-components/macro"
import Hero from "./Hero"
import Footer from "./Footer"
import Header from "./Header"
import Body from "./Body"
import { ThemeName, getTheme } from "../theme/theme"
import { motion } from "framer-motion"

export const THEME_ANIM_DURATION = 1

function App() {
  const [themeName, setThemeName] = useState<"light" | "dark">("light")

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
      <Header theme={theme} toggleTheme={toggleTheme} />
      <Grid>
        <Hero theme={theme} />
        <Body theme={theme} />
        <Footer theme={theme} />
      </Grid>
    </StyledApp>
  )
}

const StyledApp = styled(motion.div)<{ bgColor: string; textColor: string }>`
  width: 100%;
  height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ textColor }) => textColor};
`

const Grid = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto 1fr auto;
`

export default App
