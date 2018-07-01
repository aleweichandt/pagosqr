import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import apiCall from '../api';


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class QRForm extends React.PureComponent {

  state = {
    name:'',
    cuit:'',
    alias:''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onSummit(event) {
    event.preventDefault();
    const {name, cuit, alias} = this.state;
    const options = {
      type: 'commit',

    } 
    apiCall('api/generate',
            {name, cuit, alias, city:'CABA'}, 
            options)
      .then((res) => {
        this.props.onComplete(res);
      })
      .catch((err) => {
        this.props.onError(err);
      });
  }

  render() {
    const { classes, onComplete, onError } = this.props;
    return (
      <div>
        <Paper className={classes.root} elevation={1}>
        <form  onSubmit={(event) => {this.onSummit(event)}} className={classes.container}>
        <Typography component="p">
            Datos
        </Typography>
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
            className={classes.textField}
            value={this.state.cuit}
            onChange={this.handleChange('cuit')}
            margin="normal"
            type="number"
          />
          <TextField
            id="alias"
            label="AliasCBU"
            className={classes.textField}
            value={this.state.alias}
            onChange={this.handleChange('alias')}
            margin="normal"
          />

          <Button size="large" color="primary" type="submit">
            Generar
          </Button>
        </form>
        </Paper>
      </div>
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