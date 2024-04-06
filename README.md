
<div align=center>
  <h1>Create ReactJS Vite and Django project</h1>
</div>

# Tech Stack
1. React + vite
2. Django
3. MySQL

## Create ReactJS Vite project
frontend  - name of the project
```bash
npm create vite@latest 
cd frontend
npm install
npm run dev
```

## Create and Activate Virtual Environment
```bash
virtualenv env
cd env
source bin/activate
pip install django djangorestframework django-cors-headers serializer
cd ..
```

## Create Django project
backend  - name of the project
```bash
django-admin startproject backend
cd backend/
```

## Run the Development Server
```bash
python3 manage.py migrate
python3 manage.py runserver
python3 manage.py createsuperuser
```

## Create a App called post
```bash
python3 manage.py startapp app
```

### Update Backend Settings
In `backend/backend/settings.py`:
```python
INSTALLED_APPS = [
    # ...,
    'rest_framework',
    'corsheaders',
    'app',
    # ...,
]

CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',  # Adjust as per your frontend URL
]
MIDDLEWARE = [
    #...
    'corsheaders.middleware.CorsMiddleware',
    #...
]
```

### Root URLs
In `backend/urls.py`:
```python
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('', include('app.urls')),
    path('admin/', admin.site.urls),
]
```
Create a simple view in `app/views.py`.
```py
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

def index(request):
    return HttpResponse("<h1> Working fine!</h1>")

@api_view(['POST'])
def receive_input(request):
    userName = request.data.get('username')
    password = request.data.get('password')
    if userName:
        print("UserName: " + userName + "\nPassword: " + password) 
        return HttpResponse("User <span style='color:red;'>"+ userName + "</span> Login Success!") 
    else:
        return HttpResponse("No input provided!")
```
Create a py file in `app/urls.py`.
```py
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('content/', views.receive_input, name='receive_input'),
]
```
Edit the `src/App.jsx`
```js
import React from 'react';
import InputForm from './components/InputForm'; 
function App() {
  return (
    <div>
      <InputForm />
    </div>
  );
}

export default App;
```
Create a new file `src/components/InputForm.jsx`
```js
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
      <h2>Login Screen</h2>
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
        <button type="submit">Login</button>
      </form>
      <p id="result"></p>
    </div>
  );
};

export default InputForm;
```
## Project Structure
```txt
.
├── app
│   ├── admin.py
│   ├── apps.py
│   ├── __init__.py
│   ├── migrations/
│   ├── models.py
│   ├── __pycache__/
│   ├── tests.py
│   ├── urls.py
│   └── views.py
├── backend
│   ├── asgi.py
│   ├── __init__.py
│   ├── __pycache__/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── db.sqlite3
├── env/
├── node_module/
├── index.html
├── manage.py
├── package.json
├── package-lock.json
├── project-structure.txt
├── public
│   └── vite.svg
├── README.md
├── src
│   ├── components
|        └──InputForm.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── assets
│   │   └── react.svg
│   ├── index.css
│   └── main.jsx
└── vite.config.js
```
