// script.js
// Lightbox functionality for gallery images
document.addEventListener('DOMContentLoaded', () => {
    const galleryCards = document.querySelectorAll('.gallery-card');
    const modal = document.getElementById('lightboxModal');
    const lightboxContent = document.getElementById('lightboxContent');
    const closeBtn = document.querySelector('.close-lightbox');

    function openLightbox(imgElement) {
        lightboxContent.innerHTML = '';
        const clonedImg = imgElement.cloneNode(true);
        clonedImg.style.maxWidth = '100%';
        clonedImg.style.maxHeight = '70vh';
        clonedImg.style.borderRadius = '12px';
        lightboxContent.appendChild(clonedImg);
        modal.classList.add('active');
    }

    galleryCards.forEach(card => {
        card.addEventListener('click', () => {
            const img = card.querySelector('.gallery-img img');
            if (img && img.src && !img.src.includes('data:image/svg')) {
                openLightbox(img);
            } else if (img) {
                // fallback if image is broken or missing
                const placeholder = document.createElement('div');
                placeholder.style.color = '#64FFDA';
                placeholder.style.padding = '20px';
                placeholder.style.textAlign = 'center';
                placeholder.innerText = '⚠️ Preview not available. Please ensure the image file exists in the same folder.';
                lightboxContent.innerHTML = '';
                lightboxContent.appendChild(placeholder);
                modal.classList.add('active');
            }
        });
    });

    // Close lightbox
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    // Smooth scroll for all internal anchor links
    const allLinks = document.querySelectorAll('a[href^="#"]');
    allLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});
