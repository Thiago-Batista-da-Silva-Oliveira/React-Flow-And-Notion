import * as z from 'zod';
import {
  Box,
  Button,
  Paper,
  Typography,
} from '@mui/material';
import {ICreateFlow} from '../types'
import {Form, InputField} from '../../../components'
import { useNavigate } from 'react-router-dom';
import { useCreateFlowDomain } from '../api/createFlowDomain';

const schema = z.object({
  name: z.string().nonempty('Campo obrigatório'),
});


export function CreateFlowDomain({close}: any) {
  const {mutateAsync} = useCreateFlowDomain()
  return (
    <Paper sx={{ maxWidth: '1000px', margin: 'auto' }}>
      <Box>
        <Form<ICreateFlow, typeof schema>
          id="create-flow-domain"
          onSubmit={values => {
            mutateAsync(values)
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
