const validateData = (data: Record<string, unknown>): void => {
  if ('name' in data) {
    const name = data.name as string;
    if (!name || name.trim() === '') {
      throw new Error('Name is required');
    }
    if (name.length < 2) {
      throw new Error('Name must be at least 2 characters long');
    }
    if (name.length > 20) {
      throw new Error('Name must not exceed 20 characters');
    }
    if (!/^[a-zA-Z0-9_]+$/.test(name)) {
      throw new Error(
        'Name can only contain letters, numbers, and underscores'
      );
    }
  }

  if ('password' in data) {
    const password = data.password as string;
    if (!password || password.trim() === '') {
      throw new Error('Password is required');
    }
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }
    if (password.length > 50) {
      throw new Error('Password must not exceed 50 characters');
    }
    if (!/[a-z]/.test(password)) {
      throw new Error('Password must contain at least one lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
      throw new Error('Password must contain at least one number');
    }

    if (/^(.)\1+$/.test(password)) {
      throw new Error('Password cannot consist of repeating characters');
    }
  }
};

export default validateData;
