### Setup project:

### npm init -y

### npm install express

### npm install mongoose --save

### npm install typescript --save-dev

### npm i cors

### npm i dotenv

### tsc -init

### npm run build

### npm i --save-dev @types/node

### npm i --save-dev @types/express

### npm i --save-dev @types/cors

### npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev

### npx eslint --init

### For locally run:

### clone the project

### Run the command: npm init/npm init -y

### Run the command for dist folder: npm run build or simply run tsc ## To run the

### Project Feature:

### Authentication & Authorization:

#### Sign Up: Users and admins can register by providing details such as name, email, role, password, phone, and address.

#### Sign In: Users and admins can log in using their email and password to receive a JWT token for authenticated actions.

### Admin Actions:

#### Car Management:

#### Create Car: Admins can add new cars with details like name,description, color, features, and price per hour.

#### Update Car: Admins can update car information, including performing soft deletes to mark cars as unavailable without removing them from the database.

#### Delete Car: Admins can perform soft deletes to mark cars as unavailable.

### Booking Oversight:

#### View All Bookings: Admins can view all bookings to monitor rental activity. o

#### Return Car: Admins can finalize rentals by setting the end time and calculating the total cost based on duration and price per hour.

### User Actions:

#### Book a Car: Users can book available cars by specifying the car ID, date, and start time.

#### View Booking History: Users can access their past and current booking history.

### project : npm run start:dev run the project locally in browser simply:http://localhost:5000

### project live link:https://a-3-car-rental-reservation-system.vercel.app
