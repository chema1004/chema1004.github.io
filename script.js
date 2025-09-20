// Toggle para modo oscuro/claro
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Verificar preferencia del sistema
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    body.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
    } else {
        body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    }
});

// Smooth scroll para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Efecto de escritura para el título
const titleText = "Luis Francisco Rosas Vega";
let titleElement = document.querySelector('.hero h1');
let charIndex = 0;

function typeWriter() {
    if (charIndex < titleText.length) {
        titleElement.innerHTML = titleText.substring(0, charIndex + 1) + '<span class="highlight"></span>';
        charIndex++;
        setTimeout(typeWriter, 100);
    }
}

// Iniciar efecto después de cargar la página
window.addEventListener('load', () => {
    titleElement.innerHTML = '';
    typeWriter();
});

// Manejo del formulario de Formspree
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Mostrar mensaje de carga
        formStatus.style.display = 'block';
        formStatus.style.backgroundColor = '#d1ecf1';
        formStatus.style.color = '#0c5460';
        formStatus.textContent = 'Enviando mensaje...';
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Mostrar mensaje de éxito
                formStatus.style.backgroundColor = '#d4edda';
                formStatus.style.color = '#155724';
                formStatus.textContent = '¡Mensaje enviado con éxito! Te contactaré pronto.';
                
                // Resetear formulario
                contactForm.reset();
                
                // Ocultar mensaje después de 5 segundos
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            } else {
                throw new Error('Error en el envío');
            }
        } catch (error) {
            // Mostrar mensaje de error
            formStatus.style.backgroundColor = '#f8d7da';
            formStatus.style.color = '#721c24';
            formStatus.textContent = 'Oops! Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente.';
        }
    });
}