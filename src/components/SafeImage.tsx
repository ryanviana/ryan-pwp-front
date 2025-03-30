import Image, { ImageProps } from "next/image";
import { useEffect } from "react";
import { getSafeImageUrl, downloadImgurImage } from "@/lib/imageUtils";

/**
 * A wrapper around Next.js Image component that handles Imgur images safely
 *
 * This component intercepts Imgur URLs and tries to load a local copy first,
 * falling back to the remote URL if needed. It also triggers a download
 * of the image to the server if it's an Imgur URL.
 */
export default function SafeImage({ src, ...props }: ImageProps) {
  // Convert the src to a safe URL
  const safeSrc = typeof src === "string" ? getSafeImageUrl(src) : src;

  // Trigger download of the image if it's from Imgur
  useEffect(() => {
    if (typeof src === "string" && src.includes("i.imgur.com")) {
      downloadImgurImage(src).catch(console.error);
    }
  }, [src]);

  return <Image src={safeSrc} {...props} />;
}
