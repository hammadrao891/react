import { useState } from "react";
import { EventForm } from "./EventForm";

export const Event=({ event, onEdit, onDelete }) =>{
    const [isEditing, setIsEditing] = useState(false);
  
    const handleEdit = () => {
      setIsEditing(true);
      onEdit(event);
    };
  
    const handleDelete = () => {
      onDelete(event);
    };
  
    if (isEditing) {
      return (
        <EventForm
          event={event}
          onClose={() => setIsEditing(false)}
          onSave={onEdit}
        />
      );
    }
  
    return (
      <div className="event">
        <div className="event-name">{event.name}</div>
        <div className="event-time">{event.time}</div>
        <div className="event-actions">
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    );
  }

