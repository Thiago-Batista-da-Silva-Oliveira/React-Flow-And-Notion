import { Box, Button, IconButton } from '@mui/material';
import {useDisclosure} from '../../../hooks'
import {Modal} from '../../../components/Modal'
import {CreateFlowDomain} from './CreateFlowDomain'
import {AddCircle} from '@mui/icons-material'
import {useFlow} from '../../.././providers/FlowProvider'


export const FlowDomain = () => {
    const {isOpen, toggle, close} = useDisclosure()
    const {domains, setDomains} = useFlow()
    return (
       <Box sx={{height: '100vh', width: '95vw', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
          {
            domains.map((domain) => (
                <Button sx={{marginLeft: '15px', minWidth: '150px'}} key={domain.id} variant="contained">
                    {domain.name}
                </Button>
            ))
          }
            <Modal open={isOpen} size="sm" onClose={close} dialogContent={<CreateFlowDomain setValues={setDomains} close={close}/>} />
            <IconButton sx={{ position: 'absolute', top: '10px', left:'10px', zIndex: 999}} onClick={() => toggle()}>
              <AddCircle color="primary" sx={{fontSize: '50px'}}/>
            </IconButton>
       </Box>
    )
}