import React from "react"
import styled from "styled-components/macro"

function Body() {
  return (
    <StyledBody>
      <div>
        <Card>
          <div></div>
        </Card>
        <Card>
          <div></div>
        </Card>
        <Card>
          <div></div>
        </Card>
      </div>
    </StyledBody>
  )
}

const StyledBody = styled.div`
  background-color: lightcyan;
  padding: 20px;
  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: lightblue;
    width: 100%;
    height: 100%;
    :first-child {
      padding-top: 0;
    }
    > * :not(:first-child) {
      padding-top: 10px;
    }
  }
`
const Card = styled.div`
  width: 100px;
  height: 100px;
  background-color: lightgray;
  > div {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: lightskyblue;
  }
`

export default Body
