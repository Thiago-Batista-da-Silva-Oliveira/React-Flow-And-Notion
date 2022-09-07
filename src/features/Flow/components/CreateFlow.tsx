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
import { useCreateNode } from '../api/CreateNode';

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

export function CreateFlow({setNodes, close, domainId}: any) {
  const {mutateAsync, isLoading} = useCreateNode()
  const [color, setColor] = useState('black')

  return (
    <Paper sx={{ maxWidth: '1000px', margin: 'auto' }}>
      <Box>
        <Form<ICreateFlow, typeof schema>
          id="create-flow"
          onSubmit={values => {
            const data = { ...values, color, x: 50, y: 50, domainId };
            mutateAsync(data)
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
                    disabled={isLoading}
                  >
                   {isLoading ? 'Carregando' : 'Adicionar'}
                  </Button>
            </>
          )}
        </Form>
      </Box>
    </Paper>
  );
}
