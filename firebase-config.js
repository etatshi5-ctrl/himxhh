// أضف القيم التي تحصل عليها من Firebase Console > Project settings > Your apps.
// لا تضع كلمات مرور أو مفاتيح حسابات إدارية هنا. إعدادات Web API ليست سرًا بحد ذاتها؛ الحماية تعتمد على Security Rules وApp Check.
export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

export const isFirebaseConfigured = Object.values(firebaseConfig).every(
  value => typeof value === "string" && value.trim().length > 0
);
