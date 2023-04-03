# Photographer Booking Express App

This is an NodeJS application made using ExpressJS, MongoDB, Redis-CLient, etc. 

The entire application is contained within the `index.js` file.

`package.json` is a minimal Rack configuration for NodeJS.

## Install

    npm install

## Run the app

    npm run sever
    

# REST API

The REST API to the example app is described below.

## Get list of All Studios

### Request

`GET /studios/`

    http://localhost:4500/studios/

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    
    [{All Studios Info}]
    

### Request

`GET /studios/:studio-id`

    http://localhost:4500/studios/:studio-id

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    
    {Indivisual Studio Info}
    
    
### Request

`POST /studios/signin`

    http://localhost:4500/studios/signin

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    
    Studio Signup
    
    
### Request

`POST /studios/login`

    http://localhost:4500/studios/login

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    
    Studio Login
    
    
### Request

`POST /studios/slots/:studio-id`

`Body: {date: 2023-03-04}` 

    http://localhost:4500/studios/slots/:studio-id

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    
    [{All Booked Slots}]
        
### Request

`POST /studios/slots/book/:studio-id`

`Body: {date: 2023-03-04, start_time: 00:00, end_time: 24:00}` 

    http://localhost:4500/studios/slots/book/:studio-id

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    
    Appointment Request Sent
            
### Request

`GET /appointment`

`headers: {Authorization: token}` 

    http://localhost:4500/appointment

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    
    All Appointment
    
            
### Request

`PATCH /appointment/accept/:appointment-id`

`headers: {Authorization: token}` 

    http://localhost:4500/appointment/accept/:appointment-id

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    
    Appointment Accepted
                
### Request

`PATCH /appointment/decline/:appointment-id`

`headers: {Authorization: token}` 

    http://localhost:4500/appointment/decline/:appointment-id

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    
    Appointment Declined
    
    
    
    
