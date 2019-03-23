import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { ROUTE } from '../actions';
import Route from '../components/Route';

const DragRoute = ({
  routeName,
  deleteRoute,
  isDragging,
  connectDropTarget,
  connectDragSource,
}) =>
  connectDragSource(
    connectDropTarget(
      <li>
        <Route
          routeName={routeName}
          deleteRoute={deleteRoute}
          isDragging={isDragging}
        />
      </li>,
    ),
  );

const routeSource = {
  beginDrag(props) {
    return { orderN: props.orderN };
  },
};

const routeTarget = {
  hover(props, monitor) {
    const from = monitor.getItem().orderN;
    const to = props.orderN;
    if (from === to) return;
    props.moveRoute(from, to);
    // eslint-disable-next-line no-param-reassign
    monitor.getItem().orderN = to;
  },
};

const collectTarget = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
});

const collectSource = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

// source export for unit testing
export const RouteDragSource = DragSource(ROUTE, routeSource, collectSource)(
  DragRoute,
);

export default DropTarget(ROUTE, routeTarget, collectTarget)(RouteDragSource);
