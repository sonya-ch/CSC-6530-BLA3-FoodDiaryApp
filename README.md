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

### Design 
- [UML](./docs/design/UML.md) 
- [UseCaseDiagram](./docs/design/)
- [Database_ER_Diagram](./docs/design/Database_ER.md) 
 
### Steps Working
1. Install Express
2. Install Neon - Create user-profiles table - Test POST and GET 
3. Create Profile.js and Hamburger Menu Navigation
4. Add Age and Activity levels to Table - to calculate BMI and TDEE
5. Food Diary Tracking (FoodDiary.js) show Food Diary Tracking > Linked with App.js
6. Create food_logs Table storing food tracking data.
7. Create food search page to link with USDA Food API.

### Interaction 
- Pressable / TouchableOpacity
- Navigate to screens
- Search/filter
- Favorite/unfavorite
- Category selection
- FlatList 

---

## Stack Technologies
### Front-End
- Figma
- CSS
- Canvas

### Back-End
- JavaScript
- React Native
- TypeScript
- Android Emulator
- Expo Go 

### Database
- PostgreSQL
- SQLite
- Express
- Node.js
- NEON
- PowerShell

### API
- FDA Food API 
 
 ---
 
 ## How to Run
- npm install (Install Packages)
- npm start (Start Expo)
- npx expo start -c (Start Expo and clear cache)
- npx expo install expo-sqlite (Install Expo SQLite)
  
---
 
## Database Flow
 - [DatabaseFlow](./docs/design/DatabaseFlow.md)  

---

## What I Have Learned? (Challenges) 

BLA2 helped me understand how a mobile application works beyond the user interface. I learned how the UI, application logic, state management, and database work together to create a functional application.

I also learned that organizing database operations separately from the UI can make the application easier to maintain and extend in future development.

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
 
"# -CSC-6530-BLA3-FoodDiaryApp" 
