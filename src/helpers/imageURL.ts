export function ImageURL(image) {
    return "https://ctickets.app/cdn-cgi/imagedelivery/" + process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGE_HASH + "/" + image;
};