"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image } from "next/image";
import { Reorder } from 'framer-motion';

export default function DragAndDrop() {
  const [elements, setElements] = useState([{ id: 1, name: "Element 1" }, { id: 2, name: "Element 2" }, { id: 3, name: "Element 3" }, { id: 4, name: "Element 4" }, { id: 5, name: "Element 5" }, { id: 6, name: "Element 6" }, { id: 7, name: "Element 7" }, { id: 8, name: "Element 8" }, { id: 9, name: "Element 9" }, { id: 10, name: "Element 10" }]);

  return (
    <div className="p-5">
      <Reorder.Group onReorder={setElements} values={elements}>
        {
          elements.map((element) => (
            <Reorder.Item key={element.id} value={element}>
              <Card key={element.id} className="my-5">
                <CardHeader>
                  <CardTitle>Drag and Drop {element.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <span>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                  </span>
                </CardContent>
              </Card>
            </Reorder.Item>
          ))

        }
      </Reorder.Group>
    </div>
  );
} 