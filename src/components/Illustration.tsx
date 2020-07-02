import React from "react"
import styled from "styled-components"
import { Theme } from "../theme/theme"
import { motion } from "framer-motion"

type Props = {
  theme: Theme
  path: string
  hide?: boolean
}
const Illustration = (props: Props) => {
  const { path, hide } = props
  return (
    <StyledIllustration animate={{ opacity: hide ? 0 : 1 }}>
      <IllustrationWrapper>
        <img width="100%" src={path} alt="illustration" />
      </IllustrationWrapper>
    </StyledIllustration>
  )
}

const StyledIllustration = styled(motion.div)`
  margin-top: 30px;
  position: absolute;
`

const IllustrationWrapper = styled.div``

export default Illustration
