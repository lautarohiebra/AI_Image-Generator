# This project features a AI Image Generator that integrates OpenAI Image generation Api functions made using the "MERN" JavaScript stack and TailwindCSS for style application.

# M: MongoDB
# E: ExpressJS
# R: ReactJS
# N: NodeJS

# Set Up:

## Once downloaded the file, you will notice two folders, "client" for front-end and "server" for back end.
## I recommend open a terminal and install their dependencies using npm.

### Front-end: Use npm run dev for initializing.

### Back-end: Rename ".env.example" as ".env" and complete the data:

### OPENAI_API_KEY= Find it at open AI Api
### MONGODB_URL= URL of your database cluster

# This project uses cloudinary as cloud storage, the following data can be found at cloudinary's page after generating an account.

### CLOUDINARY_CLOUD_NAME 
### CLOUDINARY_API_KEY
### CLOUDINARY_API_SECRET

# After .env data is complete, you can run the back-end using "npm start" at the terminal

# Note: If you are trying to run this project on localhost, maybe is necessary to change some urls to http://localhost:8080 search for "change url" comments and do the changes. notice is necessary to keep urls final part, "api/v1/..."