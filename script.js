// === LAKSHYA PC BUILD SHOWCASE ===
// Advanced Interactive JavaScript

// Build configurations with detailed specifications
const buildConfigurations = {
    'white-tier': {
        name: 'White Aesthetic Build',
        badge: 'PREMIUM',
        price: 12804,
        cpu: {
            name: 'AMD Ryzen 7 7800X3D',
            model: '7800X3D',
            price: 1459,
            cores: '8/16',
            boost: '5.0 GHz',
            description: 'The Ryzen 7 7800X3D represents the pinnacle of gaming performance with its revolutionary 3D V-Cache technology. This CPU delivers exceptional gaming performance while maintaining excellent efficiency for content creation tasks.'
        },
        gpu: {
            name: 'ASUS TUF Gaming RTX 4070 Ti Super BTF White',
            model: 'RTX 4070 Ti S White',
            price: 3202,
            vram: '16GB GDDR6X',
            cores: '8448',
            description: 'The ASUS TUF Gaming RTX 4070 Ti Super BTF White delivers exceptional 4K gaming performance with DLSS 3 Frame Generation and ray tracing capabilities. Features premium white aesthetics with BTF (Back-to-Front) design for cleaner cable management.'
        },
        performance: {
            cyberpunk: 88,
            cod: 170,
            fortnite: 250
        },
        tierInfo: {
            title: 'White Aesthetic Build',
            description: 'The ultimate premium white-themed gaming machine featuring coordinated white components, advanced RGB lighting, and uncompromising performance for the most discerning builders.',
            badges: ['4K Gaming Ready', 'Premium Aesthetics', 'RGB Ecosystem', 'Future-Proof']
        },
        theme: 'white',
        specialFeatures: [
            'Coordinated White Theme',
            'Advanced RGB Ecosystem',
            'Premium Cable Management',
            'Wireless RGB Control',
            'LCD AIO Display',
            'Infinity Mirror Fans'
        ]
    },
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
            description: 'The Ryzen 7 7800X3D represents the pinnacle of gaming performance with its revolutionary 3D V-Cache technology. This CPU delivers exceptional gaming performance while maintaining excellent efficiency for content creation tasks.'
        },
        gpu: {
            name: 'NVIDIA RTX 4070 Ti Super',
            model: 'RTX 4070 Ti S',
            price: 3500,
            vram: '16GB GDDR6X',
            cores: '8448',
            description: 'The RTX 4070 Ti Super delivers exceptional 4K gaming performance with DLSS 3 Frame Generation and ray tracing capabilities. Perfect for both gaming and content creation with hardware-accelerated encoding.'
        },
        performance: {
            cyberpunk: 85,
            cod: 165,
            fortnite: 240
        },
        tierInfo: {
            title: 'Top Tier Build',
            description: 'The ultimate gaming and content creation machine featuring the RTX 4070 Ti Super and Ryzen 7 7800X3D for uncompromising performance.',
            badges: ['4K Gaming Ready', 'Ray Tracing Ultra', 'Content Creation']
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
            description: 'The Ryzen 7 7800X3D represents the pinnacle of gaming performance with its revolutionary 3D V-Cache technology. This CPU delivers exceptional gaming performance while maintaining excellent efficiency for content creation tasks.'
        },
        gpu: {
            name: 'NVIDIA RTX 4070',
            model: 'RTX 4070',
            price: 2800,
            vram: '12GB GDDR6X',
            cores: '5888',
            description: 'The RTX 4070 provides excellent 1440p gaming performance with DLSS 3 and ray tracing support. Great balance of performance and value for high refresh rate gaming.'
        },
        performance: {
            cyberpunk: 70,
            cod: 145,
            fortnite: 220
        },
        tierInfo: {
            title: 'Mid Tier Build',
            description: 'Perfect balance of performance and value with the RTX 4070 and Ryzen 7 7800X3D. Excellent for 1440p gaming and streaming.',
            badges: ['1440p Gaming', 'High Refresh Rate', 'Streaming Ready']
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
            description: 'The Ryzen 7 7700X offers excellent gaming and productivity performance at a great value. With high boost clocks and modern architecture, it handles all current games and applications with ease.'
        },
        gpu: {
            name: 'NVIDIA RTX 4070',
            model: 'RTX 4070',
            price: 2800,
            vram: '12GB GDDR6X',
            cores: '5888',
            description: 'The RTX 4070 provides excellent 1440p gaming performance with DLSS 3 and ray tracing support. Great balance of performance and value for high refresh rate gaming.'
        },
        performance: {
            cyberpunk: 65,
            cod: 140,
            fortnite: 210
        },
        tierInfo: {
            title: 'Budget Tier Build',
            description: 'Smart value build with RTX 4070 and Ryzen 7 7700X. Great performance for 1440p gaming without breaking the bank.',
            badges: ['1440p Gaming', 'Great Value', 'Future Proof']
        }
    }
};

// Global state
let currentTier = 'white-tier';
let isLoading = true;

// DOM Elements
const elements = {
    // Loading
    loadingScreen: document.getElementById('loading-screen'),
    loadingProgress: document.querySelector('.loading-progress'),
    
    // Navigation
    navLinks: document.querySelectorAll('.nav-link'),
    
    // Build selector
    buildOptions: document.querySelectorAll('.build-option'),
    
    // Component details
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
    
    // Performance benchmarks
    cyberpunkFps: document.getElementById('cyberpunk-fps'),
    codFps: document.getElementById('cod-fps'),
    fortniteFps: document.getElementById('fortnite-fps'),
    
    // Technical tabs
    tabButtons: document.querySelectorAll('.tab-btn'),
    tabPanels: document.querySelectorAll('.tab-panel'),
    
    // FAQ
    faqItems: document.querySelectorAll('.faq-item'),
    
    // 3D Model controls
    modelControls: document.querySelectorAll('.control-btn')
};

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

async function initializeApp() {
    // Simulate loading
    await simulateLoading();
    
    // Initialize all components
    initializeNavigation();
    initializeBuildSelector();
    initializeScrollAnimations();
    initializeTechnicalTabs();
    initializeFAQ();
    initialize3DModel();
    initializeParallax();
    
    // Set initial build configuration
    updateBuildConfiguration(currentTier);
    
    // Hide loading screen
    hideLoadingScreen();
}

// === LOADING SYSTEM ===
async function simulateLoading() {
    const progress = elements.loadingProgress;
    let width = 0;
    
    return new Promise((resolve) => {
        const interval = setInterval(() => {
            width += Math.random() * 15;
            if (width >= 100) {
                width = 100;
                clearInterval(interval);
                setTimeout(resolve, 500);
            }
            progress.style.width = width + '%';
        }, 100);
    });
}

function hideLoadingScreen() {
    elements.loadingScreen.classList.add('hidden');
    setTimeout(() => {
        elements.loadingScreen.style.display = 'none';
    }, 500);
}

// === NAVIGATION SYSTEM ===
function initializeNavigation() {
    // Smooth scrolling for navigation links
    elements.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Active navigation highlighting
    window.addEventListener('scroll', updateActiveNavigation);
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for fixed nav
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
    elements.buildOptions.forEach(option => {
        option.addEventListener('click', () => {
            const tier = option.dataset.tier;
            selectBuildTier(tier);
        });
    });
}

function selectBuildTier(tier) {
    if (tier === currentTier) return;
    
    currentTier = tier;
    
    // Update visual selection
    elements.buildOptions.forEach(option => {
        option.classList.remove('active');
        if (option.dataset.tier === tier) {
            option.classList.add('active');
        }
    });
    
    // Update build configuration
    updateBuildConfiguration(tier);
    
    // Add visual feedback
    addTierChangeEffect();
}

function updateBuildConfiguration(tier) {
    const config = buildConfigurations[tier];
    
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
    
    // Update tier information
    updateTierInfo(config.tierInfo);
    
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

function updateTierInfo(tierInfo) {
    const tierInfoElement = document.getElementById('tier-info');
    if (!tierInfoElement) return;
    
    const titleElement = tierInfoElement.querySelector('h3');
    const descriptionElement = tierInfoElement.querySelector('p');
    const badgesContainer = tierInfoElement.querySelector('.performance-badges');
    
    if (titleElement) titleElement.textContent = tierInfo.title;
    if (descriptionElement) descriptionElement.textContent = tierInfo.description;
    
    if (badgesContainer) {
        badgesContainer.innerHTML = '';
        tierInfo.badges.forEach(badge => {
            const badgeElement = document.createElement('span');
            badgeElement.className = 'badge';
            badgeElement.textContent = badge;
            badgesContainer.appendChild(badgeElement);
        });
    }
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
                document.body.removeChild(overlay);
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
                
                // Trigger specific animations based on element type
                if (entry.target.classList.contains('component-section')) {
                    animateComponentSection(entry.target);
                } else if (entry.target.classList.contains('benchmark-item')) {
                    animateBenchmarkItem(entry.target);
                } else if (entry.target.classList.contains('future-item')) {
                    animateFutureItem(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const animatableElements = document.querySelectorAll('.fade-in, .component-section, .benchmark-item, .future-item');
    animatableElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

function animateComponentSection(section) {
    const visual = section.querySelector('.component-visual');
    const details = section.querySelector('.component-details');
    
    if (visual) {
        setTimeout(() => {
            visual.classList.add('animate-slide-left');
        }, 200);
    }
    
    if (details) {
        setTimeout(() => {
            details.classList.add('animate-slide-right');
        }, 400);
    }
}

function animateBenchmarkItem(item) {
    const fpsNumber = item.querySelector('.fps-number');
    if (fpsNumber) {
        const targetValue = parseInt(fpsNumber.textContent);
        fpsNumber.textContent = '0';
        setTimeout(() => {
            animateNumber(fpsNumber, targetValue);
        }, 300);
    }
}

function animateFutureItem(item) {
    item.style.transform = 'translateY(30px)';
    item.style.opacity = '0';
    
    setTimeout(() => {
        item.style.transition = 'all 0.6s ease';
        item.style.transform = 'translateY(0)';
        item.style.opacity = '1';
    }, 100);
}

// === TECHNICAL TABS SYSTEM ===
function initializeTechnicalTabs() {
    elements.tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;
            switchTab(tabId);
        });
    });
}

function switchTab(tabId) {
    // Update button states
    elements.tabButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tabId) {
            btn.classList.add('active');
        }
    });
    
    // Update panel visibility
    elements.tabPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === tabId) {
            panel.classList.add('active');
        }
    });
}

// === FAQ SYSTEM ===
function initializeFAQ() {
    elements.faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            toggleFAQItem(item);
        });
    });
}

function toggleFAQItem(item) {
    const isActive = item.classList.contains('active');
    
    // Close all other FAQ items
    elements.faqItems.forEach(faqItem => {
        faqItem.classList.remove('active');
    });
    
    // Toggle current item
    if (!isActive) {
        item.classList.add('active');
    }
}

// === 3D MODEL SYSTEM ===
let scene, camera, renderer, pcModel, controls;
let isModelLoaded = false;
let caseComponents = {};
let isExploded = false;
let isCaseOpen = false;
let componentHighlight = null;

function initialize3DModel() {
    const modelContainer = document.getElementById('pc-model');
    if (!modelContainer) return;

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
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    
    modelContainer.appendChild(renderer.domElement);

    // Lighting setup
    setupLighting();

    // Create PC model
    createPCModel();

    // Setup controls
    setupControls();

    // Setup component interaction
    setupComponentInteraction();

    // Handle window resize
    window.addEventListener('resize', onWindowResize);

    // Setup view controls
    elements.modelControls.forEach(control => {
        control.addEventListener('click', () => {
            const view = control.dataset.view;
            switch3DView(view);
        });
    });

    // Add additional controls
    addAdvancedControls();

    // Start animation loop
    animate();
}

function setupLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    // Main directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    scene.add(directionalLight);

    // RGB accent lights
    const rgbLight1 = new THREE.PointLight(0x8a2be2, 0.8, 10);
    rgbLight1.position.set(-3, 2, 3);
    scene.add(rgbLight1);

    const rgbLight2 = new THREE.PointLight(0x00e5ff, 0.8, 10);
    rgbLight2.position.set(3, 2, -3);
    scene.add(rgbLight2);

    // Animate RGB lights
    function animateRGBLights() {
        const time = Date.now() * 0.001;
        rgbLight1.intensity = 0.5 + Math.sin(time) * 0.3;
        rgbLight2.intensity = 0.5 + Math.cos(time) * 0.3;
    }

    // Add to animation loop
    scene.userData.animateRGBLights = animateRGBLights;
}

function createPCModel() {
    pcModel = new THREE.Group();

    // Create case
    const caseGeometry = new THREE.BoxGeometry(3, 4, 2);
    const caseMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x2a2a3e,
        metalness: 0.8,
        roughness: 0.2,
        clearcoat: 0.3,
        clearcoatRoughness: 0.1
    });
    const pcCase = new THREE.Mesh(caseGeometry, caseMaterial);
    pcCase.castShadow = true;
    pcCase.receiveShadow = true;
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
    pcModel.add(glassPanel);

    // Create motherboard
    const moboGeometry = new THREE.BoxGeometry(2.4, 0.05, 2.4);
    const moboMaterial = new THREE.MeshLambertMaterial({ color: 0x2d5a27 });
    const motherboard = new THREE.Mesh(moboGeometry, moboMaterial);
    motherboard.position.set(0.2, -1.5, 0);
    motherboard.rotation.z = Math.PI / 2;
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
    pcModel.add(gpu);

    // Create GPU fans
    for (let i = 0; i < 3; i++) {
        const fanGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.02, 8);
        const fanMaterial = new THREE.MeshLambertMaterial({ color: 0x00e5ff });
        const fan = new THREE.Mesh(fanGeometry, fanMaterial);
        fan.position.set(0.35, -0.8 + (i - 1) * 0.4, 0.4);
        fan.rotation.x = Math.PI / 2;
        
        // Add fan animation
        fan.userData.rotationSpeed = 0.2 + Math.random() * 0.1;
        pcModel.add(fan);
    }

    // Create RAM sticks
    for (let i = 0; i < 2; i++) {
        const ramGeometry = new THREE.BoxGeometry(0.05, 1.2, 0.15);
        const ramMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
        const ram = new THREE.Mesh(ramGeometry, ramMaterial);
        ram.position.set(0.8, -0.5 + i * 0.3, 0.5);
        pcModel.add(ram);

        // RGB strip on RAM
        const rgbGeometry = new THREE.BoxGeometry(0.06, 1.2, 0.02);
        const rgbMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x8a2be2,
            emissive: 0x8a2be2,
            emissiveIntensity: 0.3
        });
        const rgbStrip = new THREE.Mesh(rgbGeometry, rgbMaterial);
        rgbStrip.position.set(0.81, -0.5 + i * 0.3, 0.58);
        
        // Add RGB animation
        rgbStrip.userData.isRGB = true;
        pcModel.add(rgbStrip);
    }

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
    pcModel.add(cooler);

    // Create cooler fan
    const coolerFanGeometry = new THREE.CylinderGeometry(0.35, 0.35, 0.05, 8);
    const coolerFanMaterial = new THREE.MeshLambertMaterial({ color: 0x00e5ff });
    const coolerFan = new THREE.Mesh(coolerFanGeometry, coolerFanMaterial);
    coolerFan.position.set(0.45, 0.5, 0);
    coolerFan.rotation.z = Math.PI / 2;
    coolerFan.userData.rotationSpeed = 0.15;
    pcModel.add(coolerFan);

    // Create case fans
    const fanPositions = [
        { x: -1.4, y: 1.5, z: 0, rotation: [0, 0, Math.PI / 2] },
        { x: -1.4, y: 0.5, z: 0, rotation: [0, 0, Math.PI / 2] },
        { x: -1.4, y: -0.5, z: 0, rotation: [0, 0, Math.PI / 2] },
        { x: 0, y: 1.9, z: -0.9, rotation: [Math.PI / 2, 0, 0] },
        { x: 0, y: 1.9, z: 0.9, rotation: [Math.PI / 2, 0, 0] }
    ];

    fanPositions.forEach((pos, index) => {
        const caseFanGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.05, 8);
        const caseFanMaterial = new THREE.MeshLambertMaterial({ 
            color: index < 3 ? 0x8a2be2 : 0x00e5ff 
        });
        const caseFan = new THREE.Mesh(caseFanGeometry, caseFanMaterial);
        caseFan.position.set(pos.x, pos.y, pos.z);
        caseFan.rotation.set(pos.rotation[0], pos.rotation[1], pos.rotation[2]);
        caseFan.userData.rotationSpeed = 0.1 + Math.random() * 0.1;
        pcModel.add(caseFan);
    });

    // Create PSU
    const psuGeometry = new THREE.BoxGeometry(1.5, 0.8, 1.2);
    const psuMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x1a1a1a,
        metalness: 0.8,
        roughness: 0.3
    });
    const psu = new THREE.Mesh(psuGeometry, psuMaterial);
    psu.position.set(0, -1.8, 0);
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
    pcModel.add(rgbCable);

    scene.add(pcModel);
    isModelLoaded = true;
}

function setupControls() {
    // Mouse controls for rotation
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

    // Touch controls for mobile
    let touchStartPosition = { x: 0, y: 0 };

    renderer.domElement.addEventListener('touchstart', (e) => {
        e.preventDefault();
        touchStartPosition = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
    });

    renderer.domElement.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const deltaMove = {
            x: e.touches[0].clientX - touchStartPosition.x,
            y: e.touches[0].clientY - touchStartPosition.y
        };

        if (pcModel) {
            pcModel.rotation.y += deltaMove.x * rotationSpeed;
            pcModel.rotation.x += deltaMove.y * rotationSpeed;
        }

        touchStartPosition = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
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
    elements.modelControls.forEach(ctrl => {
        ctrl.classList.remove('active');
        if (ctrl.dataset.view === view) {
            ctrl.classList.add('active');
        }
    });

    // Animate camera to new position
    const targetPositions = {
        'front': { x: 0, y: 0, z: 8 },
        'side': { x: 8, y: 0, z: 0 },
        'top': { x: 0, y: 8, z: 0 },
        'inside': { x: 2, y: 2, z: 2 }
    };

    const targetRotations = {
        'front': { x: 0, y: 0, z: 0 },
        'side': { x: 0, y: Math.PI / 2, z: 0 },
        'top': { x: -Math.PI / 2, y: 0, z: 0 },
        'inside': { x: Math.PI / 6, y: Math.PI / 4, z: 0 }
    };

    const target = targetPositions[view];
    const rotation = targetRotations[view];

    if (target && rotation) {
        // Animate camera position
        const startPos = camera.position.clone();
        const endPos = new THREE.Vector3(target.x, target.y, target.z);
        
        const startRot = pcModel.rotation.clone();
        const endRot = new THREE.Euler(rotation.x, rotation.y, rotation.z);

        let progress = 0;
        const duration = 1000; // 1 second
        const startTime = Date.now();

        function animateView() {
            const elapsed = Date.now() - startTime;
            progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const eased = 1 - Math.pow(1 - progress, 3);
            
            // Interpolate camera position
            camera.position.lerpVectors(startPos, endPos, eased);
            camera.lookAt(0, 0, 0);
            
            // Interpolate model rotation
            pcModel.rotation.x = startRot.x + (endRot.x - startRot.x) * eased;
            pcModel.rotation.y = startRot.y + (endRot.y - startRot.y) * eased;
            pcModel.rotation.z = startRot.z + (endRot.z - startRot.z) * eased;

            if (progress < 1) {
                requestAnimationFrame(animateView);
            }
        }

        animateView();
    }
}

function animate() {
    requestAnimationFrame(animate);

    if (!isModelLoaded) return;

    const time = Date.now() * 0.001;

    // Animate fans
    pcModel.children.forEach(child => {
        if (child.userData.rotationSpeed) {
            child.rotation.z += child.userData.rotationSpeed;
        }
    });

    // Animate RGB components
    pcModel.children.forEach(child => {
        if (child.userData.isRGB) {
            const hue = (time * 50) % 360;
            child.material.color.setHSL(hue / 360, 1, 0.5);
            if (child.material.emissive) {
                child.material.emissive.setHSL(hue / 360, 1, 0.3);
            }
        }
    });

    // Animate RGB lights
    if (scene.userData.animateRGBLights) {
        scene.userData.animateRGBLights();
    }

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

// === PERFORMANCE OPTIMIZATIONS ===
let ticking = false;

function requestTick(callback) {
    if (!ticking) {
        requestAnimationFrame(() => {
            callback();
            ticking = false;
        });
        ticking = true;
    }
}

// Optimized scroll handler
window.addEventListener('scroll', () => {
    requestTick(() => {
        updateActiveNavigation();
    });
}, { passive: true });

// === KEYBOARD SHORTCUTS ===
document.addEventListener('keydown', (e) => {
    // Tier selection shortcuts
    if (e.key === '1') {
        selectBuildTier('top-tier');
    } else if (e.key === '2') {
        selectBuildTier('mid-tier');
    } else if (e.key === '3') {
        selectBuildTier('budget-tier');
    }
    
    // Navigation shortcuts
    if (e.key === 'h' || e.key === 'H') {
        scrollToSection('hero');
    } else if (e.key === 'c' || e.key === 'C') {
        scrollToSection('components');
    } else if (e.key === 'p' || e.key === 'P') {
        scrollToSection('performance');
    }
});

// === MOBILE OPTIMIZATIONS ===
function initializeMobileOptimizations() {
    // Touch gestures for 3D model
    let startX, startY;
    const pcModel = document.querySelector('.pc-model');
    
    if (pcModel) {
        pcModel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        pcModel.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const deltaX = e.touches[0].clientX - startX;
            const deltaY = e.touches[0].clientY - startY;
            
            const pcCase = pcModel.querySelector('.pc-case');
            if (pcCase) {
                const rotateY = deltaX * 0.5;
                const rotateX = -deltaY * 0.5;
                pcCase.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
            }
        });
    }
}

// === ACCESSIBILITY ENHANCEMENTS ===
function initializeAccessibility() {
    // Focus management
    const focusableElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    
    // Skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--color-primary);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Announce tier changes to screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
    document.body.appendChild(announcer);
    
    // Update announcer when tier changes
    const originalSelectBuildTier = selectBuildTier;
    selectBuildTier = function(tier) {
        originalSelectBuildTier(tier);
        const config = buildConfigurations[tier];
        announcer.textContent = `Selected ${config.name} configuration for ${config.price} AED`;
    };
}

// === ERROR HANDLING ===
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // Could implement user-friendly error reporting here
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// === ANALYTICS & TRACKING ===
function trackUserInteraction(action, category, label) {
    // Placeholder for analytics tracking
    console.log(`Analytics: ${category} - ${action} - ${label}`);
}

// Track tier selections
const originalSelectTier = selectBuildTier;
selectBuildTier = function(tier) {
    trackUserInteraction('select', 'build-tier', tier);
    originalSelectTier(tier);
};

// === INITIALIZATION COMPLETION ===
// Initialize mobile optimizations and accessibility when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeMobileOptimizations();
    initializeAccessibility();
});

// Export functions for global access
window.LakshyaPC = {
    selectBuildTier,
    scrollToSection,
    switchTab,
    switch3DView,
    buildConfigurations
};

// === ADDITIONAL INTERACTIVE FEATURES ===

// Component hover effects
document.addEventListener('DOMContentLoaded', () => {
    const componentCards = document.querySelectorAll('.component-section');
    
    componentCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.02)';
            card.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });
});

// Dynamic background particles
function createParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--color-primary);
            border-radius: 50%;
            opacity: 0.6;
            animation: float ${5 + Math.random() * 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles after DOM load
document.addEventListener('DOMContentLoaded', createParticles);

// Smooth reveal animations for sections
const revealSections = () => {
    const sections = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (sectionTop < windowHeight - revealPoint) {
            section.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', revealSections);
document.addEventListener('DOMContentLoaded', revealSections);

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
    const partsGpuSubtitle = document.getElementById('parts-gpu-subtitle');
    
    if (partsGpuName) partsGpuName.textContent = config.gpu.name;
    if (partsGpuModel) partsGpuModel.textContent = config.gpu.model;
    if (partsGpuPrice) partsGpuPrice.textContent = `AED ${config.gpu.price.toFixed(2)}`;
    if (partsGpuVram) partsGpuVram.textContent = config.gpu.vram;
    if (partsGpuSubtitle) {
        if (tier === 'top-tier') {
            partsGpuSubtitle.textContent = 'High-performance graphics card for 4K gaming and content creation';
        } else {
            partsGpuSubtitle.textContent = 'Excellent graphics card for 1440p gaming and content creation';
        }
    }
    
    // Update total price
    const partsTotal = document.getElementById('parts-total');
    if (partsTotal) partsTotal.textContent = `AED ${config.price.toFixed(2)}`;
    
    // Add animation to updated parts
    animatePartsUpdate();
}

function animatePartsUpdate() {
    const updatedElements = [
        document.getElementById('parts-cpu-name'),
        document.getElementById('parts-cpu-price'),
        document.getElementById('parts-gpu-name'),
        document.getElementById('parts-gpu-price'),
        document.getElementById('parts-total')
    ].filter(el => el !== null);
    
    updatedElements.forEach(element => {
        element.style.transform = 'scale(1.05)';
        element.style.color = 'var(--color-secondary)';
        element.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.color = '';
        }, 500);
    });
}

// Export parts list functionality
function exportPartsList() {
    const config = buildConfigurations[currentTier];
    
    const partsData = {
        buildName: config.name,
        totalPrice: config.price,
        components: [
            {
                category: 'Processor',
                name: config.cpu.name,
                price: config.cpu.price,
                specs: `${config.cpu.cores} cores, ${config.cpu.boost} boost`
            },
            {
                category: 'Graphics Card',
                name: config.gpu.name,
                price: config.gpu.price,
                specs: `${config.gpu.vram}, ${config.gpu.cores} cores`
            },
            {
                category: 'Memory',
                name: 'Corsair VENGEANCE RGB DDR5 RAM 32GB',
                price: 580,
                specs: '6400MHz CL36, RGB'
            },
            {
                category: 'Storage',
                name: 'Samsung 990 Pro 2TB',
                price: 580,
                specs: 'PCIe 4.0 NVMe, 7,450 MB/s'
            },
            {
                category: 'Motherboard',
                name: 'ASUS ROG Strix B650E-E Gaming WiFi',
                price: 1009.12,
                specs: 'AM5, PCIe 5.0, WiFi 6E'
            },
            {
                category: 'CPU Cooler',
                name: 'NZXT Kraken Elite 240 RGB',
                price: 692.02,
                specs: '240mm AIO, LCD Display'
            },
            {
                category: 'Case',
                name: 'Lian Li O11 Dynamic Mini',
                price: 435,
                specs: 'Tempered Glass, Dual Chamber'
            },
            {
                category: 'Power Supply',
                name: 'Corsair RM850e 850W',
                price: 472,
                specs: '80+ Gold, Fully Modular'
            },
            {
                category: 'Case Fans',
                name: 'Lian Li UNI Fan SL-Infinity (6x)',
                price: 858,
                specs: 'Wireless RGB, Low Noise'
            },
            {
                category: 'RGB Cables',
                name: 'Lian Li Strimer Plus V2 8-Pin',
                price: 189,
                specs: 'Addressable RGB'
            }
        ]
    };
    
    // Create CSV content
    let csvContent = "Category,Component,Price (AED),Specifications\n";
    partsData.components.forEach(component => {
        csvContent += `"${component.category}","${component.name}",${component.price},"${component.specs}"\n`;
    });
    csvContent += `\nTotal Build Cost:,${partsData.buildName},${partsData.totalPrice},\n`;
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `Lakshya_PC_${config.name.replace(/\s+/g, '_')}_Parts_List.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success message
    showNotification('Parts list exported successfully!', 'success');
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--color-success)' : 'var(--color-primary)'};
        color: white;
        padding: 1rem 2rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Make export function globally available
window.exportPartsList = exportPartsList;