<div align=center>
  <h1>Simple Registration Application</h1>
</div>


This repository provides a simple registration application built using ReactJS with Vite for the frontend, Django for the backend, and MySQL for the database. Follow the instructions below to get started.

### Prerequisites
- Node.js installed on your machine
- Python installed on your machine
- MySQL database server installed and running

### Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/KKBUGHUNTER/Getting-start-React-vite-Django-MySQL.git
   cd Getting-start-React-vite-Django-MySQL
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   npm install axios
   ```

3. Set up a virtual environment for Django and activate it:
   ```bash
   virtualenv env
   source env/bin/activate
   ```

4. Install backend dependencies:
   ```bash
   pip install django djangorestframework django-cors-headers mysqlclient
   ```
### **`Node:` Please confirm the <span style="color:red;">backend/settings.py DATABASE Config</span> inforamtion as per your machine.** <br>
5. Perform database migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. Start the Django server:
   ```bash
   python manage.py runserver
   ```

7. Start the frontend development server:
   ```bash
   npm run dev
   ```

### Usage

Once both the Django server and the frontend development server are running, you can access the application through your web browser. The registration form should be available, allowing users to register by providing their details.

### Additional Notes

- Make sure your MySQL database server is running and accessible before running the Django migrations.
- For production deployment, ensure to configure appropriate settings for security, database connections, and other necessary configurations.
- Feel free to customize and extend the application according to your requirements.

Enjoy using the Simple Registration Application! If you encounter any issues or have any questions, don't hesitate to reach out to the repository owner.