import { Box, Button } from '@mui/material';
import { useCallback, useState } from 'react';
import { ChromePicker } from 'react-color';

type iRequest = {
    color: string;
    setColor: (e: any) => void
}

export const PickColor = ({color, setColor}: iRequest) => {
    const [isUpdatingColor, setIsUpdatingColor] = useState(false)

    const handleSaveMarkerColor = useCallback(
        (color: string) => {
          setColor(color);
        },
        [setColor],
      );
    return (
        <>
          {!isUpdatingColor ? (
          <Button
            onClick={() => setIsUpdatingColor(prev => !prev)}
            sx={{
              textAlign: 'center',
              width: '100%',
              border: `1px solid ${color}`,
              color: 'gray',
            }}
          >
             Escolher cor
          </Button>
        ) : (
          <>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <ChromePicker
                color={color}
                onChange={(updateColor: any) =>
                  handleSaveMarkerColor(updateColor.hex)
                }
              />
            </Box>

            <Button
              onClick={() => setIsUpdatingColor(prev => !prev)}
              sx={{
                width: '100%',
                border: `1px solid gray`,
                marginTop: '25px',
              }}
            >
              Fechar
            </Button>
          </>
        )}
        </>
    )
}