import { useState } from "react";
import { useLocation } from "react-router-dom";
import EventForm from "../components/EventForm";
import { updateEvent } from "../services/event-service";

function EditEventPage() {
  const location = useLocation();
  const event = location.state;

  const [form, setForm] = useState({
    title: event.title,
    description: event.description,
    category: event.category,
    venue: event.venue,
    eventDate: event.eventDate,
    price: event.price,
    capacity: event.capacity,
    status: event.status,
    image: event.image,
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (file) => {
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Append non-file fields
      Object.keys(form).forEach((key) => {
        if (key !== "image") {
          // skip image string
          formData.append(key, form[key]);
        }
      });

      // Append file if selected
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const data = await updateEvent(event.id, formData);

      alert("Event updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Error updating event");
    }
  };

  return (
    <div>
      <EventForm
        title="Edit Event"
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onFileChange={handleFileChange}
      />
    </div>
  );
}

export default EditEventPage;
