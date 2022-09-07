import { Box, IconButton, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import ReactFlow, 
{ 
addEdge,
applyEdgeChanges,
applyNodeChanges,
MiniMap,
Controls,
Background
}
from 'react-flow-renderer';
import {useDisclosure} from '../../../hooks'
import {Modal} from '../../../components/Modal'
import { CreateFlow } from './CreateFlow';
import {AddCircle, Delete} from '@mui/icons-material'
import { useParams } from 'react-router-dom';
import {useFlow} from '../../.././providers/FlowProvider'
import { useFlowDomains } from '../api/listFlowDomain';
import { useNodes } from '../api/listNodes';
import { Loading } from '../../../components/Loading';
import { useEdges } from '../api/listEdges';
import { useConnectEdges } from '../api/connectEdges';
import { useUpdateNodePosition } from '../api/updateNodePosition';
import { useDeleteNode } from '../api/deleteNode';


const nodeColor = (node) => {
    switch (node.type) {
      case 'input':
        return 'red';
      case 'default':
        return '#00ff00';
      case 'output':
        return 'rgb(0,0,255)';
      default:
        return '#eee';
    }
  };

  const onLoad = (reactFlowInstance) =>  {
    reactFlowInstance.fitView();
}

export function Flow() {
  const {data: domains} = useFlowDomains()
  const dataParams = useParams()
  const id = dataParams.id;
  const {data: nodes, isLoading} = useNodes(id)
  const {data: edges, isLoading: isLoadingEdges} = useEdges(id)
  const {mutateAsync: connectEdges, isLoading: isLoadingEdgeConnection} = useConnectEdges()
  const { setNodes, setEdges} = useFlow()
  const domain  = domains?.find((domain) => domain?.id == id)
  const {mutateAsync: updatePosition} = useUpdateNodePosition()
  const {isOpen, toggle, close} = useDisclosure()
  const {mutateAsync: deleteNode} = useDeleteNode()

  const filteredEdges = edges?.map((edge) => (
    { id: edge.id, source: edge.flowIdSource, target: edge.flowIdTarget, animated: true }
  ))

  const filteredNode = nodes?.map((node) => ({
    id: node.id,
    data: {label: 
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', '&:hover': {
       '.delete': {
            display: 'flex',
            transition: '0.5s'
        }
    }}}>
      <IconButton onClick={() => deleteNode(node.id)} sx={{ display: 'flex',
        position: 'absolute',
        top: '10px',
        right: '5px'
    }}>
        <Delete className="delete" sx={{fontSize: '10px', display: 'none', transition: '0.5s'}} />
      </IconButton>
      <Typography sx={{color: node?.color}}>
         {node?.name}
      </Typography>
      <Box>
         <Typography>
            {node?.description}
         </Typography>
      </Box>
    </Box>
    },
    position: {x:  node.flowPosition.x, y:node.flowPosition.y}
  }))

  const onNodesChange = useCallback(
    (changes) => {
      if(changes[0]?.positionAbsolute?.x) {
        return updatePosition({id: changes[0].id, x: changes[0].positionAbsolute.x, y: changes[0].positionAbsolute.y})
      }
    },
    [setNodes]
  );

  const onConnect = useCallback(
    (connection) => connectEdges({flowIdSource: connection.source, flowIdTarget: connection.target, domainId:id}),
    [setEdges]
  );

  if(isLoading || isLoadingEdges) {
    return <Loading  isLoading={isLoading || isLoadingEdges}/>
  }
  return (
    <>
    <Box sx={{width: '100vw', height: '90vh', overflow: 'auto'}}>
    <ReactFlow
      nodes={filteredNode}
      onLoad={onLoad}
      edges={filteredEdges}
      onNodesChange={onNodesChange}
    //  onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      connectionLineStyle={{stroke: "#ddd", strokeWidth: 2}}
      connectionLineType = "bezier"
      snapToGrid = {true}
      snapGrid={[16,16]}
    >  
         <Background/>
         <Controls />
         <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} />
    </ReactFlow>
    <IconButton sx={{ position: 'absolute', top: '10px', left:'10px', zIndex: 999}} onClick={() => toggle()}>
      <AddCircle color="primary" sx={{fontSize: '50px'}}/>
    </IconButton>
    <Typography sx={{ position: 'absolute', top: '10px', right:'10px', zIndex: 999, fontWeight: 'bold', textTransform: 'upperCase'}}>
      {domain?.name}
    </Typography>
    <Modal open={isOpen} size="sm" onClose={close} dialogContent={<CreateFlow domainId={domain.id} setNodes={setNodes} close={close} />} />
    </Box>
    </>
  );
}
