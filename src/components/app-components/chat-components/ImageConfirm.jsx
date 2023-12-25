import * as styles from "./styles/ImageConfirm.module.scss"
import { IconSquareRoundedX } from "@tabler/icons-react"
import { IconDownload, IconLock } from "@tabler/icons"
import { useArke } from "../../utilities/Arke.Context"
import { useEffect, useState } from "react"
import SendArea from "./SendArea"
import Loader from "../../utilities/Loader"

const ImageConfirm = () => {

    const { readyToSendImage, setReadyToSendImage } = useArke()
    const [imageLoaded, setImageLoaded] = useState(false)

    const [imageCaption, setImageCaption] = useState("")

    const handleClick = (event) => {
        setReadyToSendImage(false)
    }

    return (
        <div className={`${styles.ImageConfirm} ${readyToSendImage ? null : styles.ImageConfirmClosed}`}>
            <div className={styles.Header}>
                <div className={styles.Title}>
                    <h3>Ready to Send</h3>
                    <span><IconLock /> secure file transfer</span>
                </div>
                <div className={styles.Controls}>
                    <IconSquareRoundedX onClick={handleClick} style={{ cursor: "pointer" }} />
                </div>
            </div>
            <div className={styles.Image}>
                <div className={styles.ImageContainer}>
                    {imageLoaded ? null : <Loader />}
                    <img src={readyToSendImage ? readyToSendImage.imageURL : null} onClick={(e) => e.stopPropagation()} alt="message-image" onLoad={() => { setImageLoaded(true) }}></img>
                    {imageLoaded ? <span onClick={(e) => e.stopPropagation()}>{(imageCaption).substring(0, 50) + (imageCaption.length > 50 ? "..." : "")}</span> : null}
                </div>
            </div>
            <div className={`${styles.CaptionInput} ${imageLoaded ? null : styles.CaptionInputClosed}`}>
                <SendArea imageConfirm={true} setImageCaption={setImageCaption} />
            </div>
        </div>
    )
}

export default ImageConfirm