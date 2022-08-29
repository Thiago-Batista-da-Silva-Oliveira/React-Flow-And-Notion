import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom'

export const Home = () => {
    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '95vh', width: '95vw'}}>
          <Link style={{textDecoration: 'none'}} to="/flow">
              <Button variant="contained">
                Mapa Mental
              </Button>
          </Link>
          <Link style={{textDecoration: 'none', marginLeft: '10px'}} to="/notion">
          <Button variant="contained">
           Anotações
          </Button>
          </Link>
        </Box>
    )
}