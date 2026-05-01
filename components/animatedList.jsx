import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedList = () => {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);

  const fadeFirstItem = () => {
    // The key here is to update the state to remove the first item
    setItems(items.slice(1));
  };

  return (
    <div>
      <button onClick={fadeFirstItem}>Fade First Item Away</button>
      {items.map((item, index) => (
        <motion.div
          key={item} // Use a unique key
          initial={{ opacity: 1, backgroundColor: '#0000ff' }} // Blue
          animate={{ opacity: 1, backgroundColor: '#0000ff' }}
          exit={{ opacity: 1, backgroundColor: '#ff0000' }} // Animate to red and fade out on exit
          transition={{ duration: 0.5 }}
          style={{ padding: '10px', marginBottom: '5px' }}
        >
          {item}
        </motion.div>
      ))}
    </div>
  );
};

// Note: To make 'exit' animations work, the component must be wrapped in AnimatePresence
// from 'framer-motion' in a parent component.

export default AnimatedList;
