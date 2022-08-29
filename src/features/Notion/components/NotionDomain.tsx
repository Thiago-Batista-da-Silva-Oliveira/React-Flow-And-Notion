import { Box, Button, IconButton } from '@mui/material';
import {useDisclosure} from '../../../hooks'
import {Modal} from '../../../components/Modal'
import {AddCircle} from '@mui/icons-material'
import {useNotion} from '../../.././providers/NotionProvider'
import {CreateNotionDomain} from './CreateNotionDomain'
import {useNavigate} from 'react-router-dom'


export const NotionDomain = () => {
    const navigate = useNavigate();
    const {isOpen, toggle, close} = useDisclosure()
    const {domains, setDomains} = useNotion()
    return (
       <Box sx={{height: '100vh', width: '95vw', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
          {
            domains.map((domain) => (
                <Button onClick={() => navigate(`./${domain.id}`)} sx={{marginLeft: '15px', minWidth: '150px'}} key={domain.id} variant="contained">
                    {domain.name}
                </Button>
            ))
          }
            <Modal open={isOpen} size="sm" onClose={close} dialogContent={<CreateNotionDomain setValues={setDomains} close={close}/>} />
            <IconButton sx={{ position: 'absolute', top: '10px', left:'10px', zIndex: 999}} onClick={() => toggle()}>
              <AddCircle color="primary" sx={{fontSize: '50px'}}/>
            </IconButton>
       </Box>
    )
}