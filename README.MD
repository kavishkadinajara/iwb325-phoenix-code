# Eventure - Phoenix-Code `iwb325`

Welcome to **Eventure**, a platform designed to simplify event management and ticketing. Built as part of the "Innovate With Ballerina" hackathon, Eventure focuses on streamlining the process of booking, managing, and enjoying events.

## Project Overview

- **Frontend:** Next.js 14 with Tailwind CSS.
- **Backend:** Ballerina (located in the `server` folder).
- **Authentication:** Asgardeo.
- **Database:** PostgreSQL, hosted on Supabase.
- **File Storage:** AWS S3.
- **Email Notifications:** Resend.

## Folder Structure

- **client/** - Contains the Next.js application (frontend).
- **server/** - Contains the Ballerina code (backend).

## Prerequisites

To run this project, you will need to install the following:

1. **Node.js** (v18+)
2. **Ballerina** (v2301.x)
3. **PostgreSQL** (for local development, or connect to the Supabase instance)
4. **AWS S3** account (for file storage)
5. **Asgardeo** account (for authentication)
6. **Resend** account (for email notifications)

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/supunsathsara/iwb325-phoenix-code.git
cd iwb325-phoenix-code
```

### 2. Setting up the Client (Next.js)

Navigate to the `client` folder:

```bash
cd client
```

Install the dependencies:

```bash
npm install
```

Create the `.env.local` file:

To make setup easier, download the `.env.local` file from this [Google Drive link](https://drive.google.com/file/d/15_UpOqgP7uv8m8V4ljdNw7sp22sijjc-/view?usp=sharing) and place it in the `client/` folder.

Alternatively, create an `.env.local` file with the following structure:

```env
AUTH_SECRET="<your-auth-secret>"
AUTH_ASGARDEO_ID="<your-asgardeo-id>"
AUTH_ASGARDEO_SECRET="<your-asgardeo-secret>"
ASGARDEO_CLIENT_ID="<your-asgardeo-client-id>"
ASGARDEO_CLIENT_SECRET="<your-asgardeo-client-secret>"
ASGARDEO_ISSUER="<your-asgardeo-issuer>"
JWT_SECRET="<your-jwt-secret>"
NEXT_PUBLIC_BAL_URL="<your-ball-url>"

NEXT_PUBLIC_PAYHERE_MERCHANT_ID="<your-payhere-merchant-id>"
PAYHERE_MERCHANT_SECRET="<your-payhere-merchant-secret>"
NEXT_PUBLIC_PAYHERE_NOTIFY_URL="<your-payhere-notify-url>"
NEXT_PUBLIC_PAYHERE_SANDBOX="<true/false>"
NEXT_PUBLIC_PAYHERE_RETURN_URL="<your-return-url>"
NEXT_PUBLIC_PAYHERE_CANCEL_URL="<your-cancel-url>"

RESEND_API_KEY="<your-resend-api-key>"
```

Run the Next.js app:

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

### 3. Setting up the Server (Ballerina)

Navigate to the `server` folder:

```bash
cd server
```

Install dependencies and Ballerina modules (if required).

Download the `config.toml` file from this [Google Drive link](https://drive.google.com/file/d/1VhZy4Ta7ewkb2wLIlc1ZjVgGGcDMq83E/view?usp=sharing) and place it in the `server/` folder.

Alternatively, create a `config.toml` file with the necessary configurations such as:

```toml
[database]
host = "<your-postgres-database-host>"
port = "<your-postgres-database-port>"
databaseName = "<your-postgres-database-name>"
username = "<your-postgres-username>"
password = "<your-postgres-password>"

[jwt]
signingSecret = "<your-jwt-signing-secret>"

[s3]
AWS_ACCESS_KEY_ID = "<your-aws-access-key-id>"
AWS_SECRET_ACCESS_KEY = "<your-aws-secret-access-key>"
AWS_BUCKET = "<your-aws-bucket-name>"
AWS_REGION = "<your-aws-region>"
```

Run the Ballerina service:

```bash
bal run
```

The backend will start on the specified port, typically `http://localhost:8080`.

### 4. Environment Setup for Judges

For easier setup, we have uploaded the required `.env.local` and `config.toml` files to a Google Drive. Please download them using the links provided and place them in the respective directories.

- **Next.js env file**: [Download here](https://drive.google.com/file/d/15_UpOqgP7uv8m8V4ljdNw7sp22sijjc-/view?usp=drive_link)
- **Ballerina config file**: [Download here](https://drive.google.com/file/d/1VhZy4Ta7ewkb2wLIlc1ZjVgGGcDMq83E/view?usp=sharing)
- **Folder with both files**: [Download here](https://drive.google.com/drive/folders/1Qrj5TvFqNB0-xZ-KNDfXWM6F_EW5vDK5?usp=sharing)

> **Note:** Please download the configuration files using the provided links and place them in the respective directories to run the application. Note that these files will be available only until the conclusion of the hackathon and the keys will be revoked after that.

### 5. Running the Application

Once both the frontend and backend are set up and running, you can access the application at `http://localhost:3000` and start using Eventure.

## Features

1. **Easy Ticket Booking** - Seamlessly book event tickets online.
2. **Event Dashboard** - Manage your events and tickets with ease.
3. **Secure Payments** - Integrated with PayHere for secure transactions.
4. **Real-Time Notifications** - Receive updates and confirmations instantly.

## Tech Stack

- **Next.js 14**
- **Tailwind CSS**
- **Ballerina**
- **Asgardeo Authentication**
- **PostgreSQL**
- **AWS S3**
- **Resend Email Notifications**

## Team Phoenix-Code

We built this project as part of the Innovate With Ballerina hackathon. Our aim is to simplify event management for everyone.

---

Thank you for reviewing Eventure!
