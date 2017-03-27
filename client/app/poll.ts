export default function poll(promiser: () => Promise<any>) {
  var doit = true
  const promiseAndTimeout = () => {
    promiser().then(() => {
      if (doit) setTimeout(promiseAndTimeout, 1000);
    })
  }
  promiseAndTimeout();
  return () => { doit = false };
}
