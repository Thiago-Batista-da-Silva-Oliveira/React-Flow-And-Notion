import * as z from 'zod';
import {
  Button,
  Paper,
  TextareaAutosize,
} from '@mui/material';
import {ICreateNotion} from '../types'
import {Form, InputField} from '../../../components'
import { format } from 'date-fns'
import { Controller } from 'react-hook-form';
import { useCreateNotion } from '../api/createNotion';
const schema = z.object({
  title: z.string().nonempty('Campo obrigatório'),
  text: z.string().nonempty('Campo obrigatório'),
});

type IRequest = {
    close: () => void;
    domainId: string | undefined
}


export function CreateNotion({ close, domainId}: IRequest) {
  const {mutateAsync, isLoading} = useCreateNotion()
    return (
        <Form<ICreateNotion, typeof schema>
          id="create-notion"
          onSubmit={values => {
            mutateAsync({
              title: values.title,
              text: values.text,
              date: format(new Date(), 'dd/MM/yyyy'),
              domainId
            })
            close()
          }}
          schema={schema}
        >
          {({ register, formState, control }) => (
            <>
            <Paper  style={{
    height: '300px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '10px',
  }}>
               <InputField
                    id="titleInput"
                    size="small"
                    name="title"
                    type="text"
                    label="Título"
                    registration={register('title')}
                    error={!!formState.errors.title}
                    errorMessage={formState.errors.title?.message}
                    placeholder="javascript..."
                  />
                <Controller
                    name="text"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextareaAutosize
                      onChange={onChange}
                      value={value}
                      name="text"
                      aria-label="empty textarea"
                      placeholder="Texto..."
                      style={{  resize: 'none', padding: '10px', flex: 1, overflowY: 'auto'  }}
                     />
                    )}
                  />
                  <Button
                    sx={{ marginTop: '10px' }}
                    variant="contained"
                    color="success"
                    type="submit"
                  >
                     {isLoading ? 'Carregando' : 'Adicionar'}
                  </Button>
           </Paper>
            </>
          )}
        </Form>

  );
}
