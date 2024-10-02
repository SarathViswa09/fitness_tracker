import React, { useEffect, useState } from 'react';

const Home = () => {
  const [userName, setUserName] = useState('');
 
  useEffect(() => {
    fetch('/user/name') 
        .then(response => response.json())
        .then(data => {
            setUserName(data.name);
        })
        .catch(error => console.error('Error fetching username:', error));
}, []);

  return (
    <div>
      <h1>Hello {userName}</h1>
    </div>
  )
}

export default Home
