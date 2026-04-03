let canvasController;

document.addEventListener('DOMContentLoaded', () => {
    canvasController = new CanvasController();
    window.canvasController = canvasController;
    
    window.propagateSignals = () => {
        canvasController.propagateSignals();
    };
    
    document.getElementById('btn-clear').addEventListener('click', () => {
        if (confirm('Clear entire circuit?')) {
            canvasController.clear();
        }
    });
    
    document.getElementById('btn-save').addEventListener('click', () => {
        saveCircuit(canvasController.gates, canvasController.wires);
    });
    
    document.getElementById('btn-load').addEventListener('click', () => {
        const data = loadCircuit();
        if (data) {
            canvasController.loadFromData(data);
        }
    });
    
    document.getElementById('btn-export').addEventListener('click', () => {
        exportJSON(canvasController.gates, canvasController.wires);
    });
    
    document.getElementById('btn-generate-table').addEventListener('click', () => {
        generateFullTable(canvasController.gates, canvasController.wires);
    });
    
    document.getElementById('btn-clear-table').addEventListener('click', () => {
        clearTable();
    });
    
    loadStarterCircuit();
});

function loadStarterCircuit() {
    const inputA = canvasController.addGate('INPUT', 80, 140);
    const inputB = canvasController.addGate('INPUT', 80, 240);
    const andGate = canvasController.addGate('AND', 280, 190);
    const outputY = canvasController.addGate('OUTPUT', 480, 190);
    
    setTimeout(() => {
        canvasController.addWire(inputA, 0, andGate, 0);
        canvasController.addWire(inputB, 0, andGate, 1);
        canvasController.addWire(andGate, 0, outputY, 0);
        
        canvasController.propagateSignals();
    }, 100);
}
