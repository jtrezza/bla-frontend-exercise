import { authenticate } from '@/lib/api/auth';

describe('authenticate', () => {
  it('resolves when username is "admin" and password is "admin"', async () => {
    await expect(authenticate('admin', 'admin')).resolves.toBe(true);
  });

  it('rejects when username is incorrect', async () => {
    await expect(authenticate('user', 'admin')).rejects.toThrow('Invalid username or password');
  });

  it('rejects when password is incorrect', async () => {
    await expect(authenticate('admin', 'wrongpassword')).rejects.toThrow('Invalid username or password');
  });

  it('rejects when both username and password are incorrect', async () => {
    await expect(authenticate('user', 'wrongpassword')).rejects.toThrow('Invalid username or password');
  });
});
