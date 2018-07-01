import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';
import red from '@material-ui/core/colors/red';

const Theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: lightBlue,
    error: red,
  },
});

export default Theme;