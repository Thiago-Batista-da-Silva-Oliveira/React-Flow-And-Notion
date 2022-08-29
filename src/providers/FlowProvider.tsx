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

  type IFlowDomain = {
    name: string;
    id: string;
}
  interface FlowContextData {
    domains: IFlowDomain[];
    setDomains: any
    nodes: any;
    setNodes: any;
    edges: any
    setEdges: any;
  }
  
  const FlowContext = createContext({} as FlowContextData);
  
  function FlowProvider({ children }: AuthProviderProps): JSX.Element {
    const [domains, setDomains] = useState<IFlowDomain[]>([])
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
  
  
    return (
      <FlowContext.Provider
        value={{
            domains,
            setDomains,
            nodes,
            setNodes,
            edges,
            setEdges
        }}
      >
        {children}
      </FlowContext.Provider>
    );
  }
  
  function useFlow(): FlowContextData {
    const context = useContext(FlowContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthPovider');
    }
  
    return context;
  }
  
  export { FlowProvider, useFlow };
  