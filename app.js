import { firebaseConfig, isFirebaseConfigured } from "./firebase-config.js";

const FIREBASE_VERSION = "13.1.0";
const WHATSAPP_NUMBER = "249124673541";
const CURRENCY = "SDG";

const GAMES = {
  freefire: {
    name: "Free Fire",
    badge: "FF",
    descriptionKey: "freefireDesc",
    offers: [
      { id: "ff-diamonds", nameAr: "جواهر Free Fire", nameEn: "Free Fire Diamonds", priceSdg: null },
      { id: "ff-weekly", nameAr: "عضوية أسبوعية", nameEn: "Weekly Membership", priceSdg: null },
      { id: "ff-monthly", nameAr: "عضوية شهرية", nameEn: "Monthly Membership", priceSdg: null }
    ]
  },
  pubg: {
    name: "PUBG Mobile",
    badge: "P",
    descriptionKey: "pubgDesc",
    offers: [
      { id: "pubg-uc", nameAr: "شدّات PUBG Mobile", nameEn: "PUBG Mobile UC", priceSdg: null },
      { id: "pubg-weekly", nameAr: "الأسبوعية", nameEn: "Weekly Pack", priceSdg: null },
      { id: "pubg-monthly", nameAr: "الشهرية", nameEn: "Monthly Pack", priceSdg: null }
    ]
  },
  mlbb: {
    name: "Mobile Legends",
    badge: "ML",
    descriptionKey: "mlbbDesc",
    offers: [
      { id: "mlbb-diamonds", nameAr: "ألماس Mobile Legends", nameEn: "Mobile Legends Diamonds", priceSdg: null },
      { id: "mlbb-weekly", nameAr: "عضوية أسبوعية", nameEn: "Weekly Membership", priceSdg: null }
    ]
  },
  codm: {
    name: "Call of Duty Mobile",
    badge: "C",
    descriptionKey: "codmDesc",
    offers: [
      { id: "codm-cp", nameAr: "نقاط COD Mobile", nameEn: "COD Mobile CP", priceSdg: null },
      { id: "codm-battlepass", nameAr: "Battle Pass", nameEn: "Battle Pass", priceSdg: null }
    ]
  }
};

const I18N = {
  ar: {
    eyebrow: "شحن ألعاب بطريقة أبسط", heroTitle: "جاهز للمرحلة<br><span>الجديدة؟</span>",
    heroDescription: "اختر لعبتك، حدّد الباقة، وأرسل طلبك مباشرة. تجربة واضحة وسريعة من البداية للنهاية.",
    browseGames: "تصفّح الألعاب", heroNote: "الطلب يتم تأكيده عبر واتساب", powerUp: "YOUR NEXT POWER-UP", easyOrder: "طلب سهل",
    trustOne: "اختيار واضح", trustTwo: "تفاصيل طلبك قبل الإرسال", trustThree: "تأكيد عبر واتساب",
    chooseGame: "اختر لعبتك", gamesTitle: "ما الذي تريد شحنه؟", gamesCount: "ألعاب مبدئيًا",
    freefireDesc: "جواهر وباقات اللعبة", pubgDesc: "شدّات وباقات اللعبة", mlbbDesc: "ألماس وباقات اللعبة", codmDesc: "نقاط وباقات اللعبة",
    catalogNote: "قائمة الباقات والأسعار تُضبط من ملف الإعدادات بعد تحديد عروضك الفعلية.",
    simpleSteps: "بكل بساطة", howTitle: "كيف تطلب؟", stepOneTitle: "اختر اللعبة", stepOneText: "ابدأ باختيار اللعبة التي تريد شحنها.",
    stepTwoTitle: "أدخل التفاصيل", stepTwoText: "حدد الباقة واكتب معرّف اللاعب بدقة.", stepThreeTitle: "أرسل الطلب",
    stepThreeText: "راجع الملخص وأرسله إلى واتساب للتأكيد.", footerText: "طلبات شحن الألعاب، بخطوات واضحة.",
    orderStep: "الخطوة التالية", orderTitle: "تفاصيل الطلب", selectedGame: "اللعبة المختارة", offerLabel: "الباقة المطلوبة",
    offerDefault: "اختر الباقة", priceHint: "السعر يُؤكَّد عند الطلب ما لم تُضف أسعارًا فعلية في الإعدادات.",
    playerIdLabel: "معرّف اللاعب (Player ID)", extraLabel: "معلومات إضافية", optional: "(اختياري)", nameLabel: "اسمك",
    summaryLabel: "ملخص الطلب", sendWhatsapp: "متابعة إلى واتساب", privacyNote: "لا تطلب Katshr كلمة مرور حسابك أو رمز التحقق.",
    playerPlaceholder: "مثال: 123456789", extraPlaceholder: "Server / Zone / ملاحظة", namePlaceholder: "الاسم",
    priceOnRequest: "السعر عند الطلب", priceFormat: "السعر: {price} {currency}", chooseOfferError: "يرجى اختيار الباقة.",
    playerError: "يرجى إدخال معرّف اللاعب.", formError: "تعذر تجهيز الطلب. تحقق من البيانات وحاول مجددًا.",
    firebaseSaved: "تم حفظ الطلب وإعداده للإرسال.", firebaseNotReady: "Firebase غير مهيأ بعد؛ سيتم فتح واتساب دون حفظ الطلب في قاعدة البيانات.",
    saveFailed: "تعذر حفظ الطلب في Firebase. لن نرسل الطلب تلقائيًا؛ يمكنك المحاولة مجددًا أو التواصل عبر واتساب يدويًا.",
    summaryLine: "{game} — {offer}", whatsappIntro: "مرحبًا Katshr، أريد طلب شحن لعبة:",
    whatsappGame: "اللعبة", whatsappOffer: "الباقة", whatsappPlayer: "معرّف اللاعب", whatsappExtra: "معلومات إضافية",
    whatsappName: "الاسم", whatsappPrice: "السعر", noOffer: "اختر الباقة", languageButton: "EN"
  },
  en: {
    eyebrow: "Game top-ups, made simpler", heroTitle: "Ready for the<br><span>next level?</span>",
    heroDescription: "Choose your game, select a package, and send your request directly. A clear, simple flow from start to finish.",
    browseGames: "Browse games", heroNote: "Orders are confirmed through WhatsApp", powerUp: "YOUR NEXT POWER-UP", easyOrder: "Easy ordering",
    trustOne: "Clear choices", trustTwo: "Review before sending", trustThree: "WhatsApp confirmation",
    chooseGame: "Pick your game", gamesTitle: "What do you want to top up?", gamesCount: "initial games",
    freefireDesc: "Diamonds and game packs", pubgDesc: "UC and game packs", mlbbDesc: "Diamonds and game packs", codmDesc: "Points and game packs",
    catalogNote: "Packages and prices can be configured after your actual offers are finalized.",
    simpleSteps: "It's simple", howTitle: "How to order", stepOneTitle: "Choose a game", stepOneText: "Start by selecting the game you want to top up.",
    stepTwoTitle: "Add details", stepTwoText: "Choose a package and enter the player ID carefully.", stepThreeTitle: "Send your request",
    stepThreeText: "Review the summary and send it through WhatsApp for confirmation.", footerText: "Game top-ups, with clear steps.",
    orderStep: "Next step", orderTitle: "Order details", selectedGame: "Selected game", offerLabel: "Package",
    offerDefault: "Choose a package", priceHint: "Price is confirmed with the seller unless actual prices are configured.",
    playerIdLabel: "Player ID", extraLabel: "Extra information", optional: "(optional)", nameLabel: "Your name",
    summaryLabel: "Order summary", sendWhatsapp: "Continue to WhatsApp", privacyNote: "Katshr never asks for your account password or verification code.",
    playerPlaceholder: "e.g. 123456789", extraPlaceholder: "Server / Zone / Note", namePlaceholder: "Name",
    priceOnRequest: "Price on request", priceFormat: "Price: {price} {currency}", chooseOfferError: "Please choose a package.",
    playerError: "Please enter the player ID.", formError: "Could not prepare the order. Check the details and try again.",
    firebaseSaved: "Order saved and ready to send.", firebaseNotReady: "Firebase is not configured yet. WhatsApp can open without saving to the database.",
    saveFailed: "Could not save to Firebase. The request was not sent automatically; retry or contact via WhatsApp manually.",
    summaryLine: "{game} — {offer}", whatsappIntro: "Hello Katshr, I would like to order a game top-up:",
    whatsappGame: "Game", whatsappOffer: "Package", whatsappPlayer: "Player ID", whatsappExtra: "Extra information",
    whatsappName: "Name", whatsappPrice: "Price", noOffer: "Choose a package", languageButton: "ع"
  }
};

let currentLanguage = "ar";
let selectedGameKey = null;
let firestoreAdd = null;
let firestoreDb = null;
let firebaseReady = false;
let toastTimeout = null;

const $ = selector => document.querySelector(selector);
const $$ = selector => Array.from(document.querySelectorAll(selector));

function t(key) {
  return I18N[currentLanguage][key] ?? key;
}

function safeText(value, maxLength = 120) {
  return String(value ?? "").trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function formatPrice(price) {
  if (!Number.isFinite(price) || price < 0) return t("priceOnRequest");
  return `${new Intl.NumberFormat(currentLanguage === "ar" ? "ar" : "en").format(price)} ${CURRENCY}`;
}

function renderLanguage() {
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  document.body.classList.toggle("ltr", currentLanguage === "en");
  $$("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    if (I18N[currentLanguage][key]) element.innerHTML = t(key);
  });
  $("#languageButton").textContent = t("languageButton");
  $("#playerId").placeholder = t("playerPlaceholder");
  $("#playerExtra").placeholder = t("extraPlaceholder");
  $("#customerName").placeholder = t("namePlaceholder");
  if (selectedGameKey) renderOffers();
  updateSummary();
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.hidden = false;
  if (toastTimeout) window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => { toast.hidden = true; }, 4200);
}

function openOrder(gameKey) {
  const game = GAMES[gameKey];
  if (!game) {
    showToast(t("formError"));
    return;
  }
  selectedGameKey = gameKey;
  $("#selectedGameName").textContent = game.name;
  $("#orderGameBadge").textContent = game.badge;
  $("#formError").hidden = true;
  $("#orderBackdrop").hidden = false;
  document.body.style.overflow = "hidden";
  renderOffers();
  updateSummary();
  window.setTimeout(() => $("#offerSelect").focus(), 80);
}

function closeOrder() {
  $("#orderBackdrop").hidden = true;
  document.body.style.overflow = "";
}

function renderOffers() {
  const select = $("#offerSelect");
  const previousValue = select.value;
  select.replaceChildren();
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = t("offerDefault");
  select.appendChild(defaultOption);

  const game = GAMES[selectedGameKey];
  if (!game) return;
  game.offers.forEach(offer => {
    const option = document.createElement("option");
    option.value = offer.id;
    const label = currentLanguage === "ar" ? offer.nameAr : offer.nameEn;
    option.textContent = `${label} — ${formatPrice(offer.priceSdg)}`;
    select.appendChild(option);
  });
  if (game.offers.some(offer => offer.id === previousValue)) select.value = previousValue;
}

function selectedOffer() {
  const game = GAMES[selectedGameKey];
  if (!game) return null;
  return game.offers.find(offer => offer.id === $("#offerSelect").value) ?? null;
}

function updateSummary() {
  const game = GAMES[selectedGameKey];
  const offer = selectedOffer();
  if (!game || !offer) {
    $("#summaryText").textContent = "—";
    $("#summaryPrice").textContent = "—";
    return;
  }
  const offerName = currentLanguage === "ar" ? offer.nameAr : offer.nameEn;
  $("#summaryText").textContent = t("summaryLine").replace("{game}", game.name).replace("{offer}", offerName);
  $("#summaryPrice").textContent = formatPrice(offer.priceSdg);
}

function validateForm() {
  const offer = selectedOffer();
  const playerId = safeText($("#playerId").value, 80);
  if (!offer) return t("chooseOfferError");
  if (!playerId) return t("playerError");
  return "";
}

async function saveOrder(order) {
  if (!firebaseReady || typeof firestoreAdd !== "function" || !firestoreDb) return { saved: false, reason: "not-configured" };
  try {
    await firestoreAdd(firestoreDb, "orders", {
      ...order,
      status: "new",
      source: "katshr-web",
      createdAt: new Date().toISOString()
    });
    return { saved: true };
  } catch (error) {
    console.error("Katshr Firebase order save failed:", error);
    return { saved: false, reason: "save-failed" };
  }
}

function buildWhatsappMessage(order) {
  const lines = [
    t("whatsappIntro"),
    `${t("whatsappGame")}: ${order.gameName}`,
    `${t("whatsappOffer")}: ${order.offerName}`,
    `${t("whatsappPlayer")}: ${order.playerId}`
  ];
  if (order.playerExtra) lines.push(`${t("whatsappExtra")}: ${order.playerExtra}`);
  if (order.customerName) lines.push(`${t("whatsappName")}: ${order.customerName}`);
  lines.push(`${t("whatsappPrice")}: ${order.priceLabel}`);
  return lines.join("\n");
}

async function handleOrderSubmit(event) {
  event.preventDefault();
  const errorMessage = validateForm();
  const errorBox = $("#formError");
  if (errorMessage) {
    errorBox.textContent = errorMessage;
    errorBox.hidden = false;
    return;
  }

  const game = GAMES[selectedGameKey];
  const offer = selectedOffer();
  const order = {
    gameKey: selectedGameKey,
    gameName: game.name,
    offerId: offer.id,
    offerName: currentLanguage === "ar" ? offer.nameAr : offer.nameEn,
    playerId: safeText($("#playerId").value, 80),
    playerExtra: safeText($("#playerExtra").value, 120),
    customerName: safeText($("#customerName").value, 80),
    currency: CURRENCY,
    priceSdg: Number.isFinite(offer.priceSdg) ? offer.priceSdg : null,
    priceLabel: formatPrice(offer.priceSdg),
    language: currentLanguage
  };

  const button = $("#submitOrder");
  button.disabled = true;
  button.style.opacity = "0.7";
  errorBox.hidden = true;

  try {
    const result = await saveOrder(order);
    if (result.reason === "save-failed") {
      errorBox.textContent = t("saveFailed");
      errorBox.hidden = false;
      return;
    }
    if (result.reason === "not-configured") showToast(t("firebaseNotReady"));
    else showToast(t("firebaseSaved"));

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsappMessage(order))}`;
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) window.location.href = url;
    closeOrder();
  } catch (error) {
    console.error("Katshr order submission failed:", error);
    errorBox.textContent = t("formError");
    errorBox.hidden = false;
  } finally {
    button.disabled = false;
    button.style.opacity = "";
  }
}

async function initializeFirebase() {
  if (!isFirebaseConfigured) {
    console.info("Katshr is running without Firebase: fill firebase-config.js to enable database saves.");
    return;
  }
  try {
    const appModuleUrl = `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-app.js`;
    const firestoreModuleUrl = `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-firestore.js`;
    const [{ initializeApp }, { getFirestore, addDoc, collection }] = await Promise.all([
      import(appModuleUrl),
      import(firestoreModuleUrl)
    ]);
    const app = initializeApp(firebaseConfig);
    firestoreDb = getFirestore(app);
    firestoreAdd = async (db, collectionName, data) => addDoc(collection(db, collectionName), data);
    firebaseReady = true;
    console.info("Katshr Firebase initialized.");
  } catch (error) {
    firebaseReady = false;
    console.error("Katshr Firebase initialization failed:", error);
    showToast(currentLanguage === "ar" ? "تعذر الاتصال بـ Firebase. راجع الإعدادات والاتصال." : "Firebase could not initialize. Check configuration and connection.");
  }
}

function attachEvents() {
  $$("[data-select-game]").forEach(button => {
    button.addEventListener("click", () => openOrder(button.dataset.selectGame));
  });
  $("#closeOrder").addEventListener("click", closeOrder);
  $("#orderBackdrop").addEventListener("click", event => {
    if (event.target === $("#orderBackdrop")) closeOrder();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !$("#orderBackdrop").hidden) closeOrder();
  });
  $("#offerSelect").addEventListener("change", updateSummary);
  $("#orderForm").addEventListener("submit", handleOrderSubmit);
  $("#languageButton").addEventListener("click", () => {
    currentLanguage = currentLanguage === "ar" ? "en" : "ar";
    renderLanguage();
  });
  $("#year").textContent = String(new Date().getFullYear());
}

attachEvents();
renderLanguage();
initializeFirebase();
