import React, { useState } from "react"
import styled from "styled-components/macro"
import Hero from "./Hero"
import Footer from "./Footer"
import Header from "./Header"
import Body from "./Body"
import { Theme, getTheme } from "../theme/theme"
import { motion } from "framer-motion"

function App() {
  const [theme, setTheme] = useState<Theme>(Theme.light)

  const toggleTheme = () => {
    setTheme((t: Theme) => (t === Theme.light ? Theme.dark : Theme.light))
  }

  const bgColor = getTheme(theme).backgroundColor

  return (
    <StyledApp
      bgColor={bgColor}
      animate={{ backgroundColor: bgColor }}
      transition={{ ease: "easeInOut" }}
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

const StyledApp = styled(motion.div)<{ bgColor: string }>`
  width: 100%;
  height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ bgColor }) => bgColor};
`

const Grid = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto 1fr auto;
`

export default App
