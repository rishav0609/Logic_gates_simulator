const truthTableState = {
    loggedCombos: new Set(),
    inputGates: [],
    outputGates: []
};

function buildHeaders(inputGates, outputGates) {
    const thead = document.getElementById('truth-thead');
    thead.innerHTML = '';
    
    const headerRow = document.createElement('tr');
    
    inputGates.forEach(gate => {
        const th = document.createElement('th');
        th.textContent = gate.element.querySelector('.gate-label').textContent || 'IN';
        headerRow.appendChild(th);
    });
    
    outputGates.forEach(gate => {
        const th = document.createElement('th');
        th.textContent = gate.element.querySelector('.gate-label').textContent || 'OUT';
        headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
}

function logCurrentState(gates) {
    const inputGates = gates.filter(g => g.type === 'INPUT');
    const outputGates = gates.filter(g => g.type === 'OUTPUT');
    
    if (inputGates.length === 0) return;
    
    if (truthTableState.inputGates.length === 0) {
        truthTableState.inputGates = inputGates;
        truthTableState.outputGates = outputGates;
        buildHeaders(inputGates, outputGates);
    }
    
    const inputValues = inputGates.map(g => g.value).join('');
    const outputValues = outputGates.map(g => g.output).join('');
    const combo = inputValues + '|' + outputValues;
    
    if (truthTableState.loggedCombos.has(combo)) {
        highlightActiveRow(inputValues, outputValues);
        return;
    }
    
    truthTableState.loggedCombos.add(combo);
    
    const tbody = document.getElementById('truth-tbody');
    const row = document.createElement('tr');
    row.dataset.combo = combo;
    
    inputGates.forEach(gate => {
        const td = document.createElement('td');
        td.textContent = gate.value;
        td.className = `value-${gate.value}`;
        row.appendChild(td);
    });
    
    outputGates.forEach(gate => {
        const td = document.createElement('td');
        td.textContent = gate.output;
        td.className = `value-${gate.output}`;
        row.appendChild(td);
    });
    
    tbody.appendChild(row);
    highlightActiveRow(inputValues, outputValues);
}

function highlightActiveRow(inputValues, outputValues) {
    const combo = inputValues + '|' + outputValues;
    const rows = document.querySelectorAll('#truth-tbody tr');
    rows.forEach(row => {
        if (row.dataset.combo === combo) {
            row.classList.add('active');
        } else {
            row.classList.remove('active');
        }
    });
}

function generateFullTable(gates, wires) {
    const inputGates = gates.filter(g => g.type === 'INPUT');
    const outputGates = gates.filter(g => g.type === 'OUTPUT');
    
    if (inputGates.length === 0) {
        alert('No INPUT gates in circuit');
        return;
    }
    
    clearTable();
    buildHeaders(inputGates, outputGates);
    
    const originalValues = inputGates.map(g => g.value);
    
    const numCombos = Math.pow(2, inputGates.length);
    
    for (let i = 0; i < numCombos; i++) {
        for (let j = 0; j < inputGates.length; j++) {
            const bitValue = (i >> (inputGates.length - 1 - j)) & 1;
            inputGates[j].value = bitValue;
        }
        
        propagate(gates, wires);
        logCurrentState(gates);
    }
    
    inputGates.forEach((gate, i) => {
        gate.value = originalValues[i];
    });
    propagate(gates, wires);
}

function clearTable() {
    const tbody = document.getElementById('truth-tbody');
    tbody.innerHTML = '';
    truthTableState.loggedCombos.clear();
    truthTableState.inputGates = [];
    truthTableState.outputGates = [];
    
    const thead = document.getElementById('truth-thead');
    thead.innerHTML = '';
}
