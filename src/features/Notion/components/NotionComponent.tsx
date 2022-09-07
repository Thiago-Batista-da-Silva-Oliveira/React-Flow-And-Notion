import { Delete, Visibility, Edit } from "@mui/icons-material"
import { Box, TextareaAutosize, Typography, Paper, Tooltip, IconButton, Button, useTheme, useMediaQuery } from "@mui/material"
import {CreateNotion} from './CreateNotion'
import {Modal} from '../../../components/Modal'
import {useDisclosure} from '../../../hooks'
import {useParams} from 'react-router-dom'
import { useNotions } from "../api/listNotions"
import { useNotionDomains } from "../api/listDomains"
import { Loading } from "../../../components/Loading"


export const NotionComponent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dataParams = useParams()
  const id = dataParams.id;
  const {data: domains} = useNotionDomains()
  const {isOpen, toggle, close} = useDisclosure()
  const domain  = domains?.find((domain) => domain.id == id)
  const {data, isLoading} = useNotions(id)

  console.log(domain)

  if(isLoading) {
    return <Loading isLoading={isLoading} />
  }
   return (
    <> 
        <Button
          sx={{ marginTop: '10px' }}
          variant="contained"
          color="success"
          onClick={() => toggle()}
          >
             Adicionar
        </Button>
        <Typography sx={{ position: 'absolute', top: '10px', right:'10px', zIndex: 999, fontWeight: 'bold', textTransform: 'upperCase'}}>
                {domain?.name}
        </Typography>
       <Box sx={{minHeight: '100vh',
         display: 'flex',
         justifyContent: isMobile ? 'center' : 'flex-start',
         flexWrap: 'wrap',
         alignItems: 'center',
         overFlowX: 'hidden',
    }}>
        {
        data?.map((data) => (
            <Paper key={data.title} sx={{width: '350px',
              height: '300px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '10px',
              background: domain?.backgroundColor,
              color: domain?.color,
              marginLeft: isMobile ? '0' : '15px',
              marginTop: '10px'
            }}>
                <Typography>{data.title}</Typography>
                <TextareaAutosize
                  aria-label="empty textarea"
                  placeholder="Texto..."
                  style={{  resize: 'none', padding: '10px', flex: 1, overflowY: 'auto'  }}
                  value={data.text}
                 />
                 <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                   
                    <Typography sx={{fontSize: '14px', color: domain?.color,}}>{data.date}</Typography>
                    <Box sx={{display: 'flex'}}>
                    <Tooltip title="visualizar">
                      <IconButton>
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="editar">
                      <IconButton>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="deletar">
                      <IconButton>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                    </Box>
                 </Box>
            </Paper>
        ))
    }
    <Modal
     open={isOpen}
     size="xs"
     onClose={close}
     dialogContent={<CreateNotion domainId={id}  close={close} />} />
       </Box>
       </>
   )
}