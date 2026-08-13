/* =========================================
   INDIA FINANCE - DEMO
   Dynamic user data
========================================= */


/* ELEMENTS */

const loginPage = document.getElementById("loginPage");
const signupPage = document.getElementById("signupPage");
const dashboardPage = document.getElementById("dashboardPage");

const sidebar = document.getElementById("sidebar");
const themeMenu = document.getElementById("themeMenu");
const profileMenu = document.getElementById("profileMenu");


/* =========================================
   DEMO DATABASE
========================================= */

let users =
  JSON.parse(localStorage.getItem("indiaFinanceUsers")) || [];


/* =========================================
   CURRENT USER
========================================= */

let currentUser =
  JSON.parse(localStorage.getItem("indiaFinanceCurrentUser")) || null;


/* =========================================
   TOAST
========================================= */

function toast(message) {

  const box = document.getElementById("toast");

  box.textContent = message;

  box.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(() => {

    box.classList.remove("show");

  }, 1800);

}


/* =========================================
   PAGE FUNCTIONS
========================================= */

function show(element) {

  element.classList.remove("hidden");

}


function hide(element) {

  element.classList.add("hidden");

}


/* =========================================
   CREATE ACCOUNT PAGE
========================================= */

document.getElementById("createBtn").onclick = () => {

  hide(loginPage);

  show(signupPage);

};


/* =========================================
   BACK TO LOGIN
========================================= */

document.getElementById("backLoginBtn").onclick = () => {

  hide(signupPage);

  show(loginPage);

};


/* =========================================
   FORGOT PASSWORD
========================================= */

document.getElementById("forgotBtn").onclick = () => {

  toast("Password recovery is demo only");

};


/* =========================================
   CREATE ACCOUNT
========================================= */

document.getElementById("createAccountBtn").onclick = () => {

  const name =
    document.getElementById("signupName").value.trim();

  const email =
    document.getElementById("signupEmail").value.trim();

  const country =
    document.getElementById("signupCountry").value;

  const mobile =
    document.getElementById("signupMobile").value.trim();

  const userId =
    document.getElementById("signupUserId").value.trim();

  const password =
    document.getElementById("signupPass").value;

  const referral =
    document.getElementById("referralId").value.trim();

  const terms =
    document.getElementById("terms").checked;


  /* VALIDATION */

  if (!name) {

    toast("Please enter your name");
    return;

  }


  if (!email) {

    toast("Please enter your email");
    return;

  }


  if (!country) {

    toast("Please select country");
    return;

  }


  if (!mobile) {

    toast("Please enter mobile number");
    return;

  }


  if (!userId) {

    toast("Please choose a User ID");
    return;

  }


  if (!password) {

    toast("Please create a password");
    return;

  }


  if (!terms) {

    toast("Please accept Terms and Conditions");
    return;

  }


  /* CHECK USER ID */

  const alreadyExists =
    users.some(
      user =>
        user.userId.toLowerCase() ===
        userId.toLowerCase()
    );


  if (alreadyExists) {

    toast("User ID already exists");
    return;

  }


  /* CREATE USER */

  const newUser = {

    name: name,

    email: email,

    country: country,

    mobile: mobile,

    userId: userId,

    password: password,

    referral: referral,

    joinDate: new Date().toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    ),

    balance: 0,

    income: 0,

    withdrawal: 0,

    fund: 0,

    basicPackage: 0,

    fdPackage: 0

  };


  users.push(newUser);

  localStorage.setItem(
    "indiaFinanceUsers",
    JSON.stringify(users)
  );


  currentUser = newUser;

  localStorage.setItem(
    "indiaFinanceCurrentUser",
    JSON.stringify(currentUser)
  );


  showDashboard();

  toast("Account created successfully");

};


/* =========================================
   LOGIN
========================================= */

document.getElementById("signInBtn").onclick = () => {

  const userId =
    document.getElementById("loginUser").value.trim();

  const password =
    document.getElementById("loginPass").value;


  if (!userId || !password) {

    toast("Enter User ID and Password");
    return;

  }


  const user = users.find(

    item =>
      item.userId.toLowerCase() ===
        userId.toLowerCase() &&
      item.password === password

  );


  if (!user) {

    toast("Invalid User ID or Password");
    return;

  }


  currentUser = user;

  localStorage.setItem(
    "indiaFinanceCurrentUser",
    JSON.stringify(currentUser)
  );


  showDashboard();

  toast("Login successful");

};


/* =========================================
   SHOW DASHBOARD
========================================= */

function showDashboard() {

  hide(loginPage);

  hide(signupPage);

  show(dashboardPage);

  updateDashboard();

}


/* =========================================
   UPDATE DASHBOARD USER DATA
========================================= */

function updateDashboard() {

  if (!currentUser) return;


  /* NAME */

  document.getElementById(
    "dashboardName"
  ).textContent = currentUser.name;


  /* USER ID */

  document.getElementById(
    "dashboardUserId"
  ).textContent = currentUser.userId;


  /* JOIN DATE */

  document.getElementById(
    "joinDate"
  ).textContent = currentUser.joinDate;


  /* PROFILE MENU */

  document.getElementById(
    "menuName"
  ).textContent = currentUser.name;


  document.getElementById(
    "menuUserId"
  ).textContent = currentUser.userId;


  /* REFERRAL LINK */

  const link =
    window.location.href.split("/").slice(0, -1).join("/") +
    "/register/?u=" +
    encodeURIComponent(currentUser.userId);


  document.getElementById(
    "referralLink"
  ).textContent = link;


  /* MONEY */

  document.getElementById(
    "availableFund"
  ).textContent =
    "₹ " + Number(currentUser.fund).toFixed(2);


  document.getElementById(
    "availableBalance"
  ).textContent =
    "₹ " + Number(currentUser.balance).toFixed(2);


  document.getElementById(
    "totalIncome"
  ).textContent =
    "₹ " + Number(currentUser.income).toFixed(2);


  document.getElementById(
    "totalWithdrawal"
  ).textContent =
    "₹ " + Number(currentUser.withdrawal).toFixed(2);


  /* PACKAGES */

  document.getElementById(
    "basicPackage"
  ).textContent =
    "₹ " + Number(currentUser.basicPackage).toFixed(2);


  document.getElementById(
    "fdPackage"
  ).textContent =
    "₹ " + Number(currentUser.fdPackage).toFixed(2);

}


/* =========================================
   PASSWORD SHOW / HIDE
========================================= */

document.querySelectorAll(".eye").forEach(button => {

  button.onclick = () => {

    const input =
      document.getElementById(
        button.dataset.toggle
      );


    if (input.type === "password") {

      input.type = "text";

    } else {

      input.type = "password";

    }

  };

});


/* =========================================
   SIDEBAR
========================================= */

document.getElementById("menuBtn").onclick = () => {

  sidebar.classList.toggle("open");

};


document.getElementById("closeMenu").onclick = () => {

  sidebar.classList.remove("open");

};


/* =========================================
   EXPANDABLE MENUS
========================================= */

document.querySelectorAll(
  ".nav-item.expandable"
).forEach(button => {

  button.onclick = () => {

    const target =
      document.getElementById(
        button.dataset.target
      );


    target.classList.toggle("open");

    button.classList.toggle("active");

  };

});


/* =========================================
   SIDEBAR DEMO BUTTONS
========================================= */

document.querySelectorAll(
  "[data-demo]"
).forEach(button => {

  button.onclick = () => {

    toast(
      "Demo: " +
      button.dataset.demo
    );

    sidebar.classList.remove("open");

  };

});


/* =========================================
   MAIN SIDEBAR BUTTONS
========================================= */

document.querySelectorAll(
  ".nav-item[data-page]"
).forEach(button => {

  button.onclick = () => {

    document.querySelectorAll(
      ".nav-item"
    ).forEach(item => {

      item.classList.remove("active");

    });


    button.classList.add("active");

    sidebar.classList.remove("open");


    toast(
      "Demo: " +
      button.dataset.page
    );

  };

});


/* =========================================
   COPY REFERRAL
========================================= */

document.getElementById(
  "copyReferral"
).onclick = async () => {

  const link =
    document.getElementById(
      "referralLink"
    ).textContent;


  try {

    await navigator.clipboard.writeText(link);

    toast("Referral link copied");

  } catch {

    toast("Copy unavailable");

  }

};


/* =========================================
   PROFILE MENU
========================================= */

document.getElementById(
  "profileBtn"
).onclick = () => {

  profileMenu.classList.toggle("hidden");

  themeMenu.classList.add("hidden");

};


/* =========================================
   THEME MENU
========================================= */

document.getElementById(
  "themeBtn"
).onclick = () => {

  themeMenu.classList.toggle("hidden");

  profileMenu.classList.add("hidden");

};


/* =========================================
   THEME CHANGE
========================================= */

document.querySelectorAll(
  "[data-theme]"
).forEach(button => {

  button.onclick = () => {

    const theme =
      button.dataset.theme;


    if (theme === "light") {

      document.body.classList.add("light");

    } else {

      document.body.classList.remove("light");

    }


    themeMenu.classList.add("hidden");


    toast(
      "Theme: " + theme
    );

  };

});


/* =========================================
   PROFILE BUTTON
========================================= */

document.getElementById(
  "profileDemo"
).onclick = () => {

  toast("Profile demo");

};


/* =========================================
   LOGOUT
========================================= */

function logout() {

  currentUser = null;

  localStorage.removeItem(
    "indiaFinanceCurrentUser"
  );


  hide(dashboardPage);

  show(loginPage);


  document.getElementById(
    "loginUser"
  ).value = "";

  document.getElementById(
    "loginPass"
  ).value = "";


  toast("Logged out");

}


document.getElementById(
  "logoutBtn"
).onclick = logout;


document.getElementById(
  "logout2"
).onclick = logout;


/* =========================================
   OUTSIDE CLICK
========================================= */

document.addEventListener(
  "click",
  event => {

    if (
      !event.target.closest(".theme-menu") &&
      !event.target.closest("#themeBtn")
    ) {

      themeMenu.classList.add("hidden");

    }


    if (
      !event.target.closest(".profile-menu") &&
      !event.target.closest("#profileBtn")
    ) {

      profileMenu.classList.add("hidden");

    }

  }
);


/* =========================================
   AUTO LOGIN AFTER REFRESH
========================================= */

if (currentUser) {

  showDashboard();

}