import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { mkdir } from "fs/promises";

export async function GET(request: NextRequest) {
  try {
    // Get the image URL from the query parameter
    const url = request.nextUrl.searchParams.get("url");

    if (!url) {
      return NextResponse.json(
        { error: "Missing url parameter" },
        { status: 400 }
      );
    }

    // Only allow Imgur URLs
    if (!url.includes("i.imgur.com")) {
      return NextResponse.json(
        { error: "Only Imgur URLs are supported" },
        { status: 400 }
      );
    }

    // Extract image ID and extension
    const imgurRegex = /i\.imgur\.com\/([a-zA-Z0-9]+)(\.[a-zA-Z0-9]+)?/;
    const match = url.match(imgurRegex);

    if (!match) {
      return NextResponse.json({ error: "Invalid Imgur URL" }, { status: 400 });
    }

    const imageId = match[1];
    const extension = match[2] || ".png";

    // Set up paths
    const publicDir = path.join(process.cwd(), "public");
    const imageDir = path.join(publicDir, "project-images");
    const imagePath = path.join(imageDir, `${imageId}${extension}`);

    // Check if the image directory exists, create if not
    if (!fs.existsSync(imageDir)) {
      await mkdir(imageDir, { recursive: true });
    }

    // Check if the image already exists locally
    if (!fs.existsSync(imagePath)) {
      console.log(`Downloading image ${imageId}${extension} from Imgur`);

      // Fetch the image from Imgur
      const imgurResponse = await fetch(url);

      if (!imgurResponse.ok) {
        return NextResponse.json(
          {
            error: `Failed to fetch image from Imgur: ${imgurResponse.statusText}`,
          },
          { status: imgurResponse.status }
        );
      }

      // Get the image data as arrayBuffer
      const arrayBuffer = await imgurResponse.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Save the image to the local filesystem
      fs.writeFileSync(imagePath, buffer);
      console.log(`Image saved to ${imagePath}`);
    }

    // Return success response with the local path
    return NextResponse.json({
      success: true,
      localPath: `/project-images/${imageId}${extension}`,
    });
  } catch (error) {
    console.error("Error in image proxy:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
}
