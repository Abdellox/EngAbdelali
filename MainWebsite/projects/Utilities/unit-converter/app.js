/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
const units = {
    length: { meter: 1, kilometer: 0.001, centimeter: 100, millimeter: 1000, mile: 0.000621371, yard: 1.09361, foot: 3.28084, inch: 39.3701 },
    weight: { kilogram: 1, gram: 1000, milligram: 1000000, pound: 2.20462, ounce: 35.274 },
    temperature: { celsius: 'c', fahrenheit: 'f', kelvin: 'k' }
};

function updateUnits() {
    const category = document.getElementById('category').value;
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');
    fromUnit.innerHTML = toUnit.innerHTML = '';
    Object.keys(units[category]).forEach(unit => {
        fromUnit.innerHTML += `<option value="${unit}">${unit.charAt(0).toUpperCase() + unit.slice(1)}</option>`;
        toUnit.innerHTML += `<option value="${unit}">${unit.charAt(0).toUpperCase() + unit.slice(1)}</option>`;
    });
    toUnit.selectedIndex = 1;
    convert();
}

function convert() {
    const input = parseFloat(document.getElementById('input').value) || 0;
    const category = document.getElementById('category').value;
    const from = document.getElementById('fromUnit').value;
    const to = document.getElementById('toUnit').value;
    let result;
    
    if (category === 'temperature') {
        if (from === 'celsius' && to === 'fahrenheit') result = (input * 9/5) + 32;
        else if (from === 'celsius' && to === 'kelvin') result = input + 273.15;
        else if (from === 'fahrenheit' && to === 'celsius') result = (input - 32) * 5/9;
        else if (from === 'fahrenheit' && to === 'kelvin') result = (input - 32) * 5/9 + 273.15;
        else if (from === 'kelvin' && to === 'celsius') result = input - 273.15;
        else if (from === 'kelvin' && to === 'fahrenheit') result = (input - 273.15) * 9/5 + 32;
        else result = input;
    } else {
        result = input * units[category][to] / units[category][from];
    }
    
    document.getElementById('output').value = result.toFixed(4);
}

updateUnits();
