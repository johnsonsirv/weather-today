
export default function importAll(r) {
  const images = {};
  r.keys().map(image => {
    images[image.replace('./', '')] = r(image);
  });
  return images;
}
