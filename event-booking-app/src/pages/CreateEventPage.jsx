import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EventForm from "../components/EventForm";
import { createEvent } from "../services/event-service";

function CreateEventPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    venue: "",
    eventDate: "",
    price: 0,
    capacity: 0,
    status: "DRAFT",
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (file) => {
    if (file.size > 10 * 1024 * 1024) {
      // 10MB
      alert("File too large. Please upload an image under 10MB.");
      return;
    }
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Append form fields
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      // Append file
      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (new Date(formData.eventDate) < new Date()) {
        alert("Event date must be in the future");
        return;
      }

      const data = await createEvent(formData);

      console.log(data);

      alert("Event created successfully!");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <EventForm
        title="Create Event"
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onFileChange={handleFileChange}
      />
    </div>
  );
}

export default CreateEventPage;
