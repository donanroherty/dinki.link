import React, { useState, useRef } from "react"
import styled from "styled-components/macro"
import { motion, Variant, Spring } from "framer-motion"
import BusyIndicator from "./BusyIndicator"
import Icon from "./Icon"
import Axios from "axios"

type AnimVariants = {
  initial: Variant
  busy: Variant
  preResult: Variant
  result: Variant
  reset: Variant
}

const convertBtnVars: AnimVariants = {
  initial: { width: 90 },
  busy: { width: "100%" },
  preResult: { width: 0 },
  result: { width: 90 },
  reset: { width: 0 },
}
const resetBtnVars: AnimVariants = {
  initial: { width: 0, left: 0 },
  busy: { width: 0, left: 0 },
  preResult: { width: 0 },
  result: { width: 45 },
  reset: { width: 0 },
}
const inputVars: AnimVariants = {
  initial: { width: "calc(100% - 90px)", opacity: 1 },
  busy: { width: "0%" },
  preResult: {
    width: "calc(100% - (90px + 50px))",
    left: 35,
    opacity: 0,
    marginLeft: 0,
  },
  result: { opacity: 1 },
  reset: { opacity: 0, left: 0 },
}
const circleVars: AnimVariants = {
  initial: { width: 0, height: 0 },
  busy: { width: 500, height: 500 },
  preResult: { opacity: 0 },
  result: { width: 0, height: 0 },
  reset: { opacity: 1 },
}
const busyIndicatorVars: AnimVariants = {
  initial: { opacity: 0 },
  busy: { opacity: 1 },
  preResult: { opacity: 1 },
  result: { opacity: 0 },
  reset: {},
}

const spring: Spring = {
  type: "spring",
  damping: 20,
  stiffness: 100,
}

const LinkInput = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [animState, setAnimState] = useState<keyof AnimVariants>("initial")

  const [inputValue, setInputValue] = useState("")
  const [outputDinkiLink, setOutputDinkiLink] = useState("")

  const handleLinkInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const convert = async () => {
    const isUrl = inputValue.match(
      // eslint-disable-next-line
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
    )

    if (!isUrl) return

    setAnimState("busy")
    await new Promise((r) => setTimeout(r, 1000))
    setAnimState("preResult")
    await new Promise((r) => setTimeout(r, 500))

    const res = await Axios({
      method: "POST",
      url: "/api/new",
      data: {
        url: inputValue,
      },
    })

    if (res.data.short_id !== undefined) {
      setOutputDinkiLink(`${window.location}${res.data.short_id}`)
    }

    setAnimState("result")
  }

  const reset = async () => {
    setAnimState("reset")

    await new Promise((r) => setTimeout(r, 1000))
    setAnimState("initial")
  }

  const copy = () => {
    const inputEl = inputRef.current as HTMLInputElement

    if (inputRef.current) {
      inputEl.select()
      navigator.clipboard.writeText(inputEl.value)
    }
  }

  const immediate = { duration: 0.01 }

  return (
    <Wrapper>
      <Container>
        <ResetButton
          animate={animState}
          transition={animState === "preResult" ? immediate : spring}
          variants={resetBtnVars}
          onClick={reset}
        >
          <Icon name="reset" size={20} color="#7db3ff" />
        </ResetButton>

        <InputWrapper
          animate={animState}
          transition={
            animState === "preResult"
              ? immediate
              : animState === "result"
              ? { ...spring, delay: 0.3 }
              : spring
          }
          variants={inputVars}
        >
          <StyledInput
            ref={inputRef}
            type="text"
            name="Link Output"
            id="link-input"
            onChange={handleLinkInput}
            placeholder={"enter a link..."}
            value={animState === "result" || animState === "reset" ? outputDinkiLink : inputValue}
            readOnly={animState === "result" || animState === "reset"}
            autoFocus={true}
            onFocus={(e) => e.target.select()}
          />
        </InputWrapper>

        <ConvertButton
          animate={animState}
          transition={animState === "preResult" ? immediate : spring}
          variants={convertBtnVars}
          onClick={
            animState === "result" || animState === "preResult"
              ? copy
              : animState === "initial"
              ? convert
              : undefined
          }
        >
          <div style={{ position: "absolute" }}>{animState === "result" ? "Copy" : "Convert"}</div>

          <Circle transition={{ ...spring, delay: 0.5 }} variants={circleVars} />
        </ConvertButton>

        <motion.div
          animate={animState}
          style={{ position: "absolute", opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.2 }}
          variants={busyIndicatorVars}
        >
          <BusyIndicator />
        </motion.div>
      </Container>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 45px;
  min-height: 45px;
  border-radius: 20px;
  background-color: white;
  overflow: hidden;
  padding: 4px;
  margin-top: 20px;
`
const Container = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
`
const Button = styled(motion.div)`
  z-index: 12;
  height: 45px;
  background-color: #7db3ff;
  border-radius: 17px;
  font-size: 16px;
  font-weight: 900;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
  user-select: none;
`
const ConvertButton = styled(Button)`
  width: 90px;
  position: absolute;
  right: 0;
`
const ResetButton = styled(Button)`
  background-color: transparent;
  width: 0%;
  position: absolute;
  left: 0;
`
const Circle = styled(motion.div)`
  border-radius: 50%;
  background-color: white;
  position: absolute;
`
const InputWrapper = styled(motion.div)`
  position: absolute;
  left: 0%;
  height: 100%;
  width: calc(100% - 90px);
  min-width: 0;
  display: flex;
  margin-left: 10px;
`
const StyledInput = styled(motion.input)`
  z-index: 10;
  height: 100%;
  min-width: 0;
  width: 100%;
  height: 100%;
  font-size: 16px;
  border-style: none;
  color: #4f5257;
  background-color: transparent;
  outline: none;
  position: relative;
`

export default LinkInput
