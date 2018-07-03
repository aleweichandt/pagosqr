import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import apiCall from '../api';
import {
  validateAliasOrCbu , validateCuit,
} from '../model/validation'


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
    const { cuit } = this.state;
    const valid = validateCuit(cuit);
    if(!valid) {
      const { onError } = this.props;
      this.setState({ cuitError: true });
      onError(Error('cuit invalido'));
    }
    return false;
  }

  validateAliasOrCbu() {
    const { alias } = this.state;
    const valid = validateAliasOrCbu(alias);
    if(!valid) {
      const { onError } = this.props;
      this.setState({ aliasError: true });
      onError(Error('alias invalido'));
    }
    return valid;
  }

  onSummit(event) {
    event.preventDefault();
    return this.validCuit() && this.validateAliasOrCbu() && this.generate();
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
              label="CBU/AliasCBU"
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