# AirGo


We have Implemented a web application named Air Go

Video Link
https://www.youtube.com/watch?v=LEUbekViFs4

Users can Access the application by clicking on the link below:
// https://air-go.vercel.app/

Users can Access the application as following Roles

1. Admin
2. User

Admin can perform the following operations:

1. Add a new flight
2. Delete a flight
3. View Booking of a flight with the details of the passengers and seats Booked by Them

ADMIN

ALL the route are protected by the middleware which checks if the admin is Authenticated or not and also checks if the admin is logged in or not as well as if the particular user is an admin or not By checking the role of the admin in the database

To login as an admin

1. Go to the /admin Link
2. Enter the following credentials
   1. Email:agarvit1142000@gmail.com
   2. Password: password

To add a new flight

1. First off You need to login as an admin using admin login and password given above (admin Role can only be assigned by me).
2. Once loggin in successfully to application you will get option to add Flight and Flight details like Flight name, Source, Destination, Ticket price, No of seats, Departure date.
3. Admin also have access to Cancel a particular flight.
4. Admin can also check Booking details of a particular flight by flight Id and flight name.


USER

1.Sign up 
User need to Register to application with their name, email and password and on successfull registration he will receive a email regarding email verification.

2.Login 
If the user is registered in the database then to use further services he/she  needs to first login to application because are services are protectd and needs jwt token to access them.

3.Search Flight
Upon successfull login to application user can search for flights according to source, destination and departure date and book seats in that flight.

4.My trips
User can also check all the trip and flight details that he had done in past or have already booked.

