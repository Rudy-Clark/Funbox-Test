import { connect } from 'react-redux';
import FormGroup from '../components/FormGroup';

const mapStateToProps = state => ({
  routes: state.routes,
});

const mapDispatchToProps = dispatch => ({
  addRoute: id => dispatch(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormGroup);
