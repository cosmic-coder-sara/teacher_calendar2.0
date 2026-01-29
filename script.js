const calendar = {};

function addTest() {
  const date = document.getElementById("date").value;
  const subject = document.getElementById("subject").value;
  const urgency = document.getElementById("urgency").value;

  if (!calendar[date]) {
    calendar[date] = [];
  }

  calendar[date].push({ subject, urgency });
  renderCalendar();
}

function renderCalendar() {
  const calendarDiv = document.getElementById("calendar");
  calendarDiv.innerHTML = "";

  for (let date in calendar) {
    const tests = calendar[date];

    let color = "green";
    if (tests.length >= 3) color = "red";
    else if (tests.length === 2) color = "yellow";

    const div = document.createElement("div");
    div.className = `day ${color}`;
    div.innerHTML = `<strong>${date}</strong><br>` +
      tests.map(t => `${t.subject} (${t.urgency})`).join("<br>");

    // "AI" flag
    if (color === "red") {
      const flexible = tests.filter(t => t.urgency === "flexible");
      if (flexible.length > 0) {
        div.innerHTML += `<br><em>⚠ Suggest moving flexible test(s)</em>`;
      }
    }

    calendarDiv.appendChild(div);
  }
}
