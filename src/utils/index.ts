export function getImageUrl(imageUrl: string) {
  const [SMALL_SIZE, MIDDLE_SIZE] = ['SX300', 'SX700'];
  const [NO_IMAGE, REPLACE_IMAGE] = ['N/A', '/images/noImage.jpg'];
  const isInvalidUrl = imageUrl === NO_IMAGE;

  return isInvalidUrl
    ? REPLACE_IMAGE
    : imageUrl.replace(SMALL_SIZE, MIDDLE_SIZE);
}
