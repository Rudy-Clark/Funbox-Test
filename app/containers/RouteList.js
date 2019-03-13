import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ListRoutes from '../components/ListRoutes';
import { deleteRoute, moveRoute } from '../actions';

const mapStateToProps = state => ({
  routes: state.routes,
});

const mapDispatchToProps = dispatch => ({
  deleteRoute: id => dispatch(deleteRoute(id)),
  moveRoute: (from, to) => dispatch(moveRoute(from, to)),
});

const ListRoutesWithDND = DragDropContext(HTML5Backend)(ListRoutes);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListRoutesWithDND);
