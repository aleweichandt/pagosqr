import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import apiCall from '../api';


const styles = theme => ({
  form: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
    flex: 1,
    maxWidth: 200,
  }
});

const aliasPattern = /^[a-zA-Z0-9.-]{6,20}$/;

class QRForm extends React.PureComponent {

  state = {
    name:'',
    nameError: false,
    cuit:'',
    cuitError: false,
    alias:'',
    aliasError: false,
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      [`${name}Error`]: false,
    });
  };

  validCuit() {
    const { onError } = this.props;
    const { cuit } = this.state;
    const digits = cuit.trim().split('').map(c => parseInt(c));
    if(digits.length == 11) {
      const vDigit = digits.pop();
      const verif = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
      const result = verif.reduce((acc, v, i) => acc + (v * digits[i]), 0);
      const verifDigit = 11 - (result % 11);
      if (verifDigit === vDigit) {
        return true;
      }
    }
    this.setState({ cuitError: true });
    onError(Error('cuit invalido'));
    return false;
  }

  validateAlias() {
    const { onError } = this.props;
    const { alias } = this.state;
    const valid = aliasPattern.test(alias);
    if(!valid) {
      this.setState({ aliasError: true });
      onError(Error('alias invalido'));
    }
    return valid;
  }

  onSummit(event) {
    event.preventDefault();
    return this.validCuit() && this.validateAlias() && this.generate();
  }

  generate() {
    const { onComplete, onError } = this.props;
    const {name, cuit, alias} = this.state;
    const options = {
      type: 'commit',
    } 
    const queryPath = 'api/generate';
    // const queryPath = 'http://localhost:5000/api/generate';
    const body = { name, cuit, alias, city: 'CABA' };
    apiCall(queryPath, body, options)
      .then((res) => onComplete(res))
      .catch((err) => onError(err));
  }

  render() {
    const { classes } = this.props;
    const { cuitError, aliasError } = this.state;
    return (
      <React.Fragment>
        <Paper
          className={classes.form}
          elevation={1}
          component="form"
          onSubmit={(event) => this.onSummit(event)}
        >
          <Typography variant="title" component="h3" gutterBottom>
              Datos
          </Typography>
          <div>
            <TextField
              id="name"
              label="Nombre"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
            />
            <TextField
              id="cuit"
              label="CUIT"
              required
              error={cuitError}
              className={classes.textField}
              value={this.state.cuit}
              onChange={this.handleChange('cuit')}
              margin="normal"
              type="number"
            />
            <TextField
              id="alias"
              label="AliasCBU"
              required
              error={aliasError}
              className={classes.textField}
              value={this.state.alias}
              onChange={this.handleChange('alias')}
              margin="normal"
            />
          </div>
          <Button 
            className={classes.button}
            size="large"
            color="primary"
            type="submit"
            variant="contained"
          >
            Generar
          </Button>
        </Paper>
      </React.Fragment>
    );
  } 
}

QRForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onComplete: PropTypes.func,
  onError: PropTypes.func
};
QRForm.defaultProps = {
  onComplete: () => {},
  onError: () => {},
}


export default withStyles(styles)(QRForm);