import React from "react"
import styled from "styled-components/macro"
import Icon from "./Icon"
import { motion } from "framer-motion"
import { Theme } from "../theme/theme"

type Props = {
  theme: Theme
}

function Body(props: Props) {
  const { theme } = props

  return (
    <StyledBody>
      <motion.p>
        DinkyLink is a simple and free URL shortener built with React, Go and
        lots of coffee.
      </motion.p>
      <div>
        <Card>
          <MotionThemeWrapper
            themeDef={theme}
            render={(themeDef) => (
              <Icon name="github" color={themeDef.textColor} size={65} />
            )}
          />
          <h3>Open Source</h3>
        </Card>

        <Card>
          <MotionThemeWrapper
            themeDef={theme}
            render={(themeDef) => (
              <Icon name="test" color={themeDef.textColor} size={65} />
            )}
          />
          <h3>Fully Tested</h3>
        </Card>

        <Card>
          <MotionThemeWrapper
            themeDef={theme}
            render={(themeDef) => (
              <Icon name="engineer" color={themeDef.textColor} size={65} />
            )}
          />
          <h3 style={{ color: theme.textColor }}>Over Engineered</h3>
        </Card>
      </div>
    </StyledBody>
  )
}

// Wraps Icon to avoid provide theme props
const MotionThemeWrapper = (props: {
  render: (themeDef: Theme) => JSX.Element
  themeDef: Theme
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}) => <div onClick={props.onClick}>{props.render(props.themeDef)}</div>

const StyledBody = styled.div`
  /* color: #4f5257; */
  padding: 0 36px;
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
const Card = styled(motion.div)`
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
