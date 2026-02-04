// Advanced Geometric Canvas Background with Particles & Patterns
class GeometricBackground {
  constructor() {
    this.canvas = document.getElementById('backgroundCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.geometricShapes = [];
    this.patterns = [];
    this.mouse = { x: 0, y: 0 };
    this.isDarkMode = document.documentElement.classList.contains('dark');
    this.animationId = null;
    this.frameCount = 0;
    
    // Navy color scheme configuration
    this.config = {
      particleCount: 80,
      shapeCount: 12,
      patternDensity: 5,
      navyPrimary: '#1a2f5a',
      navySecondary: '#2a4a8a',
      navyAccent: '#3b6bb3',
      lightAccent: '#60a5fa',
      particleSize: 1.5,
    };

    this.init();
  }

  init() {
    this.resizeCanvas();
    this.createParticles();
    this.createGeometricShapes();
    this.createPatterns();
    this.setupEventListeners();
    this.animate();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.config.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * this.config.particleSize + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        targetOpacity: Math.random() * 0.6 + 0.2,
        color: this.getRandomColor(),
        life: Math.random() * 100 + 50,
        maxLife: Math.random() * 100 + 50,
        type: Math.random() > 0.5 ? 'circle' : 'square',
      });
    }
  }

  createGeometricShapes() {
    this.geometricShapes = [];
    const shapeTypes = ['triangle', 'rectangle', 'circle', 'diamond'];
    
    for (let i = 0; i < this.config.shapeCount; i++) {
      this.geometricShapes.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        size: Math.random() * 40 + 20,
        opacity: Math.random() * 0.3 + 0.1,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        color: this.getShapeColor(),
        scale: 1,
        targetScale: 1,
      });
    }
  }

  createPatterns() {
    this.patterns = [];
    // Grid pattern
    const spacing = 80;
    for (let x = 0; x < this.canvas.width; x += spacing) {
      for (let y = 0; y < this.canvas.height; y += spacing) {
        if (Math.random() > 0.6) {
          this.patterns.push({
            x,
            y,
            type: Math.random() > 0.5 ? 'dot' : 'line',
            opacity: Math.random() * 0.15 + 0.05,
            size: Math.random() * 3 + 2,
          });
        }
      }
    }
  }

  getRandomColor() {
    const colors = [
      '#60a5fa', // light blue
      '#93c5fd', // lighter blue
      '#3b82f6', // blue
      '#0ea5e9', // sky blue
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  getShapeColor() {
    const colors = [
      'rgba(96, 165, 250, 0.3)',
      'rgba(59, 130, 246, 0.25)',
      'rgba(14, 165, 233, 0.2)',
      'rgba(147, 197, 253, 0.15)',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  setupEventListeners() {
    window.addEventListener('resize', () => {
      this.resizeCanvas();
      this.createPatterns();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          this.isDarkMode = document.documentElement.classList.contains('dark');
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
  }

  updateParticles() {
    this.particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;

      particle.life -= 1;
      if (particle.life <= 0) {
        particle.life = particle.maxLife;
        particle.x = Math.random() * this.canvas.width;
        particle.y = Math.random() * this.canvas.height;
        particle.color = this.getRandomColor();
      }

      // Mouse interaction
      const dx = particle.x - this.mouse.x;
      const dy = particle.y - this.mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        const force = 2 * (1 - distance / 150);
        particle.vx += (dx / distance) * force * 0.05;
        particle.vy += (dy / distance) * force * 0.05;
      }

      particle.vx *= 0.98;
      particle.vy *= 0.98;

      const speed = Math.sqrt(particle.vx ** 2 + particle.vy ** 2);
      if (speed > 2) {
        particle.vx = (particle.vx / speed) * 2;
        particle.vy = (particle.vy / speed) * 2;
      }

      const lifeRatio = particle.life / particle.maxLife;
      particle.opacity = particle.targetOpacity * Math.sin(lifeRatio * Math.PI);
    });
  }

  updateGeometricShapes() {
    this.geometricShapes.forEach((shape) => {
      shape.x += shape.vx;
      shape.y += shape.vy;
      shape.rotation += shape.rotationSpeed;

      if (shape.x < -shape.size) shape.x = this.canvas.width + shape.size;
      if (shape.x > this.canvas.width + shape.size) shape.x = -shape.size;
      if (shape.y < -shape.size) shape.y = this.canvas.height + shape.size;
      if (shape.y > this.canvas.height + shape.size) shape.y = -shape.size;

      const dx = shape.x - this.mouse.x;
      const dy = shape.y - this.mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 200) {
        const force = 1.5 * (1 - distance / 200);
        shape.vx += (dx / distance) * force * 0.02;
        shape.vy += (dy / distance) * force * 0.02;
        shape.targetScale = 1.3;
      } else {
        shape.targetScale = 1;
      }

      shape.scale += (shape.targetScale - shape.scale) * 0.1;
      shape.vx *= 0.99;
      shape.vy *= 0.99;

      const speed = Math.sqrt(shape.vx ** 2 + shape.vy ** 2);
      if (speed > 1) {
        shape.vx = (shape.vx / speed) * 1;
        shape.vy = (shape.vy / speed) * 1;
      }
    });
  }

  drawPatterns() {
    this.patterns.forEach((pattern) => {
      const offset = Math.sin(this.frameCount * 0.01) * 5;
      this.ctx.globalAlpha = pattern.opacity;

      if (pattern.type === 'dot') {
        this.ctx.fillStyle = '#60a5fa';
        this.ctx.beginPath();
        this.ctx.arc(pattern.x + offset, pattern.y, pattern.size, 0, Math.PI * 2);
        this.ctx.fill();
      } else if (pattern.type === 'line') {
        this.ctx.strokeStyle = '#3b82f6';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(pattern.x, pattern.y - 10);
        this.ctx.lineTo(pattern.x, pattern.y + 10);
        this.ctx.stroke();
      }
    });

    this.ctx.globalAlpha = 1;
  }

  drawParticles() {
    this.particles.forEach((particle) => {
      this.ctx.globalAlpha = particle.opacity;

      if (particle.type === 'circle') {
        this.ctx.fillStyle = particle.color;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        this.ctx.fillStyle = particle.color;
        this.ctx.fillRect(particle.x - particle.size, particle.y - particle.size, particle.size * 2, particle.size * 2);
      }
    });

    this.ctx.globalAlpha = 1;
  }

  drawGeometricShapes() {
    this.geometricShapes.forEach((shape) => {
      this.ctx.save();
      this.ctx.translate(shape.x, shape.y);
      this.ctx.rotate(shape.rotation);
      this.ctx.scale(shape.scale, shape.scale);
      this.ctx.globalAlpha = shape.opacity;
      this.ctx.fillStyle = shape.color;

      switch (shape.type) {
        case 'triangle':
          this.ctx.beginPath();
          this.ctx.moveTo(0, -shape.size / 2);
          this.ctx.lineTo(shape.size / 2, shape.size / 2);
          this.ctx.lineTo(-shape.size / 2, shape.size / 2);
          this.ctx.closePath();
          this.ctx.fill();
          break;

        case 'rectangle':
          this.ctx.fillRect(-shape.size / 2, -shape.size / 2.5, shape.size, shape.size / 1.25);
          break;

        case 'circle':
          this.ctx.beginPath();
          this.ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
          this.ctx.fill();
          break;

        case 'diamond':
          this.ctx.beginPath();
          this.ctx.moveTo(0, -shape.size / 2);
          this.ctx.lineTo(shape.size / 2, 0);
          this.ctx.lineTo(0, shape.size / 2);
          this.ctx.lineTo(-shape.size / 2, 0);
          this.ctx.closePath();
          this.ctx.fill();
          break;
      }

      this.ctx.strokeStyle = 'rgba(96, 165, 250, 0.4)';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();

      this.ctx.restore();
    });

    this.ctx.globalAlpha = 1;
  }

  drawGridOverlay() {
    const gridSize = 120;
    this.ctx.strokeStyle = 'rgba(96, 165, 250, 0.08)';
    this.ctx.lineWidth = 1;

    // Vertical lines
    for (let x = 0; x < this.canvas.width; x += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y < this.canvas.height; y += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }
  }

  drawAnimatedGradientOrbs() {
    const time = this.frameCount * 0.003;

    // Orb 1 - Navy to Blue
    const orb1X = this.canvas.width * 0.15 + Math.sin(time) * 80;
    const orb1Y = this.canvas.height * 0.2 + Math.cos(time * 0.7) * 80;
    const grad1 = this.ctx.createRadialGradient(orb1X, orb1Y, 0, orb1X, orb1Y, 200);
    grad1.addColorStop(0, 'rgba(96, 165, 250, 0.15)');
    grad1.addColorStop(1, 'rgba(59, 130, 246, 0)');
    this.ctx.fillStyle = grad1;
    this.ctx.fillRect(orb1X - 200, orb1Y - 200, 400, 400);

    // Orb 2 - Sky Blue
    const orb2X = this.canvas.width * 0.85 + Math.sin(time * 0.8) * 80;
    const orb2Y = this.canvas.height * 0.7 + Math.cos(time * 0.5) * 80;
    const grad2 = this.ctx.createRadialGradient(orb2X, orb2Y, 0, orb2X, orb2Y, 200);
    grad2.addColorStop(0, 'rgba(14, 165, 233, 0.12)');
    grad2.addColorStop(1, 'rgba(14, 165, 233, 0)');
    this.ctx.fillStyle = grad2;
    this.ctx.fillRect(orb2X - 200, orb2Y - 200, 400, 400);

    // Orb 3 - Light Blue
    const orb3X = this.canvas.width * 0.5 + Math.sin(time * 0.6) * 80;
    const orb3Y = this.canvas.height * 0.4 + Math.cos(time * 0.9) * 80;
    const grad3 = this.ctx.createRadialGradient(orb3X, orb3Y, 0, orb3X, orb3Y, 180);
    grad3.addColorStop(0, 'rgba(147, 197, 253, 0.1)');
    grad3.addColorStop(1, 'rgba(147, 197, 253, 0)');
    this.ctx.fillStyle = grad3;
    this.ctx.fillRect(orb3X - 180, orb3Y - 180, 360, 360);
  }

  animate() {
    this.frameCount++;

    // Clear with navy gradient background
    const bgGradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
    bgGradient.addColorStop(0, '#0f172a');
    bgGradient.addColorStop(0.5, '#1e293b');
    bgGradient.addColorStop(1, '#0f172a');
    this.ctx.fillStyle = bgGradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw animated layers
    this.drawAnimatedGradientOrbs();
    this.drawGridOverlay();
    this.drawPatterns();
    this.updateGeometricShapes();
    this.drawGeometricShapes();
    this.updateParticles();
    this.drawParticles();

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.geometricBackground = new GeometricBackground();
  });
} else {
  window.geometricBackground = new GeometricBackground();
}
