/**
 * Loads an image from the specified source.
 * @param {string} imgSrc - The source of the image.
 * @returns {HTMLImageElement} - The loaded image.
 */
export function loadImage(imgSrc) {
  let image = new Image();
  image.src = imgSrc;
  return image;
}

/**
 * Loads an image asynchronously.
 * @param {string} imgSrc - The source URL of the image.
 * @returns {Promise<HTMLImageElement>} A promise that resolves with the loaded image or rejects with an error.
 */
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
