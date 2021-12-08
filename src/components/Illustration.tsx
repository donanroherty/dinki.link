import React from "react"
import styled from "styled-components"
import { Theme } from "../theme/theme"
import { devices } from "../theme/style"

type Props = {
  theme: Theme
}

export default function Illustration(props: Props) {
  const { theme } = props

  return (
    <Wrapper>
      <div>
        <img
          width="100%"
          style={{ opacity: theme.name === "dark" ? 100 : 0 }}
          src="./assets/vector/illustration-night.svg"
          alt="illustration-night"
        />
      </div>
      <div>
        <img
          width="100%"
          style={{ opacity: theme.name === "dark" ? 0 : 100 }}
          src="./assets/vector/illustration-day.svg"
          alt="illustration-day"
        />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  top: 10px;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  align-items: center;
  height: 100%;

  @media screen and (${devices.tablet}) {
    width: 100%;
    padding-top: 0;
    margin-top: auto;
    margin-bottom: auto;
  }

  > div {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    display: flex;
    width: 100%;
    > img {
      margin-left: auto;
      max-width: 600px;
      opacity: 100;
      transition: opacity 0.5s;
    }
  }
`
