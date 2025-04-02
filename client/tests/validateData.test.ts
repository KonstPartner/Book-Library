import validateData from '@/utils/validateData';

describe('validateData', () => {
  describe('name validation', () => {
    it('passes with valid name', () => {
      const data = { name: 'John123' };
      expect(() => validateData(data)).not.toThrow();
    });

    it('throws error if name is missing or empty', () => {
      const data1 = { name: '' };
      const data2 = { name: '   ' };
      expect(() => validateData(data1)).toThrow('Name is required');
      expect(() => validateData(data2)).toThrow('Name is required');
    });

    it('throws error if name is too short', () => {
      const data = { name: 'A' };
      expect(() => validateData(data)).toThrow(
        'Name must be at least 2 characters long'
      );
    });

    it('throws error if name is too long', () => {
      const data = { name: 'A'.repeat(21) };
      expect(() => validateData(data)).toThrow(
        'Name must not exceed 20 characters'
      );
    });

    it('throws error if name contains invalid characters', () => {
      const data = { name: 'John@Doe' };
      expect(() => validateData(data)).toThrow(
        'Name can only contain letters, numbers, and underscores'
      );
    });
  });

  describe('password validation', () => {
    it('passes with valid password', () => {
      const data = { password: 'Password123' };
      expect(() => validateData(data)).not.toThrow();
    });

    it('throws error if password is missing or empty', () => {
      const data1 = { password: '' };
      const data2 = { password: '   ' };
      expect(() => validateData(data1)).toThrow('Password is required');
      expect(() => validateData(data2)).toThrow('Password is required');
    });

    it('throws error if password is too short', () => {
      const data = { password: 'Pass123' };
      expect(() => validateData(data)).toThrow(
        'Password must be at least 8 characters long'
      );
    });

    it('throws error if password is too long', () => {
      const data = { password: 'a1'.repeat(26) };
      expect(() => validateData(data)).toThrow(
        'Password must not exceed 50 characters'
      );
    });

    it('throws error if password lacks lowercase letter', () => {
      const data = { password: 'PASSWORD123' };
      expect(() => validateData(data)).toThrow(
        'Password must contain at least one lowercase letter'
      );
    });

    it('throws error if password lacks number', () => {
      const data = { password: 'Password' };
      expect(() => validateData(data)).toThrow(
        'Password must contain at least one number'
      );
    });
  });

  it('does not throw if neither name nor password is provided', () => {
    const data = { otherField: 'value' };
    expect(() => validateData(data)).not.toThrow();
  });
});
