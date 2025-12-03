// Age Calculator - Full Implementation

// Set max date to today
document.getElementById('birthdate').max = new Date().toISOString().split('T')[0];
document.getElementById('targetDate').value = new Date().toISOString().split('T')[0];

function calculateAge() {
    const birthdateInput = document.getElementById('birthdate').value;
    const targetDateInput = document.getElementById('targetDate').value;
    
    if (!birthdateInput) {
        alert('Please enter your date of birth!');
        return;
    }
    
    const birthdate = new Date(birthdateInput);
    const targetDate = targetDateInput ? new Date(targetDateInput) : new Date();
    
    if (birthdate > targetDate) {
        alert('Birth date cannot be in the future!');
        return;
    }
    
    // Calculate age
    const ageData = getDetailedAge(birthdate, targetDate);
    
    // Display results
    displayResults(ageData, birthdate);
}

function getDetailedAge(birthdate, targetDate) {
    let years = targetDate.getFullYear() - birthdate.getFullYear();
    let months = targetDate.getMonth() - birthdate.getMonth();
    let days = targetDate.getDate() - birthdate.getDate();
    
    if (days < 0) {
        months--;
        const lastMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0);
        days += lastMonth.getDate();
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    // Calculate total values
    const totalDays = Math.floor((targetDate - birthdate) / (1000 * 60 * 60 * 24));
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    
    // Calculate next birthday
    const nextBirthday = new Date(targetDate.getFullYear(), birthdate.getMonth(), birthdate.getDate());
    if (nextBirthday < targetDate) {
        nextBirthday.setFullYear(targetDate.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil((nextBirthday - targetDate) / (1000 * 60 * 60 * 24));
    
    return {
        years,
        months,
        days,
        totalDays,
        totalHours,
        totalMinutes,
        daysUntilBirthday,
        nextBirthday
    };
}

function displayResults(ageData, birthdate) {
    // Show result section
    document.getElementById('resultSection').style.display = 'block';
    
    // Animate numbers
    animateValue('years', 0, ageData.years, 1000);
    animateValue('months', 0, ageData.months, 1000);
    animateValue('days', 0, ageData.days, 1000);
    
    // Display detailed info
    document.getElementById('totalDays').textContent = ageData.totalDays.toLocaleString();
    document.getElementById('totalHours').textContent = ageData.totalHours.toLocaleString();
    document.getElementById('totalMinutes').textContent = ageData.totalMinutes.toLocaleString();
    document.getElementById('nextBirthday').textContent = `${ageData.daysUntilBirthday} days`;
    
    // Display fun facts
    displayFunFacts(ageData, birthdate);
    
    // Scroll to results
    document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function animateValue(id, start, end, duration) {
    const element = document.getElementById(id);
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

function displayFunFacts(ageData, birthdate) {
    const facts = [];
    
    // Day of week born
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayBorn = daysOfWeek[birthdate.getDay()];
    facts.push(`You were born on a ${dayBorn}`);
    
    // Zodiac sign
    const zodiac = getZodiacSign(birthdate.getMonth() + 1, birthdate.getDate());
    facts.push(`Your zodiac sign is ${zodiac}`);
    
    // Generation
    const generation = getGeneration(birthdate.getFullYear());
    facts.push(`You are part of the ${generation} generation`);
    
    // Heartbeats (approximate)
    const heartbeats = (ageData.totalDays * 100000).toLocaleString();
    facts.push(`Your heart has beaten approximately ${heartbeats} times`);
    
    // Breaths (approximate)
    const breaths = (ageData.totalDays * 20000).toLocaleString();
    facts.push(`You've taken approximately ${breaths} breaths`);
    
    // Display facts
    const funFactsDiv = document.getElementById('funFacts');
    funFactsDiv.innerHTML = '<ul>' + facts.map(fact => `<li>${fact}</li>`).join('') + '</ul>';
}

function getZodiacSign(month, day) {
    const signs = [
        { name: 'Capricorn', start: [12, 22], end: [1, 19] },
        { name: 'Aquarius', start: [1, 20], end: [2, 18] },
        { name: 'Pisces', start: [2, 19], end: [3, 20] },
        { name: 'Aries', start: [3, 21], end: [4, 19] },
        { name: 'Taurus', start: [4, 20], end: [5, 20] },
        { name: 'Gemini', start: [5, 21], end: [6, 20] },
        { name: 'Cancer', start: [6, 21], end: [7, 22] },
        { name: 'Leo', start: [7, 23], end: [8, 22] },
        { name: 'Virgo', start: [8, 23], end: [9, 22] },
        { name: 'Libra', start: [9, 23], end: [10, 22] },
        { name: 'Scorpio', start: [10, 23], end: [11, 21] },
        { name: 'Sagittarius', start: [11, 22], end: [12, 21] }
    ];
    
    for (const sign of signs) {
        if ((month === sign.start[0] && day >= sign.start[1]) || 
            (month === sign.end[0] && day <= sign.end[1])) {
            return sign.name;
        }
    }
    return 'Capricorn';
}

function getGeneration(year) {
    if (year >= 1997 && year <= 2012) return 'Gen Z';
    if (year >= 1981 && year <= 1996) return 'Millennial';
    if (year >= 1965 && year <= 1980) return 'Gen X';
    if (year >= 1946 && year <= 1964) return 'Baby Boomer';
    if (year >= 1928 && year <= 1945) return 'Silent Generation';
    return 'Greatest Generation';
}

console.log('🎂 Age Calculator - Fully Functional');
