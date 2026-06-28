# Future Blink Shopify App Task

Hey there! This is my submission for the Shopify App Developer task. I built this app using the MERN stack integrated into Shopify's modern Remix framework.

The app allows merchants to type an announcement in their Shopify Admin dashboard, which is then saved to a MongoDB database for auditing and synced to the storefront using Shopify Metafields and a Theme App Extension.

## 🔗 Live Demo
- **Deployed URL:** `https://futureblink-zem-task.vercel.app` 
- **Loom Video Demo:** [Link to your video here]

## 🛠 What I Used
- **Frontend:** React, Shopify Polaris components
- **Backend:** Node.js, Express (via Remix Actions), Shopify GraphQL Admin API
- **Database:** MongoDB
- **Storefront:** Liquid, Theme App Extension (App Embed Block)

## 💻 How to Run Locally

If you want to run this code on your own machine:

1. **Clone and Install:**
   Clone this repository and open it in your terminal. Run the following command to download all dependencies:
   ```bash
   npm install
   ```

2. **Database Setup:**
   Create a `.env` file in the root folder of the project. Add your MongoDB connection string to it like this:
   ```env
   MONGODB_URI=your_mongodb_connection_string_here
   ```

3. **Start the Development Server:**
   Run the following command to start the Shopify CLI:
   ```bash
   npm run dev
   ```
   *Note: If prompted, press `Y` to create a new app in your Shopify Partner account, or select an existing one.*

4. **Install on your Store:**
   The terminal will generate a preview URL or prompt you to press `p`. Open that link in your browser to install the app on your Shopify Development store.

5. **Test the Dashboard:**
   Once inside the app dashboard, type a message and click **Save**. You should see a success toast!

6. **View on Storefront:**
   To see it on the live storefront, go to **Online Store > Themes > Customize**. Click the **App embeds** icon on the left sidebar, and turn on the **Announcement Banner**. Hit Save and preview your store!

## 📦 Deployment on Vercel

The backend and frontend are hosted on Vercel. 

In a local environment, Shopify's CLI automatically manages the environment variables (like API keys) for us. However, in production on Vercel, I had to manually set the following variables in the Vercel dashboard so the app can talk to Shopify:
- `SHOPIFY_API_KEY`
- `SHOPIFY_API_SECRET`
- `SHOPIFY_APP_URL`
- `SCOPES`
- `MONGODB_URI`

The MongoDB IP access is also set to `0.0.0.0/0` so Vercel's dynamic IPs can connect to it.
