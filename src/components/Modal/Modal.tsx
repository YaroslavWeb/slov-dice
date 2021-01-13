import React, { ReactNode } from "react"
import ReactDOM from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { block } from "bem-cn"

import "./styles.scss"

const BEM = block("modal-custom")

interface ModalProps {
  title: string
  content: ReactNode
  isOpen: boolean
  handleClose: () => void
}

export const Modal = ({ title, content, isOpen, handleClose }: ModalProps) => {
  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={BEM()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className={BEM("overlay")} onClick={handleClose} />
          <div className={BEM("window").mix(["p-2", "p-md-3"])}>
            <div className={BEM("title")}>{title}</div>
            <div className={BEM("content")}>{content}</div>
            <span className={BEM("close")} onClick={handleClose}>
              X
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("modal-root")
  )
}
