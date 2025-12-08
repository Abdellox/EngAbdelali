// Embedded data - no external files needed
const fakeData = {
    firstNames: ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen", "Christopher", "Nancy", "Daniel", "Lisa", "Matthew", "Betty", "Anthony", "Margaret", "Mark", "Sandra", "Donald", "Ashley", "Steven", "Kimberly", "Paul", "Emily", "Andrew", "Donna", "Joshua", "Michelle", "Kenneth", "Dorothy", "Kevin", "Carol", "Brian", "Amanda", "George", "Melissa", "Edward", "Rebecca", "Ronald", "Stephanie", "Timothy", "Sharon", "Jason", "Laura", "Jeffrey", "Cynthia", "Ryan", "Kathleen", "Jacob", "Amy", "Gary", "Angela", "Nicholas", "Helen", "Eric", "Anna", "Jonathan", "Brenda", "Stephen", "Pamela", "Larry", "Nicole", "Justin", "Emma", "Scott", "Samantha", "Brandon", "Katherine", "Benjamin", "Christine", "Samuel", "Rachel", "Raymond", "Catherine", "Gregory", "Carolyn", "Frank", "Janet", "Alexander", "Ruth", "Patrick", "Maria", "Jack", "Heather", "Dennis", "Diane", "Jerry", "Virginia", "Tyler", "Julie", "Aaron", "Joyce", "Jose", "Victoria", "Adam", "Olivia", "Henry", "Kelly", "Nathan", "Christina", "Douglas", "Lauren", "Zachary", "Joan", "Peter", "Evelyn", "Kyle", "Judith", "Walter", "Megan", "Ethan", "Cheryl", "Jeremy", "Andrea", "Harold", "Hannah", "Keith", "Martha", "Christian", "Jacqueline", "Roger", "Frances", "Noah", "Gloria", "Gerald", "Ann", "Carl", "Teresa", "Terry", "Kathryn", "Sean", "Sara", "Austin", "Janice", "Arthur", "Jean", "Lawrence", "Alice", "Jesse", "Madison", "Dylan", "Doris", "Bryan", "Abigail", "Joe", "Julia", "Jordan", "Judy", "Billy", "Grace", "Bruce", "Denise", "Albert", "Amber", "Willie", "Marilyn", "Gabriel", "Beverly", "Logan", "Danielle", "Alan", "Theresa", "Juan", "Sophia", "Wayne", "Marie", "Roy", "Diana", "Ralph", "Brittany", "Randy", "Natalie", "Eugene", "Isabella", "Vincent", "Charlotte", "Russell", "Rose", "Elijah", "Alexis", "Louis", "Kayla"],
    
    lastNames: ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts", "Gomez", "Phillips", "Evans", "Turner", "Diaz", "Parker", "Cruz", "Edwards", "Collins", "Reyes", "Stewart", "Morris", "Morales", "Murphy", "Cook", "Rogers", "Gutierrez", "Ortiz", "Morgan", "Cooper", "Peterson", "Bailey", "Reed", "Kelly", "Howard", "Ramos", "Kim", "Cox", "Ward", "Richardson", "Watson", "Brooks", "Chavez", "Wood", "James", "Bennett", "Gray", "Mendoza", "Ruiz", "Hughes", "Price", "Alvarez", "Castillo", "Sanders", "Patel", "Myers", "Long", "Ross", "Foster", "Jimenez", "Powell", "Jenkins", "Perry", "Russell", "Sullivan", "Bell", "Coleman", "Butler", "Henderson", "Barnes", "Gonzales", "Fisher", "Vasquez", "Simmons", "Romero", "Jordan", "Patterson", "Alexander", "Hamilton", "Graham", "Reynolds", "Griffin", "Wallace", "Moreno", "West", "Cole", "Hayes", "Bryant", "Herrera", "Gibson", "Ellis", "Tran", "Medina", "Aguilar", "Stevens", "Murray", "Ford", "Castro", "Marshall", "Owens", "Harrison", "Fernandez", "McDonald", "Woods", "Washington", "Kennedy", "Wells", "Vargas", "Henry", "Chen", "Freeman", "Webb", "Tucker", "Guzman", "Burns", "Crawford", "Olson", "Simpson", "Porter", "Hunter", "Gordon", "Mendez", "Silva", "Shaw", "Snyder", "Mason", "Dixon", "Munoz", "Hunt", "Hicks", "Holmes", "Palmer", "Wagner", "Black", "Robertson", "Boyd", "Rose", "Stone", "Salazar", "Fox", "Warren", "Mills", "Meyer", "Rice", "Schmidt", "Garza", "Daniels", "Ferguson", "Nichols", "Stephens", "Soto", "Weaver", "Ryan"],
    
    domains: ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com", "protonmail.com", "aol.com", "mail.com", "zoho.com", "yandex.com"],
    
    streets: ["Main Street", "Oak Avenue", "Maple Drive", "Cedar Lane", "Pine Street", "Elm Avenue", "Washington Street", "Lake View Drive", "Hill Road", "Park Avenue", "Church Street", "Sunset Boulevard", "River Road", "Forest Drive", "Meadow Lane", "Spring Street", "Valley Road", "Highland Avenue", "Woodland Drive", "Garden Street", "Mill Road", "Bridge Street", "School Street", "Water Street", "Market Street", "Center Street", "Franklin Street", "Lincoln Avenue", "Madison Street", "Jefferson Drive", "Adams Street", "Jackson Avenue", "Wilson Street", "Taylor Road", "Anderson Lane", "Thomas Drive", "Moore Street", "Martin Avenue", "Thompson Road", "White Street", "Harris Avenue", "Clark Drive", "Lewis Street", "Walker Avenue", "Robinson Road", "King Street", "Wright Avenue", "Hill Street", "Green Drive", "Baker Street"],
    
    cities: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", "Fort Worth", "Columbus", "Charlotte", "San Francisco", "Indianapolis", "Seattle", "Denver", "Washington", "Boston", "El Paso", "Nashville", "Detroit", "Oklahoma City", "Portland", "Las Vegas", "Memphis", "Louisville", "Baltimore", "Milwaukee", "Albuquerque", "Tucson", "Fresno", "Mesa", "Sacramento", "Atlanta", "Kansas City", "Colorado Springs", "Omaha", "Raleigh", "Miami", "Long Beach", "Virginia Beach", "Oakland", "Minneapolis", "Tulsa", "Tampa", "Arlington", "New Orleans"],
    
    states: ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"],
    
    companies: ["Tech Solutions Inc", "Global Innovations", "Digital Dynamics", "Future Systems", "Quantum Technologies", "Apex Corporation", "Nexus Enterprises", "Vertex Solutions", "Pinnacle Group", "Summit Technologies", "Horizon Industries", "Catalyst Systems", "Momentum Corp", "Synergy Solutions", "Vanguard Technologies", "Zenith Enterprises", "Fusion Innovations", "Stellar Systems", "Prime Technologies", "Elite Solutions", "Omega Corporation", "Alpha Industries", "Beta Systems", "Gamma Technologies", "Delta Solutions", "Epsilon Enterprises", "Zeta Corporation", "Theta Systems", "Lambda Technologies", "Sigma Solutions"],
    
    jobTitles: ["Software Engineer", "Senior Developer", "Product Manager", "Data Scientist", "UX Designer", "DevOps Engineer", "Full Stack Developer", "Frontend Developer", "Backend Developer", "Mobile Developer", "QA Engineer", "System Administrator", "Database Administrator", "Network Engineer", "Security Analyst", "Business Analyst", "Project Manager", "Scrum Master", "Technical Lead", "Engineering Manager", "Marketing Manager", "Sales Manager", "Account Executive", "Customer Success Manager", "Support Engineer", "Technical Writer", "Content Manager", "Operations Manager", "HR Manager", "Financial Analyst"]
};

let generatedData = [];
let currentFormat = 'json';

// Utility functions
function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateUsername(firstName, lastName) {
    const patterns = [
        `${firstName.toLowerCase()}${lastName.toLowerCase()}`,
        `${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
        `${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
        `${firstName.toLowerCase()}${randomNumber(10, 999)}`,
        `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomNumber(10, 99)}`
    ];
    return random(patterns);
}

function generateEmail(firstName, lastName) {
    const username = generateUsername(firstName, lastName);
    const domain = random(fakeData.domains);
    return `${username}@${domain}`;
}

function generatePhone() {
    return `(${randomNumber(200, 999)}) ${randomNumber(200, 999)}-${randomNumber(1000, 9999)}`;
}

function generateAddress() {
    const number = randomNumber(100, 9999);
    const street = random(fakeData.streets);
    const city = random(fakeData.cities);
    const state = random(fakeData.states);
    const zip = randomNumber(10000, 99999);
    
    return {
        street: `${number} ${street}`,
        city: city,
        state: state,
        zip: zip.toString(),
        full: `${number} ${street}, ${city}, ${state} ${zip}`
    };
}

function generateBirthdate() {
    const year = randomNumber(1950, 2005);
    const month = randomNumber(1, 12);
    const day = randomNumber(1, 28);
    return `${month}/${day}/${year}`;
}

function generateAge(birthdate) {
    const birth = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

function generateSSN() {
    return `${randomNumber(100, 999)}-${randomNumber(10, 99)}-${randomNumber(1000, 9999)}`;
}

function generateCreditCard() {
    const types = ['Visa', 'Mastercard', 'American Express', 'Discover'];
    const type = random(types);
    let number;
    
    if (type === 'Visa') {
        number = `4${randomNumber(100, 999)} ${randomNumber(1000, 9999)} ${randomNumber(1000, 9999)} ${randomNumber(1000, 9999)}`;
    } else if (type === 'Mastercard') {
        number = `5${randomNumber(100, 999)} ${randomNumber(1000, 9999)} ${randomNumber(1000, 9999)} ${randomNumber(1000, 9999)}`;
    } else if (type === 'American Express') {
        number = `3${randomNumber(100, 999)} ${randomNumber(100000, 999999)} ${randomNumber(10000, 99999)}`;
    } else {
        number = `6011 ${randomNumber(1000, 9999)} ${randomNumber(1000, 9999)} ${randomNumber(1000, 9999)}`;
    }
    
    const expMonth = randomNumber(1, 12).toString().padStart(2, '0');
    const expYear = randomNumber(2024, 2030);
    const cvv = randomNumber(100, 999);
    
    return {
        type: type,
        number: number,
        expiration: `${expMonth}/${expYear}`,
        cvv: cvv.toString()
    };
}

function generatePassword() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < randomNumber(8, 16); i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

function generateIPAddress() {
    return `${randomNumber(1, 255)}.${randomNumber(0, 255)}.${randomNumber(0, 255)}.${randomNumber(1, 255)}`;
}

function generateMacAddress() {
    const hex = '0123456789ABCDEF';
    let mac = '';
    for (let i = 0; i < 6; i++) {
        mac += hex.charAt(Math.floor(Math.random() * 16));
        mac += hex.charAt(Math.floor(Math.random() * 16));
        if (i < 5) mac += ':';
    }
    return mac;
}

function generateURL(firstName, lastName) {
    const patterns = [
        `https://www.${firstName.toLowerCase()}${lastName.toLowerCase()}.com`,
        `https://${firstName.toLowerCase()}-${lastName.toLowerCase()}.net`,
        `https://${firstName.toLowerCase()}.${lastName.toLowerCase()}.org`,
        `https://www.${firstName.toLowerCase()}${randomNumber(10, 999)}.com`
    ];
    return random(patterns);
}

function generateColor() {
    const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'Brown', 'Black', 'White', 'Gray', 'Cyan', 'Magenta', 'Lime', 'Navy', 'Teal', 'Maroon', 'Olive'];
    return random(colors);
}

function generateVehicle() {
    const makes = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes', 'Audi', 'Tesla', 'Nissan', 'Hyundai', 'Volkswagen', 'Mazda', 'Subaru', 'Lexus', 'Jeep'];
    const models = ['Sedan', 'SUV', 'Truck', 'Coupe', 'Hatchback', 'Convertible', 'Van', 'Wagon'];
    const year = randomNumber(2010, 2024);
    return {
        make: random(makes),
        model: random(models),
        year: year,
        color: generateColor(),
        vin: generateVIN(),
        licensePlate: generateLicensePlate()
    };
}

function generateVIN() {
    const chars = 'ABCDEFGHJKLMNPRSTUVWXYZ0123456789';
    let vin = '';
    for (let i = 0; i < 17; i++) {
        vin += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return vin;
}

function generateLicensePlate() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let plate = '';
    for (let i = 0; i < 3; i++) {
        plate += letters.charAt(Math.floor(Math.random() * 26));
    }
    plate += '-';
    plate += randomNumber(1000, 9999);
    return plate;
}

function generateBankAccount() {
    return {
        accountNumber: randomNumber(1000000000, 9999999999).toString(),
        routingNumber: randomNumber(100000000, 999999999).toString(),
        iban: `US${randomNumber(10, 99)}${randomNumber(1000000000000000, 9999999999999999)}`,
        swift: `${random(['BANK', 'CITI', 'WELL', 'CHAS', 'BOFA'])}US33XXX`
    };
}

function generateBiometric() {
    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    const heights = [
        '5\'2"', '5\'3"', '5\'4"', '5\'5"', '5\'6"', '5\'7"', '5\'8"', '5\'9"', '5\'10"', '5\'11"', '6\'0"', '6\'1"', '6\'2"'
    ];
    return {
        bloodType: random(bloodTypes),
        height: random(heights),
        weight: `${randomNumber(120, 250)} lbs`,
        eyeColor: random(['Brown', 'Blue', 'Green', 'Hazel', 'Gray']),
        hairColor: random(['Black', 'Brown', 'Blonde', 'Red', 'Gray', 'White'])
    };
}

function generatePerson() {
    const firstName = random(fakeData.firstNames);
    const lastName = random(fakeData.lastNames);
    const address = generateAddress();
    const birthdate = generateBirthdate();
    const creditCard = generateCreditCard();
    const vehicle = generateVehicle();
    const bankAccount = generateBankAccount();
    const biometric = generateBiometric();
    
    return {
        firstName: firstName,
        lastName: lastName,
        fullName: `${firstName} ${lastName}`,
        email: generateEmail(firstName, lastName),
        username: generateUsername(firstName, lastName),
        password: generatePassword(),
        phone: generatePhone(),
        birthdate: birthdate,
        age: generateAge(birthdate),
        ssn: generateSSN(),
        address: address,
        company: random(fakeData.companies),
        jobTitle: random(fakeData.jobTitles),
        creditCard: creditCard,
        vehicle: vehicle,
        bankAccount: bankAccount,
        biometric: biometric,
        ipAddress: generateIPAddress(),
        macAddress: generateMacAddress(),
        website: generateURL(firstName, lastName)
    };
}

// Generate data based on type
function generateData(type, count) {
    const results = [];
    
    for (let i = 0; i < count; i++) {
        const person = generatePerson();
        
        switch(type) {
            case 'person':
                results.push(person);
                break;
            case 'name':
                results.push({ 
                    fullName: person.fullName, 
                    firstName: person.firstName, 
                    lastName: person.lastName 
                });
                break;
            case 'email':
                results.push({ email: person.email });
                break;
            case 'phone':
                results.push({ phone: person.phone });
                break;
            case 'username':
                results.push({ 
                    username: person.username,
                    password: person.password
                });
                break;
            case 'address':
                results.push({ 
                    street: person.address.street,
                    city: person.address.city,
                    state: person.address.state,
                    zip: person.address.zip,
                    fullAddress: person.address.full
                });
                break;
            case 'company':
                results.push({ 
                    company: person.company, 
                    jobTitle: person.jobTitle 
                });
                break;
            case 'creditcard':
                results.push({
                    cardType: person.creditCard.type,
                    cardNumber: person.creditCard.number,
                    expiration: person.creditCard.expiration,
                    cvv: person.creditCard.cvv
                });
                break;
            case 'identity':
                results.push({
                    fullName: person.fullName,
                    birthdate: person.birthdate,
                    age: person.age,
                    ssn: person.ssn
                });
                break;
            case 'internet':
                results.push({
                    email: person.email,
                    username: person.username,
                    password: person.password,
                    ipAddress: person.ipAddress,
                    macAddress: person.macAddress,
                    website: person.website
                });
                break;
            case 'vehicle':
                results.push({
                    make: person.vehicle.make,
                    model: person.vehicle.model,
                    year: person.vehicle.year,
                    color: person.vehicle.color,
                    vin: person.vehicle.vin,
                    licensePlate: person.vehicle.licensePlate
                });
                break;
            case 'bank':
                results.push({
                    accountNumber: person.bankAccount.accountNumber,
                    routingNumber: person.bankAccount.routingNumber,
                    iban: person.bankAccount.iban,
                    swift: person.bankAccount.swift
                });
                break;
            case 'biometric':
                results.push({
                    fullName: person.fullName,
                    bloodType: person.biometric.bloodType,
                    height: person.biometric.height,
                    weight: person.biometric.weight,
                    eyeColor: person.biometric.eyeColor,
                    hairColor: person.biometric.hairColor
                });
                break;
        }
    }
    
    return results;
}

// Display functions
function displayJSON(data) {
    const output = document.getElementById('output');
    output.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}

function displayTable(data) {
    if (data.length === 0) {
        document.getElementById('output').innerHTML = '<div class="empty-state">No data generated yet</div>';
        return;
    }
    
    let html = '<div class="card-container">';
    
    data.forEach((item, index) => {
        html += `<div class="data-card">`;
        html += `<div class="card-header">Record #${index + 1}</div>`;
        html += `<div class="card-body">`;
        
        Object.keys(item).forEach(key => {
            const value = typeof item[key] === 'object' ? JSON.stringify(item[key], null, 2) : item[key];
            const displayKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            html += `<div class="data-row">`;
            html += `<span class="data-label">${displayKey}:</span>`;
            html += `<span class="data-value">${value}</span>`;
            html += `</div>`;
        });
        
        html += `</div></div>`;
    });
    
    html += '</div>';
    document.getElementById('output').innerHTML = html;
}

function updateDisplay() {
    if (currentFormat === 'json') {
        displayJSON(generatedData);
    } else {
        displayTable(generatedData);
    }
}

// Event listeners
document.getElementById('generateBtn').addEventListener('click', () => {
    const type = document.getElementById('dataType').value;
    const count = parseInt(document.getElementById('count').value);
    
    generatedData = generateData(type, count);
    updateDisplay();
});

document.getElementById('copyBtn').addEventListener('click', () => {
    const text = JSON.stringify(generatedData, null, 2);
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById('copyBtn');
        const originalText = btn.textContent;
        btn.textContent = '✓ Copied!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    });
});

document.querySelectorAll('.format-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.format-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentFormat = e.target.dataset.format;
        updateDisplay();
    });
});

// Initialize
document.getElementById('output').innerHTML = '<div class="empty-state">Click "Generate Data" to start</div>';
