import { connect } from 'react-redux';
import FormGroup from '../components/FormGroup';
import { requestSearch } from '../sagas/actions';

const mapStateToProps = state => ({
  routes: state.routes,
  request: state.request,
});

const mapDispatchToProps = dispatch => ({
  requestSearch: name => dispatch(requestSearch(name)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormGroup);
