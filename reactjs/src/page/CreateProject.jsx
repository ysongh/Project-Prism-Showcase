import React, { useState } from 'react';
import lighthouse from "@lighthouse-web3/sdk";

import { LIGHTHOUSE_API_KEY } from '../keys';
import { useContracts } from "../utils/useContracts";

const CreateProject = () => {
  const { createProject } = useContracts();

  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    link: '',
    file: null,
  });
  const [photoURL, setPhotoURL] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file selection
  const handleFileChange = async (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0], // Get the first file from the input
    });

    setLoading(true);

    const apiKey = LIGHTHOUSE_API_KEY;
    const dealParams = {
        num_copies: 2,
        repair_threshold: 28800,
        renew_threshold: 240,
        miner: ["t017840"],
        network: "calibration",
        deal_duration: 1756643958,
    };
    const uploadResponse = await lighthouse.upload(e.target.files, apiKey, dealParams);
    if (uploadResponse) {
      console.log(`https://gateway.lighthouse.storage/ipfs/${uploadResponse.data.Hash}`);
      setPhotoURL(`https://gateway.lighthouse.storage/ipfs/${uploadResponse.data.Hash}`);
    }

    setLoading(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Display form data in the console
    console.log("Form Data:", formData);

    createProject(photoURL, formData.link, formData.name, formData.description);
  };

  return (
    <div className="create-project">
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
          <button className='form-btn' type="submit" disabled={loading}>
            {loading ? "Waiting..." : "Create Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
