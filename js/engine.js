function buildGraph(gates, wires) {
    const graph = new Map();
    const inDegree = new Map();
    
    gates.forEach(gate => {
        graph.set(gate.id, []);
        inDegree.set(gate.id, 0);
    });
    
    wires.forEach(wire => {
        if (graph.has(wire.fromGate.id) && graph.has(wire.toGate.id)) {
            graph.get(wire.fromGate.id).push(wire.toGate.id);
            inDegree.set(wire.toGate.id, inDegree.get(wire.toGate.id) + 1);
        }
    });
    
    return { graph, inDegree };
}

function topologicalSort(gates, wires) {
    const { graph, inDegree } = buildGraph(gates, wires);
    const queue = [];
    const result = [];
    
    gates.forEach(gate => {
        if (inDegree.get(gate.id) === 0) {
            queue.push(gate.id);
        }
    });
    
    while (queue.length > 0) {
        const gateId = queue.shift();
        result.push(gateId);
        
        const neighbors = graph.get(gateId) || [];
        neighbors.forEach(neighborId => {
            inDegree.set(neighborId, inDegree.get(neighborId) - 1);
            if (inDegree.get(neighborId) === 0) {
                queue.push(neighborId);
            }
        });
    }
    
    if (result.length !== gates.length) {
        return null;
    }
    
    return result;
}

function detectCycle(gates, wires) {
    const sorted = topologicalSort(gates, wires);
    return sorted === null;
}

function propagate(gates, wires) {
    console.log('=== PROPAGATION START ===');
    console.log('Gates:', gates.map(g => `${g.id}:${g.type}`));
    console.log('Wires:', wires.map(w => `${w.fromGate.type}(${w.fromGate.id})->${w.toGate.type}(${w.toGate.id}) pin${w.toPin}`));
    
    const gateMap = new Map();
    gates.forEach(gate => gateMap.set(gate.id, gate));
    
    const sortedIds = topologicalSort(gates, wires);
    
    if (sortedIds === null) {
        showCycleWarning();
        return false;
    }
    
    console.log('Topological order:', sortedIds);
    
    gates.forEach(gate => {
        if (gate.type !== 'INPUT') {
            for (let i = 0; i < gate.inputs.length; i++) {
                gate.inputs[i] = 0;
            }
        }
    });
    
    sortedIds.forEach(gateId => {
        const gate = gateMap.get(gateId);
        if (!gate) return;
        
        console.log(`\nProcessing ${gate.type} (id:${gate.id})`);
        
        if (gate.type === 'INPUT') {
            gate.output = gate.value;
            console.log(`  INPUT value=${gate.value}, output=${gate.output}`);
        } else {
            const incomingWires = wires.filter(w => w.toGate.id === gate.id);
            console.log(`  Incoming wires: ${incomingWires.length}`);
            
            incomingWires.forEach(wire => {
                const sourceOutput = wire.fromGate.output;
                const targetPin = wire.toPin;
                const oldValue = gate.inputs[targetPin];
                gate.inputs[targetPin] = Math.max(gate.inputs[targetPin], sourceOutput);
                console.log(`    From ${wire.fromGate.type}(${wire.fromGate.id}) output=${sourceOutput} -> pin[${targetPin}]: ${oldValue} -> ${gate.inputs[targetPin]}`);
            });
            
            console.log(`  Before eval: inputs=[${gate.inputs}]`);
            gate.evaluate();
            console.log(`  After eval: output=${gate.output}`);
        }
    });
    
    wires.forEach(wire => {
        wire.updateSignal(wire.fromGate.output);
    });
    
    console.log('=== PROPAGATION END ===\n');
    
    return true;
}

function showCycleWarning() {
    const banner = document.getElementById('cycle-warning');
    if (banner) {
        banner.classList.add('show');
        setTimeout(() => {
            banner.classList.remove('show');
        }, 3000);
    }
}
