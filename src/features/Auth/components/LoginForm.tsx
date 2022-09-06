import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    useTheme,
  } from '@mui/material';
  
  import { LoadingButton } from '@mui/lab';
  
  import * as z from 'zod';
  import { Controller } from 'react-hook-form';
  import {
    Visibility,
    VisibilityOff,
  } from '@mui/icons-material';
  
  import { useState } from 'react';
import { Form, InputField } from '../../../components';
import { useAuth } from '../../../providers/AuthProvider';
  
  const schema = z.object({
    email: z.string(),
    password: z.string(),
    rememberMe: z.boolean().optional(),
  });
  
  type LoginValues = {
    email: string;
    password: string;
    rememberMe: boolean;
  };
  
  type LoginFormProps = {
    onSuccess: () => void;
  };
  
  export const LoginForm = ({ onSuccess }: LoginFormProps): JSX.Element => {
    const theme = useTheme();
    const { signIn, loading } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
  
    function togglePassword() {
      setShowPassword(prev => !prev);
    }
  
    return (
      <>
        <Form<LoginValues, typeof schema>
          onSubmit={async values => {
            await signIn(values, onSuccess);
          }}
          schema={schema}
        >
          {({ register, formState, control }) => (
            <>
              <InputField
                sx={{ marginBottom: '15px' }}
                type="email"
                name="email"
                label="Endereço de Email"
                error={!!formState.errors.email}
                errorMessage={formState.errors.email}
                registration={register('email')}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <FormControl variant="outlined" fullWidth {...field}>
                    <InputLabel htmlFor="outlined-adornment-password">
                      Senha
                    </InputLabel>
                    <OutlinedInput
                      required
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      error={!!formState.errors.password}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={togglePassword}
                            onMouseDown={e => e.preventDefault()}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      {...field}
                    />
                    {formState.errors.password && (
                      <FormHelperText error>
                        {formState.errors.password?.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
              <Controller
                name="rememberMe"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox size="small" color="primary" {...field} />}
                    label="Lembrar de mim"
                  />
                )}
              />
              <LoadingButton
                loading={loading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Entrar
              </LoadingButton>
            </>
          )}
        </Form>
      </>
    );
  };
  