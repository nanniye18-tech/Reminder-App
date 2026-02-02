window.onload = function() {
    loadTimetable();
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        document.getElementById('darkModeToggle').checked = true;
    }
};

function addToTimetable() {
    const subject = document.getElementById('subject').value;
    const day = document.getElementById('day').value;
    const time = document.getElementById('classTime').value;

    if (!subject || !time) return alert("Please enter both Subject and Time!");

    const entry = { subject, day, time };
    const schedule = JSON.parse(localStorage.getItem('mySchedule')) || [];
    schedule.push(entry);
    localStorage.setItem('mySchedule', JSON.stringify(schedule));

    displayEntry(entry);
    document.getElementById('subject').value = ""; // Clear input after adding
}

function displayEntry(entry) {
    const tableBody = document.getElementById('timetableBody');
    const newRow = tableBody.insertRow();
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    
    newRow.insertCell(0).innerText = entry.time;

    for (let i = 0; i < days.length; i++) {
        const cell = newRow.insertCell(i + 1);
        if (days[i] === entry.day) {
            cell.classList.add('class-cell');
            cell.innerHTML = `<i class="fa-solid fa-graduation-cap"></i> ${entry.subject}`;
        }
    }
}

function loadTimetable() {
    const schedule = JSON.parse(localStorage.getItem('mySchedule')) || [];
    schedule.sort((a, b) => a.time.localeCompare(b.time));
    document.getElementById('timetableBody').innerHTML = ""; // Clear current UI
    schedule.forEach(entry => displayEntry(entry));
}

function toggleDarkMode() {
    const isChecked = document.getElementById('darkModeToggle').checked;
    document.body.classList.toggle('dark-theme', isChecked);
    localStorage.setItem('theme', isChecked ? 'dark' : 'light');
}

function downloadPDF() {
    const element = document.getElementById('timetable');
    const opt = {
        margin: 10,
        filename: 'My_Schedule.pdf',
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };
    html2pdf().set(opt).from(element).save();
}

function clearTimetable() {
    if(confirm("Delete all entries?")) {
        localStorage.removeItem('mySchedule');
        loadTimetable();
    }
}
