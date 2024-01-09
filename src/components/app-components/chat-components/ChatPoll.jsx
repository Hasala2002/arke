import { IconMessageQuestion } from "@tabler/icons-react"
import styles from "./styles/ChatPoll.module.scss"
import { useEffect, useState } from "react"

const ChatPoll = () => {

    const SAMPLE_POLL = {
        pollId: "12345678",
        senderName: "hahalmao",
        senderId: "23hjh1212",
        type: "poll",
        question: "If you choose an answer to this question at random, what is the chance that you will be correct?",
        options: [{ answer: "25%", count: 2 }, { answer: "50%", count: 4 }, { answer: "25%", count: 5 }, { answer: "0%", count: 1 }],
        timeStamp: Date.now()
    }

    const [poll, setPoll] = useState(SAMPLE_POLL)

    // useEffect(()=>{

    // },[poll])

    return (
        <div className={styles.PollContainer}>
            <div className={styles.Poll}>
                {/* <div className={styles.Title}><IconMessageQuestion size={12} /> posted by @hahalmao</div> */}
                <div className={styles.Title}>posted by @{poll.senderName}</div>
                <span className={styles.Question}>{poll.question}</span>
                <div className={styles.PollOptions}>
                    {
                        poll && poll.options.map(option => {
                            return (
                                <div className={`${styles.PollOption} ${false && styles.PollOptionOutOfSelect}`}>
                                    <div className={styles.AnswerTitle}>
                                        <span className={styles.Answer}>{option.answer}</span>
                                        <span className={styles.AnswerPercentage}>0%</span>
                                    </div>
                                    <div className={styles.ProgressBar}>
                                        {/* <div className={styles.Progress} style={{ width: `${value}%` }}></div> */}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ChatPoll