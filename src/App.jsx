import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [developers, setDevelopers] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit] = useState(10); 
  const [allFetched, setAllFetched] = useState(false); 

  
  const fetchDevelopers = async () => {
    try {
      const response = await axios.get(`https://json-api.uz/api/project/11-dars/developers?skip=${skip}&limit=${limit}`);
      console.log(response.data); 

     
      const newDevelopers = Array.isArray(response.data) ? response.data : response.data.developers || [];

      
      setDevelopers(prevDevelopers => [...prevDevelopers, ...newDevelopers]);


      if (newDevelopers.length < limit) {
        setAllFetched(true);
      }
    } catch (error) {
      console.error("Ma'lumot olishda xatolik yuz berdi:", error);
    }
  };

  
  useEffect(() => {
    fetchDevelopers();
  }, [skip]);

  
  const handleShowMore = () => {
    setSkip(prevSkip => prevSkip + limit);
  };

  
  const handleShowLess = () => {
    setSkip(0);
    setDevelopers([]);
    setAllFetched(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Developers List</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {developers.map((developer, index) => (
          <div key={index} className="card bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
            <div className="card-body">
              <h2 className="card-title text-2xl font-bold text-blue-500">{developer.name}</h2>
              <p className="text-gray-700"><strong>Role:</strong> {developer.role}</p>
              <p className="text-gray-700"><strong>Experience:</strong> {developer.experience} years</p>
              <p className="text-gray-700"><strong>Location:</strong> {developer.location}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        {!allFetched ? (
          <button onClick={handleShowMore} className="btn btn-primary px-6 py-2 rounded-full shadow-lg hover:bg-blue-700">
            Show more 10
          </button>
        ) : (
          <button onClick={handleShowLess} className="btn btn-secondary px-6 py-2 rounded-full shadow-lg hover:bg-gray-700">
            Show less
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
