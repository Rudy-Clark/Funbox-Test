import { connect } from 'react-redux';
import ListRoutes from '../components/ListRoutes';
import { deleteRoute } from '../actions';

const mapStateToProps = state => ({
  routes: state.routes,
});

const mapDispatchToProps = dispatch => ({
  deleteRoute: id => dispatch(deleteRoute(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListRoutes);
