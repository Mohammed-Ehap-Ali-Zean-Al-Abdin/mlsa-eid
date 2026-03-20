/* ========================================
   Eid Al-Fitr Card Generator - Script
   MSC-NMU - 2-Step Journey
   ======================================== */

// === Global Variables ===
const canvas = document.getElementById('cardCanvas');
const ctx = canvas.getContext('2d');

// Canvas dimensions (1080x1080 for high quality export)
canvas.width = 1080;
canvas.height = 1080;

// State
let userPhoto = null;
let templateImage = null;

// === DOM Elements ===
const uploadArea = document.getElementById('uploadArea');
const imageUpload = document.getElementById('imageUpload');
const uploadedPreview = document.getElementById('uploadedPreview');
const previewImage = document.getElementById('previewImage');
const removeImageBtn = document.getElementById('removeImage');
const fullNameInput = document.getElementById('fullName');
const positionInput = document.getElementById('position');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const shareBtn = document.getElementById('shareBtn');
const backBtn = document.getElementById('backBtn');
const cardForm = document.getElementById('cardForm');
const modalOverlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const confettiContainer = document.getElementById('confettiContainer');
const sparklesContainer = document.getElementById('sparklesContainer');
const photoError = document.getElementById('photoError');
const nameError = document.getElementById('nameError');

// === Photo Frame Coordinates (matching template.png) ===
const FRAME = {
  x: 210,
  y: 232,
  width: 660,
  height: 560,
  radius: 4
};

// === Initialize ===
window.addEventListener('load', () => {
  loadTemplate();
  setupEventListeners();
});

// === Load Template Image ===
function loadTemplate() {
  templateImage = new Image();
  templateImage.crossOrigin = 'anonymous';
  templateImage.onload = () => {
    console.log('Template loaded successfully');
  };
  templateImage.onerror = () => {
    console.error('Failed to load template');
  };
  templateImage.src = './assets/template.png';
}

// === Event Listeners Setup ===
function setupEventListeners() {
  // Upload area click
  uploadArea.addEventListener('click', () => imageUpload.click());

  // File input change
  imageUpload.addEventListener('change', handleFileSelect);

  // Drag and drop
  uploadArea.addEventListener('dragover', handleDragOver);
  uploadArea.addEventListener('dragleave', handleDragLeave);
  uploadArea.addEventListener('drop', handleDrop);

  // Remove image
  removeImageBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    removeImage();
  });

  // Clear errors on input
  fullNameInput.addEventListener('input', () => {
    fullNameInput.classList.remove('error');
    nameError.classList.remove('visible');
  });

  // Form submit (Generate button)
  cardForm.addEventListener('submit', handleGenerate);

  // Download button
  downloadBtn.addEventListener('click', downloadCard);

  // Share button
  shareBtn.addEventListener('click', shareCard);

  // Back button
  backBtn.addEventListener('click', closeModal);

  // Close modal on overlay click
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

// === Drag & Drop Handlers ===
function handleDragOver(e) {
  e.preventDefault();
  uploadArea.classList.add('drag-over');
}

function handleDragLeave(e) {
  e.preventDefault();
  uploadArea.classList.remove('drag-over');
}

function handleDrop(e) {
  e.preventDefault();
  uploadArea.classList.remove('drag-over');
  
  const files = e.dataTransfer.files;
  if (files.length > 0 && files[0].type.startsWith('image/')) {
    handleFile(files[0]);
  }
}

// === Handle File Selection ===
function handleFileSelect(e) {
  const file = e.target.files[0];
  if (file) handleFile(file);
}

function handleFile(file) {
  // Clear error state
  uploadArea.classList.remove('error');
  photoError.classList.remove('visible');

  // Check file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    showNotification('File too large. Maximum size is 5MB.', 'error');
    return;
  }

  // Check file type
  if (!file.type.startsWith('image/')) {
    showNotification('Please select a valid image file (PNG or JPG).', 'error');
    return;
  }

  // Read file
  const reader = new FileReader();
  
  reader.onload = (e) => {
    const img = new Image();
    
    img.onload = () => {
      userPhoto = img;
      showImagePreview(e.target.result);
    };
    
    img.onerror = () => {
      showNotification('Failed to load image. Please try again.', 'error');
    };
    
    img.src = e.target.result;
  };
  
  reader.onerror = () => {
    showNotification('Failed to read file. Please try again.', 'error');
  };
  
  reader.readAsDataURL(file);
}

// === Show Image Preview ===
function showImagePreview(dataUrl) {
  previewImage.src = dataUrl;
  uploadedPreview.style.display = 'block';
  uploadArea.style.display = 'none';
}

// === Remove Image ===
function removeImage() {
  userPhoto = null;
  imageUpload.value = '';
  uploadedPreview.style.display = 'none';
  uploadArea.style.display = 'block';
}

// === Handle Generate Button ===
function handleGenerate(e) {
  e.preventDefault();
  
  let hasError = false;

  // Validate photo
  if (!userPhoto) {
    uploadArea.classList.add('error');
    photoError.classList.add('visible');
    hasError = true;
  }

  // Validate name
  if (!fullNameInput.value.trim()) {
    fullNameInput.classList.add('error');
    nameError.classList.add('visible');
    hasError = true;
  }

  if (hasError) {
    return;
  }

  // Render the card
  renderCard();

  // Show modal with animations
  showModal();
}

// === Show Modal ===
function showModal() {
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Trigger celebration animations
  createConfetti();
  createSparkles();
}

// === Close Modal ===
function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
  
  // Clear confetti and sparkles
  confettiContainer.innerHTML = '';
  sparklesContainer.innerHTML = '';
}

// === Create Confetti Animation ===
function createConfetti() {
  confettiContainer.innerHTML = '';
  
  const colors = ['#0078d4', '#ffffff', '#ffd700', '#00bcf2', '#ffb900'];
  const shapes = ['circle', 'square', 'ribbon'];
  
  for (let i = 0; i < 60; i++) {
    const confetti = document.createElement('div');
    confetti.className = `confetti ${shapes[Math.floor(Math.random() * shapes.length)]}`;
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = `${Math.random() * 1.5}s`;
    confetti.style.animationDuration = `${2 + Math.random() * 2}s`;
    confettiContainer.appendChild(confetti);
  }

  // Remove confetti after animation
  setTimeout(() => {
    confettiContainer.innerHTML = '';
  }, 4000);
}

// === Create Sparkles Animation ===
function createSparkles() {
  sparklesContainer.innerHTML = '';
  
  const positions = [
    { x: -180, y: -180 },
    { x: 180, y: -180 },
    { x: -200, y: 0 },
    { x: 200, y: 0 },
    { x: -180, y: 180 },
    { x: 180, y: 180 },
    { x: 0, y: -200 },
    { x: 0, y: 200 }
  ];

  positions.forEach((pos, i) => {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.textContent = '✦';
    sparkle.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    sparkle.style.animationDelay = `${0.3 + i * 0.1}s`;
    sparklesContainer.appendChild(sparkle);
  });

  // Remove sparkles after animation
  setTimeout(() => {
    sparklesContainer.innerHTML = '';
  }, 2000);
}

// === Main Render Function ===
function renderCard() {
  // Clear canvas
  ctx.clearRect(0, 0, 1080, 1080);

  // Layer 1: Template image as background FIRST
  if (templateImage && templateImage.complete && templateImage.naturalWidth > 0) {
    ctx.drawImage(templateImage, 0, 0, 1080, 1080);
  }

  // Layer 2: User photo ON TOP, clipped to frame coordinates
  if (userPhoto) {
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(FRAME.x, FRAME.y, FRAME.width, FRAME.height, FRAME.radius);
    ctx.clip();

    // Calculate cover dimensions to fill the frame area
    const imgAspect = userPhoto.width / userPhoto.height;
    const frameAspect = FRAME.width / FRAME.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgAspect > frameAspect) {
      // Image is wider - fit height, crop width
      drawHeight = FRAME.height;
      drawWidth = FRAME.height * imgAspect;
      offsetX = FRAME.x - (drawWidth - FRAME.width) / 2;
      offsetY = FRAME.y;
    } else {
      // Image is taller - fit width, crop height
      drawWidth = FRAME.width;
      drawHeight = FRAME.width / imgAspect;
      offsetX = FRAME.x;
      offsetY = FRAME.y - (drawHeight - FRAME.height) / 2;
    }

    ctx.drawImage(userPhoto, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
  }

  // Layer 3: White border around photo area to blend with template frame
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.roundRect(FRAME.x, FRAME.y, FRAME.width, FRAME.height, FRAME.radius);
  ctx.stroke();

  // Layer 4: User's name text
  drawFullName();

  // Layer 5: Position/Role text
  drawPosition();
}

// === Draw Full Name ===
function drawFullName() {
  const fullName = fullNameInput.value.trim() || 'Your Name';
  
  ctx.save();
  ctx.fillStyle = '#1a2f6e';
  ctx.font = 'bold 48px Tajawal, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(fullName, 540, 820);
  ctx.restore();
}

// === Draw Position/Role ===
function drawPosition() {
  const position = positionInput.value.trim() || 'MSC-NMU Member';
  
  ctx.save();
  ctx.fillStyle = 'rgba(26, 47, 110, 0.8)';
  ctx.font = '400 36px Tajawal, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(position, 540, 865);
  ctx.restore();
}

// === Download Card ===
function downloadCard() {
  try {
    const dataURL = canvas.toDataURL('image/png', 1.0);
    const userName = fullNameInput.value.trim() || 'EidCard';
    const cleanName = userName.replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, '-');
    const filename = `MSC-NMU-Eid-${cleanName}.png`;

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification('Card downloaded successfully!', 'success');
  } catch (error) {
    console.error('Download error:', error);
    showNotification('Failed to download. Please try again.', 'error');
  }
}

// === Share Card ===
async function shareCard() {
  try {
    canvas.toBlob(async (blob) => {
      if (!blob) {
        showNotification('Failed to create image for sharing.', 'error');
        return;
      }

      // Check if Web Share API is supported
      if (navigator.share && navigator.canShare) {
        const file = new File([blob], 'eid-card.png', { type: 'image/png' });
        const shareData = {
          title: 'Eid Mubarak Card - MSC-NMU',
          text: 'Eid Mubarak! Check out my card from Microsoft Student Clubs',
          files: [file]
        };

        if (navigator.canShare(shareData)) {
          await navigator.share(shareData);
          showNotification('Shared successfully!', 'success');
        } else {
          fallbackShare(blob);
        }
      } else {
        fallbackShare(blob);
      }
    }, 'image/png', 1.0);
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('Share error:', error);
      showNotification('Sharing failed. Try downloading instead.', 'error');
    }
  }
}

// === Fallback Share ===
async function fallbackShare(blob) {
  try {
    const item = new ClipboardItem({ 'image/png': blob });
    await navigator.clipboard.write([item]);
    showNotification('Image copied to clipboard!', 'success');
  } catch (err) {
    // If clipboard fails, download instead
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'eid-card.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showNotification('Card downloaded! You can now share it.', 'success');
  }
}

// === Show Notification ===
function showNotification(message, type = 'success') {
  // Remove existing notifications
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  
  const bgColor = type === 'success' ? 'rgba(0, 120, 212, 0.95)' : 'rgba(211, 52, 56, 0.95)';
  
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${bgColor};
    color: #ffffff;
    padding: 14px 28px;
    border-radius: 12px;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: 14px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
    z-index: 2000;
    animation: notificationSlide 0.3s ease-out;
  `;

  document.body.appendChild(notification);

  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translate(-50%, -20px)';
    notification.style.transition = 'all 0.2s ease-out';
    setTimeout(() => notification.remove(), 200);
  }, 3000);
}
