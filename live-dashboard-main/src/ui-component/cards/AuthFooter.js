// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="subtitle2" component={Link} href="https://live.juggle.co.nz" target="_blank" underline="hover">
      Live Dashboard
    </Typography>
    <Typography variant="subtitle2" component={Link} href="#" target="_blank" underline="hover">
      &copy; Creating Real World Magic
    </Typography>
  </Stack>
);

export default AuthFooter;
