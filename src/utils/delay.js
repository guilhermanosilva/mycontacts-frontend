export default function delay(timer = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, timer);
  });
}
