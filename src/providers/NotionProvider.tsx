import {
    useCallback,
    createContext,
    useContext,
    ReactNode,
    useEffect,
    useState,
  } from 'react';
 
  interface AuthProviderProps {
    children: ReactNode;
  }

  type INotionDomain = {
    name: string;
    id: string;
    background: string;
    color: string
}
  interface NotionContextData {
    domains: INotionDomain[];
    setDomains: any
    values: {
      text: string;
      title: string;
      date: string;
      id: string
      masterId?: string;
  }[];
    setValues: any;
  }
  
  const NotionContext = createContext({} as NotionContextData);
  
  function NotionProvider({ children }: AuthProviderProps): JSX.Element {
    const [domains, setDomains] = useState<INotionDomain[]>([])
    const [values, setValues] = useState([]);

    return (
      <NotionContext.Provider
        value={{
            domains,
            setDomains,
            values,
            setValues,
        }}
      >
        {children}
      </NotionContext.Provider>
    );
  }
  
  function useNotion(): NotionContextData {
    const context = useContext(NotionContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthPovider');
    }
  
    return context;
  }
  
  export { NotionProvider, useNotion };
  