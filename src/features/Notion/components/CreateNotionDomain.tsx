import * as z from 'zod';
import {
  Box,
  Button,
  Paper,
  Typography,
} from '@mui/material';
import {Form, InputField, PickColor} from '../../../components'
import { useNavigate } from 'react-router-dom';
import {ICreateDomain} from '../types'
import {useState} from 'react'

const schema = z.object({
  name: z.string().nonempty('Campo obrigatório'),
});


export function CreateNotionDomain({setValues, close}: any) {
  const [color, setColor] = useState('black')
  const [background, setBackground] = useState('white')
  const navigate = useNavigate();
  return (
    <Paper sx={{ maxWidth: '1000px', margin: 'auto' }}>
      <Box>
        <Form<ICreateDomain, typeof schema>
          id="create-flow-domain"
          onSubmit={values => {
            const id = Math.floor(Math.random() * 98487487);
            setValues((prev: any) => [...prev, {
                name: values.name,
                color,
                background,
                id
              }])
             navigate(`./${id}`)
            close()
          }}
          schema={schema}
        >
          {({ register, formState }) => (
            <>
              <Typography
                sx={{
                  fontSize: '22px',
                }}
              >
                Cadastro
              </Typography>
                  <InputField
                    size="small"
                    name="name"
                    type="text"
                    label="Nome"
                    registration={register('name')}
                    error={!!formState.errors.name}
                    errorMessage={formState.errors.name?.message}
                    placeholder="javascript..."
                  />
                  
                  <Box>
                    <Typography>Cor do Texto</Typography>
                    <PickColor setColor={setColor} color={color} />
                  </Box>

                  <Box>
                    <Typography>Cor de fundo</Typography>
                    <PickColor setColor={setBackground} color={background} />
                  </Box>
            
                  <Button
                    sx={{ marginTop: '10px' }}
                    variant="contained"
                    color="success"
                    type="submit"
                  >
                   Adicionar
                  </Button>
            </>
          )}
        </Form>
      </Box>
    </Paper>
  );
}
