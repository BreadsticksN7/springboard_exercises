import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

function BoxNewForm({ createBox }) {
  const [ formData, setFormData ] = useState({
    width: "",
    height: "",
    backgroundColor: ""
  });

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  };

  const newData = evt => {
    evt.preventDefault();
    createBox({ ...formData, id: uuid() });
    setFormData({ width: "", height: "", backgroundColor: "" });
  };

  return (
    <div>
      <form onSubmit={newData}>
        <div>
          <label htmlFor="width">Width:</label>
            <input
              type="text"
              id="width"
              name="width"
              value={formData.width}
              onChange={handleChange}
             />
        </div>
        <div>
          <label htmlFor="height">Height:</label>
          <input
            type="text"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
          />
        </div>
        <div>
        <label htmlFor="backgroundColor">Color:</label>
        <input
          type="text"
          id="backgroundColor"
          name="backgroundColor"
          value={formData.backgroundColor}
          onChange={handleChange}
        />
        </div>
        <button id="newBoxButton">Add box</button>
      </form>
    </div>
  );
}

export default BoxNewForm;