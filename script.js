let tests = {}; // { "YYYY-MM-DD": [ {subject, urgency}, ... ] }

function addTest() {
  const month = document.getElementById("month").value;
  const subject = document.getElementById("subject").value;
  const urgency = document.getElementById("urgency").value;

  // Use the first day of the selected month for the grid
  const year = month.split("-")[0];
  const mon = month.split("-")[1];

  // For simplicity, let's add test to first day of month
  const date = `${year}-${mon}-01`; 

  if (!tests[date]) tests[date] = [];
  tests[date].push({subject, urgency});

  renderCalendar(year, mon);
}

function renderCalendar(year, month) {
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = "";

  const firstDay = new Date(year, month-1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();

  // Header row
  const header = calendar.insertRow();
  ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].forEach(d => {
    const th = document.createElement("th");
    th.innerText = d;
    header.appendChild(th);
  });

  let date = 1;
  for (let i=0; i<6; i++) { // 6 weeks max
    const row = calendar.insertRow();
    for (let j=0; j<7; j++) {
      const cell = row.insertCell();
      if (i===0 && j<firstDay) {
        cell.innerText = "";
      } else if (date > daysInMonth) {
        cell.innerText = "";
      } else {
        cell.innerHTML = `<strong>${date}</strong><br>`;
        const dateStr = `${year}-${month.padStart(2,'0')}-${String(date).padStart(2,'0')}`;
        if (tests[dateStr]) {
          tests[dateStr].forEach(t => {
            const div = document.createElement("div");
            div.className = `day ${t.urgency}`;
            div.innerText = `${t.subject} (${t.urgency})`;
            cell.appendChild(div);
          });
        }
        date++;
      }
    }
  }

  document.getElementById("calendar-title").innerText = `Calendar for ${year}-${month}`;
}
