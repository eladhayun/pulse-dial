export function getRandomArbitrary(min, max) {
  return Math.floor((Math.random() * max) + min);
}

export function getRandomArbitraryAsString(min = 1, max = 999) {
  return getRandomArbitrary(min, max).toString();
}

export function getRandomArbitraryDialableAsString() {
  return `${getRandomArbitraryAsString(1, 9) + getRandomArbitraryAsString(1, 9) + getRandomArbitraryAsString(1, 9)}`;
}

export function getNullArray(randomNumber, stage) {
  return Array.from({ length: parseInt([...randomNumber][stage]) }, () => null);
}

export function timeInRange(time) {
  const now = new Date();
  return now - time <= 2000;
}