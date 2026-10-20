# Project: Food Tracking App [BLA 3]
# Name: Saranya Chotsiri
# Course: CSC-6530-1 | Mobile Application Design and Development I
# Instructor: Dr Victor Govindaswamy
# Start Date: 10/9/2026


## BLA 3 – API, PostgreSQL, and AI

For BLA 3, I plan to further develop the Food Tracking App into a ByteBurn application by integrating an external API and AI functionality.

The goal is to connect the existing food-tracking features with external data and introduce an AI-based feature, such as an AI food or nutrition coach.

This will allow me to gradually develop the project from a UI-focused application into a more functional application using local data, APIs, and AI.

### The application will introduce CRUD functionality, including:
- Add a food/meal
- View food details
- Edit food information
- Delete a food/meal
- Manage food data locally using SQLite
- Update User Profile
- Calculate BMI and TDEE 

---

### The main screens will include:
#### BLA1 - Favorite Food
-	Home Page – Food Menu header, search bar, food categories, and food cards.
-	Favorite Page – Users can add or remove foods from their favorites list, also show total calories from selected food.
#### BLA2 - CURD and Local database SQLite
-	View Food Detail – Food image, food category, calories, protein, and other details.
-	Add new food Page - Check Validate food name.
-	Edit Food Page - Reuse Add food page.
-	Delete Food Pop Up - Alert confirmation.
#### BLA3 - API, PostgreSQL and Logs food diary
-   **Profile Page - User Profile and calculate BMI and TDEE 
-   **FoodDiary - Show food diaryLogs
-   **SearchFood.js - Search food list from USDA FoodData Central API, and manage it to 100g unit.

---

### Design 
- [UML](./docs/design/UML.md) 
- [UseCaseDiagram](./docs/design/)
- [Database_ER_Diagram](./docs/design/Database_ER.md)  
- [DatabaseFlow](./docs/design/DatabaseFlow.md)  

---

 ## How to Run
- npm install (Install Packages)
- npm start (Start Expo)
- npx expo start -c (Start Expo and clear cache)
- npx expo install expo-sqlite (Install Expo SQLite)
- node server (./backend - run PostgreSQL)
  
---

### BLA3 - Working Steps
#### Profile Page
1. Install Express - Node.js
2. Install Neon - Create user-profiles table - Test POST and GET 
3. Create Profile.js and Hamburger Menu Navigation
4. Add Age and Activity levels to Table - to calculate BMI and TDEE
#### Diary Logs
5. Food Diary Tracking (FoodDiary.js) show Food Diary Tracking > Linked with App.js
6. Create food_logs Table storing food tracking data.
7. Create food search page to link with USDA Food API.
8. Connect USDA FoodData Central by API_KEY in ./.env
#### AI Chatbot
9. AI Coach Page - Chatbot style.
10. AI modules
- Front-End, Chat UI: Display Messages
- Back-End, AI Service: Send qustiom to Backend, for calling AI model.
- API, Nutrition Context: Took Profile data and Food Diary, for AI to answer based on real data. 
11. AI API Back-End - Create Endpoint to get questions and answers.
- aiRoutes.js - AI API URL.
- aiController.js - Get the message from app, then answer back.
- aiService.js - Connect with AI, and wait for answer.
12. Connect OpenAI SDK - 'npm install openai' - using express.
13. AI Key - Pay for the OpenAI token usage. 

---

## Stack Technologies

### Design and UI/UX
- **Figma** – Used for UI/UX design and interface planning.
- **CSS** – Used for styling where applicable.
- **Mermaid** – Used to create UML, database entity-relationship diagrams (ERDs) and visualize table relationships.

### Front-End and Mobile Development
- **React Native** – Framework for building the ByteBurn mobile application.
- **JavaScript** – Used to implement application logic and functionality.
- **TypeScript** – Used where applicable for typed JavaScript development.
- **Expo** – Development platform for running and testing the React Native application.
- **Expo Go** – Used to preview and test the application on supported devices.
- **Android Emulator** – Used to run and test the Android application in a virtual device.

### Database
- **SQLite (`expo-sqlite`)** – Stores food diary logs and favorite foods locally in the mobile application.
- **PostgreSQL** – Relational database for user profile information.
- **Neon** – Cloud-hosted PostgreSQL database service used to store user profile data.

### Back-End Development
- **Node.js** – JavaScript runtime used to run the backend server.
- **Express.js** – Backend framework used to build REST API endpoints and connect the mobile application to PostgreSQL.

### External APIs
- **USDA FoodData Central API** – Provides food information and nutrition data for food search and tracking.

### Development and Testing Tools
- **PowerShell** – Used to run development commands, start the backend server, and test API endpoints.
- **Git** – Used for version control and tracking code changes.
- **GitHub** – Used to host the source code repository and manage project updates.

### AI Feature
- **OpenAI API** - AI Model using Responses API from OpenAI SDK.

---
 

## What I Have Learned? (Challenges)

During BLA 3, I learned how to extend a React Native application beyond 
basic UI development by integrating external APIs, local database storage, 
and a backend server.

### Key Learnings

- **External API Integration:** Learned how to use the USDA FoodData Central 
  API to search for food information and retrieve nutrition data.

- **SQLite Database Management:** Learned how to create and manage food diary 
  records, retrieve food logs by date, and delete individual entries.

- **Backend Development:** Gained experience using Node.js and Express.js 
  to build API endpoints and connect the mobile application to a PostgreSQL 
  database hosted on Neon.

- **User Profile Management:** Learned how to retrieve and update profile 
  information through API requests.

- **Environment Configuration:** Learned how environment variables are used 
  to configure API keys and how to troubleshoot issues when environment 
  variables are not loaded from the expected `.env` file.

- **Dependency Management:** Learned how to identify incompatible package 
  versions and restore compatible Expo, React, and React Native dependencies.

- **Debugging and Testing:** Improved my troubleshooting skills by testing 
  API endpoints, checking database operations, and resolving Android Emulator 
  connectivity issues using ADB.

### Challenges

- Integrating external API data into the React Native application.
- Managing asynchronous API requests and database operations.
- Separating local food diary storage from backend-managed user profile data.
- Configuring environment variables for API access.
- Troubleshooting dependency conflicts and Android Emulator connectivity.
- Planning how to combine food logs and user profile data for future 
  AI-powered nutrition coaching.

These challenges helped me better understand how different parts of a 
mobile application work together, from the user interface and database 
to external APIs and backend services.

---

## YouTube Links
- https://youtu.be/3sEZsL94INs
- https://youtu.be/AYzrZTkDeLc
- https://youtu.be/ouihfc1OEXg

## LinkedIn Posts
- https://www.linkedin.com/feed/update/urn:li:activity:7513009305218981888/
- https://www.linkedin.com/feed/update/urn:li:share:7513010199029350401/
- https://www.linkedin.com/feed/update/urn:li:share:7513010901407592448/

---

## Screenshots
 - [Screenshots](./docs/screenshots/)  

---


# Future Plans
  

---

## Tutorials and Learning Resources

I plan to use the following YouTube tutorials as learning resources. 
Rather than following one tutorial as a complete project, I will use different sections from each tutorial to learn specific concepts and combine them into my own application.

### 1. React Native Basic Core Components (Thai)*
https://www.youtube.com/watch?v=2lHPaT7urVA&t=6845s
I will use this tutorial to review React Native core components and basic UI development. I find Thai-language explanations easier to understand for learning the fundamentals.

### 2. React Native Todo List
https://www.youtube.com/watch?v=CfSK9niSAxY
I will use this tutorial to study list management and the concept of adding items to a list, which I plan to apply to the favorite food feature.

### 3. React Native Backend / Search Bar
https://www.youtube.com/watch?v=fLIl6jypzkI&t=330s
I will use the relevant sections to study backend-related concepts and search bar functionality.

### 4. React Native Delete Meal
https://www.youtube.com/watch?v=XCifkDC0yXA&t=2997s
I will use this tutorial to study how to implement delete functionality for meals, which will be relevant to BLA 2.

I will combine the relevant concepts from these resources and implement them in my own Food Menu and Food Tracking applications rather than directly reproducing the tutorials.

---
 