import React, { useState } from 'react';
import styled from 'styled-components';
import '../styles/CropRecommender.css'; // Import CSS file for additional styles

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  color: #4CAF50;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: border-color 0.3s;
  
  &:focus {
    border-color: #4CAF50;
  }
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const Prediction = styled.h2`
  margin-top: 20px;
  color: #333;
  opacity: 0;
  animation: fadeIn 0.5s forwards;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

function CropRecommender() {
  const [formData, setFormData] = useState({
    n: '',
    p: '',
    k: '',
    t: '',
    h: '',
    ph: '',
    r: ''
  });
  const [prediction, setPrediction] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:5000/predict_crop_recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const result = await response.json();
    setPrediction(result.prediction);
  };

  return (
    <Container>
      <Title>Crop Recommendation System</Title>
      <Form onSubmit={handleSubmit}>
        <label>Enter the following details:</label> 
        
        <Input type="number" name="n" placeholder="Nitrogen (N)" value={formData.n} onChange={handleChange} required />
        <Input type="number" name="p" placeholder="Phosphorus (P)" value={formData.p} onChange={handleChange} required />
        <Input type="number" name="k" placeholder="Potassium (K)" value={formData.k} onChange={handleChange} required />
        <Input type="number" name="t" placeholder="Temperature (T)" value={formData.t} onChange={handleChange} required />
        <Input type="number" name="h" placeholder="Humidity (H)" value={formData.h} onChange={handleChange} required />
        <Input type="number" step="0.1" name="ph" placeholder="pH level" value={formData.ph} onChange={handleChange} required />
        <Input type="number" name="r" placeholder="Rainfall (R)" value={formData.r} onChange={handleChange} required />
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
      
      {prediction && (
        <Prediction>Predicted Crop: {prediction}</Prediction>
      )}
    </Container>
  );
}

export default CropRecommender;
