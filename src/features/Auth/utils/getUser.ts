import { storage } from '../../../utils/storage';

export function getUser(): any {
  const localUser = storage.getItem({ key: 'user', storageType: 'local' });
  const sessionUser = storage.getItem({ key: 'user', storageType: 'session' });

  if (localUser) {
    return localUser;
  }
  if (sessionUser) {
    return sessionUser;
  }

  return {} as any;
}
