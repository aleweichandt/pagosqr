import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  container: {
    marginBottom: 100,
  },
  title: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit,
    paddingTop: theme.spacing.unit,
    ...theme.typography.headline,
  },
  content: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit,
    paddingTop: theme.spacing.unit,
    ...theme.typography.body,
  }
});

class PrivacyPolicy extends React.PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <Paper
        className={classes.container}
        elevation={1}
        component="form"
        onSubmit={(event) => this.onSummit(event)}
      >        
        <Typography component="h1" className={classes.title}>
          1.Recolección de la información
        </Typography>
        <Typography component="p" className={classes.content}>
          Recogemos información que usted nos brinda cuando genera un código QR a traves de de nuestra web. Esta información se restringe a su Clave Unica de identificación Tributaria (CUIT) y Clave Bancaria Uniforme (CBU) o el alias de la mísma.
          Además, recibimos y registramos automáticamente información sobre su computadora y su navegador, incluyendo su dirección IP, programa y atributos de hardware, y la página que solicitó.
        </Typography>
        <Typography component="h1" className={classes.title}>
          2. Uso de la información
        </Typography>
        <Typography component="p" className={classes.content}>
          Cualquier información que recolectamos sobre usted puede ser utilizada para:
          El servicio de generación de código de pagos QR en cuestioón.
          Personalizar su experiencia y responder a sus necesidades individuales.
          Proporcionar contenido publicitario personalizado.
          Mejorar nuestro sitio web.
          Mejorar el servicio al consumidor y sus necesidades de soporte.
        </Typography>
        <Typography component="h1" className={classes.title}>
          3. Divulgación a terceros
        </Typography>
        <Typography component="p" className={classes.content}>
          Nosotros no vendemos, intercambiamos, ni transferimos de ningún otro modo a terceros externos su información de identificación personal. Esto no incluye terceros confiables que nos asisten para operar nuestro sitio web o llevar a cabo nuestro negocio, siempre que las partes acepten mantener esta información confidencial.
          Creemos que es necesario compartir información para investigar, prevenir o tomar medidas respecto a actividades ilegales, sospechas de fraude, situaciones que impliquen amenazas potenciales a la seguridad física de cualquier persona, violaciones de nuestros términos de uso, o que de otra manera sea requerido por la ley.
          Sin embargo, la información no privada puede ser provista a terceros para usos de marketing, publicidad u otros.
        </Typography>
        <Typography component="h1" className={classes.title}>
          4. Protección de la información
        </Typography>
        <Typography component="p" className={classes.content}>
          Implementamos distintas medidas de seguridad para mantener la seguridad de su información personal. Utilizamos encriptación de avanzada para proteger información confidencial transmitida en línea.
          ¿Usamos cookies?
          Sí. Nuestras cookies mejoran el acceso a nuestro sitio e identifican a los visitantes frecuentes. Lo que es más, nuestras cookies mejoran la experiencia del usuario haciendo un seguimiento de sus intereses. Sin embargo, este uso de cookies no está relacionado de ninguna manera a cualquier información de identificación personal en nuestro sitio.
        </Typography>
        <Typography component="h1" className={classes.title}>
          5. Consentimiento
        </Typography>
        <Typography component="p" className={classes.content}>
          Al utilizar nuestro sitio, usted brinda su consentimiento a nuestra política de privacidad.
        </Typography>
      </Paper>
    );
  }
}
PrivacyPolicy.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(PrivacyPolicy);