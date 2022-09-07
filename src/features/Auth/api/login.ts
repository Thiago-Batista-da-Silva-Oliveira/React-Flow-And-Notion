import { axios } from "../../../lib/axios";
import { useUserStore } from "../../../stores/user";
import { storage } from "../../../utils/storage";


export async function loginWithEmailAndPassword({
  email,
  password,
}: any): Promise<any> {
  const response = await axios.post('users/session', { email, password });

  console.log(response.data.payload)

  return response.data.payload;
}

export async function loginFn(data: any, addNotification: any) {
  const response = await loginWithEmailAndPassword(data);

  const { user } = response;
  if (response.user) {
    if (data.rememberMe === true) {
      useUserStore.setState({ user });
      storage.setItem({ key: 'user', storageType: 'local', values: { user } });
      storage.setItem({
        key: 'token',
        storageType: 'local',
        values: { token: response },
      });
    }
    useUserStore.setState({ user });
    storage.setItem({
      key: 'user',
      storageType: 'session',
      values: { user },
    });

    storage.setItem({
      key: 'token',
      storageType: 'session',
      values: { token: response },
    });
  } else {
    addNotification({
      type: 'error',
      title: 'Erro',
      message: 'Erro de autenticação',
    });
  }

  return response;
}
