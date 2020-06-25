import React from "react"
import styled from "styled-components/macro"
import Hero from "./Hero"
import Footer from "./Footer"
import Header from "./Header"
import Body from "./Body"

function App() {
  return (
    <StyledApp>
      <Header />
      <Grid>
        <Hero />
        <Body />
        <Footer />
      </Grid>
    </StyledApp>
  )
}

const StyledApp = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const Grid = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto 1fr auto;
`

export default App
