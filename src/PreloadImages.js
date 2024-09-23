import {useEffect} from 'react';

const images = [
    `${process.env.PUBLIC_URL}/back.png`,
    `${process.env.PUBLIC_URL}/bookmark.png`,
    `${process.env.PUBLIC_URL}/bookmark-empty.png`,
    `${process.env.PUBLIC_URL}/bucket.png`,
    `${process.env.PUBLIC_URL}/data-error.png`,
    `${process.env.PUBLIC_URL}/edit.png`,
    `${process.env.PUBLIC_URL}/error.png`,
    `${process.env.PUBLIC_URL}/success.png`,
    `${process.env.PUBLIC_URL}/image-not-found.png`,
    `${process.env.PUBLIC_URL}/no-record-found.png`,
    `${process.env.PUBLIC_URL}/plus.png`,
    `${process.env.PUBLIC_URL}/reload.png`,
    `${process.env.PUBLIC_URL}/up-array.png`,
    `${process.env.PUBLIC_URL}/social/Default.png`,
    `${process.env.PUBLIC_URL}/social/Instagram.png`,
    `${process.env.PUBLIC_URL}/social/LinkedIn.png`,
    `${process.env.PUBLIC_URL}/social/Telegram.png`,
    `${process.env.PUBLIC_URL}/social/YouTube.png`,
    `${process.env.PUBLIC_URL}/social/Zen.png`
];

const PreloadImages = () => {
    const preloadImages = (imageArray) => {
        imageArray.forEach((image) => {
            const img = new Image();
            img.src = image;
        });
    };

    useEffect(() => {
        console.log("Preload images...")
        preloadImages(images);
    }, []);

    return null;
};

export default PreloadImages;