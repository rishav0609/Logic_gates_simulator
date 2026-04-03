function saveCircuit(gates, wires) {
    const data = {
        gates: gates.map(g => ({
            id: g.id,
            type: g.type,
            x: g.x,
            y: g.y,
            value: g.value,
            inputs: g.inputs,
            output: g.output,
            numInputs: g.inputs.length
        })),
        wires: wires.map(w => ({
            id: w.id,
            fromGateId: w.fromGate.id,
            fromPin: w.fromPin,
            toGateId: w.toGate.id,
            toPin: w.toPin
        }))
    };
    
    try {
        localStorage.setItem('lgs_circuit', JSON.stringify(data));
        alert('Circuit saved successfully!');
    } catch (e) {
        alert('Failed to save circuit: ' + e.message);
    }
}

function loadCircuit() {
    try {
        const data = localStorage.getItem('lgs_circuit');
        if (!data) {
            alert('No saved circuit found');
            return null;
        }
        return JSON.parse(data);
    } catch (e) {
        alert('Failed to load circuit: ' + e.message);
        return null;
    }
}

function exportJSON(gates, wires) {
    const data = {
        gates: gates.map(g => ({
            id: g.id,
            type: g.type,
            x: g.x,
            y: g.y,
            value: g.value,
            numInputs: g.inputs.length
        })),
        wires: wires.map(w => ({
            id: w.id,
            fromGateId: w.fromGate.id,
            fromPin: w.fromPin,
            toGateId: w.toGate.id,
            toPin: w.toPin
        }))
    };
    
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'circuit.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function importJSON(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                resolve(data);
            } catch (err) {
                reject(err);
            }
        };
        reader.onerror = reject;
        reader.readAsText(file);
    });
}
