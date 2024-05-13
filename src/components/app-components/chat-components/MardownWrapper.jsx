import Markdown from "markdown-to-jsx"
import { CodeMessage, Text, Link } from "./CustomMarkdown"

const MardownWrapper = ({ children }) => {
    return (
        <Markdown
            options={{
                forceBlock: true,
                disableParsingRawHTML: true,
                overrides: {
                    pre: {
                        component: CodeMessage
                    },
                    h1: {
                        component: Text
                    },
                    h2: {
                        component: Text
                    },
                    h3: {
                        component: Text
                    },
                    h4: {
                        component: Text
                    },
                    h5: {
                        component: Text
                    },
                    h6: {
                        component: Text
                    },
                    a: {
                        component: Link
                    }
                }
            }}
        >
            {children}
        </Markdown>
    )
}

export default MardownWrapper