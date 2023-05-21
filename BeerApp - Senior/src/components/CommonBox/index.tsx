import { ReactElement } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function CommonBox({ children }: { children: ReactElement | ReactElement[] | null }) {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </Box>
  )
}
