let unit = 'metric';

function setUnit(u) {
    unit = u;
    document.querySelectorAll('.unit-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`${u}Btn`).classList.add('active');
    document.getElementById('metricInputs').style.display = u === 'metric' ? 'block' : 'none';
    document.getElementById('imperialInputs').style.display = u === 'imperial' ? 'block' : 'none';
}

function calculate() {
    let bmi;
    
    if (unit === 'metric') {
        const h = parseFloat(document.getElementById('heightCm').value);
        const w = parseFloat(document.getElementById('weightKg').value);
        
        if (!h || !w) {
            alert('Please enter valid values!');
            return;
        }
        
        bmi = w / ((h / 100) ** 2);
    } else {
        const h = parseFloat(document.getElementById('heightIn').value);
        const w = parseFloat(document.getElementById('weightLbs').value);
        
        if (!h || !w) {
            alert('Please enter valid values!');
            return;
        }
        
        bmi = (w / (h ** 2)) * 703;
    }
    
    displayResult(bmi);
}

function displayResult(bmi) {
    document.getElementById('result').style.display = 'block';
    document.getElementById('bmiValue').textContent = bmi.toFixed(1);
    
    let category, color, position;
    
    if (bmi < 18.5) {
        category = 'Underweight';
        color = '#3498db';
        position = 10;
    } else if (bmi < 25) {
        category = 'Normal';
        color = '#27ae60';
        position = 35;
    } else if (bmi < 30) {
        category = 'Overweight';
        color = '#f39c12';
        position = 60;
    } else {
        category = 'Obese';
        color = '#e74c3c';
        position = 85;
    }
    
    document.getElementById('bmiCategory').textContent = category;
    document.getElementById('bmiCategory').style.color = color;
    
    const indicator = document.getElementById('bmiIndicator');
    indicator.style.left = `${position}%`;
    indicator.style.background = color;
}
