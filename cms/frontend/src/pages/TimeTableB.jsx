import { AddEventButton } from "./AddEvent";
import { Event } from "./Event";

export const Timetable=({ events, onAdd, onEdit, onDelete })=> {
    return (
      <div className="timetable">
        {events?.map((event) => (
          <Event
            key={event.id}
            event={event}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
        <AddEventButton onAdd={onAdd} />
      </div>
    );
  }