document.addEventListener('DOMContentLoaded', () => {
    
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        document.querySelectorAll('#mobile-menu a').forEach(anchor => {
            anchor.addEventListener('click', function () {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    const typeTextSpan = document.getElementById('type-text');
    
    if (typeTextSpan) {
        const textArray = ["Développeur Web", "Développeur PHP", "Disigner UI/UX", "Intégrateur Web"];
        let textArrayIndex = 0;
        let charIndex = 0;
        
        const typeSpeed = 120;
        const eraseSpeed = 70;
        const newTextDelay = 2000;

        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                typeTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typeSpeed);
            } else {
                setTimeout(erase, newTextDelay);
            }
        }

        function erase() {
            if (charIndex > 0) {
                typeTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, eraseSpeed);
            } else {
                textArrayIndex++;
                if(textArrayIndex >= textArray.length) textArrayIndex = 0;
                setTimeout(type, typeSpeed + 500);
            }
        }
        setTimeout(type, newTextDelay / 2);
    }

    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success');

    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            
            submitBtn.innerText = "Envoi en cours...";
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.7";

            fetch('send_mail.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.ok ? response.json() : Promise.reject('Erreur serveur'))
            .then(data => {
                contactForm.reset(); 
                successMessage.classList.remove('hidden');
                successMessage.innerText = "🎉 " + (data.message || "Message envoyé avec succès !");
                successMessage.className = "mt-8 text-green-400 font-medium text-lg";
                setTimeout(() => successMessage.classList.add('hidden'), 5000);
            })
            .catch(error => {
                console.error('Erreur:', error);
                successMessage.classList.remove('hidden');
                successMessage.innerText = "❌ Une erreur est survenue.";
                successMessage.className = "mt-8 text-red-400 font-medium text-lg";
            })
            .finally(() => {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = "1";
            });
        });
    }
});