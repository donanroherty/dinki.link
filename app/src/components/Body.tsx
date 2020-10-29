import React from "react"
import styled from "styled-components/macro"
import Icon from "./Icon"
import { motion } from "framer-motion"
import { Theme } from "../theme/theme"
import { devices } from "../theme/style"

type Props = {
  theme: Theme
}

function Body(props: Props) {
  const { theme } = props

  return (
    <StyledBody>
      <div>
        <Card>
          <MotionThemeWrapper
            themeDef={theme}
            render={themeDef => (
              <Icon name="github" color={themeDef.textColor} size={65} />
            )}
          />
          <h3>Open Source</h3>
          <p>Wanna see the code? Check the link in the header!</p>
        </Card>

        <Card>
          <MotionThemeWrapper
            themeDef={theme}
            render={themeDef => (
              <Icon name="test" color={themeDef.textColor} size={65} />
            )}
          />
          <h3>Tested</h3>
          <p>Well the frontend is, I'm still working on the backend.</p>
        </Card>

        <Card>
          <MotionThemeWrapper
            themeDef={theme}
            render={themeDef => (
              <Icon name="engineer" color={themeDef.textColor} size={65} />
            )}
          />
          <h3 style={{ color: theme.textColor }}>Over Engineered</h3>
          <p>
            I built this site to improve my Go, Docker and deployment skills.
          </p>
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
  margin-bottom: 38px;

  > p {
    text-align: center;
    font-size: 16px;

    display: block;
    @media screen and (${devices.tablet}) {
      display: none;
    }
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    :first-child {
      padding-top: 0;
    }
    > * :not(:first-child) {
      margin-top: 37px;
    }

    @media screen and (${devices.tablet}) {
      margin-top: 50px;
      flex-direction: row;
      justify-content: space-around;
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
    margin-bottom: 0px;
    font-weight: 900;
  }

  > p {
    width: 250px;
    text-align: center;
  }
`

export default Body
