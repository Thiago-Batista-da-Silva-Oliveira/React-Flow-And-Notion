import * as z from 'zod';
import {
  Box,
  Button,
  Paper,
  Typography,
  IconButton
} from '@mui/material';
import {ICreateFlow} from '../types'
import {Form, InputField, PickColor} from '../../../components'
import {Delete} from '@mui/icons-material';
import { useState } from 'react';

const schema = z.object({
  name: z.string().nonempty('Campo obrigatório'),
  color: z.string().optional(),
  description: z.string().optional()
});

type IFlow = {
  id: string;
  data: {
    label: any;
  }
  position: {
    x: number;
    y: number;
  }
}

export function CreateFlow({setNodes, close}: any) {
  const [color, setColor] = useState('black')

  const handleDelete= (id: string) => {
    setNodes((nodes: IFlow[]) => nodes.filter((node) => node.id !== id))
  }
  return (
    <Paper sx={{ maxWidth: '1000px', margin: 'auto' }}>
      <Box>
        <Form<ICreateFlow, typeof schema>
          id="create-flow"
          onSubmit={values => {
            const data = { ...values, color };
            setNodes((e:IFlow[]) => e.concat({
                id: (e.length+1).toString(),
                data: {label: 
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', '&:hover': {
                   '.delete': {
                        display: 'flex',
                        transition: '0.5s'
                    }
                }}}>
                  <IconButton onClick={() => handleDelete((e.length+1).toString())} sx={{ display: 'flex',
                    position: 'absolute',
                    top: '10px',
                    right: '5px'
                }}>
                    <Delete className="delete" sx={{fontSize: '10px', display: 'none', transition: '0.5s'}} />
                  </IconButton>
                  <Typography sx={{color}}>
                     {values.name}
                  </Typography>
                  <Box>
                     <Typography>
                        {values.description}
                     </Typography>
                  </Box>
                </Box>
                },
                position: {x:  50, y:50}
            }));
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

                  <PickColor setColor={setColor} color={color} />

                  <InputField
                    size="small"
                    name="description"
                    type="text"
                    label="Descrição"
                    registration={register('description')}
                    error={!!formState.errors.description}
                    errorMessage={formState.errors.description?.message}
                    placeholder="Linguagem de programação..."
                  />
             
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
