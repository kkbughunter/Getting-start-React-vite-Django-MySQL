<div align=center>
  <h1>Simple Registration Application</h1>
</div>


## Create ReactJS Vite project
frontend  - name of the project
```bash
npm create vite@latest 
mv frontend/* .
npm install
npm install axios
npm run dev
```

## Create and Activate Virtual Environment
```bash
virtualenv env
source env/bin/activate
pip install django djangorestframework django-cors-headers serializer
```

## Create Django project
backend  - name of the project
```bash
django-admin startproject backend
mv backend backend1
mv backend1/* .
rmdir backend1
```

## Run the Development Server
```bash
python3 manage.py migrate
python3 manage.py runserver
```
**Optional**
```bash
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
```
index.css
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
}
a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}

a:hover {
  color: #535bf2;
}
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #ffffff;
}
h1 {
  font-size: 3.2em;
  line-height: 1.1;
}
button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}

button:hover {
  border-color: #646cff;
}

button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }

  a:hover {
    color: #747bff;
  }

  button {
    background-color: #f9f9f9;
  }
}
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

# Configure `MySQL Database`


```bash
pip install mysqlclient
```
replace `backend/settings.py`
```py
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'your_database_name', # Replace with your database name
        'USER': 'your_mysql_username', # Replace with your MySQL username
        'PASSWORD': 'your_mysql_password', # Replace with your MySQL password
        'HOST': 'localhost', # Replace with your MySQL host
        'PORT': '3306', # Replace with your MySQL port
    }
}
```
```bash
python manage.py makemigrations
python manage.py migrate
```

and update the `app/views.py`
```py
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db import connection

def index(request):
    return HttpResponse("<h1> Working fine!</h1>")


@api_view(['POST'])
def receive_input(request):
    userName = request.data.get('username')
    password = request.data.get('password')
    
    if userName and password:
        # Construct the SQL query
        sql_query = "INSERT INTO users (uname, password) VALUES (%s, %s)"
        params = (userName, password)
        
        try:
            # Execute the SQL query
            with connection.cursor() as cursor:
                cursor.execute(sql_query, params)
                print("User saved to the database: ", userName)
                
            return HttpResponse(f"User <span style='color:green;'>{userName}</span> Registered Success!")
        except Exception as e:
            print("Error saving user to database:", e)
            return HttpResponse("<span style='color:red;> User already exit </span>")
    else:
        return HttpResponse("No input provided!")
```
### Run Your Application
```bash
python3 manage.py runserver
npm run dev
```

## Thank you...