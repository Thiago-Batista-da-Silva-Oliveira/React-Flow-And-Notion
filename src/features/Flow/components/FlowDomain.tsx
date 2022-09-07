import { Box, Button, IconButton } from '@mui/material';
import {useDisclosure} from '../../../hooks'
import {Modal} from '../../../components/Modal'
import {CreateFlowDomain} from './CreateFlowDomain'
import {AddCircle} from '@mui/icons-material'
import { useFlowDomains } from '../api/listFlowDomain';
import { Loading } from '../../../components/Loading';
import { useNavigate } from 'react-router-dom';


export const FlowDomain = () => {
    const navigate = useNavigate();
    const {isOpen, toggle, close} = useDisclosure()
    const {data, isLoading} = useFlowDomains()

    if(isLoading) {
      return (
        <Loading isLoading={isLoading} />
      )
    }
    return (
       <Box sx={{height: '100vh', width: '95vw', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
          {
            data?.map((domain: any) => (
                <Button onClick={() => navigate(`./${domain.id}`)} sx={{marginLeft: '15px', minWidth: '150px'}} key={domain.id} variant="contained">
                    {domain.name}
                </Button>
            ))
          }
            <Modal open={isOpen} size="sm" onClose={close} dialogContent={<CreateFlowDomain close={close}/>} />
            <IconButton sx={{ position: 'absolute', top: '10px', left:'10px', zIndex: 999}} onClick={() => toggle()}>
              <AddCircle color="primary" sx={{fontSize: '50px'}}/>
            </IconButton>
       </Box>
    )
}