import React, { Component, createRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { mapInit } from '../services/yandex-map';

const Map = styled.div`
  flex-basis: 45%;
  height: 320px;
  width: 100%;
  margin: 20px 0 0;
  @media (max-width: 760px) {
    flex-basis: 85%;
  }
`;

class MapView extends Component {
  constructor(props) {
    super(props);
    this.map = createRef(null);
  }

  componentDidMount() {
    const { options, suggestView } = this.props;
    mapInit(this.map.current, suggestView, options);
  }

  render() {
    return <Map ref={this.map} />;
  }
}

MapView.propTypes = {
  suggestView: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
};

export default MapView;
