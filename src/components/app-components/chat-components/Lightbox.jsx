import { useRef } from "react"
import { useArke } from "../../utilities/Arke.Context"
import * as styles from "./styles/Lightbox.module.scss"
import { IconSquareRoundedX } from "@tabler/icons-react"
import { useEffect } from "react"
import { IconDownload } from "@tabler/icons-react"
import Loader from "../../utilities/Loader"
import { useState } from "react"
import dayjs from "dayjs"
import { saveAs } from 'file-saver';
import { decryptMessage } from "../../utilities/Encryption"


const Lightbox = ({ readyToSendImage }) => {

    const [imageLoaded, setImageLoaded] = useState(false)
    const [imageCaption, setImageCaption] = useState("")

    const { selectedImage, setSelectedImage, roomImages, currentUser, secretKey } = useArke()
    const [selectedThumbnail, setSelectedThumbnail] = useState(null);

    const handleClick = (event) => {
        setSelectedImage(null)
        setImageLoaded(false)
        setImageCaption("")
        setSelectedThumbnail(null)
    }

    const containerRef = useRef();

    // let thumbnails = [
    //     "https://picsum.photos/1080/720",
    //     "https://picsum.photos/720/1080",
    //     "https://picsum.photos/1080/1080",
    //     "https://picsum.photos/1080/720",
    //     "https://picsum.photos/720/1080",
    //     "https://picsum.photos/1080/1080",
    //     "https://picsum.photos/1080/720",
    //     "https://picsum.photos/720/1080",
    //     "https://picsum.photos/1080/1080",
    //     "https://picsum.photos/1080/720",
    //     "https://picsum.photos/720/1080",
    //     "https://picsum.photos/1080/1080",
    // ]

    const handleSelectFromCarousel = (index) => {
        const thumbnail = containerRef.current.children[index];

        const container = containerRef.current;
        const containerWidth = container.clientWidth;
        const thumbnailWidth = thumbnail.clientWidth;
        const thumbnailLeft = thumbnail.offsetLeft;
        const scrollLeft = thumbnailLeft - (containerWidth - thumbnailWidth) / 2;
        container.scrollTo({
            left: scrollLeft,
            behavior: 'smooth',
        });
        setSelectedThumbnail(index);
        setSelectedImage(roomImages[index])
        setImageCaption(roomImages[index].caption)
        // console.log(roomImages[index].caption)
    };

    // const determineFileType = (base64URL) => {
    //     const mimeType = base64URL.split(",")[0].split(":")[1];
    //     const fileType = mimeType.split("/")[1];

    //     return fileType;
    // };

    const downloadImage = (image) => {
        // const fileType = determineFileType(image.imageURL);
        // const blob = new Blob([image.imageURL], { type: `image/${fileType}` });
        // const url = window.URL.createObjectURL(blob);

        // const link = document.createElement("a");
        // link.href = url;
        // link.download = `Arke Image ${currentUser.roomId}.${fileType}`;
        // document.body.appendChild(link);

        // link.click();

        saveAs(image.imageURL, `Arke Image ${currentUser.roomId}.jpg`);

        // document.body.removeChild(link);


    }

    useEffect(() => {
        if (selectedImage) {
            setImageCaption(selectedImage.caption)
        }
    }, [selectedImage])

    useEffect(() => {
        if (selectedThumbnail) {
            console.log(selectedThumbnail)
        }
    }, [selectedThumbnail])

    const getTimeStamp = (messageTime) => {
        return dayjs(messageTime).format("HH:mm")
    }

    return (
        <div className={`${styles.Lightbox} ${selectedImage ? null : styles.LightboxClosed}`} style={{ pointerEvents: readyToSendImage ? "none" : "unset" }}>
            <div className={styles.Header}>
                <div className={styles.Title}>
                    <h3>Sent by {selectedImage ? selectedImage.name : null}</h3>
                    <span>@{selectedImage ? getTimeStamp(selectedImage.timeStamp) : null}</span>
                </div>
                <div className={styles.Controls}>
                    <IconDownload onClick={() => { downloadImage(selectedImage) }} style={{ cursor: "pointer" }} />
                    <IconSquareRoundedX onClick={handleClick} style={{ cursor: "pointer" }} />
                </div>
            </div>
            <div className={styles.Image} onClick={handleClick}>
                <div className={styles.ImageContainer}>
                    {imageLoaded ? null : <Loader />}
                    <img src={selectedImage ? selectedImage.imageURL : null} onClick={(e) => e.stopPropagation()} alt="message-image" onLoad={() => { setImageLoaded(true) }} ></img>
                    {imageLoaded ? <span onClick={(e) => e.stopPropagation()}>{decryptMessage(imageCaption, secretKey)}</span> : null}
                </div>
            </div>
            <div className={`${styles.Selector} ${imageLoaded ? null : styles.SelectorClosed}`}>
                <div className={styles.Carousel} ref={containerRef}>
                    {roomImages.map((thumbnail, index) => (
                        <div
                            className={styles.Thumbnail}
                            style={{
                                backgroundImage: `url("${thumbnail.imageURL}")`,
                                border: index === selectedThumbnail ? '3px solid var(--primary-color)' : 'none'
                            }}
                            key={index}
                            alt={`thumbnail-${index}`}
                            onClick={() => handleSelectFromCarousel(index)}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Lightbox