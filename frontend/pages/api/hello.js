// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import React, { useState, useEffect } from 'react';

function hello(dataa) {

  return (
    <div>
      {dataa ? 
        Object.keys(dataa).map((game, index) => (
          <div key={index}>
            <p>{game}: {JSON.stringify(dataa[game])}</p>
          </div>
        ))
      : <p>Loading...</p>}
    </div>
  );
  }
  
  export async function getStaticProps() {
    const [data, setData] = useState(null);

    useEffect(() => {
      fetch('http://localhost:5000/getData')
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error(error));
    }, []);

    return data;

  }

export default hello;