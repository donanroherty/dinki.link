import React from "react"
import styled from "styled-components/macro"
import Icon from "./Icon"

function Body() {
  return (
    <StyledBody>
      <p>
        DinkyLink is a simple and free URL shortener built with React, Go and
        lots of coffee.
      </p>
      <div>
        <Card>
          <Icon name="github" color="#4F5257" size={65} />
          <h3>Open Source</h3>
        </Card>
        <Card>
          <Icon name="test" color="#4F5257" size={65} />
          <h3>Fully Tested</h3>
        </Card>
        <Card>
          <Icon name="engineer" color="#4F5257" size={80} />
          <h3>Over Engineered</h3>
        </Card>
      </div>
    </StyledBody>
  )
}

const StyledBody = styled.div`
  color: #4f5257;
  padding: 0 36px;
  padding-top: 20px;
  margin-bottom: 38px;

  > p {
    text-align: center;
    font-size: 16px;
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    :first-child {
      padding-top: 0;
    }
    > * :not(:first-child) {
      margin-top: 37px;
    }
  }
`
const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
  > svg {
  }

  > h3 {
    font-size: 16px;
    margin-top: 29;
    font-weight: 900;
  }
`

export default Body
