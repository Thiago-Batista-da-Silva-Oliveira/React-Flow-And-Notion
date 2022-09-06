import { useUserStore } from "../../../stores/user";
import { storage } from "../../../utils/storage";

export function logoutFn() {
  useUserStore.setState({ user: {} as any });
  storage.clearItem({ key: 'user', storageType: 'local' });
  storage.clearItem({ key: 'user', storageType: 'session' });

  window.location.assign(window.location.origin as unknown as string);
}
