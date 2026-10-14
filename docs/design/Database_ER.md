```mermaid
erDiagram
    FOODS ||--o{ FOOD_LOGS : "FOOD_LOGS.food_fk references FOODS.food_id"
    %% || = exactly one food per log
    %% o{ = zero or more logs per food
    %% -- = identifying relationship (solid line)

    FOODS {
        INTEGER food_id PK
        TEXT name
        TEXT category
        INTEGER calories
        REAL protein
        REAL carbs
        REAL fat
        TEXT image
        INTEGER isFavorite
    }

    FOOD_LOGS {
        INTEGER log_id PK
        INTEGER food_fk FK "Foreign Key"
        TEXT food_name
        TEXT meal_type
        TEXT log_date
        REAL quantity_grams
        REAL calories
        REAL protein
        REAL carbs
        REAL fat
        TEXT created_at
    }