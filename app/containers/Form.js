import { connect } from 'react-redux';
import FormGroup from '../components/FormGroup';
import { requestSearch } from '../sagas/actions';
import { REQUEST_SUCCESS } from '../actions';

const mapStateToProps = state => ({
  routes: state.routes,
  request: state.request,
});

const mapDispatchToProps = dispatch => ({
  requestSearch: name => dispatch(requestSearch(name)),
  resetError: () => dispatch({ type: REQUEST_SUCCESS }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormGroup);
