import "./styles.css";
import { useState } from "react";
import { Reorder } from "framer-motion";
import Item from "./item";
import BootCard from "../../card/bootCard";
import { CardAction, CardTitle } from "@/components/ui/card";
import { CalendarMonth } from '@mui/icons-material';
import CreateJobAppDialog from '../../../create-job-dialog';

const initialItems = [
  "🍅 Tomato",
  "🥒 Cucumber",
  "🧀 Cheese",
  "🥬 Lettuce",
  "🍟 French Fries",
  "🍋 Lemon",
  "🍌 Banana",
  "🍒 Cherries",
  "🥦 Brocolli",
  "🍎 Apple",
  "🍇 Grapes",
  "🍓 Strawberries",
];

const AppItem = () => {

  const handleOpenChange = (open) => {
    if (open) {
      alert("Create Job App Dialog opened!");
    }
  };
  return (

    <div className="flex flex-row mt-1 justify-between mr-2">
      <CardTitle className="text-[#04335a]   text-sm ml-1.5 mt-0.5 mb-0.5 font-semibold cursor-default">
        <span style={{ display: 'flex-1', alignItems: 'center' }}>
          <CalendarMonth style={{ width: 20, height: 20, marginRight: 4 }} />Wish List
        </span>
      </CardTitle>
      <CardAction
        className={`text-sm
                        cursor-pointer
                        mt-1 mb-1`}
      >
        <CreateJobAppDialog open={true} onOpenChange={handleOpenChange} />
      </CardAction>
    </div>

    // <div className="flex border-blue-500 border-2 h-full w-41 rounded-md p-1">
    //   <div className="flex flex-row mt-1 justify-between mr-2" style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
    //     <span>App Item</span>
    //     <i cursor="pointer" onClick={() => alert("Dots clicked!")} fill="currentColor" className="bi bi-three-dots-vertical" />
    //   </div>
    // </div>
  );
}

export default function AnimatedGridPage() {
  const [items, setItems] = useState([...initialItems, <AppItem />]);

  return (
    <Reorder.Group axis="y" onReorder={setItems} values={items}>
      {items.map((item) => (
        <Item key={item} item={item} />
      ))}
    </Reorder.Group>
  );
}