import { motion } from "framer-motion"
import DynamicFavicon from "./utilities/DynamicFavicon";
import { useState } from "react";

const Playground = () => {


    return (
        <>
            <motion.div className="Page" initial={{ y: 0, scale: 0.99, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                exit={{ y: 0, scale: 0.99, opacity: 0 }}
                transition={{ type: "tween", duration: 0.25 }}>
                <h1>Hello, This is the Arke Playground</h1>
            </motion.div>
        </>
    )
}

export default Playground