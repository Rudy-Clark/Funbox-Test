import { connect } from 'react-redux';
import FormGroup from '../components/FormGroup';
import { addRoute } from '../actions';

const mapStateToProps = state => ({
  routes: state.routes,
});

const mapDispatchToProps = dispatch => ({
  addRoute: id => dispatch(addRoute(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormGroup);
