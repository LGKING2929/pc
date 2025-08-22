// === ADVANCED 3D MODEL FEATURES ===

function setupComponentInteraction() {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onMouseMove(event) {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(pcModel.children, true);

        // Reset previous highlight
        if (componentHighlight) {
            resetComponentHighlight(componentHighlight);
            componentHighlight = null;
        }

        if (intersects.length > 0) {
            const object = intersects[0].object;
            let component = object;
            
            // Find the root component
            while (component.parent && component.parent !== pcModel) {
                component = component.parent;
            }

            if (component.userData.componentType) {
                highlightComponent(component);
                componentHighlight = component;
                renderer.domElement.style.cursor = 'pointer';
                
                // Show component info tooltip
                showComponentTooltip(event, component);
            }
        } else {
            renderer.domElement.style.cursor = 'default';
            hideComponentTooltip();
        }
    }

    function onMouseClick(event) {
        if (componentHighlight && componentHighlight.userData.componentType) {
            selectComponent(componentHighlight.userData.componentType);
        }
    }

    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('click', onMouseClick);
}

function highlightComponent(component) {
    component.traverse((child) => {
        if (child.isMesh && child.material) {
            if (!child.userData.originalEmissive) {
                child.userData.originalEmissive = child.material.emissive ? child.material.emissive.clone() : new THREE.Color(0x000000);
                child.userData.originalEmissiveIntensity = child.material.emissiveIntensity || 0;
            }
            child.material.emissive = new THREE.Color(0x00e5ff);
            child.material.emissiveIntensity = 0.3;
        }
    });
}

function resetComponentHighlight(component) {
    component.traverse((child) => {
        if (child.isMesh && child.material && child.userData.originalEmissive) {
            child.material.emissive = child.userData.originalEmissive;
            child.material.emissiveIntensity = child.userData.originalEmissiveIntensity;
        }
    });
}

function showComponentTooltip(event, component) {
    let tooltip = document.getElementById('component-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'component-tooltip';
        tooltip.style.cssText = `
            position: fixed;
            background: rgba(26, 26, 46, 0.95);
            color: white;
            padding: 0.75rem;
            border-radius: 8px;
            border: 1px solid var(--color-primary);
            font-size: 0.9rem;
            pointer-events: none;
            z-index: 10000;
            max-width: 200px;
            backdrop-filter: blur(10px);
        `;
        document.body.appendChild(tooltip);
    }

    tooltip.innerHTML = `
        <div style="font-weight: 600; color: var(--color-secondary); margin-bottom: 0.25rem;">
            ${component.userData.name || component.userData.componentType}
        </div>
        <div style="font-size: 0.8rem; color: var(--color-text-secondary);">
            Click to focus • Double-click for details
        </div>
    `;

    tooltip.style.left = event.clientX + 10 + 'px';
    tooltip.style.top = event.clientY - 10 + 'px';
    tooltip.style.display = 'block';
}

function hideComponentTooltip() {
    const tooltip = document.getElementById('component-tooltip');
    if (tooltip) {
        tooltip.style.display = 'none';
    }
}

function selectComponent(componentType) {
    // Focus camera on component
    const component = caseComponents[componentType];
    if (component) {
        focusOnComponent(component);
        
        // Show component details
        showComponentDetails(componentType);
    }
}

function focusOnComponent(component) {
    const box = new THREE.Box3().setFromObject(component);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
    
    cameraZ *= 2; // Add some padding
    
    const startPos = camera.position.clone();
    const endPos = new THREE.Vector3(center.x, center.y, center.z + cameraZ);
    
    let progress = 0;
    const duration = 1000;
    const startTime = Date.now();
    
    function animateFocus() {
        const elapsed = Date.now() - startTime;
        progress = Math.min(elapsed / duration, 1);
        
        const eased = 1 - Math.pow(1 - progress, 3);
        camera.position.lerpVectors(startPos, endPos, eased);
        camera.lookAt(center);
        
        if (progress < 1) {
            requestAnimationFrame(animateFocus);
        }
    }
    
    animateFocus();
}

function showComponentDetails(componentType) {
    const componentData = {
        'gpu': {
            name: buildConfigurations[currentTier].gpu.name,
            specs: [
                `VRAM: ${buildConfigurations[currentTier].gpu.vram}`,
                `CUDA Cores: ${buildConfigurations[currentTier].gpu.cores}`,
                'Ray Tracing: Yes',
                'DLSS 3: Supported'
            ],
            description: buildConfigurations[currentTier].gpu.description
        },
        'motherboard': {
            name: 'ASUS ROG Strix B650E-E Gaming WiFi',
            specs: [
                'Socket: AM5',
                'PCIe: 5.0 x16',
                'M.2 Slots: 4',
                'WiFi: 6E',
                'Ethernet: 2.5Gb'
            ],
            description: 'Premium motherboard with extensive connectivity and overclocking features.'
        },
        'ram': {
            name: 'Corsair Vengeance RGB DDR5 32GB',
            specs: [
                'Capacity: 32GB (2x16GB)',
                'Speed: DDR5-6400',
                'Latency: CL36',
                'RGB: Dynamic'
            ],
            description: 'High-performance DDR5 memory with stunning RGB lighting effects.'
        },
        'cooler': {
            name: 'NZXT Kraken Elite 240 RGB',
            specs: [
                'Radiator: 240mm',
                'Display: 2.72" LCD',
                'RGB: Customizable',
                'Compatibility: AM5/LGA1700'
            ],
            description: 'Premium AIO cooler with customizable LCD display and RGB lighting.'
        },
        'psu': {
            name: 'Corsair RM850e 850W',
            specs: [
                'Wattage: 850W',
                'Efficiency: 80+ Gold',
                'Modular: Fully',
                'Warranty: 10 Years'
            ],
            description: 'High-efficiency power supply with fully modular cables and silent operation.'
        },
        'fans': {
            name: 'Lian Li UNI Fan SL-Infinity (6x)',
            specs: [
                'Size: 120mm',
                'RGB: Wireless Control',
                'Noise: <25dB',
                'Airflow: Optimized'
            ],
            description: 'Premium RGB fans with wireless control and infinity mirror design.'
        },
        'storage': {
            name: 'Samsung 990 Pro 2TB',
            specs: [
                'Capacity: 2TB',
                'Interface: PCIe 4.0',
                'Read: 7,450 MB/s',
                'Write: 6,900 MB/s'
            ],
            description: 'Flagship NVMe SSD with exceptional performance for gaming and content creation.'
        }
    };

    const data = componentData[componentType];
    if (!data) return;

    // Create or update component details panel
    let panel = document.getElementById('component-details-panel');
    if (!panel) {
        panel = document.createElement('div');
        panel.id = 'component-details-panel';
        panel.style.cssText = `
            position: fixed;
            top: 50%;
            right: 20px;
            transform: translateY(-50%);
            width: 300px;
            background: rgba(26, 26, 46, 0.95);
            border: 1px solid var(--color-primary);
            border-radius: 12px;
            padding: 1.5rem;
            color: white;
            z-index: 10000;
            backdrop-filter: blur(20px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        `;
        document.body.appendChild(panel);
    }

    panel.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
            <h3 style="color: var(--color-secondary); margin: 0; font-size: 1.1rem;">${data.name}</h3>
            <button onclick="closeComponentDetails()" style="background: none; border: none; color: var(--color-text-secondary); cursor: pointer; font-size: 1.2rem;">×</button>
        </div>
        <div style="margin-bottom: 1rem;">
            ${data.specs.map(spec => `<div style="margin: 0.25rem 0; font-size: 0.9rem; color: var(--color-text-secondary);">• ${spec}</div>`).join('')}
        </div>
        <p style="font-size: 0.9rem; line-height: 1.5; color: var(--color-text-primary); margin: 0;">
            ${data.description}
        </p>
        <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
            <button onclick="explodeView()" style="flex: 1; padding: 0.5rem; background: var(--color-primary); border: none; border-radius: 6px; color: white; cursor: pointer; font-size: 0.8rem;">
                ${isExploded ? 'Assemble' : 'Explode'} View
            </button>
            <button onclick="toggleCase()" style="flex: 1; padding: 0.5rem; background: var(--color-secondary); border: none; border-radius: 6px; color: white; cursor: pointer; font-size: 0.8rem;">
                ${isCaseOpen ? 'Close' : 'Open'} Case
            </button>
        </div>
    `;

    panel.style.display = 'block';
}

function closeComponentDetails() {
    const panel = document.getElementById('component-details-panel');
    if (panel) {
        panel.style.display = 'none';
    }
}

function addAdvancedControls() {
    const controlsContainer = document.querySelector('.model-controls');
    if (!controlsContainer) return;

    // Add exploded view button
    const explodeBtn = document.createElement('button');
    explodeBtn.className = 'control-btn';
    explodeBtn.textContent = 'Exploded View';
    explodeBtn.onclick = explodeView;
    controlsContainer.appendChild(explodeBtn);

    // Add case open/close button
    const caseBtn = document.createElement('button');
    caseBtn.className = 'control-btn';
    caseBtn.textContent = 'Open Case';
    caseBtn.onclick = toggleCase;
    controlsContainer.appendChild(caseBtn);

    // Add RGB control button
    const rgbBtn = document.createElement('button');
    rgbBtn.className = 'control-btn';
    rgbBtn.textContent = 'RGB Effects';
    rgbBtn.onclick = toggleRGBEffects;
    controlsContainer.appendChild(rgbBtn);
}

function explodeView() {
    isExploded = !isExploded;
    
    const explodeDistance = 2;
    const duration = 1500;
    const startTime = Date.now();
    
    Object.keys(caseComponents).forEach((key, index) => {
        const component = caseComponents[key];
        if (!component.userData.originalPosition) {
            component.userData.originalPosition = component.position.clone();
        }
        
        const startPos = component.position.clone();
        let endPos;
        
        if (isExploded) {
            // Calculate exploded position based on component type
            const angle = (index / Object.keys(caseComponents).length) * Math.PI * 2;
            endPos = new THREE.Vector3(
                component.userData.originalPosition.x + Math.cos(angle) * explodeDistance,
                component.userData.originalPosition.y + (index - Object.keys(caseComponents).length / 2) * 0.5,
                component.userData.originalPosition.z + Math.sin(angle) * explodeDistance
            );
        } else {
            endPos = component.userData.originalPosition.clone();
        }
        
        function animateExplode() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            
            component.position.lerpVectors(startPos, endPos, eased);
            
            if (progress < 1) {
                requestAnimationFrame(animateExplode);
            }
        }
        
        animateExplode();
    });
    
    // Update button text
    const explodeBtn = document.querySelector('.control-btn:nth-last-child(3)');
    if (explodeBtn) {
        explodeBtn.textContent = isExploded ? 'Assemble View' : 'Exploded View';
    }
}

function toggleCase() {
    isCaseOpen = !isCaseOpen;
    
    const glassPanel = caseComponents.glass;
    if (!glassPanel) return;
    
    const duration = 1000;
    const startTime = Date.now();
    const startPos = glassPanel.position.clone();
    const startRot = glassPanel.rotation.clone();
    
    let endPos, endRot;
    
    if (isCaseOpen) {
        // Open the case by moving and rotating the glass panel
        endPos = new THREE.Vector3(2.5, 0, 1);
        endRot = new THREE.Euler(0, Math.PI / 2 + Math.PI / 4, 0);
    } else {
        // Close the case
        endPos = glassPanel.userData.originalPosition.clone();
        endRot = glassPanel.userData.originalRotation.clone();
    }
    
    function animateCase() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        
        glassPanel.position.lerpVectors(startPos, endPos, eased);
        glassPanel.rotation.x = startRot.x + (endRot.x - startRot.x) * eased;
        glassPanel.rotation.y = startRot.y + (endRot.y - startRot.y) * eased;
        glassPanel.rotation.z = startRot.z + (endRot.z - startRot.z) * eased;
        
        if (progress < 1) {
            requestAnimationFrame(animateCase);
        }
    }
    
    animateCase();
    
    // Update button text
    const caseBtn = document.querySelector('.control-btn:nth-last-child(2)');
    if (caseBtn) {
        caseBtn.textContent = isCaseOpen ? 'Close Case' : 'Open Case';
    }
}

let rgbEffectsEnabled = true;

function toggleRGBEffects() {
    rgbEffectsEnabled = !rgbEffectsEnabled;
    
    // Update button text
    const rgbBtn = document.querySelector('.control-btn:nth-last-child(1)');
    if (rgbBtn) {
        rgbBtn.textContent = rgbEffectsEnabled ? 'RGB Effects: ON' : 'RGB Effects: OFF';
    }
}

// Make functions globally available
window.explodeView = explodeView;
window.toggleCase = toggleCase;
window.toggleRGBEffects = toggleRGBEffects;
window.closeComponentDetails = closeComponentDetails;