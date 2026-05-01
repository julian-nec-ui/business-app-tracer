import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ColorAnimateList = () => {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);

  const addFirstItem = () => {
    const newItem = `Item ${items.length + 1}`;
    // Add the new item to the beginning of the array.
    setItems(prevItems => [newItem, ...prevItems]);
  };

  return (
    <div>
      <button onClick={addFirstItem}>Add New First Item</button>
      <ul>
        {/* AnimatePresence is used for animating items when they are added or removed from the DOM */}
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.li
              key={item} // Use a unique key for each item
              initial={{ opacity: 0, x: -100 }} // Initial state for new items
              animate={{
                opacity: 1,
                x: 0,
                // Change background color of the first item
                backgroundColor: index === 0 ? '#E84A4A' : '#ffffff',
                color: index === 0 ? '#ffffff' : '#000000',
              }}
              exit={{ opacity: 0, x: 100 }} // Animation when an item is removed
              transition={{ duration: 0.5 }}
              style={{ padding: '10px', margin: '5px', listStyleType: 'none' }}
            >
              {item}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default ColorAnimateList;
