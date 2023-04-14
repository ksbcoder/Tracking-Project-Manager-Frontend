import { EnumsNumberToStringPipe } from './enums-number-to-string.pipe';

describe('EnumsNumberToStringPipe', () => {
  it('create an instance', () => {
    const pipe = new EnumsNumberToStringPipe();
    expect(pipe).toBeTruthy();
  });
});
