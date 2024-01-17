import { useState } from "react";

export const EventForm=({ event, onClose, onSave })=> {
    const [name, setName] = useState(event ? event.name : '');
    const [time, setTime] = useState(event ? event.time : '');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSave({ name, time, id: event ? event.id : Date.now() });
      onClose();
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Time:
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    );
  }