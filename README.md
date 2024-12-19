# MEAN-stack Blogs:
A basic webapp using the MEAN stack (MongoDB, Express, Angular, Node) for posting blogs.  
Implements user registration, authentication & authorization, comments and dynamic search functionality.  
All those in addition to the CRUD operations an admin can perform on the blogs.  

### Table of Contents

#### 1. Pre-requisites
#### 2. Installation
##### 2.1. Clone the repository
##### 2.2. Install Dependencies
#### 3.Environmental Variables
#### 4.Database Setup
##### 4.1.MongoDB Atlas
##### 4.2.Populating DB
#### 5.Running the Project Locally
##### 5.1.Backend
##### 5.2.Frontend


-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1. Pre-requisites:  
Before running the project locally, make sure you have the following installed on your machine:

> Node.js: Ensure Node.js is installed.  
> MongoDB: MongoDB doesn't need to be installed locally.  
>         You are recommended to use a cloud instance (MongoDB Atlas), because i haven't tested with a local Instance of mongoDB, although local should work.
> Angular CLI: Ensure Angular CLI is installed.  
> OS: Windows  
> IDE: VSCode  


Here are the recommended versions for the above, as well as the commands to run in order to install them.

> Angular CLI: 18.2.11  
> Node: 20.14.0  
> Package Manager: npm 10.7.0

- Install Angular globally using the command: 	`npm install -g @angular/cli`
Check Angular version using the command: 	`ng version`

- To install both Node.js and Node Package Manager go to: https://nodejs.org/, download Node.js(LTS) and set up. This should also install the npm.
Check both versions by running:
`node -v`
`npm -v`

- OS: win32 x64

---

2. Installation

2.1. Clone the repository

- Clone the repository to your local machine using Git:  
	`git clone https://github.com/s-esna/mean-blogs.git`

- Then, open the project folder in VScode and navigate to the root directory:  
	`cd mean-blogs`

2.2. Install dependencies (at this point you should be at the root of the project "mean-blogs/")
- Backend (Node.js/Express)

Navigate to the server ("mean-blogs/server/") directory and install the backend dependencies with:

`cd server`  
`npm install`

- Frontend (Angular)

Navigate to the ng-frontend ("mean-blogs/ng-frontend/") directory and install the frontend dependencies:

`cd ../ng-frontend`  
`npm install`

---

3. Environmental Variables

CREATE a ".env" file inside the "server" dir (server/.env ) and set it up following the instructions below with the following contents:

```
ATLAS_URL  = "" #ABSOLUTELY NECESSARY! Enter your Atlas Connection string here. https://www.mongodb.com/resources/products/fundamentals/mongodb-connection-string  

SECRET_KEY_JWT = ""  #ABSOLUTELY NECESSARY! Enter a Secret key of your choice for decoding JWTs here. It's recommended to use a 32-character string, making it as complex as possible.  

ADMIN_PASSWORD = '' #ABSOLUTELY NECESSARY! Choose your password for the Superuser of the website (the default admin username is 'admin', and it's defined in the seed.ts file)  

PORT= 5200  #The port I used is 5200 but feel Free to change it to your liking. If you change it after launching the server, don't forget to restart the server.  

INCOMING_MAIL_ADDRESS = ""  #This mail is used for receiving mails from the 'contact' page. For the purpose of this Project, it must be gmail.  

MAIL_PASSWORD = ""  # You would need to generate a 16digit app-password from google (after setting up two-step verification for your account). Further instructions:  #https://support.google.com/accounts/answer/185833
```  

The atlas_url, the key for signing jwts, as well as the admin_password are absolutely necessary for the functionality of the app.  
For the ATLAS_URL (look below, step 4) you will need to navigate to mongodb.com, sign in and connect to the cluster using a node.js driver (6.7 or later)

---

4. Database Setup  
4.1. MongoDB Atlas  
Configure a cloud MongoDB instance (e.g., MongoDB Atlas):
- Login to your MongoDB Atlas Account, or sign-up if you don't have an account.
- Navigate to your organization's projects (https://cloud.mongodb.com/v2#/org/)
- Create a new project
- Create a cluster (there is a free option, no need to pay)  
	-Choose a username and a password (these are important for the connection string)  
	-Choose the connection method "Drivers", with "Driver:Node.js" & the latest version  
	-You don't need to install the driver  
	-Copy the connection string from here, and use it in the .env file  

Under Security:  
In Database Access: Make sure the user you have is either an admin  or has readWrite capabilities on the cluster  
In Network Access: Under the Network Access tab, make sure to whitelist your current IP address to allow access to the database.  
		Otherwise set it to '0.0.0.0/0' to be able to connect from every IP address

Update the connection string in your .env file.

4.2. Populating DB  
(Even though populating the DB with blogs is unnecessary, it is absolutely necessary that we have an admin-superuser. This is the only way to set up an admin.)

Navigate back to the server directory:
`cd ../server`

In order to populate the Database(and the webapp) with some blogs, and an admin-superuser, please run the file "seed.ts" through the following command:

**!!!BEFORE RUNNING THIS COMMAND MAKE SURE THE .env FILE HAS BEEN SET UP PROPERLY!!!**

`npm run seed`

If everything has been completed so far, proceed to the next step.

---

5. Running the Project Locally  
5.1. Backend:

To start the backend (Node.js/Express) server, you need to be in the server directory and run:

`cd server`  
`npm start`

If you see "listening for requests on port 5200" (or the PORT you defined in .env) it means the server launched successfully.  
This will start the server on the specified port (default is 5000 port is omitted from .env).

The server will be accessible at http://localhost:5200 or the port defined in your .env.

5.2. Frontend:

To run the Angular frontend, open a new terminal in vsCode and navigate to the ng-frontend directory ("~/mean-blogs/ng-frontend/") and run:

`cd ng-frontend`
`ng serve`

This will start the Angular development server, and the frontend will be accessible at http://localhost:4200 by default.

As said earlier, the default admin credentials are the following:  
username = admin  
password = the one you specified in the .env file as ADMIN_PASSWORD.

Make sure you remember the first password you set up, because there's no way of resetting it.  
But even if you forget your password, you can create subsequent admin-superusers through the seed.ts file (just make sure you change the username and the email in said file) 

If you want to login as an ordinary user, just register after logging off.

---