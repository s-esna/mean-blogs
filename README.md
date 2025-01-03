# MEAN-stack Blogs:
A basic webapp using the MEAN stack (MongoDB, Express, Angular, Node) for posting blogs.  
Implements user registration, authentication & authorization, comments and dynamic search functionality.  
All those in addition to the CRUD operations an admin can perform on the blogs.  

### Table of Contents

#### 1. Pre-requisites
#### 2. Installation
###### 2.1. Clone the repository
###### 2.2. Install Dependencies
#### 3.Setting Up Environmental Variables
#### 4.Database Setup
###### 4.1.MongoDB Atlas
###### 4.2.Populating DB
#### 5.Running the Project Locally
###### 5.1.Backend
###### 5.2.Frontend
#### 6.Swagger
#### 7.Features

---

#### 1. Pre-requisites:  
Before running the project locally, make sure you have the following installed on your machine:

 **Node.js** (v20.14.0)  
  - Install Node.js from [Node.js official website](https://nodejs.org/) (LTS version recommended).  
  - Node Package Manager (npm 10.7.0) will be installed along with Node.js.  
  - Then, check their versions using:  
```bash
node -v
npm -v
```

 **MongoDB**  
  - A cloud instance (e.g., [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)) is recommended.  
  - Local MongoDB should work but is untested with this project.


 **Angular CLI** (v18.2.11)  
- Install globally using:  
```bash
npm install -g @angular/cli
```
- Verify installation and version through:  
```bash
ng version
```

- **Operating System**  
  - Tested on **Windows** (win32 x64).  

- **IDE (Optional)**  
  - [Visual Studio Code](https://code.visualstudio.com/) is recommended for development.

---

#### 2. Installation  
##### 2.1. Clone the repository

- Clone the repository to your local machine using Git:  
```bash
	git clone https://github.com/s-esna/mean-blogs.git
```
- Then, open the project folder in your IDE (e.g. VScode) and navigate to the root directory:  
```
	cd mean-blogs  
```
##### 2.2. Install dependencies

At this point you should be at the root directory of the project called "mean-blogs/"

**1. Backend (Node.js/Express)**

Navigate to the server directory ("mean-blogs/server/") and install the backend dependencies with:
```bash
cd server
npm install
```
- Frontend (Angular)

Navigate to the ng-frontend ("mean-blogs/ng-frontend/") directory and install the frontend dependencies:
```bash
cd ../ng-frontend 
npm install
```

---

#### 3. Environmental Variables

- CREATE a ".env" file inside the "server" directory (server/.env ). You can use the following:

```bash
cd ../server
ni .env
```

- Copy and paste the contents below, inside the '.env' file. Pay attention to the comments please:

```text
# Database connection string (MongoDB Atlas)
ATLAS_URL  = "" 
# ABSOLUTELY NECESSARY! Enter your Atlas Connection string here. https://www.mongodb.com/resources/products/fundamentals/mongodb-connection-string  

# JSON Web Token (JWT) secret key
SECRET_KEY_JWT = ""  #ABSOLUTELY NECESSARY! Enter a Secret key of your choice for decoding JWTs here. It's recommended to use a 32-character string, making it as complex as possible.  


# Administrator credentials
ADMIN_PASSWORD = '' 
# ABSOLUTELY NECESSARY! Choose your password for the admin of the website. 
# MUST be at least 8 chars long, and contain at least 1 Uppercase, 1 Lowercase, 1 digit and 1 symbol (example: J()Hnd0e)
# The default admin username is 'admin', and it's defined in the 'seed.ts' file  

PORT= 5200  
# The port used is 5200 but feel Free to change it to your liking. If you change it after launching the server, don't forget to restart the server.  

# Contact email configuration
INCOMING_MAIL_ADDRESS = ""  
# This mail is used for receiving mails from the 'contact' page. For the purpose of this Project, it must be gmail.  

MAIL_PASSWORD = ""  
# You would need to generate a 16-digit app password from google (after setting up two-step verification for your account)
# Further instructions:  https://support.google.com/accounts/answer/185833
```  

The atlas_url, the key for signing JWTs, as well as the admin_password are absolutely necessary for the functionality of the app.  
For the ATLAS_URL (look below, step 4) you will need to navigate to mongodb.com, sign in and connect to the cluster using a node.js driver (6.7 or later)

---

#### 4. Database Setup  
##### 4.1. MongoDB Atlas  
Configure a cloud MongoDB instance (e.g., MongoDB Atlas):
- Login to your MongoDB Atlas Account, or sign-up if you don't have an account.
- Navigate to your organization's projects (https://cloud.mongodb.com/v2#/org/)
- Create a new project
- Create a cluster (there is a free option, no need to pay)  
	-Choose a username and a password (these are important for the connection string)  
	-Choose the connection method "Drivers", with "Driver:Node.js" & the latest version  
	-You don't need to install the driver  
	-Copy the connection string from there, and **use it in the .env file**  

Under Security:  
In Database Access: Make sure the user you have is either an admin  or has readWrite capabilities on the cluster  
In Network Access: Under the Network Access tab, make sure to whitelist your current IP address to allow access to the database.  
		Otherwise set it to '0.0.0.0/0' to be able to connect from every IP address

Update the connection string in your .env file.

##### 4.2. Populating DB  
(Even though populating the DB with blogs is unnecessary, it is absolutely necessary that we have an admin-superuser. This is the way to set up an admin.)

Navigate back to the server directory:
```bash
cd ../server
```

In order to populate the Database(and the webapp) with some blogs, and an admin-superuser, please run the file "seed.ts" through the following command:

**!!!BEFORE RUNNING THIS COMMAND MAKE SURE THE .env FILE HAS BEEN SET UP PROPERLY!!!**
```bash
npm run seed
```

This will create a database in your cluster called "Pesek".

Inside the "Pesek" database, two collections will be created. One called "blogs" and one called "users".

If everything has been completed so far, proceed to the next step.

---

#### 5. Running the Project Locally  
##### 5.1. Backend:

To start the backend (Node.js/Express) server, you need to be in the server directory and run:

```bash
cd server  
npm start
```

If you see "listening for requests on port 5200" (or the PORT you defined in .env) it means the server launched successfully.  
This will start the server on the specified port (default is 5000 port is omitted from .env).

The server will be accessible at http://localhost:5200 or the port defined in your .env.

##### 5.2. Frontend:

To run the Angular frontend, open a new terminal in vsCode and navigate to the ng-frontend directory ("~/mean-blogs/ng-frontend/") and run:

```bash
cd ng-frontend
ng serve
```

This will start the Angular development server, and the frontend will be accessible at http://localhost:4200 by default.

As said earlier, the default **admin credentials** are the following:  
**username** = *admin*  
**password** = *the one you specified in the .env file as **ADMIN_PASSWORD**.*

Make sure you remember the first password you set up, because there's no way of resetting it.  
But even if you forget your password, you can create subsequent admin-superusers through the seed.ts file (just make sure you change the username and the email in said file) 

If you want to login as an ordinary user, just register after logging off.

---

#### 6. Swagger  

The endpoint for testing endpoints via swagger is the following:

`http://localhost:5200/swagger/`  (Or the port you chose in .env)

Please make sure you have a valid JWT for testing the various endpoints.

In order to get a JWT:

1. Log into the webapp

2. Open developer tools in your browser (F12)

3. Go to the storage tab, and look under local storage

4. Copy the value of the "key" that is named token

5. Paste it in the "Authorize" section, on the top right of the swagger page

Check description of each endpoint to see if it needs a JWT, and if the JWT of an admin, or a plain user is needed

---

#### 7. Features

Key features of this project are the following:

- CRUD operations through a RESTful API

- Authentication:

A user needs to be registered and logged-in to access any part of the website

- Authorization:

Only an admin is authorized to do certain actions (like creating blogs)

- Tag searching & dynamic text searching:

Blogs can be looked up using their tags, or through a search bar that looks for corresponding text in their title or main body. The text search fetches blogs while the user is typing.

- Dynamic pagination:

While the user is searching for text through the search bar, the pagination also changes dynamically.

- Validators on front and backend for registration:

Validators are implemented for registration (emails have to have email format, passwords have to follow a strong password format etc). Validators have been put for users elsewhere as well (i.e. can't submit an empty comment)

- Email service through the 'contact' page:

Users can send an email directly through the contact page, to a specific email address we have set up

- User-friendly experience throughout the app:

Be it success messages for comment submission and login, or warning messages when trying to delete a blog, actions come with corresponding and clear messages for the user.

- Responsiveness:

The web app is responsive for various monitor sizes.

---
