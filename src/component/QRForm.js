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
const cbuPattern = /^(\d{3})(\d{1})(\d{3})(\d{1})(\d{13})(\d{1})$/;

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

  validateCbu() {
    const { onError } = this.props;
    const { alias: cbu } = this.state;
    let _cbu = cbu.replace(/[^0-9]/g, ''),
        valid = cbuPattern.test(_cbu);
    if(valid) {
      let matches = cbuPattern.exec(_cbu),
          bank = matches[1], verBank = matches[2],
          branch = matches[3], verBranch = matches[4],
          accum = bank[0] * 7 + bank[1] * 1 + bank[2] * 3 + verBank * 9
            + branch[0] * 7 + branch[1] * 1 + branch[2] * 3,
          diff = ((10 - (accum % 10)) % 10);
      valid = (diff.toString() === verBranch);
      if(valid) {
        let account = matches[5], verAccount = matches[6],
            accum = account[0] * 3 + account[1] * 9 + account[2] * 7 + account[3] * 1
              + account[4] * 3 + account[5] * 9 + account[6] * 7 + account[7] * 1
              + account[8] * 3 + account[9] * 9 + account[10] * 7 + account[11] * 1
              + account[12] * 3,
            diff = ((10 - (accum % 10)) % 10);
        valid = (diff.toString() === verAccount);
      }
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