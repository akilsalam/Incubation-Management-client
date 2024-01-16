// Frontend (React)
import React, { useState, useEffect } from 'react';

// ... (other imports and component definition)

const Booking = () => {
  const [slots, setSlots] = useState([]);

  // ... other state and effect hooks

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/bookSeat');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data);
        setSlots(data);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchData();
  }, []);

  const booked = async (index) => {
    const user = localStorage.getItem('emailData');

    try {
      const response = await fetch(`http://localhost:3000/bookSeat/book/${index}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ booked: true, user }),
      });

      if (!response.ok) {
        console.error('Failed to book seat');
        return;
      } else {
        const updatedSeat = await response.json();
        window.confirm(`You booked a seatNo:${index}`)
        window.location.reload()
      }
    } catch (error) {
      console.error('Error booking seat:', error.message);
    }
  };

  return (
    <div>
      <h1 className='text-center' style={{ fontFamily: 'fantasy' }}>Booking Slots</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {slots.map((data, index) => (
          <div
            key={index}
            style={{
              width: '4em',
              height: '4em',
              marginRight: '1em',
              marginBottom: '1em',
              cursor: data.user? 'disabled':'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '1.5em',
              fontWeight: 'bold',
            }}
            className={data.user ? 'bg-secondary' : 'bg-warning'}
            onClick= {data.user? null : () => booked(index)}
          >
            {data.seatNumber}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Booking;
