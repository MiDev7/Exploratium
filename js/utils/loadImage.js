export function loadImage(imgSrc) {
  let image = new Image();
  image.src = imgSrc;
  return image;
}

export function loadImageAsync(imgSrc) {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.src = imgSrc;
    image.onload = () => {
      resolve(image);
    };
    image.onerror = () => {
      reject(new Error("Could not load image at " + imgSrc));
    };
  });
}
