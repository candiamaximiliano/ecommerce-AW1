function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  
  footer.innerHTML = `
    <div class="footer-container">
      <div class="footer-section">
        <h3>Sobre el Desarrollador</h3>
        <p>Este proyecto fue desarrollado como trabajo práctico para la materia de Aplicaciones Web 1, demostrando habilidades en desarrollo frontend con HTML, CSS y JavaScript vanilla.</p>
        <p>Desarrollado con pasión por la tecnología y el aprendizaje continuo.</p>
      </div>
      
      <div class="footer-section">
        <h3>Propósito Académico</h3>
        <p><strong>Trabajo Práctico:</strong> Desarrollo de E-commerce</p>
        <p><strong>Materia:</strong> Aplicaciones Web 1</p>
        <p><strong>Objetivo:</strong> Implementar una tienda online funcional utilizando tecnologías frontend modernas y mejores prácticas de desarrollo.</p>
      </div>
      
      <div class="footer-section">
        <h3>Conecta Conmigo</h3>
        <div class="social-links">
                     <a href="https://linkedin.com/in/maximilianocandia" target="_blank" class="social-link" aria-label="LinkedIn">
             <svg viewBox="0 0 24 24">
               <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
             </svg>
             LinkedIn
           </a>
           
           <a href="https://github.com/candiamaximiliano" target="_blank" class="social-link" aria-label="GitHub">
             <svg viewBox="0 0 24 24">
               <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
             </svg>
             GitHub
           </a>
           
           <a href="mailto:candiamaximiliano.dev@gmail.com" class="social-link" aria-label="Contacto">
             <svg viewBox="0 0 24 24">
               <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
             </svg>
             Contacto
           </a>
           
           <a href="https://candiamaximiliano.dev" class="social-link" aria-label="Mis Proyectos">
             <svg viewBox="0 0 24 24">
               <path d="M20 6h-2.18l.84-3.14c.11-.41-.15-.86-.59-.86h-3.25c-.37 0-.69.25-.78.61L13.54 6H10.46l-.5-3.39c-.09-.36-.41-.61-.78-.61H5.93c-.44 0-.7.45-.59.86L6.18 6H4c-.55 0-1 .45-1 1v11c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-.55-.45-1-1-1zM8.5 9c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S7 11.33 7 10.5 7.67 9 8.5 9zM12 17.5c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z"/>
             </svg>
             Portafolio
           </a>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; 2025 <a href="#" class="footer-logo">AquaSwim</a> - Proyecto académico desarrollado para fines educativos</p>
    </div>
  `;
  
  return footer;
}

function initFooter() {
  const existingFooter = document.querySelector('.site-footer');
  if (existingFooter) {
    existingFooter.remove();
  }
  
  const footer = createFooter();
  document.body.appendChild(footer);
}

document.addEventListener('DOMContentLoaded', initFooter);

window.initFooter = initFooter; 