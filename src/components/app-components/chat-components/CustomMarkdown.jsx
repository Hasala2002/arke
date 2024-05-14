import React, { useRef } from "react";
import * as styles from "./styles/ChatMessage.module.scss"
import { useArke } from "../../utilities/Arke.Context";
import { useDraggable } from "react-use-draggable-scroll";
import { IconSourceCode } from "@tabler/icons-react";
import ArkeToolTip from "../../utilities/ArkeToolTip";

export const CodeMessage = ({ children }) => {

    const { arkeToasteer } = useArke()

    const ref = useRef();
    const { events } = useDraggable(ref);

    async function copyToClipboard() {
        // console.log(children.props.className)
        try {
            await navigator.clipboard.writeText(children.props.children);
        } catch (error) {
            console.error('Failed to copy token:', error);
        }
    }

    return (
        <div className={styles.CodeMessage}>
            <div className={styles.CodeHeader}>
                <ArkeToolTip content={`Copy Code`} align="left">
                    <div
                        className={styles.CopyButton}
                        onClick={() => {
                            copyToClipboard()
                            arkeToasteer({
                                type: "success",
                                message: "Forked Code to Clipboard"
                            })
                        }}
                    >
                        <IconSourceCode size={16} />
                    </div>
                </ArkeToolTip>
                <div className={styles.LanguageTag}>
                    {children.props.className ? (children.props.className).replace("lang-", "") : "UNKNOWN"}
                </div>
            </div>
            <pre
                {...events}
                ref={ref}>
                <code>{children}</code>
            </pre>
        </div>
    );
};

export const Text = ({ children, ...props }) => {
    return (
        <>
            {"#".repeat(props.value)}{children}
        </>
    )
}

export const Link = ({ children, ...props }) => {
    // console.log(props)
    return (
        <a href={props.href} target="_blank">
            {props.title || children}
        </a>
    )
}