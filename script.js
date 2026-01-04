let classes = JSON.parse(localStorage.getItem("classes")) || [];

const dayInput = document.getElementById("day");
const timeInput = document.getElementById("time");
const subjectInput = document.getElementById("subject");
const noteInput = document.getElementById("note");
const imageInput = document.getElementById("imageInput");
const addBtn = document.getElementById("addBtn");

const todayBox = document.getElementById("today");
const scheduleList = document.getElementById("scheduleList");

const dayNames = ["อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัส","ศุกร์","เสาร์"];

renderAll();
renderToday();

addBtn.onclick = () => {
  if (!timeInput.value || !subjectInput.value) {
    alert("กรุณากรอกเวลาและชื่อวิชา");
    return;
  }

  const file = imageInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = () => saveClass(reader.result);
    reader.readAsDataURL(file);
  } else {
    saveClass(null);
  }
};

function saveClass(imageData) {
  const newClass = {
    day: Number(dayInput.value),
    time: timeInput.value,
    subject: subjectInput.value,
    note: noteInput.value,
    image: imageData
  };

  classes.push(newClass);
  localStorage.setItem("classes", JSON.stringify(classes));

  renderAll();
  renderToday();

  timeInput.value = "";
  subjectInput.value = "";
  noteInput.value = "";
  imageInput.value = "";
}

function renderAll() {
  scheduleList.innerHTML = "";

  classes.forEach((c, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <b>${dayNames[c.day]} ${c.time}</b><br>
      ${c.subject}<br>
      <small>${c.note || ""}</small>
      ${c.image ? `<img src="${c.image}">` : ""}
      <button class="delete" onclick="deleteClass(${i})">ลบ</button>
    `;
    scheduleList.appendChild(li);
  });
}

function deleteClass(i) {
  classes.splice(i, 1);
  localStorage.setItem("classes", JSON.stringify(classes));
  renderAll();
  renderToday();
}

function renderToday() {
  todayBox.innerHTML = "";
  const today = new Date().getDay();

  const todayClasses = classes.filter(c => c.day === today);

  if (todayClasses.length === 0) {
    todayBox.textContent = "วันนี้ไม่มีเรียน 🎉";
    return;
  }

  todayClasses.forEach(c => {
    const p = document.createElement("p");
    p.textContent = `${c.time} - ${c.subject}`;
    todayBox.appendChild(p);
  });
}

