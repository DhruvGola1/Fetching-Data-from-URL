import React, { useState, useEffect } from 'react';
import './Cart.css'


const Cart = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?page=1&results=1&seed=abc');
        console.log(response)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log(result)
        setData(result.results[0]); 
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center">Error: {error}</div>;
  }

  const { gender, name, picture, phone } = data;

  return (
    <div className="profile-container">
      <div className="card" >
        <img src={picture.large} className="profile-image" alt="user" />
        <div className="profile-details">
          <h5 className="profile-name">{name.first} {name.last}</h5>
          <p className='profile-gender'> <strong>Gender : </strong> {gender}</p>
          <p className="profile-contact">
            <strong>Contact : </strong> {phone}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
