import PropTypes from 'prop-types';
import React from 'react';

const Slide = (props) => (
  // <div {...props} style={{ ...props.style, height: !props.offHeightStyle ? 'calc(var(--vh, 1vh) * 100)': '' }}>
  // <div {...props} style={{ ...props.style, height: '100%', height: 'calc(100vh - calc(100vh - 100%))' }}>
  <div {...props} style={{ ...props.style, overflow: 'hidden' }}>
    {props.children}
  </div>
);

Slide.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};

Slide.defaultProps = {
  children: null,
  style: {},
};

Slide.isSlideOfFullpage = true;

export default Slide;
