import React, { useState } from 'react';
import axios from 'axios';

const InputForm = () => {
  const [uname, setUserNameText] = useState('');
  const [passwd, setUserPasswordText] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make an HTTP POST request to Django backend
      const response = await axios.post('http://localhost:8000/content/', {
        username: uname,
        password: passwd,
      });

      document.getElementById("result").innerHTML = response.data;
    } catch (error) {
      console.error('Error submitting input:', error);
    }
  };

  const devStyle = {
      display: "block",
      justifyContent: "center", /* Align content horizontally center */
      alignItems: "center", /* Align content vertically center */
      textAlign: "center", /* Align text center */
    }
  return (
    <div style={devStyle}>
      <h2>Registeration</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td><label>UserName</label></td>
              <td><input type="text" id="uname" value={uname} onChange={(e) => setUserNameText(e.target.value)}/></td>
            </tr>
            <tr>
              <td><label>Password</label></td>
              <td><input type="password" id="passwd" value={passwd} onChange={(e) => setUserPasswordText(e.target.value)}/></td>
              </tr>
          </tbody>
        </table>
        <button type="submit">Submit</button>
      </form>
      <p id="result"></p>
    </div>
  );
};

export default InputForm;