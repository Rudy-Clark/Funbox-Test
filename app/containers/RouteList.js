import { connect } from 'react-redux';
import ListRoutes from '../components/ListRoutes';
import { deleteRoute, moveRoute } from '../actions';

const mapStateToProps = state => ({
  routes: state.routes,
});

const mapDispatchToProps = dispatch => ({
  deleteRoute: id => dispatch(deleteRoute(id)),
  moveRoute: (from, to) => dispatch(moveRoute(from, to)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListRoutes);
