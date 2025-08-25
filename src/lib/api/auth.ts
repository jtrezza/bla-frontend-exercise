export async function authenticate(username: string, password: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (username === 'admin' && password === 'admin') {
      resolve(true);
    } else {
      reject(new Error('Invalid username or password'));
    }
  });
}
