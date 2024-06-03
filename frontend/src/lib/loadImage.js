function loadImage(url){
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.onload = async () => {await image.decode(); resolve()};
        image.onerror = () => reject();
        image.src = url;
    });
}

export default loadImage;