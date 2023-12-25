import { motion } from "framer-motion"

const PageWrapper = ({ children }) => {
    return (
        <motion.div
            className="page-wrapper"
            initial={{ y: 0, scale: 0.99, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 0, scale: 0.99, opacity: 0 }}
            transition={{ type: "tween", duration: 0.25 }}
        >
            {children}
        </motion.div>
    )
}

export default PageWrapper