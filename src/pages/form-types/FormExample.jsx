import React, { useState } from "react";
import Button from "../../components/button/Button";

const FormExample = () => {
  const [formData, setFormData] = useState({
    textInput: "",
  });

  const handleChange = (e) => {
    console.log(e);
    console.log(e.target);
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log(formData);
  };

  const handleReset = () => {
    setFormData({
      textInput: "",
    });
    console.log("Form reset", formData);
  };

  return (
    <div>
      <h2>All Form Types</h2>
      <form onSubmit={handleSubmit}>
        {/* Text Input */}
        <label htmlFor="textInput">Text Input: </label>
        <input
          type="text"
          name="textInput"
          value={formData.textInput}
          onChange={handleChange}
          placeholder="Enter text"
          //   className="border p-2 rounded"
        />

        {/* Form Actions */}
        <div className="form-actions">
          <Button type="submit">Submit</Button>
          <Button type="button" onClick={handleReset} variant="outlined">
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormExample;
