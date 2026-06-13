import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/event-form.css";
import API_BASE_URL from "../config";

function EventForm({ title, form, onChange, onSubmit, onFileChange }) {
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  // Initialize preview with existing image
  useEffect(() => {
    if (form.image) {
      setPreview(`${API_BASE_URL}${form.image}`);
    }
  }, [form.image]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    onFileChange(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <form className="event-form" onSubmit={onSubmit} encType="multipart/form-data">
      <h2>{title}</h2>

      <div className="form-group">
        <input name="title" value={form.title} onChange={onChange} required />
        <label>Event Title</label>
      </div>

      <div className="form-group">
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
        />
        <label>Description</label>
      </div>

      <div className="grid-2">
        <div className="form-group">
          <input name="category" value={form.category} onChange={onChange} />
          <label>Category</label>
        </div>

        <div className="form-group">
          <input name="venue" value={form.venue} onChange={onChange} />
          <label>Venue</label>
        </div>
      </div>

      <div className="grid-2">
        <div className="form-group">
          <input
            type="datetime-local"
            name="eventDate"
            value={form.eventDate}
            onChange={onChange}
          />
          <label>Event Date</label>
        </div>

        <div className="form-group">
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={onChange}
          />
          <label>Price</label>
        </div>
      </div>

      <div className="grid-2">
        <div className="form-group">
          <input
            type="number"
            name="capacity"
            value={form.capacity}
            onChange={onChange}
          />
          <label>Capacity</label>
        </div>

        <div className="form-group">
          <select name="status" value={form.status} onChange={onChange}>
            <option value="OPEN">OPEN</option>
            <option value="CANCELLED">CANCELLED</option>
            <option value="DRAFT">DRAFT</option>
          </select>
        </div>
      </div>

      <div className="image-upload-card">
        <label className="upload-title">Upload Event Image</label>

        <div className="upload-content">
          <label className="file-button">
            Choose File
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </label>

          <span className="file-name">
            {preview ? "Image selected" : "No file chosen"}
          </span>
        </div>

        {preview && (
          <div className="preview-container">
            <img src={preview} alt="preview" />
          </div>
        )}

      </div>

      <div className="form-actions">
        <button type="submit" className="save-btn">Save</button>
        <button
          type="button"
          className="cancel-btn"
          onClick={() => navigate(-1)} // or navigate("/home")
        >
          Close
        </button>
      </div>

    </form>
  );
}

export default EventForm;
