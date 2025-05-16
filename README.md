# PointsCalculator

A simple receipt processor

-----------------------------------------------------------------------

# Tech Stack

**Backend**: Express.js

**Database**: MySQL

**Deployment**: Docker, Docker compose
-----------------------------------------------------------------------

# Requirement to run the code

download docker desktop 

-----------------------------------------------------------------------

# Steps to Run

1) git clone git@github.com:ssathyanaray2/PointsCalculator.git

2) docker compose up --build 

I have used mysql docker image for database and have created init.sql file to add initial dummy data. After running the above command docker will take a minute to pull the image and start running.

URL to access the backent: http://localhost:8000

-----------------------------------------------------------------------

# Database Tables

**Receipts Table:**

id	                    CHAR(36)	        Primary Key

retailer	            VARCHAR(255)	    Not Null

purchase_date	        DATE                Not Null

purchase_time	        TIME	            Not Null

total	                DECIMAL(10,2)	    Not Null

points	                INT	Not Null,       Default: 0, Calculated and saved


**Items Table:**

id	                    INT	                Primary Key

receipt_id	            CHAR(36)	        Foreign Key → receipts(id), On Delete CASCADE

short_description	    VARCHAR(255)	    Not Null

price	                DECIMAL(10,2)	    Not Null

-----------------------------------------------------------------------