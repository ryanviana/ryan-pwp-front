/**
 * Image utility functions
 */

/**
 * Safely loads an image URL, with fallbacks for Imgur images
 *
 * If the URL is an Imgur image URL, it will try to use the local copy first,
 * falling back to the remote URL
 *
 * @param src The original image URL
 * @returns A safe URL to use for the image
 */
export function getSafeImageUrl(src: string): string {
  // If it's not an Imgur URL, just return it as is
  if (!src.includes("i.imgur.com")) {
    return src;
  }

  // Extract the image ID from the URL
  const imgurRegex = /i\.imgur\.com\/([a-zA-Z0-9]+)(\.[a-zA-Z0-9]+)?/;
  const match = src.match(imgurRegex);

  if (!match) {
    return src;
  }

  const imageId = match[1];
  const extension = match[2] || ".png"; // Default to .png if no extension

  // Try to use the local copy first
  return `/project-images/${imageId}${extension}`;
}

/**
 * Trigger downloading an Imgur image to the server
 *
 * @param src The original Imgur URL
 * @returns A promise that resolves when the download is complete
 */
export async function downloadImgurImage(src: string): Promise<void> {
  // If it's not an Imgur URL, do nothing
  if (!src.includes("i.imgur.com")) {
    return;
  }

  try {
    // Call our API endpoint to trigger the download
    const encodedUrl = encodeURIComponent(src);
    await fetch(`/api/image-proxy?url=${encodedUrl}`);
  } catch (error) {
    console.error("Error downloading image:", error);
  }
}
