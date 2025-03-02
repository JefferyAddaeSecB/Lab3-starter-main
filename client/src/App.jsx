import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [images, setImages] = useState([]);
  const [dogImage, setDogImage] = useState('');

  const fetchRandomImages = async () => {
    const response = await axios.get('http://localhost:8000/fetch/multiple');
    setImages(response.data);
  };

  const fetchRandomDogImage = async () => {
    const response = await axios.get('https://dog.ceo/api/breeds/image/random');
    setDogImage(response.data.message);
  };

  const uploadDogImage = async () => {
    const formData = new FormData();
    formData.append('file', dogImage);

    await axios.post('http://localhost:8000/save/single', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    alert('Dog image uploaded successfully!');
  };

  return (
    <div>
      <h1>Random Images</h1>
      <button onClick={fetchRandomImages}>Get Random Images</button>
      <div>
        {images.map((image, index) => (
          <img key={index} src={`http://localhost:8000/fetch/file/${image}`} alt={`random-${index}`} style={{ width: '200px', margin: '10px' }} />
        ))}
      </div>

      <h1>Random Dog Image</h1>
      <button onClick={fetchRandomDogImage}>Get Random Dog Image</button>
      {dogImage && <img src={dogImage} alt="random-dog" style={{ width: '200px', margin: '10px' }} />}
      <button onClick={uploadDogImage}>Upload Dog Image</button>
    </div>
  );
};

export default App;