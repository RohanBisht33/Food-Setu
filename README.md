# 🍲 FoodSetu – Zero Waste, Zero Hunger  

## 📌 Problem Statement  
India wastes **~67 million tons of food annually** while **190 million people sleep hungry** every night.  
Restaurants & stores often discard surplus food due to lack of a proper channel.  
This creates an imbalance:  
👉 *“Excess on one side, scarcity on the other.”*  

---

## 💡 Solution  
**FoodSetu** is a **mobile & web app** that connects restaurants/stores with NGOs, shelters, and needy individuals in **real-time**.  

- Providers instantly **post surplus food** before expiry.  
- Receivers get **real-time alerts** & can claim food nearby.  
- **Google Maps API** helps track pickup points.  
- Promotes **social good** & **eco-conscious branding** for restaurants.  

🔖 **Tagline:** *Zero Waste, Zero Hunger.*  

---

## 🏗️ System Architecture  
**Workflow:**  
1. **User Roles**: Providers (restaurants/stores), Receivers (NGOs, shelters, individuals).  
2. **Food Posting Module**: Item, quantity, expiry, pickup location.  
3. **Database Layer**: Listings, user details, claims.  
4. **Matching Engine**: Geo-based (Google Maps API).  
5. **Notification Engine**: Real-time alerts via Firebase Cloud Messaging.  
6. **Claim & Confirmation**: Avoids duplication.  
7. **Pickup Tracking**: Map navigation to pickup point.  

---

## ⚙️ Tech Stack  
- **Frontend**: React Native (cross-platform) / Flutter (alternative)  
- **Backend**: Node.js + Express.js  
- **Database**: Firebase Firestore (real-time) / MySQL  
- **Authentication**: Firebase Auth (Phone/Email login)  
- **Notifications**: Firebase Cloud Messaging (FCM)  
- **Geolocation**: Google Maps API  
- **Hosting**: Firebase Hosting / Vercel  

---

## 🚀 Features  
✅ Real-time surplus food posting  
✅ Expiry-time urgency alerts  
✅ Geolocation-based matching  
✅ Claim & confirmation system (avoids duplication)  
✅ Feedback & rating system for trust  
✅ NGO verification for transparency  
✅ CSR & Goodwill booster for restaurants  

---

## 🌟 Unique Selling Proposition (USP)  
1. **Community-first approach** – Information-driven, not discount-based.  
2. **Expiry-sensitive matching** – Ensures food reaches people before spoilage.  
3. **Geo-targeted distribution** – Nearby shelters/individuals notified only.  
4. **CSR Booster** – Restaurants earn Good Deeds Points & certificates.  
5. **Future-Ready** – AI surplus prediction, blockchain-based donation tracking.  

---

## 📲 How to Run Locally  

```bash
# Clone the repo
git clone https://github.com/your-username/foodsetu.git

# Go to project folder
cd foodsetu

# Install dependencies
npm install

# Run backend
npm start

# Run frontend (React Native)
npx react-native run-android   # for Android
npx react-native run-ios       # for iOS

