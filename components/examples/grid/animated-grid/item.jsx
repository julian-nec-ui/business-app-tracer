import { useMotionValue, Reorder } from "framer-motion";
import { useRaisedShadow } from "./use-raised-shadow";

export default function Item({ item }) {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);

  return (
    <Reorder.Item
      value={item}
      id={item}
      style={{ boxShadow, y, padding: 10, borderRadius: 9, backgroundColor: "#D3F3F6", marginBottom: 17, marginTop: 5 }}
    >
      <div className="flex mt-2 h-full">
        <span>{item}</span>
      </div>
    </Reorder.Item>
  );
}