# DataVerse

## Overview
This project is a web-based discussion forum where users can post Questions, answer the questions of others, delete a question and also search other discussions.

## Features
- Create a Question
- Delete a Question
- Search functionality
- Category based division 
## Technologies Used
- Frontend: React, Tailwindcss
- State Management: Recoil

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/Priyanshu9382/dataverse.git
    ```
2. Navigate to the project directory:
    ```bash
    cd Discussion-forum
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

## Usage
1. Start the development server:
    ```bash
    npm run dev
    ```
2. Open your browser and navigate to `http://localhost:5173`

## Issues 
There are few issues which are still not working in this website:
 - User authentication is not set, only the login and SignUp page is added but it does not work.
 - The answering option and comment option on any other's question has not been added yet. Just their frontend is added which only shows the prestored data.
 - As user authentication has not been done, any one putting question would be given the user name Guest.
 - Also it store the question only upto the time the user is active, as the user refreshes the page the website shows only the prestored posts. 

## Contact
If you have any questions or suggestions, feel free to reach out to us at [priyanshu.web.dev123@gmail.com].
