import React, { useState } from 'react';

const CreateProject = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    link: '',
    file: null,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0], // Get the first file from the input
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Display form data in the console
    console.log("Form Data:", formData);
  };

  return (
    <div className="create-project-form">
      <h2>Create a New Project</h2>
      <form onSubmit={handleSubmit}>

        {/* Project Name */}
        <div className="form-group">
          <label htmlFor="name">Project Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Project Description */}
        <div className="form-group">
          <label htmlFor="description">Project Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Project Link */}
        <div className="form-group">
          <label htmlFor="link">Project Link (optional):</label>
          <input
            type="url"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="https://yourprojectlink.com"
          />
        </div>

        {/* File Uploader */}
        <div className="form-group">
          <label htmlFor="file">Upload Project File:</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button className='form-btn' type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default CreateProject;
