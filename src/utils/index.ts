export function getImageUrl(imageUrl: string) {
  const isInvalidUrl = imageUrl === 'N/A';
  if (isInvalidUrl) {
    return '/images/noImage.jpg';
  }
  return imageUrl.replace('SX300', 'SX700');
}
