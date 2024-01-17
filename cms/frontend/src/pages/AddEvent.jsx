import { useState } from "react";
import { EventForm } from "./EventForm";

export const AddEventButton =({ onAdd })=> {
    const [isAdding, setIsAdding] = useState(false);
  
    const handleAdd = () => {
      setIsAdding(true);
      onAdd();
    };
  
    if (isAdding) {
      return <EventForm onClose={() => setIsAdding(false)} onSave={onAdd} />;
    }
  
    return <button onClick={handleAdd}>Add Event</button>;
  }