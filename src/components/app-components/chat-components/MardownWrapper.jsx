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
                        component: Text,
                        props: { value: 1 }
                    },
                    h2: {
                        component: Text,
                        props: { value: 2 }
                    },
                    h3: {
                        component: Text,
                        props: { value: 3 }
                    },
                    h4: {
                        component: Text,
                        props: { value: 4 }
                    },
                    h5: {
                        component: Text,
                        props: { value: 5 }
                    },
                    h6: {
                        component: Text,
                        props: { value: 6 }
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