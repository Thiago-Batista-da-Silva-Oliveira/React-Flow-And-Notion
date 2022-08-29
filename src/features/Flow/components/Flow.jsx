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
import {AddCircle} from '@mui/icons-material'
import { useParams } from 'react-router-dom';
import {useFlow} from '../../.././providers/FlowProvider'


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
  const dataParams = useParams()
  const id = dataParams.id;
  const {domains, nodes, setNodes, edges, setEdges} = useFlow()
  const domain  = domains.find((domain) => domain.id == id)
  const {isOpen, toggle, close} = useDisclosure()

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge({ ...connection, animated: true }, eds)),
    [setEdges]
  );
  return (
    <>
    <Box sx={{width: '100vw', height: '90vh', overflow: 'auto'}}>
    <ReactFlow
      nodes={nodes}
      onLoad={onLoad}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
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
      {domain.name}
    </Typography>
    <Modal open={isOpen} size="sm" onClose={close} dialogContent={<CreateFlow setNodes={setNodes} close={close} />} />
    </Box>
    </>
  );
}
