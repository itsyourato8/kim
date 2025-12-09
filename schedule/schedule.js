const calendarBody = document.getElementById("calendar-body");
const monthYear = document.getElementById("month-year");
const prevBtn = document.getElementById("prev-month");
const nextBtn = document.getElementById("next-month");

const eventPanel = document.getElementById("event-panel");
const selectedDateTitle = document.getElementById("selected-date-title");
const eventList = document.getElementById("event-list");
const addEventBtn = document.getElementById("add-event-btn");

let currentDate = new Date();
let selectedDate = null;

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  monthYear.textContent = `${year}년 ${month + 1}월`;

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay();
  const totalDays = lastDay.getDate();

  calendarBody.innerHTML = "";
  let row = document.createElement("tr");

  const events = JSON.parse(localStorage.getItem("events")) || {};

  for (let i = 0; i < startDay; i++) {
    row.appendChild(document.createElement("td"));
  }

  for (let day = 1; day <= totalDays; day++) {
    const cell = document.createElement("td");
    cell.textContent = day;

    const key = `${year}-${month + 1}-${day}`;
    const dayEvents = events[key];

    if (dayEvents?.length) {
      const eventsContainer = document.createElement("div");
      eventsContainer.classList.add("events-container");

      dayEvents.forEach((eventText) => {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("event-preview");
        const displayText =
          eventText.length > 8 ? eventText.slice(0, 8) + "..." : eventText;
        eventDiv.textContent = "• " + displayText; // 일정 앞에 점 추가
        eventsContainer.appendChild(eventDiv);
      });

      cell.appendChild(eventsContainer);
    }

    cell.addEventListener("click", () => selectDate(key, cell));
    row.appendChild(cell);

    if ((startDay + day) % 7 === 0) {
      calendarBody.appendChild(row);
      row = document.createElement("tr");
    }
  }

  if (row.children.length) calendarBody.appendChild(row);
}

function selectDate(dateKey, cell) {
  document
    .querySelectorAll(".calendar td")
    .forEach((td) => td.classList.remove("selected"));
  cell.classList.add("selected");
  selectedDate = dateKey;
  showEvents(dateKey);
}

function showEvents(dateKey) {
  const events = JSON.parse(localStorage.getItem("events")) || {};
  const dateParts = dateKey.split("-");
  selectedDateTitle.textContent = `${dateParts[0]}년 ${dateParts[1]}월 ${dateParts[2]}일`;
  eventList.innerHTML = "";

  if (events[dateKey] && events[dateKey].length) {
    events[dateKey].forEach((event, index) => {
      const li = document.createElement("li");
      li.classList.add("event-item"); // 스타일용 클래스
      li.textContent = event;

      // 삭제 버튼 생성
      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "x";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // li 클릭 이벤트 방지
        if (confirm("이 일정을 삭제할까요?")) {
          events[dateKey].splice(index, 1);
          localStorage.setItem("events", JSON.stringify(events));
          showEvents(dateKey);
          renderCalendar(currentDate);
        }
      });

      li.appendChild(deleteBtn);
      eventList.appendChild(li);
    });
  } else {
    eventList.innerHTML =
      '<li style="color:#888;">등록된 일정이 없습니다.</li>';
  }
}

addEventBtn.addEventListener("click", () => {
  if (!selectedDate) {
    alert("날짜를 먼저 선택하세요.");
    return;
  }

  const eventText = prompt("일정 내용을 입력하세요:");
  if (eventText) {
    const events = JSON.parse(localStorage.getItem("events")) || {};
    if (!events[selectedDate]) events[selectedDate] = [];
    events[selectedDate].push(eventText);
    localStorage.setItem("events", JSON.stringify(events));
    showEvents(selectedDate);
    renderCalendar(currentDate);
  }
});

prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

renderCalendar(currentDate);
