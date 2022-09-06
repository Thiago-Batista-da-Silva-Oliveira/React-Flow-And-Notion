import { Close } from '@mui/icons-material';
import { Snackbar, Alert, AlertTitle, IconButton } from '@mui/material';

export type NotificationProps = {
  notification: {
    id: string;
    type: 'error' | 'warning' | 'info' | 'success';
    title?: string;
    message?: string;
  };
  onDismiss: (id: string) => void;
};

export const Notification = ({
  notification: { id, type, title, message },
  onDismiss,
}: NotificationProps) => {
  const action = (
    <IconButton
      aria-label="action"
      color="inherit"
      size="small"
      onClick={() => onDismiss(id)}
    >
      <Close />
    </IconButton>
  );
  return (
    <>
      <Snackbar
        open
        onClose={() => onDismiss(id)}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity={type} action={action}>
          {title && <AlertTitle>{title}</AlertTitle>}
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};
