document.addEventListener("DOMContentLoaded", function () {
    const daySelect = document.getElementById("daySelect");
    const monthSelect = document.getElementById("monthSelect");
    const yearSelect = document.getElementById("yearSelect");
    const hourSelect = document.getElementById("hourSelect");
    const minuteSelect = document.getElementById("minuteSelect");
    const currentYear = new Date().getFullYear();

    const toDaySelect = document.getElementById("toDaySelect");
    const toMonthSelect = document.getElementById("toMonthSelect");
    const toYearSelect = document.getElementById("toYearSelect");
    function populateDays(year, month) {
        
        const daysInMonth = new Date(year, month, 0).getDate();
        for (let i = 1; i <= daysInMonth; i++) {
            daySelect.add(new Option(i, i));
        }
    }

    function populateToDays(year, month) {
        
        const daysInMonth = new Date(year, month, 0).getDate();
        for (let i = 1; i <= daysInMonth; i++) {
            toDaySelect.add(new Option(i, i));
        }
    }

    for (let i = 1; i <= 31; i++) {
        daySelect.add(new Option(i, i));

        const currentDate = new Date().getDate() === i ? true : false;
        toDaySelect.add(new Option(i, i, '', currentDate));
    }

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    months.forEach((month, index) => {
        monthSelect.add(new Option(month, index));

        const currentMonth = new Date().getMonth() === index ? true : false;

        toMonthSelect.add(new Option(month, index, '', currentMonth));
    });

    for (let i = 1900; i <= currentYear; i++) {
        const option = new Option(i, i);
        yearSelect.add(option);
        if (i === currentYear) {
            yearSelect.value = i; 
        }
    }

    for (let i = 1900; i <= currentYear + 1000; i++) {
        const option = new Option(i, i);
        toYearSelect.add(option);
        if (i === currentYear) {
            toYearSelect.value = i;
        }
    }

    for (let i = 1; i <= 12; i++) {
        hourSelect.add(new Option(i, i));
    }

    for (let i = 0; i < 60; i++) {
        minuteSelect.add(new Option(i < 10 ? '0' + i : i, i));
    }

    monthSelect.addEventListener("change", function () {
        const year = parseInt(yearSelect.value);
        const month = parseInt(monthSelect.value);
        if (year && month) {
            populateDays(year, month);
        }
    });

    toMonthSelect.addEventListener("change", function () {
        const year = parseInt(toYearSelect.value);
        const month = parseInt(toMonthSelect.value);
        if (year && month) {
            populateToDays(year, month);
        }
    });

    toYearSelect.addEventListener("change", function () {
        const year = parseInt(toYearSelect.value);
        const month = parseInt(toMonthSelect.value);
        if (year && month) {
            populateToDays(year, month);
        }
    });

    function calculateAge() {
        const day = parseInt(daySelect.value);
        const month = parseInt(monthSelect.value);
        const year = parseInt(yearSelect.value);
        const hour = parseInt(hourSelect.value);
        const minute = parseInt(minuteSelect.value);
        const ampm = document.getElementById("ampmSelect").value;

        if (!day || !month || !year) return;

        const birthDate = new Date(year, month, day, ampm === 'pm' && hour !== 12 ? hour + 12 : hour, minute);
        const toDate = new Date(toYearSelect.value, toMonthSelect.value, toDaySelect.value);
        const now = new Date();

        now.setMinutes(now.getMinutes() + now.getTimezoneOffset() - minuteSelect.value * 60);

        // Calculate age
        let age = toDate - birthDate;
        const totalDays = Math.floor(age / (1000 * 60 * 60 * 24));
        let years = toDate.getFullYear() - birthDate.getFullYear();
        let months = toDate.getMonth() - birthDate.getMonth();
        let days = (toDate.getDate() - birthDate.getDate());
        
        
        if (months < 0) {
            months += 12;
            years--;
        }

        const daysInCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        if (days < 0) {
            days += daysInCurrentMonth;
            months--;
        }

        let displayHours = now.getHours() - birthDate.getHours();
        let displayMinutes = now.getMinutes() - birthDate.getMinutes();

        if (displayMinutes < 0) {
            displayMinutes += 60;
            displayHours--;
        }

        if (displayHours < 0) {
            displayHours += 24;
            days--;
        }

        // Calculate next birthday
        let nextBirthday = new Date(birthDate);
        nextBirthday.setFullYear(now.getFullYear());

        if (nextBirthday < now) {
            nextBirthday.setFullYear(now.getFullYear() + 1);
        }

        const nextBirthdayIn = new Date(nextBirthday - now);
        const nextBirthdayDays = Math.max(0, Math.floor(nextBirthdayIn / (1000 * 60 * 60 * 24)));
        const nextBirthdayHours = Math.max(0, nextBirthdayIn.getUTCHours());
        const nextBirthdayMinutes = Math.max(0, nextBirthdayIn.getUTCMinutes());

        document.getElementById("age").textContent = `${years} years ${months} months ${days} days`;
        document.getElementById("time").textContent = `${Math.max(0, displayHours)} hours and ${Math.max(0, displayMinutes)} minutes`;
        document.getElementById("date").textContent = `${birthDate.toLocaleTimeString()} on ${birthDate.toDateString()}`;
        document.getElementById("birthday").textContent = `${nextBirthdayDays} days ${nextBirthdayHours} hours and ${nextBirthdayMinutes} minutes`;
        document.getElementById("total").textContent = `${totalDays} days`;
    }

    document.getElementById("calculateButton").addEventListener("click", calculateAge);
});
