import { connect } from 'react-redux';
import ListRoutes from '../components/ListRoutes';

const mapStateToProps = state => ({
  routes: state.routes,
});

const mapDispatchToProps = dispatch => ({
  deleteRoute: id => dispatch(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListRoutes);
