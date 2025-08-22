// === LAKSHYA PC BUILD SHOWCASE ===
// Fixed version with proper DOM loading

// Build configurations with detailed specifications
const buildConfigurations = {
    'top-tier': {
        name: 'Top Tier Build',
        badge: 'FLAGSHIP',
        price: 9804,
        cpu: {
            name: 'AMD Ryzen 7 7800X3D',
            model: '7800X3D',
            price: 1489,
            cores: '8/16',
            boost: '5.0 GHz',
            description: 'The Ryzen 7 7800X3D represents the pinnacle of gaming performance with its revolutionary 3D V-Cache technology.'
        },
        gpu: {
            name: 'NVIDIA RTX 4070 Ti Super',
            model: 'RTX 4070 Ti S',
            price: 3500,
            vram: '16GB GDDR6X',
            cores: '8448',
            description: 'The RTX 4070 Ti Super delivers exceptional 4K gaming performance with DLSS 3 Frame Generation and ray tracing capabilities.'
        },
        performance: {
            cyberpunk: 85,
            cod: 165,
            fortnite: 240
        }
    },
    'mid-tier': {
        name: 'Mid Tier Build',
        badge: 'BALANCED',
        price: 9104,
        cpu: {
            name: 'AMD Ryzen 7 7800X3D',
            model: '7800X3D',
            price: 1489,
            cores: '8/16',
            boost: '5.0 GHz',
            description: 'The Ryzen 7 7800X3D represents the pinnacle of gaming performance with its revolutionary 3D V-Cache technology.'
        },
        gpu: {
            name: 'NVIDIA RTX 4070',
            model: 'RTX 4070',
            price: 2800,
            vram: '12GB GDDR6X',
            cores: '5888',
            description: 'The RTX 4070 provides excellent 1440p gaming performance with DLSS 3 and ray tracing support.'
        },
        performance: {
            cyberpunk: 70,
            cod: 145,
            fortnite: 220
        }
    },
    'budget-tier': {
        name: 'Budget Tier Build',
        badge: 'VALUE',
        price: 8515,
        cpu: {
            name: 'AMD Ryzen 7 7700X',
            model: '7700X',
            price: 1200,
            cores: '8/16',
            boost: '5.4 GHz',
            description: 'The Ryzen 7 7700X offers excellent gaming and productivity performance at a great value.'
        },
        gpu: {
            name: 'NVIDIA RTX 4070',
            model: 'RTX 4070',
            price: 2800,
            vram: '12GB GDDR6X',
            cores: '5888',
            description: 'The RTX 4070 provides excellent 1440p gaming performance with DLSS 3 and ray tracing support.'
        },
        performance: {
            cyberpunk: 65,
            cod: 140,
            fortnite: 210
        }
    }
};

// Global state
let currentTier = 'top-tier';
let isLoading = true;
let elements = {};

// 3D Model variables
let scene, camera, renderer, pcModel;
let isModelLoaded = false;
let caseComponents = {};
let isExploded = false;
let isCaseOpen = false;
let componentHighlight = null;

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app...');
    initializeElements();
    initializeApp();
});

function initializeElements() {
    elements = {
        loadingScreen: document.getElementById('loading-screen'),
        loadingProgress: document.querySelector('.loading-progress'),
        navLinks: document.querySelectorAll('.nav-link'),
        buildOptions: document.querySelectorAll('.build-option'),
        cpuName: document.getElementById('cpu-name'),
        cpuModel: document.getElementById('cpu-model'),
        cpuPrice: document.getElementById('cpu-price'),
        cpuCores: document.getElementById('cpu-cores'),
        cpuBoost: document.getElementById('cpu-boost'),
        cpuDescription: document.getElementById('cpu-description'),
        gpuName: document.getElementById('gpu-name'),
        gpuModel: document.getElementById('gpu-model'),
        gpuPrice: document.getElementById('gpu-price'),
        gpuVram: document.getElementById('gpu-vram'),
        gpuCores: document.getElementById('gpu-cores'),
        gpuDescription: document.getElementById('gpu-description'),
        cyberpunkFps: document.getElementById('cyberpunk-fps'),
        codFps: document.getElementById('cod-fps'),
        fortniteFps: document.getElementById('fortnite-fps'),
        tabButtons: document.querySelectorAll('.tab-btn'),
        tabPanels: document.querySelectorAll('.tab-panel'),
        faqItems: document.querySelectorAll('.faq-item'),
        modelControls: document.querySelectorAll('.control-btn')
    };
}

async function initializeApp() {
    try {
        console.log('Starting app initialization...');
        
        // Simulate loading
        await simulateLoading();
        
        // Initialize all components
        initializeNavigation();
        initializeBuildSelector();
        initializeScrollAnimations();
        initializeTechnicalTabs();
        initializeFAQ();
        
        // Initialize 3D model (with error handling)
        try {
            initialize3DModel();
        } catch (error) {
            console.error('3D Model initialization failed:', error);
            // Continue without 3D model
        }
        
        initializeParallax();
        
        // Set initial build configuration
        updateBuildConfiguration(currentTier);
        
        // Hide loading screen
        hideLoadingScreen();
        
        console.log('App initialization complete!');
    } catch (error) {
        console.error('App initialization failed:', error);
        // Force hide loading screen even if there's an error
        hideLoadingScreen();
    }
}

// === LOADING SYSTEM ===
async function simulateLoading() {
    const progress = elements.loadingProgress;
    if (!progress) {
        console.warn('Loading progress element not found');
        return;
    }
    
    let width = 0;
    
    return new Promise((resolve) => {
        const interval = setInterval(() => {
            width += Math.random() * 20 + 5; // Faster loading
            if (width >= 100) {
                width = 100;
                clearInterval(interval);
                setTimeout(resolve, 300); // Shorter delay
            }
            progress.style.width = width + '%';
        }, 50); // Faster updates
    });
}

function hideLoadingScreen() {
    const loadingScreen = elements.loadingScreen;
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// === NAVIGATION SYSTEM ===
function initializeNavigation() {
    if (elements.navLinks) {
        elements.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                scrollToSection(targetId);
            });
        });
    }
    
    window.addEventListener('scroll', updateActiveNavigation);
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function updateActiveNavigation() {
    const sections = ['hero', '3d-showcase', 'components', 'performance', 'future-proof', 'comparison'];
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        const navLink = document.querySelector(`[href="#${sectionId}"]`);
        
        if (section && navLink) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                elements.navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        }
    });
}

// === BUILD SELECTOR SYSTEM ===
function initializeBuildSelector() {
    if (elements.buildOptions) {
        elements.buildOptions.forEach(option => {
            option.addEventListener('click', () => {
                const tier = option.dataset.tier;
                selectBuildTier(tier);
            });
        });
    }
}

function selectBuildTier(tier) {
    if (tier === currentTier) return;
    
    currentTier = tier;
    
    // Update visual selection
    if (elements.buildOptions) {
        elements.buildOptions.forEach(option => {
            option.classList.remove('active');
            if (option.dataset.tier === tier) {
                option.classList.add('active');
            }
        });
    }
    
    // Update build configuration
    updateBuildConfiguration(tier);
    
    // Add visual feedback
    addTierChangeEffect();
}

function updateBuildConfiguration(tier) {
    const config = buildConfigurations[tier];
    if (!config) return;
    
    // Update CPU information
    if (elements.cpuName) elements.cpuName.textContent = config.cpu.name;
    if (elements.cpuModel) elements.cpuModel.textContent = config.cpu.model;
    if (elements.cpuPrice) elements.cpuPrice.textContent = `AED ${config.cpu.price}`;
    if (elements.cpuCores) elements.cpuCores.textContent = config.cpu.cores;
    if (elements.cpuBoost) elements.cpuBoost.textContent = config.cpu.boost;
    if (elements.cpuDescription) elements.cpuDescription.textContent = config.cpu.description;
    
    // Update GPU information
    if (elements.gpuName) elements.gpuName.textContent = config.gpu.name;
    if (elements.gpuModel) elements.gpuModel.textContent = config.gpu.model;
    if (elements.gpuPrice) elements.gpuPrice.textContent = `AED ${config.gpu.price}`;
    if (elements.gpuVram) elements.gpuVram.textContent = config.gpu.vram;
    if (elements.gpuCores) elements.gpuCores.textContent = config.gpu.cores;
    if (elements.gpuDescription) elements.gpuDescription.textContent = config.gpu.description;
    
    // Update performance benchmarks
    if (elements.cyberpunkFps) {
        animateNumber(elements.cyberpunkFps, config.performance.cyberpunk);
    }
    if (elements.codFps) {
        animateNumber(elements.codFps, config.performance.cod);
    }
    if (elements.fortniteFps) {
        animateNumber(elements.fortniteFps, config.performance.fortnite);
    }
    
    // Update parts list
    updatePartsList(tier);
}

function animateNumber(element, targetValue) {
    const startValue = parseInt(element.textContent) || 0;
    const duration = 1000;
    const startTime = performance.now();
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.round(startValue + (targetValue - startValue) * easeOutCubic(progress));
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

function addTierChangeEffect() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, rgba(138, 43, 226, 0.1), rgba(0, 229, 255, 0.1));
        pointer-events: none;
        opacity: 0;
        z-index: 9999;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(overlay);
    
    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(overlay)) {
                    document.body.removeChild(overlay);
                }
            }, 300);
        }, 200);
    });
}

// === SCROLL ANIMATIONS ===
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    const animatableElements = document.querySelectorAll('.fade-in, .component-section, .benchmark-item, .future-item');
    animatableElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// === TECHNICAL TABS SYSTEM ===
function initializeTechnicalTabs() {
    if (elements.tabButtons) {
        elements.tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.dataset.tab;
                switchTab(tabId);
            });
        });
    }
}

function switchTab(tabId) {
    if (elements.tabButtons) {
        elements.tabButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tabId) {
                btn.classList.add('active');
            }
        });
    }
    
    if (elements.tabPanels) {
        elements.tabPanels.forEach(panel => {
            panel.classList.remove('active');
            if (panel.id === tabId) {
                panel.classList.add('active');
            }
        });
    }
}

// === FAQ SYSTEM ===
function initializeFAQ() {
    if (elements.faqItems) {
        elements.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => {
                    toggleFAQItem(item);
                });
            }
        });
    }
}

function toggleFAQItem(item) {
    const isActive = item.classList.contains('active');
    
    if (elements.faqItems) {
        elements.faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
    }
    
    if (!isActive) {
        item.classList.add('active');
    }
}

// === 3D MODEL SYSTEM ===
function initialize3DModel() {
    const modelContainer = document.getElementById('pc-model');
    if (!modelContainer || typeof THREE === 'undefined') {
        console.warn('3D model container not found or Three.js not loaded');
        return;
    }

    try {
        // Initialize Three.js scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0a0a0f);

        // Camera setup
        camera = new THREE.PerspectiveCamera(75, modelContainer.clientWidth / modelContainer.clientHeight, 0.1, 1000);
        camera.position.set(5, 3, 5);

        // Renderer setup
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(modelContainer.clientWidth, modelContainer.clientHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        modelContainer.appendChild(renderer.domElement);

        // Lighting setup
        setupLighting();

        // Create PC model
        createPCModel();

        // Setup controls
        setupControls();

        // Handle window resize
        window.addEventListener('resize', onWindowResize);

        // Setup view controls
        if (elements.modelControls) {
            elements.modelControls.forEach(control => {
                control.addEventListener('click', () => {
                    const view = control.dataset.view;
                    switch3DView(view);
                });
            });
        }

        // Start animation loop
        animate();
        
        console.log('3D model initialized successfully');
    } catch (error) {
        console.error('3D model initialization error:', error);
    }
}

function setupLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    // Main directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // RGB accent lights
    const rgbLight1 = new THREE.PointLight(0x8a2be2, 0.8, 10);
    rgbLight1.position.set(-3, 2, 3);
    scene.add(rgbLight1);

    const rgbLight2 = new THREE.PointLight(0x00e5ff, 0.8, 10);
    rgbLight2.position.set(3, 2, -3);
    scene.add(rgbLight2);
}

function createPCModel() {
    pcModel = new THREE.Group();
    caseComponents = {};

    // Create case
    const caseGeometry = new THREE.BoxGeometry(3, 4, 2);
    const caseMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x2a2a3e,
        metalness: 0.8,
        roughness: 0.2
    });
    const pcCase = new THREE.Mesh(caseGeometry, caseMaterial);
    pcCase.castShadow = true;
    pcCase.receiveShadow = true;
    pcCase.userData.componentType = 'case';
    pcCase.userData.name = 'Lian Li O11 Dynamic Mini';
    caseComponents.case = pcCase;
    pcModel.add(pcCase);

    // Create tempered glass side panel
    const glassGeometry = new THREE.PlaneGeometry(1.9, 3.9);
    const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x00e5ff,
        transparent: true,
        opacity: 0.3,
        transmission: 0.9,
        thickness: 0.1,
        roughness: 0,
        metalness: 0
    });
    const glassPanel = new THREE.Mesh(glassGeometry, glassMaterial);
    glassPanel.position.set(1.51, 0, 0);
    glassPanel.rotation.y = Math.PI / 2;
    glassPanel.userData.componentType = 'glass';
    glassPanel.userData.name = 'Tempered Glass Panel';
    glassPanel.userData.originalPosition = glassPanel.position.clone();
    glassPanel.userData.originalRotation = glassPanel.rotation.clone();
    caseComponents.glass = glassPanel;
    pcModel.add(glassPanel);

    // Create motherboard
    const moboGeometry = new THREE.BoxGeometry(2.4, 0.05, 2.4);
    const moboMaterial = new THREE.MeshLambertMaterial({ color: 0x2d5a27 });
    const motherboard = new THREE.Mesh(moboGeometry, moboMaterial);
    motherboard.position.set(0.2, -1.5, 0);
    motherboard.rotation.z = Math.PI / 2;
    motherboard.userData.componentType = 'motherboard';
    motherboard.userData.name = 'ASUS ROG Strix B650E-E Gaming WiFi';
    motherboard.userData.originalPosition = motherboard.position.clone();
    caseComponents.motherboard = motherboard;
    pcModel.add(motherboard);

    // Create GPU
    const gpuGeometry = new THREE.BoxGeometry(2.2, 0.3, 0.8);
    const gpuMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x333333,
        metalness: 0.7,
        roughness: 0.3
    });
    const gpu = new THREE.Mesh(gpuGeometry, gpuMaterial);
    gpu.position.set(0.2, -0.8, 0);
    gpu.rotation.z = Math.PI / 2;
    gpu.userData.componentType = 'gpu';
    gpu.userData.name = buildConfigurations[currentTier].gpu.name;
    gpu.userData.originalPosition = gpu.position.clone();
    caseComponents.gpu = gpu;
    pcModel.add(gpu);

    // Create GPU fans
    for (let i = 0; i < 3; i++) {
        const fanGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.02, 8);
        const fanMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x00e5ff,
            emissive: 0x00e5ff,
            emissiveIntensity: 0.2
        });
        const fan = new THREE.Mesh(fanGeometry, fanMaterial);
        fan.position.set(0.35, -0.8 + (i - 1) * 0.4, 0.4);
        fan.rotation.x = Math.PI / 2;
        fan.userData.rotationSpeed = 0.2 + Math.random() * 0.1;
        fan.userData.isRGB = true;
        pcModel.add(fan);
    }

    // Create RAM sticks
    const ramGroup = new THREE.Group();
    for (let i = 0; i < 2; i++) {
        const ramGeometry = new THREE.BoxGeometry(0.05, 1.2, 0.15);
        const ramMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
        const ram = new THREE.Mesh(ramGeometry, ramMaterial);
        ram.position.set(0, -0.5 + i * 0.3, 0);
        ramGroup.add(ram);

        // RGB strip on RAM
        const rgbGeometry = new THREE.BoxGeometry(0.06, 1.2, 0.02);
        const rgbMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x8a2be2,
            emissive: 0x8a2be2,
            emissiveIntensity: 0.3
        });
        const rgbStrip = new THREE.Mesh(rgbGeometry, rgbMaterial);
        rgbStrip.position.set(0.01, -0.5 + i * 0.3, 0.08);
        rgbStrip.userData.isRGB = true;
        ramGroup.add(rgbStrip);
    }
    ramGroup.position.set(0.8, 0, 0.5);
    ramGroup.userData.componentType = 'ram';
    ramGroup.userData.name = 'Corsair Vengeance RGB DDR5 32GB';
    ramGroup.userData.originalPosition = ramGroup.position.clone();
    caseComponents.ram = ramGroup;
    pcModel.add(ramGroup);

    // Create CPU cooler
    const coolerGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.2, 16);
    const coolerMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x444444,
        metalness: 0.9,
        roughness: 0.1
    });
    const cooler = new THREE.Mesh(coolerGeometry, coolerMaterial);
    cooler.position.set(0.2, 0.5, 0);
    cooler.rotation.z = Math.PI / 2;
    cooler.userData.componentType = 'cooler';
    cooler.userData.name = 'NZXT Kraken Elite 240 RGB';
    cooler.userData.originalPosition = cooler.position.clone();
    caseComponents.cooler = cooler;
    pcModel.add(cooler);

    // Create cooler fan
    const coolerFanGeometry = new THREE.CylinderGeometry(0.35, 0.35, 0.05, 8);
    const coolerFanMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x00e5ff,
        emissive: 0x00e5ff,
        emissiveIntensity: 0.2
    });
    const coolerFan = new THREE.Mesh(coolerFanGeometry, coolerFanMaterial);
    coolerFan.position.set(0.45, 0.5, 0);
    coolerFan.rotation.z = Math.PI / 2;
    coolerFan.userData.rotationSpeed = 0.15;
    coolerFan.userData.isRGB = true;
    pcModel.add(coolerFan);

    // Create case fans
    const fanPositions = [
        { x: -1.4, y: 1.5, z: 0, rotation: [0, 0, Math.PI / 2] },
        { x: -1.4, y: 0.5, z: 0, rotation: [0, 0, Math.PI / 2] },
        { x: -1.4, y: -0.5, z: 0, rotation: [0, 0, Math.PI / 2] },
        { x: 0, y: 1.9, z: -0.9, rotation: [Math.PI / 2, 0, 0] },
        { x: 0, y: 1.9, z: 0.9, rotation: [Math.PI / 2, 0, 0] }
    ];

    const caseFansGroup = new THREE.Group();
    fanPositions.forEach((pos, index) => {
        const caseFanGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.05, 8);
        const caseFanMaterial = new THREE.MeshLambertMaterial({ 
            color: index < 3 ? 0x8a2be2 : 0x00e5ff,
            emissive: index < 3 ? 0x8a2be2 : 0x00e5ff,
            emissiveIntensity: 0.2
        });
        const caseFan = new THREE.Mesh(caseFanGeometry, caseFanMaterial);
        caseFan.position.set(pos.x, pos.y, pos.z);
        caseFan.rotation.set(pos.rotation[0], pos.rotation[1], pos.rotation[2]);
        caseFan.userData.rotationSpeed = 0.1 + Math.random() * 0.1;
        caseFan.userData.isRGB = true;
        caseFansGroup.add(caseFan);
    });
    caseFansGroup.userData.componentType = 'fans';
    caseFansGroup.userData.name = 'Lian Li UNI Fan SL-Infinity (6x)';
    caseComponents.fans = caseFansGroup;
    pcModel.add(caseFansGroup);

    // Create PSU
    const psuGeometry = new THREE.BoxGeometry(1.5, 0.8, 1.2);
    const psuMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x1a1a1a,
        metalness: 0.8,
        roughness: 0.3
    });
    const psu = new THREE.Mesh(psuGeometry, psuMaterial);
    psu.position.set(0, -1.8, 0);
    psu.userData.componentType = 'psu';
    psu.userData.name = 'Corsair RM850e 850W';
    psu.userData.originalPosition = psu.position.clone();
    caseComponents.psu = psu;
    pcModel.add(psu);

    // Add RGB cable effects
    const cableGeometry = new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, -1.4, 0.6),
            new THREE.Vector3(0.5, -1.2, 0.6),
            new THREE.Vector3(0.8, -0.8, 0.4),
            new THREE.Vector3(0.2, -0.8, 0.4)
        ]),
        20,
        0.02,
        8,
        false
    );
    const cableMaterial = new THREE.MeshBasicMaterial({
        color: 0xff6b35,
        emissive: 0xff6b35,
        emissiveIntensity: 0.2
    });
    const rgbCable = new THREE.Mesh(cableGeometry, cableMaterial);
    rgbCable.userData.isRGB = true;
    rgbCable.userData.componentType = 'cables';
    rgbCable.userData.name = 'RGB Extension Cables';
    caseComponents.cables = rgbCable;
    pcModel.add(rgbCable);

    scene.add(pcModel);
    isModelLoaded = true;
}

function setupControls() {
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationSpeed = 0.005;

    renderer.domElement.addEventListener('mousedown', (e) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    renderer.domElement.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const deltaMove = {
            x: e.clientX - previousMousePosition.x,
            y: e.clientY - previousMousePosition.y
        };

        if (pcModel) {
            pcModel.rotation.y += deltaMove.x * rotationSpeed;
            pcModel.rotation.x += deltaMove.y * rotationSpeed;
        }

        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    renderer.domElement.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Zoom with mouse wheel
    renderer.domElement.addEventListener('wheel', (e) => {
        e.preventDefault();
        const zoomSpeed = 0.1;
        camera.position.multiplyScalar(1 + (e.deltaY > 0 ? zoomSpeed : -zoomSpeed));
        camera.position.clampLength(3, 15);
    });
}

function switch3DView(view) {
    if (!pcModel) return;

    // Update control states
    if (elements.modelControls) {
        elements.modelControls.forEach(ctrl => {
            ctrl.classList.remove('active');
            if (ctrl.dataset.view === view) {
                ctrl.classList.add('active');
            }
        });
    }

    // Animate camera to new position
    const targetPositions = {
        'front': { x: 0, y: 0, z: 8 },
        'side': { x: 8, y: 0, z: 0 },
        'top': { x: 0, y: 8, z: 0 },
        'inside': { x: 2, y: 2, z: 2 }
    };

    const target = targetPositions[view];
    if (target) {
        const startPos = camera.position.clone();
        const endPos = new THREE.Vector3(target.x, target.y, target.z);

        let progress = 0;
        const duration = 1000;
        const startTime = Date.now();

        function animateView() {
            const elapsed = Date.now() - startTime;
            progress = Math.min(elapsed / duration, 1);
            
            const eased = 1 - Math.pow(1 - progress, 3);
            camera.position.lerpVectors(startPos, endPos, eased);
            camera.lookAt(0, 0, 0);

            if (progress < 1) {
                requestAnimationFrame(animateView);
            }
        }

        animateView();
    }
}

function animate() {
    if (!renderer || !scene || !camera) return;
    
    requestAnimationFrame(animate);

    if (!isModelLoaded) return;

    const time = Date.now() * 0.001;

    // Animate fans and RGB components
    pcModel.traverse((child) => {
        if (child.userData.rotationSpeed) {
            child.rotation.z += child.userData.rotationSpeed;
        }
        
        if (child.userData.isRGB && child.material) {
            const hue = (time * 50 + child.position.x * 10) % 360;
            child.material.color.setHSL(hue / 360, 1, 0.5);
            if (child.material.emissive) {
                child.material.emissive.setHSL(hue / 360, 1, 0.3);
            }
        }
    });

    // Auto-rotate when not being controlled
    if (!renderer.domElement.matches(':hover') && pcModel) {
        pcModel.rotation.y += 0.005;
    }

    renderer.render(scene, camera);
}

function onWindowResize() {
    const modelContainer = document.getElementById('pc-model');
    if (!modelContainer || !camera || !renderer) return;

    camera.aspect = modelContainer.clientWidth / modelContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(modelContainer.clientWidth, modelContainer.clientHeight);
}

// === PARALLAX EFFECTS ===
function initializeParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-particles');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// === PARTS LIST SYSTEM ===
function updatePartsList(tier) {
    const config = buildConfigurations[tier];
    
    // Update CPU in parts list
    const partsCpuName = document.getElementById('parts-cpu-name');
    const partsCpuPrice = document.getElementById('parts-cpu-price');
    if (partsCpuName) partsCpuName.textContent = config.cpu.name;
    if (partsCpuPrice) partsCpuPrice.textContent = `AED ${config.cpu.price.toFixed(2)}`;
    
    // Update GPU in parts list
    const partsGpuName = document.getElementById('parts-gpu-name');
    const partsGpuModel = document.getElementById('parts-gpu-model');
    const partsGpuPrice = document.getElementById('parts-gpu-price');
    const partsGpuVram = document.getElementById('parts-gpu-vram');
    
    if (partsGpuName) partsGpuName.textContent = config.gpu.name;
    if (partsGpuModel) partsGpuModel.textContent = config.gpu.model;
    if (partsGpuPrice) partsGpuPrice.textContent = `AED ${config.gpu.price.toFixed(2)}`;
    if (partsGpuVram) partsGpuVram.textContent = config.gpu.vram;
    
    // Update total price
    const partsTotal = document.getElementById('parts-total');
    if (partsTotal) partsTotal.textContent = `AED ${config.price.toFixed(2)}`;
}

// Export parts list functionality
function exportPartsList() {
    const config = buildConfigurations[currentTier];
    
    const csvContent = `Build: ${config.name}\nTotal Cost: AED ${config.price}\n\nComponents:\nCPU: ${config.cpu.name} - AED ${config.cpu.price}\nGPU: ${config.gpu.name} - AED ${config.gpu.price}\n`;
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `Lakshya_PC_${config.name.replace(/\s+/g, '_')}_Parts_List.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Make functions globally available
window.LakshyaPC = {
    selectBuildTier,
    scrollToSection,
    switchTab,
    switch3DView,
    buildConfigurations
};

window.exportPartsList = exportPartsList;

console.log('Script loaded successfully');