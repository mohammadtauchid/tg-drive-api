const fileBufferSplitter = (
  buffer: Buffer,
  chunkSize: number,
): Array<Buffer> => {
  const result = [];

  let i = 0;
  while (i < buffer.length) {
    result.push(buffer.subarray(i, (i += chunkSize)));
  }

  return result;
};

export { fileBufferSplitter };
