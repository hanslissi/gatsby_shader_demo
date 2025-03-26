import React from 'react';
import loadable from '@loadable/component';

const ReactP5Wrapper = loadable(() =>
  import('@p5-wrapper/react').then((module) => module.ReactP5Wrapper)
);

const DynamicP5Wrapper = (props: any) => {
  return <ReactP5Wrapper {...props} />;
};

export default DynamicP5Wrapper;
