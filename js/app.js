const alertBanner = document.querySelector("#alert-bar");
const alertBannerX = document.querySelector("#alert-bar-x");
const trafficCanvas = document.querySelector("#traffic-chart");
const dailyTrafficCanvas = document.querySelector("#daily-traffic-chart");
const mobileUsersCanvas = document.querySelector("#mobile-users-chart");
const sendButton = document.querySelector("#message-user-button");
const searchForUser = document.querySelector("#message-user-search");
const messageForUser = document.querySelector("#message-user-message");
const alertNotification = document.querySelector(".bellIconContainer");

/* ============================================= */
/*                  X Button                     */
/* ============================================= */
alertBannerX.addEventListener("click", (e) => {
  const xTarget = e.target;
  if (xTarget.tagName === "BUTTON") {
    alertBanner.style.display = "none";
  }
});
/* ============================================= */
/*                  Charts                       */
/* ============================================= */
const trafficChart = new Chart(trafficCanvas, {
  type: "line",
  data: {
    labels: [
      "16-22",
      "23-29",
      "30-5",
      "6-12",
      "13-19",
      "20-26",
      "27-3",
      "4-10",
      "11-17",
      "18-24",
      "25-31",
    ],
    datasets: [
      {
        label: "N/A",
        data: [750, 1200, 1000, 2000, 1500, 1750, 1250, 1900, 2250, 1500, 2500],
        lineTension: 0.5,
        backgroundColor: "rgba(116,119,191,0.4)",
        fill: true,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    radius: 3.5,
    plugins: {
      legend: {
        display: false,
      },
    },
  },
});

const dailyTrafficChart = new Chart(dailyTrafficCanvas, {
  type: "bar",
  data: {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [
      {
        label: "N/A",
        data: [60, 120, 175, 125, 225, 200, 100],
        backgroundColor: "#7477bf",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  },
});

const mobileUsersChart = new Chart(mobileUsersCanvas, {
  type: "doughnut",
  data: {
    labels: ["Desktop", "Tablet", "Phones"],
    datasets: [
      {
        label: "N/A",
        data: [60, 20, 20],
        backgroundColor: ["#7477bf", "#81c98f", "#51b6c8"],
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
      },
    },
  },
});
/* ============================================= */
/*                 Send Button                   */
/* ============================================= */
sendButton.addEventListener("click", (e) => {
  if (searchForUser.value === "" && messageForUser.value === "") {
    alert("Error: No User Selected & Message Field Empty");
  } else if (searchForUser.value === "") {
    alert("Error: No User Selected");
  } else if (messageForUser.value === "") {
    alert("Error: Message Field Empty");
  } else alert("Message Sent!");
 }
);

/* ==================================== */
/*             Traffic Nav              */
/* ==================================== */
function updateChartOriginal () {
  trafficChart.data.datasets[0].data = [750, 1200, 1000, 2000, 1500, 1750, 1250, 1900, 2250, 1500, 2500],
  trafficChart.update();
};

function updateChart () {
  trafficChart.data.datasets[0].data = [550, 1700, 900, 1500, 500, 1270, 1850, 900, 1250, 1800, 2000];
  trafficChart.update();
};

function updateChart2 () {
  trafficChart.data.datasets[0].data = [2000, 1230, 1900, 500, 2500, 600, 1050, 1900, 2250, 800, 1000];
  trafficChart.update();
};

function updateChart3 () {
  trafficChart.data.datasets[0].data = [1050, 1800, 900, 1400, 500, 1270, 1950, 1900, 2250, 2000, 1200];
  trafficChart.update();
};

/* ==================================== */
/*          AutoComplete Search         */
/* ==================================== */
 let userNames = ['Victoria Chambers', 'Dale Byrd', 'Dawn Wood', 'Dan Oliver'];

 function autocomplete(inp, arr) {
  var currentFocus;
  searchForUser.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      this.parentNode.appendChild(a);
      for (i = 0; i < arr.length; i++) {
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          b = document.createElement("DIV");
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
              b.addEventListener("click", function(e) {
              inp.value = this.getElementsByTagName("input")[0].value;
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  searchForUser.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        currentFocus++;
        addActive(x);
      } else if (e.keyCode == 38) { //up
        currentFocus--;
        addActive(x);
      } else if (e.keyCode == 13) {
        e.preventDefault();
        if (currentFocus > -1) {
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}

autocomplete(document.getElementById("message-user-message"), userNames);

/* ==================================== */
/*               Settings               */
/* ==================================== */
const saveBtn = document.querySelector("#save-button");

saveBtn.onclick = function () {
const emailOnOff = document.getElementById("settingsCheckboxEmail").checked;
const profileOnOff = document.getElementById("settingsCheckboxProfile").checked;
const timezone = document.getElementById("Timezones").value;
localStorage.setItem("Send Email Notifications?", emailOnOff);
localStorage.setItem("Set Profile to Public?", profileOnOff);
localStorage.setItem("Timezone", timezone);
location.reload();
};
