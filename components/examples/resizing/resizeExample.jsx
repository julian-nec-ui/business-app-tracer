import React, { useEffect } from 'react';
import useParentWidth from './resizingParent'; 

const ChildComponent = () => {
  const [childRef, parentWidth] = useParentWidth();

  return (
    <div ref={childRef} style={{ border: '1px solid blue', padding: '10px' }}>
      The parent container's current width is: **{parentWidth}px**
      <p>This width updates dynamically when the parent changes size.</p>
    </div>
  );
};

const ResizeExample = () => {
  // Example of a dynamic parent container
  const [containerWidth, setContainerWidth] = React.useState('50%');

  useEffect(() => {
    setContainerWidth(prev => prev === '50%' ? '80%' : '50%');
  }, [containerWidth]);

  return (
      
      <div style={{ width: containerWidth, border: '2px solid red', padding: '10px', marginTop: '10px' }}>
        <h2>Parent Container (Width: {containerWidth})</h2>
        <ChildComponent />
      
    </div>
  );
};

export default ResizeExample;
