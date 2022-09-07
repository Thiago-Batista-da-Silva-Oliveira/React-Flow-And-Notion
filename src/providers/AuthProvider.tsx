import {
    useCallback,
    createContext,
    useContext,
    ReactNode,
  } from 'react';
  import { useMutation } from 'react-query';
import { loginFn } from '../features/Auth/api/login';
import { logoutFn } from '../features/Auth/api/logout';
import { getUser } from '../features/Auth/utils/getUser';
import { useNotificationStore } from '../stores/notifications';

  interface AuthProviderProps {
    children: ReactNode;
  }
  
  interface AuthContextData {
    user: any;
    signIn: (
      credentials: any,
      onSuccess: () => void,
    ) => Promise<void>;
    signOut: () => void;
    isAuthenticated: boolean;
    loading: boolean;
    success: boolean;
  }
  
  const AuthContext = createContext({} as AuthContextData);
  
  function AuthProvider({ children }: AuthProviderProps): JSX.Element {
    const { addNotification } = useNotificationStore();
    const user = getUser();
    const isAuthenticated = !!Object.keys(user).length;
  
    const mutation = useMutation(async (formData: any) => {
      return loginFn(formData, addNotification);
    });
  
    const signIn = async (data: any, onSuccess: () => void) => {
      try {
        await mutation.mutateAsync(data, { onSuccess: () => onSuccess() });
        mutation.reset();
      } catch (error) {
        console.log(error);
      }
    };
  
    const signOut = useCallback(() => {
      logoutFn();
    }, []);
  
    return (
      <AuthContext.Provider
        value={{
          user,
          signIn,
          signOut,
          isAuthenticated,
          loading: mutation.isLoading,
          success: mutation.isSuccess,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
  
  function useAuth(): AuthContextData {
    const context = useContext(AuthContext);
  
    if (!context) {
      throw new Error('useAuth must be used within an AuthPovider');
    }
  
    return context;
  }
  
  export { AuthProvider, useAuth };
  