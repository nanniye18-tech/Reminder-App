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
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    
    // 1. Check if a row for this time already exists
    let existingRow = Array.from(tableBody.rows).find(row => row.cells[0].innerText === entry.time);
    
    let row;
    if (existingRow) {
        row = existingRow; // Use the row that's already there
    } else {
        // 2. If it doesn't exist, create a new row
        row = tableBody.insertRow();
        row.insertCell(0).innerText = entry.time; // Set the time in the first cell
        
        // Create empty cells for all days
        for (let i = 0; i < days.length; i++) {
            row.insertCell(i + 1);
        }
        
        // 3. Keep the times in order (Earliest to Latest)
        sortRowsByTime();
    }

    // 4. Find the correct day column and put the subject in
    const dayIndex = days.indexOf(entry.day) + 1;
    const targetCell = row.cells[dayIndex];
    
    targetCell.classList.add('class-cell');
    targetCell.innerHTML = `<i class="fa-solid fa-graduation-cap"></i> ${entry.subject}`;
}

// Function to sort the rows so 08:00 comes before 08:20
function sortRowsByTime() {
    const tableBody = document.getElementById('timetableBody');
    const rows = Array.from(tableBody.rows);
    
    rows.sort((a, b) => a.cells[0].innerText.localeCompare(b.cells[0].innerText));
    
    rows.forEach(row => tableBody.appendChild(row));
}

function loadTimetable() {
    const schedule = JSON.parse(localStorage.getItem('mySchedule')) || [];
    document.getElementById('timetableBody').innerHTML = ""; // Clear UI
    // Load each one using our new smart logic
    schedule.forEach(entry => displayEntry(entry));
}
    
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

