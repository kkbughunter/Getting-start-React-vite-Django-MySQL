
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
            return HttpResponse("<span style='color:red;'> User already exit </span>")
    else:
        return HttpResponse("No input provided!")