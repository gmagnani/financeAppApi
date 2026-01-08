const sum = (a, b) => a + b;

describe('sum function', () => {
  test ('should return the sum of two numbers', () => {
    // Arrange
    const a = 5;
    const b = 3;
    // Act
    const result = sum(a, b);
    // Assert
    expect(result).toBe(8);
  
  });
});