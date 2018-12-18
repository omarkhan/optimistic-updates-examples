export function createFakeApiHandler (delay) {
  return async function(body) {
    await sleep(delay);
    return body;
  }
}

export function createFakeFailHandler (delay) {
  return async function() {
    await sleep(delay);
    throw new Error('Something went wrong!');
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
