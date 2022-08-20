import {
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    Button,
    IconButton,
    Typography,
    useTheme,
  } from '@mui/material';
  import { Close } from '@mui/icons-material';
  
  interface ModalProps {
    title?: string;
    open: boolean;
    onClose: () => void;
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    dialogContent?: React.ReactNode;
    dialogActions?: React.ReactNode;
  }
  
  export function Modal({
    title,
    onClose,
    open,
    dialogContent,
    dialogActions,
    size,
  }: ModalProps): JSX.Element {
    const theme = useTheme();
  
    return (
      <Dialog
        PaperProps={{
          style: { borderRadius: '18px' },
        }}
        fullWidth
        maxWidth={size}
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          sx={{
            margin: 0,
            padding: theme.spacing(1),
          }}
        >
          <Typography variant="h6">{title}</Typography>
          {onClose && (
            <IconButton
              aria-label="close"
              sx={{
                position: 'absolute',
                right: theme.spacing(1),
                top: theme.spacing(1),
                color: theme.palette.grey[500],
              }}
              onClick={onClose}
            >
              <Close />
            </IconButton>
          )}
        </DialogTitle>
        <DialogContent sx={{ padding: theme.spacing(2) }} dividers>
          {dialogContent}
        </DialogContent>
        {dialogActions && (
          <DialogActions>
            <Button autoFocus onClick={onClose} color="primary">
              Save changes
            </Button>
          </DialogActions>
        )}
      </Dialog>
    );
  }