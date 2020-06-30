import React from "react"
// import styled from "styled-components"
import { motion, Variant } from "framer-motion"

type AnimVariants = {
  start: Variant
}

const r = 50
const w = 100
const t = 3
const d = 1

const arcA: AnimVariants = {
  start: {
    d: `M 0, ${r} a ${r * 0.5},0 0 1,1 ${w},0"`,
  },
}
const arcB: AnimVariants = {
  start: {
    d: `M ${w}, ${r} a ${r * 0.5},${r * 0.5} 0 1,1 -${w},0`,
  },
}

const Illustration = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        viewBox="0 0 100 100"
      >
        <rect x={0} y={0} width="100%" height="100%" fill="lightcoral" />
        <motion.path
          d={` M 0, 50
          a 25,25 0 1,1 100,0`}
          fill="yellow"
        />

        {/* Contract */}
        <motion.path
          d={`M 0, 50
          a 25,25 0 1,1 100,0`}
          fill="blue"
          animate={"start"}
          transition={{ duration: t * 0.5, delay: d, ease: "linear" }}
          variants={arcA}
        />

        <motion.path
          d={` M 100, 50
          a 25,25 0 1,1 -100,0`}
          fill="blue"
        />

        {/* Expand */}
        <motion.path
          d={`M 100, 50
          a 25,0 0 1,1 -100,0`}
          fill="yellow"
          animate={"start"}
          transition={{ duration: t * 0.5, delay: d + t * 0.5, ease: "linear" }}
          variants={arcB}
        />
        <animate />
      </svg>
    </div>
  )
}

export default Illustration
