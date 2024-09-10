document.addEventListener("DOMContentLoaded", function () {
    const daySelect = document.getElementById("daySelect");
    const monthSelect = document.getElementById("monthSelect");
    const yearSelect = document.getElementById("yearSelect");
    const hourSelect = document.getElementById("hourSelect");
    const minuteSelect = document.getElementById("minuteSelect");
    const timezoneSelect = document.getElementById("timezoneSelect");

    function populateDays(year, month) {
        
        const daysInMonth = new Date(year, month, 0).getDate();
        for (let i = 1; i <= daysInMonth; i++) {
            daySelect.add(new Option(i, i));
        }
    }

    for (let i = 1; i <= 31; i++) {
        daySelect.add(new Option(i, i));
    }

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    months.forEach((month, index) => {
        monthSelect.add(new Option(month, index + 1));
    });

    for (let i = 1900; i <= new Date().getFullYear(); i++) {
        yearSelect.add(new Option(i, i));
    }

    for (let i = 1; i <= 12; i++) {
        hourSelect.add(new Option(i, i));
    }

    for (let i = 0; i < 60; i++) {
        minuteSelect.add(new Option(i < 10 ? '0' + i : i, i));
    }

    const timezones = [
        { value: "UTC-12:00", text: "(UTC-12:00) Baker Island Time" },
        { value: "UTC-11:00", text: "(UTC-11:00) Samoa Standard Time" },
        { value: "UTC-10:00", text: "(UTC-10:00) Hawaii-Aleutian Standard Time" },
        { value: "UTC-09:00", text: "(UTC-09:00) Alaska Standard Time" },
        { value: "UTC-08:00", text: "(UTC-08:00) Pacific Standard Time" },
        { value: "UTC-07:00", text: "(UTC-07:00) Mountain Standard Time" },
        { value: "UTC-06:00", text: "(UTC-06:00) Central Standard Time" },
        { value: "UTC-05:00", text: "(UTC-05:00) Eastern Standard Time" },
        { value: "UTC-04:00", text: "(UTC-04:00) Atlantic Standard Time" },
        { value: "UTC-03:00", text: "(UTC-03:00) Argentina Time" },
        { value: "UTC-02:00", text: "(UTC-02:00) South Georgia Time" },
        { value: "UTC-01:00", text: "(UTC-01:00) Azores Time" },
        { value: "UTC±00:00", text: "(UTC±00:00) Greenwich Mean Time" },
        { value: "UTC+01:00", text: "(UTC+01:00) Central European Time" },
        { value: "UTC+02:00", text: "(UTC+02:00) Eastern European Time" },
        { value: "UTC+03:00", text: "(UTC+03:00) Moscow Time" },
        { value: "UTC+04:00", text: "(UTC+04:00) Gulf Standard Time" },
        { value: "UTC+05:00", text: "(UTC+05:00) Pakistan Standard Time" },
        { value: "UTC+06:00", text: "(UTC+06:00) Bangladesh Standard Time" },
        { value: "UTC+07:00", text: "(UTC+07:00) Indochina Time" },
        { value: "UTC+08:00", text: "(UTC+08:00) China Standard Time" },
        { value: "UTC+09:00", text: "(UTC+09:00) Japan Standard Time" },
        { value: "UTC+10:00", text: "(UTC+10:00) Australian Eastern Standard Time" },
        { value: "UTC+11:00", text: "(UTC+11:00) Solomon Islands Time" },
        { value: "UTC+12:00", text: "(UTC+12:00) Fiji Time" }
    ];

    timezones.forEach(tz => {
        timezoneSelect.add(new Option(tz.text, tz.value));
    });

    monthSelect.addEventListener("change", function () {
        const year = parseInt(yearSelect.value);
        const month = parseInt(monthSelect.value);
        if (year && month) {
            populateDays(year, month);
        }
    });

    yearSelect.addEventListener("change", function () {
        const year = parseInt(yearSelect.value);
        const month = parseInt(monthSelect.value);
        if (year && month) {
            populateDays(year, month);
        }
    });

    function calculateAge() {
        const day = parseInt(daySelect.value);
        const month = parseInt(monthSelect.value);
        const year = parseInt(yearSelect.value);
        const hour = parseInt(hourSelect.value);
        const minute = parseInt(minuteSelect.value);
        const ampm = document.getElementById("ampmSelect").value;
        const timezone = document.getElementById("timezoneSelect").value;

        if (!day || !month || !year) return;

        const birthDate = new Date(year, month - 1, day, ampm === 'pm' && hour !== 12 ? hour + 12 : hour, minute);
        const now = new Date();
        const timezoneOffset = parseInt(timezone.split(':')[1]) * 60;

        now.setMinutes(now.getMinutes() + now.getTimezoneOffset() - timezoneOffset);

        // Calculate age
        let age = now - birthDate;
        const totalDays = Math.floor(age / (1000 * 60 * 60 * 24));
        let years = now.getFullYear() - birthDate.getFullYear();
        let months = now.getMonth() - birthDate.getMonth();
        let days = (now.getDate() - birthDate.getDate());
        
        
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
