# Auto Wisdom User Journey

This project creates an engaging user journey with a login page, a 3D car model landing page, and a consultation booking interface.

## Key Features

### 1. Login Page
- Simple UI with branding colors (Teal and White).
- Redirects to the car model landing page upon successful login.
- **Authentication Middleware**: Ensures only authenticated users can access the car model landing page. If a user is not logged in, they will be redirected to the login page.

### 2. Car Model Landing Page
- **3D Car Model**: Interactive model with rotation and views (front, rear, side, top) using **Three.js**.
- **Car Details**: Displays car make, model, and key features.
- **Consultation Booking**: Button to navigate to the consultation form, accessible only after logging in.


### 4. Tooltips
- Tooltips are added to buttons for additional guidance to users.

## Authentication & Middleware
- **Middleware for Authentication**: Restricts access to page ( `/car`) without login. Users must be authenticated to access the car model page.
- **Register and Login**: 
  - **Register**: Users can sign up to create an account.
  - **Login**: After registration, users can log in to access the car model landing page and book consultations.


## Setup

### Clone the Repository
Clone the project repository using the following command:
git clone https://github.com/rutuja-1201/car-model-auto-wisdom

Install Dependencies
npm install

Start the Project
Run the project:
npm run dev


