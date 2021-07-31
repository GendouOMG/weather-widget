import './AddedCity.scss';
// import { useState, useEffect } from 'react';

function AddedCity({ name, country, index, removeCity }) {

  return (
    <div className="AddedCity">
      <p>{name}, {country}</p>
      <button type="button" onClick={()=>removeCity(index)}>Delete</button>
    </div>
  );
}

export default AddedCity;