import React, { useRef, useState } from 'react';
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const canvasRef = useRef(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map(file => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then(images => {
      setImages(prev => [...prev, ...images]);
    });
  };

  return (
    <div className="App">
      <h1>Superior Heat Transfers Gang Sheet Builder</h1>
      <div>
        <label>Select Sheet Size:</label>
        <select>
          <option>22.3 x 24 - $13</option>
          <option>22.3 x 36 - $19</option>
          <option>22.3 x 48 - $24</option>
          <option>22.3 x 60 - $30</option>
          <option>22.3 x 72 - $35</option>
          <option>22.3 x 84 - $42</option>
          <option>22.3 x 96 - $47</option>
          <option>22.3 x 120 - $57</option>
          <option>22.3 x 144 - $77</option>
          <option>22.3 x 240 - $107</option>
        </select>
      </div>
      <input type="file" multiple onChange={handleImageUpload} />
      <div className="canvas" ref={canvasRef}>
        {images.map((src, index) => (
          <img key={index} src={src} alt="uploaded" style={{ width: '150px', margin: '10px' }} />
        ))}
      </div>
    </div>
  );
}

export default App;
