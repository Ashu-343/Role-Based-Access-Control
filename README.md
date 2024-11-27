Authentication and Role-Based Access Control System

This repository provides a fully functional user authentication and authorization system built with React for the frontend and Node.js, Express, and MongoDB for the backend. The system supports role-based access control (RBAC) with different user roles such as Admin, Instructor, and Student.

Features

	•	User Signup and Login: Users can register and log in securely.
	•	Role-Based Access Control (RBAC): Admin, Instructor, and Student roles with different access rights.
	•	Email Verification: OTP sent to the email for verifying the user’s account.
	•	JWT Authentication: Secure authentication using JSON Web Tokens (JWT).
	•	Password Hashing: User passwords are hashed using bcrypt for added security.
	•	Protected Routes: Role-based authorization to protect certain routes.
	•	Cookie-based Token Storage: JWT token stored in cookies for secure session management.
    •	Dynamic UI Rendering: The frontend dynamically displays different content based on the user’s role.
	•	Frontend Validations: Validations for form inputs such as email, password on the client side.

Technologies Used

Frontend

	•	React: For building the user interface.
	•	React Router: For routing in the React application.
	•	Axios: For making HTTP requests to the backend.
	•	CSS: For UI styling (if used).

Backend

	•	Node.js: Server-side JavaScript runtime environment.
	•	Express.js: Web framework for Node.js.
	•	MongoDB: NoSQL database for storing user and OTP data.
	•	Mongoose: ODM for MongoDB.
	•	JWT (JSON Web Token): For secure user authentication.
	•	bcrypt: For hashing user passwords.
	•	nodemailer: For sending email OTPs.

Setup

1. Backend Setup (Node.js, Express, MongoDB)

1) Clone repository
2) Install dependencies
3) Configure environment variables
   Create a .env file in the root of the backend project and configure the following variables:
    
    MONGODB_URL=your-mongodb-connection-string
    JWT_SECRET=your-jwt-secret
    MAIL_HOST=smtp.mailtrap.io
    MAIL_USER=your-mail-user
    MAIL_PASS=your-mail-password

4) Start the backend server
   Your backend should now be running on http://localhost:4000.

2. Frontend Setup (React)

1) Navigate to the frontend directory
2) Install dependencies
3) Configure environment variables
   Create a .env file in the root of the client directory and set the API URL for the backend:

   REACT_APP_API_URL=http://localhost:3000/api/auth

4) Start the frontend server
   Your React frontend should now be running on http://localhost:3000.

API Endpoints

Authentication Routes

	•	POST /api/auth/signup: Register a new user. Requires firstName, lastName, email, password, confirmPassword, accountType, contactNumber, and otp in the request body.
	•	POST /api/auth/login: Login an existing user. Requires email and password in the request body.
	•	POST /api/auth/logout: Log out the current user by clearing the authentication cookie.
	•	POST /api/auth/sendotp: Send an OTP to the user’s email for verification. Requires email in the request body.

Role-based Authorization

Roles are checked at the backend to restrict access:

	•	Admin: Full access to all resources.
	•	Instructor: Limited access, mostly to instructor-specific routes.
	•	Student: Limited to student-specific resources.

Role-based Middleware

	1.	auth middleware: Verifies the JWT token in the request and attaches the user object to the request.
	2.	isStudent middleware: Ensures that the authenticated user has the “Student” role.
	3.	isInstructor middleware: Ensures that the authenticated user has the “Instructor” role.
	4.	isAdmin middleware: Ensures that the authenticated user has the “Admin” role.

Frontend Validation

The frontend has robust client-side validation for various user input forms, ensuring correct and secure data submission. Form fields such as email, password, and OTP undergo validation before submission.

Code Explanation : 

Backend

	•	Database Connection: Uses Mongoose to connect to MongoDB and store user and OTP data.
	•	Signup and Login: Users can register with email and password, and login with JWT-based authentication.
	•	JWT Token: After successful login, a JWT token is generated and sent back to the client. This token is stored in a cookie for secure session management.
	•	OTP Generation: During signup, an OTP is sent to the user’s email for verification. This is handled by nodemailer.

Frontend

	•	React Components:
	•	Signup: A form for registering a new user.
	•	Login: A form for logging in an existing user.
	•	Protected Routes: Based on the user’s role (Admin, Instructor, Student), certain pages and routes are accessible.
    

Notes

	•	The application uses JWT for secure user authentication and bcrypt for password hashing.
	•	OTPs are stored temporarily in MongoDB and expire after 5 minutes.
	•	The backend is set up to handle email verification, and role-based access control is enforced using middleware.
