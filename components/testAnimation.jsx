"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TestAnimation = () => {
  const [items, setItems] = useState([{ content: "Item 1", id: 1 }, { content: "Item 2", id: 2 }]);
  const [count, setCount] = useState(0); // To keep track of the next item ID

  const addItem = newItem => {
    // Create a new array with the new item appended
    setItems(prevItems => [...prevItems, newItem]);
  };

  const removeLastItem = id => {
    // Filter out the item with the given id
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  }

  const removeFirstItem = () => {
    // Remove the first item in the array
    setItems(prevItems => prevItems.slice(1));
  };

  const removeItem = id => {
    // Filter out the item with the given id
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <div>
      <div className="p-4 border rounded-md flex items-center gap-4">
        <button onClick={() => addItem({ content: `Item ${items.length + 1}`, id: items.length + 1 })}>
          Add Item
        </button>
        <button onClick={() => removeLastItem(items[items.length - 1]?.id)}>
          Remove Last Item
        </button>
        <button onClick={() => removeFirstItem()}>
          Remove First Item
        </button>
        <AnimatePresence> {/* AnimatePresence manages exit animations */}
          {items.map(item => (
            <motion.div
              key={item.id} // Essential for tracking items
              initial={{ opacity: 0, y: -50 }} // Start state (when entering)
              animate={{ opacity: 1, y: 0 }}   // End state (after entering)
              exit={{ opacity: 0, x: 100 }}    // State when removed
              layout // Animates layout changes of other items
              onClick={() => removeItem(item.id)} // Remove item on click
            >
              {item.content}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TestAnimation;
