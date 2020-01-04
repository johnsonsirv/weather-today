
export default function importAll(r) {
  const images = {};
  // eslint-disable-next-line array-callback-return
  r.keys().map((image) => {
    images[image.replace('./', '')] = r(image);
  });
  return images;
}
