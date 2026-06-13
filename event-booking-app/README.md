# Event Booking Application

This is a simple event booking application built using React and Vite. The application allows users to browse and book events. 

## Technologies Used

- **[React](ca://s?q=Explain_React)**  
  A popular JavaScript library for building user interfaces. It allows developers to create reusable UI components and efficiently update the DOM using a virtual DOM.

- **[Vite](ca://s?q=Explain_Vite)**  
  A fast frontend build tool and development server. It provides instant hot module replacement (HMR) and optimized builds, making React development smoother and faster compared to older bundlers.

- **[Node.js](ca://s?q=Explain_Node.js)**  
  A runtime environment that allows JavaScript to run outside the browser. It’s used to build scalable backend services and APIs, leveraging its event-driven, non-blocking I/O model.

- **[JWT](ca://s?q=Explain_JWT)**  
  JSON Web Tokens are used for secure authentication. They allow the server to verify user identity and permissions without storing session data, enabling stateless authentication.

- **[bcrypt](ca://s?q=Explain_bcrypt)**  
  A password-hashing library that ensures user passwords are stored securely. It uses salting and multiple hashing rounds to protect against brute-force attacks.


## Features

- Browse and search for events by category
- View event details, including date, time, location, and description
- Book events and view booking details
- Create, edit and delete events (for authenticated users for admin role only)
- Authentication and authorization using JWT tokens

## Installation

1. Clone the repository: `git clone https://github.com/hisyambinadzha/event-booking-app.git`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser and navigate to `http://localhost:5173`

## Usage

### User Authentication

The application uses JWT tokens for authentication. To authenticate, users can register or login using the `/auth` endpoint.

#### Register a New User

![My Image](/screenshots/register.png)

To register, navigate to the **Register** page from the navigation bar or homepage.  
- Enter your **Full Name**, **Email**, **Password**, and **Confirm Password**.  
- Once submitted, the system will create a new account and store the credentials securely.  
- A confirmation message will be displayed, and the user can then log in with their new account.

#### Login User

![My Image](/screenshots/login.png)

To log in, navigate to the **Login** page.  
- Enter your **Email** and **Password**.  
- If the credentials are valid, the application will authenticate the user and generate a session token.  
- Logged-in users can now book events, view their bookings, and access features based on their role (e.g., admin privileges for event management).  
- If the credentials are invalid, the application will display an error message prompting the user to try again.

The application will respond with a JWT token that should be stored in local storage and sent with subsequent requests.

### Events

#### Browse Events

![My Image](/screenshots/home-page.png)

To browse events, navigate to the homepage. The application will display a list of events, sorted by date. Users can filter events by category using the dropdown menu.

#### View Event Details

![My Image](/screenshots/event-page.png)

To view event details, click on an event card. The application will display the event's date, time, location, description, and other details.

#### Book an Event

![My Image](/screenshots/booking-form.png)

To book an event, click on the "Book" button on the event details page. The application will prompt the user to enter their name and email address. Once the booking is submitted, the application will display a confirmation message.

#### My Booking Page

![My Image](/screenshots/my-booking-page.png)

The **Booking History** allows users to view their personal booking history.  
- Displays details such as **Event Name**, **Date**, **Seats Booked**, **Total Price**, and **Booking Status**.  
- Users can cancel pending bookings directly from this page.  
- Provides a clear timeline of past and upcoming events the user has booked.  
- Ensures users have full visibility and control over their event participation.

#### Create Event

![My Image](/screenshots/create-event-1.png)
![My Image](/screenshots/create-event-2.png)

To create a new event, navigate to the **Create Event** page (available only to administrators).  
- The application will display a form where the admin can enter event details such as **Title**, **Description**, **Category**, **Venue**, **Event Date**, **Price**, **Capacity**, and **Image**.  
- Once the form is submitted, the system will validate the input (e.g., ensuring the event title is unique and the date is valid).  
- If validation passes, the event will be saved to the database and displayed in the event list.  
- A confirmation message will be shown to indicate successful creation.  
- If validation fails, the application will display error messages highlighting the fields that need correction.

#### Edit an Event (Admin Feature)

![My Image](/screenshots/edit-event-1.png)
![My Image](/screenshots/edit-event-2.png)

To edit an event, click on the "Edit" button on the event details page. The application will display a form to edit the event's details. Once the form is submitted, the application will update the event details.

#### Delete an Event (Admin Feature)

![My Image](/screenshots/delete-event.png)

To delete an event, click on the "Delete" button on the event details page. The application will prompt the user to confirm the deletion. Once the deletion is confirmed, the application will remove the event from the database.

#### User Bookings List Page (Admin Feature)

![My Image](/screenshots/user-bookings-page.png)

The **All User Bookings** allows administrators to view all bookings made by users.  
- The page displays booking details such as **User Name**, **Event Title**, **Number of Seats**, **Booking Date**, **Total Price**, and **Booking Status**.  
- Admins can approve or reject bookings directly from this page.  

#### Dashboard (Admin Feature)

![My Image](/screenshots/admin-dashboard-1.png)
![My Image](/screenshots/admin-dashboard-2.png)

The **Dashboard** provides a centralized view of system activity.  
- Displays statistics such as **Total Bookings per Event**, **Revenue per Event**, **Total Revenue**, and **Seats Sold by Category**.  
- Includes tables for quick insights into booking trends and event popularity.  

## Limitations

- **[No Payment Gateway](ca://s?q=Explain_payment_gateway_integration)**  
  The application does not include integration with online payment systems (e.g., Stripe, PayPal).  
  - Users can book events, but they cannot make secure online payments directly through the app.  
  - All payments must be handled manually outside the system, which may reduce convenience and automation.

- **[Manual Booking Status Updates](ca://s?q=Explain_manual_booking_status_update)**  
  Booking statuses (e.g., PENDING, APPROVED, CANCELLED, REJECTED) must be updated manually by administrators.  
  - There is no automated workflow to change status based on conditions like payment confirmation or time expiration.  
  - This increases admin workload and may lead to delays or inconsistencies in booking management.

- **[No User Management](ca://s?q=Explain_user_management)**  
  The application does not provide advanced user management features such as identity verification, eKYC (electronic Know Your Customer), or role‑based access control beyond basic login/register.  
  - Admins cannot verify user identities or enforce stricter authentication.  
  - This limits the system’s suitability for high‑security or compliance‑heavy environments.  
  - Features like password recovery, account suspension, or multi‑factor authentication are not implemented.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

