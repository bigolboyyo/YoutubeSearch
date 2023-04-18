export default function publicImage(imgName) {
  return process.env.PUBLIC_URL + "/images/" + imgName;
}
