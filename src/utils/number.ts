function randomInteger(min: number, max: number): number {
  return Math.floor(min + Math.random() * (max - min + 1));
}

export { randomInteger };
