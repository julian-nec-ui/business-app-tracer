import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function TodoList() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);

  const addItem = () => {
    const newItem = `Item ${Date.now()}`;
    setItems(prevItems => [newItem, ...prevItems]);
  };

  const removeItem = () => {
    setItems(prevItems => prevItems.slice(1));
  }

  const addLastItem = () => {
    const newItem = `Item ${Date.now()}`;
    setItems(prevItems => [...prevItems, newItem]);
  };

  const removeLastItem = () =>{
    setItems(prevItems => prevItems.slice(0, -1));
  }

  return (
    <div>
      <button className="bg-red-400 rounded w-50 mr-4" onClick={removeItem}>Remove First Item</button>
      <button className="bg-green-400 rounded w-30 mr-4" onClick={addItem}>Add First Item</button>
      <button className="bg-blue-400 rounded w-30 mr-4" onClick={addLastItem}>Add Last Item</button>
      <button className="bg-red-400 rounded w-50" onClick={removeLastItem}>Remove Last Item</button>
      {/* The motion.ul container enables smooth layout shifts */}
      <motion.ul layout>
        {/* AnimatePresence is crucial for handling entering and exiting elements */}
        <AnimatePresence>
          {items.map((item) => (
            // The key is vital for React to track individual items
            <motion.li
          key={item}
              initial={{ opacity: 1, y: -40 , backgroundColor: "#06A345" }} // Animation from (initial state)
              animate={{ opacity: 1, y: 0, backgroundColor: "#ffffff" }}   // Animation to (animate state)
              exit={{ opacity: 0.65, x: -20, backgroundColor: "#ff0000", color: "#ffffff" }}   // Animation on removal
              transition={{ type: "spring", stiffness: 400, damping: 100, ease: "easeOut" }} // Spring physics for a natural feel
            >
              {item}
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}

export default TodoList;
