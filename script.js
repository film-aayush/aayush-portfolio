/**
 * Aayush Pillai — Apple Liquid Glass & VisionOS Portfolio
 * Interactive Script: 3D Tilt Physics, Specular Highlight Tracking,
 * Category Filtering, VisionOS Glass Modal, and Dynamic Toast System.
 */

// Initialize Lucide Icons & Components
function initApp() {
    if (window.lucide) {
        window.lucide.createIcons();
    }
    initDynamicIsland();
    initTiltAndSpecular();
    initMagneticButtons();
    initFilterTabs();
    initModalSystem();
    initClipboardToast();
    initScrollSpy();
    initScrollReveals();
    initSlidingDoors();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

/* ================= 1. PROJECT DATA STORE ================= */
const projectsData = {
    'modal-thunder': {
        title: 'Taste the Thunder',
        role: 'Assistant to Gimbal Operator',
        category: 'Commercial & Music Feature',
        meta: 'Featuring Hanumankind • Vishal Dadlani • Sushin Shyam',
        youtubeId: 'gHe6KF7DgDY',
        externalUrl: 'https://youtu.be/gHe6KF7DgDY',
        description: 'A relentless, high-velocity music and commercial feature featuring powerhouse artists Hanumankind, Vishal Dadlani, and Sushin Shyam. As assistant to the gimbal operator, collaborated closely on complex camera stabilization maneuvers, rapid tracking shots, and dynamic subject movements to deliver an adrenaline-infused cinema experience.'
    },
    'modal-kei': {
        title: 'Caring Guptas',
        role: '3rd Assistant Director',
        category: 'Brand Commercial Campaign',
        meta: 'Client: <strong>KEI Cables</strong> • Production: <strong>Fork Media Group</strong>',
        videos: [
            { title: 'Meet Caring Guptas', thumbnail: 'images/caring-guptas.jpg', url: 'https://www.instagram.com/reel/DVl3YKjj8rB/' },
            { title: "Women's Day", thumbnail: 'images/caring-guptas.jpg', url: 'https://www.instagram.com/reel/DVnT6a1D0DA/' },
            { title: 'Nani Ki Dhal', thumbnail: 'images/caring-guptas.jpg', url: 'https://www.instagram.com/reel/DWVsQvrSUwC/' },
            { title: 'Ghar Ka Khayal', thumbnail: 'images/caring-guptas.jpg', url: 'https://www.instagram.com/reel/DXatFnODDtq/' },
            { title: 'Hisse Ke Kisse', thumbnail: 'images/caring-guptas.jpg', url: 'https://www.instagram.com/reel/DYZj5EwjDp7/' },
            { title: 'Har Tension Sahe', thumbnail: 'images/caring-guptas.jpg', url: 'https://www.instagram.com/reel/DZU1NTjE72o/' },
            { title: 'Ghar Vapsi', thumbnail: 'images/caring-guptas.jpg', url: 'https://www.instagram.com/reel/DdLPTuVEXtX/' },
            { title: 'Sonu Sey Seekhein', thumbnail: 'images/caring-guptas.jpg', url: 'https://www.instagram.com/reel/DZMABGvDPIQ/' }
        ],
        posterArt: 'art-kei',
        aspectRatio: '16/9',
        description: 'A widespread commercial campaign for KEI Wires & Cables produced by Fork Media Group. Managed 3rd AD floor duties including coordinating talent, on-set schedules.'
    },
    'modal-wdywfm': {
        title: 'What Do You Want From Me',
        role: "Director's Assistant",
        category: 'Short Film',
        meta: 'Director: <strong>Neelambari Bhattacharya</strong>',
        isComingSoon: true,
        posterArt: 'art-short',
        description: 'An intimate, psychological drama exploring unresolved interpersonal tension. Assisted the director throughout pre-production, scene breakdowns and supporting in actor rehearsals. Acted as the main bridge between the director, cast, and crew to ensure the creative vision was clearly communicated and smoothly executed across the entire team.'
    },
    'modal-ragdoll': {
        title: 'Studio Ragdoll',
        role: 'Cinematographer & Editor',
        category: 'Creative Production & Film',
        meta: 'Fashion Brand',
        aspectRatio: '9/16',
        videos: [
            { title: 'Sitareh Set', thumbnail: 'images/ragdoll-reel-1.jpg', url: 'https://www.instagram.com/reel/DdMGz8QTZ9n/' },
            { title: 'Persephone’s Set', thumbnail: 'images/ragdoll-reel-2.jpg', url: 'https://www.instagram.com/reel/DdBpTfptHmK/' },
            { title: '1 of 1 Persephone', thumbnail: 'images/ragdoll-reel-3.png', url: 'https://www.instagram.com/reel/DcyY1QvONLO/' },
            { title: 'Ragdoll x CHYNDY X ANP', thumbnail: 'images/ragdoll-reel-4.jpg', url: 'https://www.instagram.com/reel/DcOMU58tlWV/' },
            { title: 'Bombay Baddies pt .1', thumbnail: 'images/ragdoll-reel-5.jpg?v=2', url: 'https://www.instagram.com/reel/DV8jQZfiNZy/' },
            { title: 'Bombay Baddies pt.2', thumbnail: 'images/ragdoll-reel-6.jpg', url: 'https://www.instagram.com/reel/DYrgVRqOaZs/' },
            { title: 'Maia Dress in Black', thumbnail: 'images/ragdoll-reel-7.jpg', url: 'https://www.instagram.com/reel/DYenvy4NMR9/' }
        ],
        posterArt: 'art-ragdoll',
        description: 'An Indian fashion and apparel brand. Size-inclusive Handcrafted in Mumbai, India. Currently working as the Cinematographer and Video Editor.'
    },
    'modal-ravimi': {
        title: 'Ravi Mi',
        role: 'Sound & Edit',
        category: 'Graduation Film • Marathi Cinema',
        meta: 'Audio-Visual Communication Graduation Film',
        youtubeId: 'Rtthsi3wTgg',
        externalUrl: 'https://www.youtube.com/watch?v=Rtthsi3wTgg',
        description: 'Driven by an uncompromising dedication to his craft, a young man subjects himself to public starvation, transforming his suffering into a haunting work of art that drives him deeper into solitude as an indifferent world watches on.'
    },
    'modal-aspora': {
        title: 'Aspora — Embracing Indian Culture',
        role: 'Assistant to Video Editor',
        category: 'Cultural Documentary & Brand Series',
        meta: 'Production: <strong>Revolio Media</strong>',
        aspectRatio: '9/16',
        videos: [
            { title: 'Reel 01', thumbnail: 'images/aspora-reel-1.jpg', url: 'https://www.instagram.com/reel/DMiW6iuSord/' },
            { title: 'Reel 02', thumbnail: 'images/aspora-reel-2.jpg', url: 'https://www.instagram.com/reel/DMCXJDYSvhI/' },
            { title: 'Reel 03', thumbnail: 'images/aspora-reel-3.jpg', url: 'https://www.instagram.com/reel/DL5PsruyGPO/' },
            { title: 'Reel 04', thumbnail: 'images/aspora-reel-4.jpg', url: 'https://www.instagram.com/reel/DMiW6iuSord/' },
            { title: 'Reel 05', thumbnail: 'images/aspora-reel-5.jpg', url: 'https://www.instagram.com/reel/DLz8W5ayqjn/' }
        ],
        posterArt: 'art-aspora',
        description: 'A vibrant documentary-style digital series produced by Revolio Media. Acted as assistant to video editor, assembling raw takes, cataloging multitrack interviews.'
    },
    'modal-malathi': {
        title: 'Malathi',
        role: 'Post Production Assistant',
        category: 'Documentary Film',
        meta: 'Director: <strong>Neelambari Bhattacharya</strong>',
        isComingSoon: true,
        statusText: 'In Post — Coming Soon',
        posterArt: 'art-malathi',
        description: 'Assisted director Neelambari Bhattacharya on a feature documentary by managing the post-production pipeline. Handled archival footage logging, developed preliminary animation concepts.'
    },
    'modal-thought': {
        title: 'Thought Process Films',
        role: 'Junior Creative Director Intern',
        category: 'Studio Creative Development',
        meta: 'Studio Campaigns & Visual Treatment',
        reelUrl: 'https://www.instagram.com/reel/DJlQgMZMywc/?igsh=MThlcHR6djZqYXI4Yg==',
        posterArt: 'art-thought',
        description: 'A creative development internship at Thought Process Films focusing on concept ideation, commercial pitch decks, moodboard curation, and on-set creative shadowing for brand commercials.'
    },
    'modal-tides': {
        title: 'From Script to Screen: The Tides Between Us',
        role: 'Assistant to Video Editor',
        category: 'Behind The Scenes Documentary',
        meta: 'Production: <strong>Revolio Media</strong>',
        aspectRatio: '9/16',
        videos: [
            { title: 'Reel 01', thumbnail: 'images/tides-reel-1.jpg', url: 'https://www.instagram.com/reel/DL69cGKzq3l/' }
        ],
        posterArt: 'art-tides',
        description: ''
    }
};

/* ================= 2. VISIONOS 3D TILT & SPECULAR HIGHLIGHT ================= */
function initTiltAndSpecular() {
    // Only enable 3D mouse tilt tracking on devices with a fine pointer (mouse/trackpad).
    // Bypassing on touch devices (iPhones, Androids, iPads) guarantees buttery smooth native 60/120Hz scrolling.
    if (window.matchMedia('(hover: none) or (pointer: coarse)').matches) {
        return;
    }

    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach(card => {
        let tiltRaf = null;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (tiltRaf) cancelAnimationFrame(tiltRaf);
            tiltRaf = requestAnimationFrame(() => {
                // Set coordinates for specular sheen reflection
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);

                // Calculate 3D tilt angles (tactile & fluid)
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;

                card.style.transition = 'box-shadow 0.25s ease, border-color 0.25s ease';
                card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
            });
        });

        card.addEventListener('mouseleave', () => {
            if (tiltRaf) cancelAnimationFrame(tiltRaf);
            card.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease';
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            setTimeout(() => {
                card.style.transition = '';
            }, 400);
        });
    });
}

/* ================= 2B. MAGNETIC SPRING BUTTON PHYSICS ================= */
function initMagneticButtons() {
    if (window.matchMedia('(hover: none) or (pointer: coarse)').matches) {
        return;
    }

    const magneticTargets = document.querySelectorAll('.btn-apple-primary, .btn-apple-glass, .btn-pilea-pill, .dock-cta, .dock-cta-pill, .play-pulse-btn, .card-ext-btn, .island-skip-badge');

    magneticTargets.forEach(btn => {
        let magRaf = null;

        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);
            const isCircle = btn.classList.contains('play-pulse-btn') || btn.classList.contains('card-ext-btn');
            const strength = isCircle ? 0.28 : 0.18;

            if (magRaf) cancelAnimationFrame(magRaf);
            magRaf = requestAnimationFrame(() => {
                btn.style.transition = 'transform 0.08s ease-out';
                btn.style.transform = `translate(${x * strength}px, ${y * strength}px) scale(1.03)`;
            });
        });

        btn.addEventListener('mouseleave', () => {
            if (magRaf) cancelAnimationFrame(magRaf);
            btn.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
            btn.style.transform = 'translate(0px, 0px) scale(1)';
            setTimeout(() => {
                btn.style.transition = '';
            }, 400);
        });
    });
}

/* ================= 3. FILTER TABS SYSTEM ================= */
function initFilterTabs() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category') || '';
                if (filter === 'all' || categories.includes(filter)) {
                    card.classList.remove('is-hidden');
                    card.classList.add('is-revealed');
                    card.style.filter = 'blur(0px)';
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.96)';
                    setTimeout(() => {
                        card.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 40);
                } else {
                    card.classList.add('is-hidden');
                }
            });
        });
    });
}

/* ================= 4. VISIONOS GLASS LIGHTBOX MODAL ================= */
function initModalSystem() {
    const backdrop = document.getElementById('modal-backdrop');
    const modalContainer = document.getElementById('modal-container');
    const modalCard = document.getElementById('modal-card');
    const modalBody = document.getElementById('modal-body-content');
    const closeBtn = document.getElementById('modal-close-btn');
    let activeGalleryKeyHandler = null;

    // Attach click listeners to all modal triggers
    document.querySelectorAll('[data-modal]').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalKey = trigger.getAttribute('data-modal');
            openModal(modalKey);
        });
    });

    // Hero preview buttons
    const heroBtn = document.getElementById('hero-watch-btn');
    const heroPreviewPlay = document.getElementById('hero-preview-play');
    [heroBtn, heroPreviewPlay].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => openModal('modal-thunder'));
        }
    });

    function openModal(key) {
        const data = projectsData[key];
        if (!data) return;

        if (modalCard) {
            modalCard.scrollTop = 0;
            modalCard.scrollLeft = 0;
        }

        let mediaHtml = '';
        if (data.youtubeId) {
            mediaHtml = `
                <div class="modal-hero-frame">
                    <iframe 
                        src="https://www.youtube.com/embed/${data.youtubeId}?autoplay=1&rel=0&modestbranding=1" 
                        title="${data.title}" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowfullscreen>
                    </iframe>
                </div>
            `;
        } else {
            mediaHtml = `
                <div class="modal-poster-cover ${data.posterArt || 'art-kei'}">
                    <div class="modal-poster-overlay"></div>
                    <div style="position: relative; z-index: 2;">
                        <span class="pill-category" style="margin-bottom: 8px; display: inline-block;">${data.category}</span>
                    </div>
                </div>
            `;
        }

        let actionHtml = '';
        let galleryHtml = '';

        if (data.videos && data.videos.length > 0) {
            actionHtml = `
                <button class="btn-apple-primary btn-toggle-gallery">
                    <i data-lucide="play" class="btn-icon"></i>
                    <span class="btn-text">Click to watch reels</span>
                </button>
            `;
            
            const is16x9 = (data.aspectRatio === '16/9' || (!data.aspectRatio && data.category && data.category.toLowerCase().includes('commercial')));
            const chipLabel = is16x9 ? 'Watch Ad' : 'Watch Reel';
            const tagLabel = is16x9 ? 'Commercial Film' : 'Instagram Reel';
            const headingLabel = is16x9 ? 'Commercial Campaign Films' : 'Featured Reels';
            const countLabel = is16x9 
                ? `${data.videos.length} ${data.videos.length === 1 ? 'Commercial' : 'Commercials'}` 
                : `${data.videos.length} ${data.videos.length === 1 ? 'Reel' : 'Reels'}`;

            let cardsHtml = data.videos.map((vid, idx) => `
                <a href="${vid.url}" target="_blank" rel="noopener noreferrer" class="reel-card" aria-label="${vid.title} on Instagram">
                    <div class="reel-thumb" style="background-image: url('${vid.thumbnail}');">
                        <div class="reel-thumb-overlay">
                            <span class="reel-play-chip">
                                <span>${chipLabel}</span>
                                <i data-lucide="arrow-up-right"></i>
                            </span>
                        </div>
                    </div>
                    <div class="reel-card-meta">
                        <span class="reel-title">${vid.title}</span>
                        <span class="reel-tag">${tagLabel} <i data-lucide="external-link"></i></span>
                    </div>
                </a>
            `).join('');

            galleryHtml = `
                <div class="reels-gallery-container ${is16x9 ? 'is-16-9-gallery' : ''}" style="display: none; margin-top: 24px;">
                    <div class="reels-gallery-header">
                        <div class="reels-gallery-title-wrap">
                            <h4 class="reels-gallery-heading">${headingLabel}</h4>
                            <p class="reels-gallery-sub">Click any card to open on Instagram • Use arrows to navigate</p>
                        </div>
                        <div class="reels-nav-cluster">
                            <span class="reels-gallery-count-pill">${countLabel}</span>
                            <div class="reels-arrow-btns">
                                <button type="button" class="reels-arrow-btn prev-reel-btn" aria-label="Previous">
                                    <i data-lucide="chevron-left"></i>
                                </button>
                                <button type="button" class="reels-arrow-btn next-reel-btn" aria-label="Next">
                                    <i data-lucide="chevron-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="reels-gallery-track-viewport">
                        <div class="reels-gallery-track ${is16x9 ? 'is-16-9' : 'is-9-16'}" tabindex="0" role="region" aria-label="Reels carousel">
                            ${cardsHtml}
                        </div>
                    </div>
                </div>
            `;
        } else if (data.externalUrl) {
            actionHtml = `
                <a href="${data.externalUrl}" target="_blank" rel="noopener" class="btn-apple-primary">
                    <i data-lucide="play" class="btn-icon"></i>
                    <span>Watch on YouTube</span>
                </a>
            `;
        } else if (data.reelUrl) {
            actionHtml = `
                <a href="${data.reelUrl}" target="_blank" rel="noopener" class="btn-apple-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    <span>Watch Full Reel on Instagram</span>
                </a>
            `;
        } else if (data.isComingSoon) {
            actionHtml = `
                <div class="glass-pill status-pill">
                    <span class="pulse-dot"></span>
                    <span>${data.statusText || 'Festival & Release Coming Soon'}</span>
                </div>
            `;
        }

        modalBody.innerHTML = `
            ${mediaHtml}
            <div class="modal-content-wrap">
                <div class="modal-tag">${data.role}</div>
                <h2 class="modal-title">${data.title}</h2>
                <p class="modal-credits">${data.meta}</p>
                ${data.description ? `<p class="modal-description">${data.description}</p>` : ''}
                <div class="modal-actions">
                    ${actionHtml}
                    <a href="#contact" class="btn-apple-glass" onclick="window.closeModalHandler()">
                        <span>Inquire About Similar Work</span>
                    </a>
                </div>
                ${galleryHtml}
            </div>
        `;

        // Wire up Gallery interactions with VisionOS 3D Spatial Navigation
        if (data.videos && data.videos.length > 0) {
            const toggleBtn = modalBody.querySelector('.btn-toggle-gallery');
            const galleryContainer = modalBody.querySelector('.reels-gallery-container');
            const prevBtn = modalBody.querySelector('.prev-reel-btn');
            const nextBtn = modalBody.querySelector('.next-reel-btn');
            const viewport = modalBody.querySelector('.reels-gallery-track-viewport');
            const track = modalBody.querySelector('.reels-gallery-track');
            const cards = modalBody.querySelectorAll('.reel-card');
            let currentReelIndex = 0;
            let isNavigating = false;

            function goToIndex(index) {
                if (!cards.length || !track || !viewport) return;
                currentReelIndex = Math.max(0, Math.min(index, cards.length - 1));

                cards.forEach((card, i) => {
                    if (i === currentReelIndex) {
                        card.classList.add('is-active');
                    } else {
                        card.classList.remove('is-active');
                    }
                });

                if (prevBtn) prevBtn.disabled = (currentReelIndex === 0);
                if (nextBtn) nextBtn.disabled = (currentReelIndex === cards.length - 1);

                // Precise 2D coordinate calculation immune to browser zoom/subpixel differences
                const viewportWidth = viewport.clientWidth;
                const targetCard = cards[currentReelIndex];
                const cardWidth = targetCard.offsetWidth;
                const trackStart = cards[0].offsetLeft;
                const cardLeft = targetCard.offsetLeft - trackStart;

                // Center the card in viewport, clamped between 0 and maxTranslate
                const maxTranslate = Math.max(0, track.scrollWidth - viewportWidth);
                let targetOffset = cardLeft - (viewportWidth / 2) + (cardWidth / 2);
                targetOffset = Math.max(0, Math.min(targetOffset, maxTranslate));

                track.style.transform = `translateX(-${Math.round(targetOffset)}px)`;
            }

            // State locks for fluid, runaway-free navigation
            let hoverDelayTimer = null;
            let isSlidingLock = false;

            // 1. Pointer Hover Navigation with Firm Delay (re-enabled as requested)
            cards.forEach((card, idx) => {
                card.addEventListener('mouseenter', () => {
                    // Ignore if already on this card or currently executing a slide
                    if (isSlidingLock || idx === currentReelIndex) return;

                    clearTimeout(hoverDelayTimer);
                    // Firm delay while pointer rests on the card
                    hoverDelayTimer = setTimeout(() => {
                        if (!isSlidingLock && idx !== currentReelIndex) {
                            isSlidingLock = true;
                            goToIndex(idx);
                            // Cooldown lock to prevent runaway chain reactions
                            setTimeout(() => {
                                isSlidingLock = false;
                            }, 550);
                        }
                    }, 500);
                });

                card.addEventListener('mouseleave', () => {
                    clearTimeout(hoverDelayTimer);
                });
            });

            // 2. Arrow buttons navigation
            if (prevBtn) {
                prevBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (isNavigating || currentReelIndex <= 0) return;
                    isNavigating = true;
                    isSlidingLock = true;
                    clearTimeout(hoverDelayTimer);
                    goToIndex(currentReelIndex - 1);
                    setTimeout(() => { 
                        isNavigating = false; 
                        isSlidingLock = false;
                    }, 320);
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (isNavigating || currentReelIndex >= cards.length - 1) return;
                    isNavigating = true;
                    isSlidingLock = true;
                    clearTimeout(hoverDelayTimer);
                    goToIndex(currentReelIndex + 1);
                    setTimeout(() => { 
                        isNavigating = false; 
                        isSlidingLock = false;
                    }, 320);
                });
            }

            // 3. Keyboard navigation (Left / Right Arrow)
            if (activeGalleryKeyHandler) {
                document.removeEventListener('keydown', activeGalleryKeyHandler);
            }
            activeGalleryKeyHandler = (e) => {
                if (!galleryContainer || galleryContainer.style.display === 'none') return;
                if (e.key === 'ArrowLeft') {
                    if (currentReelIndex > 0) {
                        e.preventDefault();
                        isSlidingLock = true;
                        clearTimeout(hoverDelayTimer);
                        goToIndex(currentReelIndex - 1);
                        setTimeout(() => { isSlidingLock = false; }, 320);
                    }
                } else if (e.key === 'ArrowRight') {
                    if (currentReelIndex < cards.length - 1) {
                        e.preventDefault();
                        isSlidingLock = true;
                        clearTimeout(hoverDelayTimer);
                        goToIndex(currentReelIndex + 1);
                        setTimeout(() => { isSlidingLock = false; }, 320);
                    }
                }
            };
            document.addEventListener('keydown', activeGalleryKeyHandler);

            // 4. Pointer Wheel Navigation with Firm Delay Cooldown
            let isWheelCooling = false;
            const handlePointerWheel = (e) => {
                if (!galleryContainer || galleryContainer.style.display === 'none') return;

                const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
                if (Math.abs(delta) < 8) return;

                // Stop wheel event from jittering the parent modal when over the carousel
                e.preventDefault();
                e.stopPropagation();

                if (isWheelCooling || isSlidingLock) return;

                clearTimeout(hoverDelayTimer);

                if (delta > 0 && currentReelIndex < cards.length - 1) {
                    isWheelCooling = true;
                    isSlidingLock = true;
                    goToIndex(currentReelIndex + 1);
                    // Firm delay of 700ms between wheel steps as requested
                    setTimeout(() => {
                        isWheelCooling = false;
                        isSlidingLock = false;
                    }, 700);
                } else if (delta < 0 && currentReelIndex > 0) {
                    isWheelCooling = true;
                    isSlidingLock = true;
                    goToIndex(currentReelIndex - 1);
                    setTimeout(() => {
                        isWheelCooling = false;
                        isSlidingLock = false;
                    }, 700);
                }
            };

            viewport.addEventListener('wheel', handlePointerWheel, { passive: false });

            if (toggleBtn && galleryContainer) {
                toggleBtn.addEventListener('click', () => {
                    const isHidden = galleryContainer.style.display === 'none';
                    galleryContainer.style.display = isHidden ? 'block' : 'none';
                    const btnText = toggleBtn.querySelector('.btn-text');
                    if (btnText) {
                        btnText.textContent = isHidden ? 'Hide reels gallery' : 'Click to watch reels';
                    }
                    if (isHidden) {
                        if (window.lucide) window.lucide.createIcons();
                        setTimeout(() => {
                            goToIndex(0);
                        }, 60);
                    }
                });
            }
        }

        backdrop.classList.add('is-open');
        document.body.style.overflow = 'hidden';

        if (modalCard) {
            modalCard.scrollTop = 0;
            requestAnimationFrame(() => {
                if (modalCard) modalCard.scrollTop = 0;
            });
        }

        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    function closeModal() {
        backdrop.classList.remove('is-open');
        document.body.style.overflow = '';
        if (activeGalleryKeyHandler) {
            document.removeEventListener('keydown', activeGalleryKeyHandler);
            activeGalleryKeyHandler = null;
        }
        if (modalCard) {
            modalCard.scrollTop = 0;
        }
        // Clear iframe to stop playback
        setTimeout(() => {
            modalBody.innerHTML = '';
            if (modalCard) modalCard.scrollTop = 0;
        }, 350);
    }

    window.closeModalHandler = closeModal;
    window.openModalHandler = openModal;

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop || e.target === modalContainer) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && backdrop.classList.contains('is-open')) {
            closeModal();
        }
    });
}

/* ================= 5. ONE-CLICK CLIPBOARD & TOAST SYSTEM ================= */
function initClipboardToast() {
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const toast = document.getElementById('apple-toast');
    const toastMsg = document.getElementById('toast-message');

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = 'film.aayush@icloud.com';
            copyToClipboard(email, 'Email copied: film.aayush@icloud.com');
        });
    }

    function copyToClipboard(text, message) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                showToast(message);
            }).catch(() => {
                fallbackCopy(text, message);
            });
        } else {
            fallbackCopy(text, message);
        }
    }

    function fallbackCopy(text, message) {
        const temp = document.createElement('textarea');
        temp.value = text;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        showToast(message);
    }

    function showToast(msg) {
        toastMsg.textContent = msg;
        toast.classList.add('is-visible');
        setTimeout(() => {
            toast.classList.remove('is-visible');
        }, 3200);
    }

    window.showAppleToast = showToast;
}

/* ================= 6. FORM SUBMISSION ================= */
window.handleFormSubmit = function() {
    const name = document.getElementById('form-name').value;
    const scope = document.getElementById('form-project-type').value;

    window.showAppleToast(`Thank you, ${name}! Your inquiry for ${scope} was prepared.`);
    
    setTimeout(() => {
        const mailto = `mailto:film.aayush@icloud.com?subject=Project Inquiry: ${encodeURIComponent(scope)} - ${encodeURIComponent(name)}`;
        window.location.href = mailto;
    }, 1200);
};

/* ================= 7. SCROLL SPY FOR FLOATING DOCK ================= */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id], .hero-stage-container[id]');
    const dockItems = document.querySelectorAll('.dock-item');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 260;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        if (!current || current === 'hero') {
            current = 'works';
        }

        dockItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === current) {
                item.classList.add('active');
            }
        });
    });
}

/* ================= 8. APPLE DYNAMIC ISLAND STARTUP SEQUENCE ================= */
function initDynamicIsland() {
    const screen = document.getElementById('dynamic-island-screen');
    const pill = document.getElementById('island-pill');
    const skipBtn = document.getElementById('island-skip-btn');

    if (!screen || !pill) return;

    let isFinished = false;

    function finishSequence() {
        if (isFinished) return;
        isFinished = true;

        // Smoothly collapse pill and glide up towards top dock
        pill.style.transform = 'translateY(-18px) scale(0.92)';
        pill.style.opacity = '0';
        screen.classList.add('is-dismissed');

        setTimeout(() => {
            if (screen && screen.parentNode) {
                screen.parentNode.removeChild(screen);
            }
        }, 700);
    }

    // Step 1: Wait 280ms, then expand the dynamic island pill with fluid spring physics
    setTimeout(() => {
        if (isFinished) return;
        pill.classList.add('is-expanded');
    }, 280);

    // Step 2: Auto-dismiss smoothly after 2.8s
    const autoDismiss = setTimeout(() => {
        finishSequence();
    }, 2800);

    // Skip controls: tap skip badge or anywhere on backdrop
    if (skipBtn) {
        skipBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            clearTimeout(autoDismiss);
            finishSequence();
        });
    }

    screen.addEventListener('click', () => {
        clearTimeout(autoDismiss);
        finishSequence();
    });

    // Support keyboard escape/space/enter to skip immediately
    document.addEventListener('keydown', function keyDismiss(e) {
        if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
            document.removeEventListener('keydown', keyDismiss);
            clearTimeout(autoDismiss);
            finishSequence();
        }
    });
}

/* ================= 7. APPLE SPRING SCROLL REVEALS ================= */
function initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (!revealElements.length) return;

    // Check for prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        revealElements.forEach(el => el.classList.add('is-revealed'));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el) => {
        // Apply staggered micro-delay for sibling cards within grids
        const parent = el.parentElement;
        if (parent && (parent.classList.contains('works-grid') || parent.classList.contains('hero-telemetry-grid'))) {
            const index = Array.from(parent.children).indexOf(el);
            if (index >= 0 && index < 6) {
                el.style.transitionDelay = `${(index % 4) * 80}ms`;
            }
        }
        observer.observe(el);
    });
}

/* ================= 8. INTERACTIVE SLIDING DOORS FILMOGRAPHY ================= */
function initSlidingDoors() {
    const track = document.getElementById('slidingDoorsTrack');
    if (!track) return;

    const panels = Array.from(track.querySelectorAll('.door-panel'));
    const filterPills = document.querySelectorAll('.stage-filter-pill');

    if (!panels.length) return;

    // --- Debounce & Lock State ---
    let hoverTimer = null;
    let activePanel = panels.find(p => p.classList.contains('is-active')) || panels[0];
    let isLockedByExpandedContent = false;

    // Helper to activate a specific panel (immediate, no debounce)
    function setActivePanel(panelToActivate) {
        if (!panelToActivate) return;
        activePanel = panelToActivate;
        panels.forEach(p => {
            const isActive = (p === panelToActivate);
            p.classList.toggle('is-active', isActive);
            p.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        });
    }

    // Debounced version — only switches after 80ms of steady hover on a NEW panel
    function requestPanelSwitch(panel) {
        // Don't switch if we're locked (mouse is inside expanded content / button)
        if (isLockedByExpandedContent) return;
        // Already active? No-op.
        if (panel === activePanel) return;

        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(() => {
            // Double-check lock hasn't been set during the delay
            if (!isLockedByExpandedContent) {
                setActivePanel(panel);
            }
        }, 80);
    }

    // --- Per-Panel Event Wiring ---
    panels.forEach(panel => {
        // Debounced mouseenter on the panel itself
        panel.addEventListener('mouseenter', () => {
            requestPanelSwitch(panel);
        });

        panel.addEventListener('mouseleave', () => {
            // If we're leaving this panel, clear any pending switch TO it
            clearTimeout(hoverTimer);
        });

        panel.addEventListener('focus', () => {
            clearTimeout(hoverTimer);
            isLockedByExpandedContent = false;
            setActivePanel(panel);
        });

        // Lock when mouse enters the expanded content area (where the button lives)
        const expandedContent = panel.querySelector('.door-expanded-content');
        if (expandedContent) {
            expandedContent.addEventListener('mouseenter', (e) => {
                // Lock: prevent any panel switch while mouse is in expanded content
                isLockedByExpandedContent = true;
                clearTimeout(hoverTimer);
                e.stopPropagation(); // Don't let this bubble to adjacent panels
            });

            expandedContent.addEventListener('mouseleave', () => {
                isLockedByExpandedContent = false;
            });
        }

        // Extra guard on the button itself
        const inspectBtn = panel.querySelector('.btn-door-inspect');
        if (inspectBtn) {
            inspectBtn.addEventListener('mouseenter', (e) => {
                isLockedByExpandedContent = true;
                clearTimeout(hoverTimer);
                e.stopPropagation();
            });

            inspectBtn.addEventListener('mouseleave', (e) => {
                // Only unlock if mouse is still inside the expanded content
                const related = e.relatedTarget;
                if (related && expandedContent && expandedContent.contains(related)) {
                    // Still in expanded content — stay locked
                    return;
                }
                // Still in the panel itself? Stay locked.
                if (related && panel.contains(related)) {
                    return;
                }
                isLockedByExpandedContent = false;
            });
        }

        // Click on the panel body (outside inner buttons) opens the modal
        panel.addEventListener('click', (e) => {
            if (e.target.closest('.door-play-btn') || e.target.closest('.btn-door-inspect')) {
                // Button handler with data-modal will trigger automatically
                return;
            }
            const modalKey = panel.getAttribute('data-modal-key') || panel.getAttribute('data-modal');
            if (modalKey && window.openModalHandler) {
                window.openModalHandler(modalKey);
            }
        });
    });

    // Reset lock when mouse leaves the entire track
    track.addEventListener('mouseleave', () => {
        isLockedByExpandedContent = false;
        clearTimeout(hoverTimer);
    });

    // Keyboard arrow navigation (Left / Right / Up / Down)
    document.addEventListener('keydown', (e) => {
        const isHovered = track.matches(':hover');
        const isFocused = track.contains(document.activeElement);

        if (!isHovered && !isFocused) return;

        const currentIndex = panels.findIndex(p => p.classList.contains('is-active'));
        if (currentIndex === -1) return;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            isLockedByExpandedContent = false;
            clearTimeout(hoverTimer);
            const nextIndex = (currentIndex + 1) % panels.length;
            setActivePanel(panels[nextIndex]);
            panels[nextIndex].focus();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            isLockedByExpandedContent = false;
            clearTimeout(hoverTimer);
            const prevIndex = (currentIndex - 1 + panels.length) % panels.length;
            setActivePanel(panels[prevIndex]);
            panels[prevIndex].focus();
        }
    });

    // Quick filter pills above track
    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            const filter = pill.getAttribute('data-filter');
            let firstMatching = null;

            panels.forEach(panel => {
                const category = panel.getAttribute('data-category') || '';
                const matches = (filter === 'all' || category.includes(filter));

                panel.classList.toggle('is-dimmed', !matches);

                if (matches && !firstMatching) {
                    firstMatching = panel;
                }
            });

            if (firstMatching) {
                isLockedByExpandedContent = false;
                clearTimeout(hoverTimer);
                setActivePanel(firstMatching);
            }
        });
    });
}

/* ================= 9. CINEMATIC EASTER EGGS SUITE ================= */
function initEasterEggs() {
    const chips = document.querySelectorAll('.easter-egg-chip');
    const profileCard = document.querySelector('.profile-feature-panel');
    if (!chips.length) return;

    // Create Flash Overlay
    const flashOverlay = document.createElement('div');
    flashOverlay.className = 'camera-flash-overlay';
    document.body.appendChild(flashOverlay);

    // Create 3D Digital Clapperboard Overlay
    const clapperOverlay = document.createElement('div');
    clapperOverlay.className = 'clapperboard-overlay';
    clapperOverlay.innerHTML = `
        <div class="clapperboard-card">
            <div class="clapper-stick-top">
                <div class="stripe"></div><div class="stripe"></div><div class="stripe"></div><div class="stripe"></div>
            </div>
            <div class="clapper-stick-bottom">
                <div class="stripe"></div><div class="stripe"></div><div class="stripe"></div><div class="stripe"></div>
            </div>
            <div class="clapper-board-body">
                <div class="clapper-text-row">
                    <span>PROD: AAYUSH PORTFOLIO</span>
                    <span>DIR: AAYUSH PILLAI</span>
                </div>
                <div class="clapper-digital-row">
                    <div class="clapper-box">SCENE <span id="clapper-scene">01</span></div>
                    <div class="clapper-box">TAKE <span id="clapper-take">01</span></div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(clapperOverlay);

    // Create Datamosh Glitch Overlay
    const glitchOverlay = document.createElement('div');
    glitchOverlay.className = 'glitch-overlay';
    document.body.appendChild(glitchOverlay);

    // Create Sound Design MP3 Audio Player Modal Overlay
    const soundPlayerOverlay = document.createElement('div');
    soundPlayerOverlay.className = 'sound-player-modal-overlay';
    soundPlayerOverlay.innerHTML = `
        <div class="sound-audio-card glass-panel">
            <div class="sound-player-header">
                <div class="sound-player-title">
                    <span class="sound-pulse-icon">🎧</span>
                    <span>lol</span>
                </div>
                <button class="sound-player-close-btn" id="sound-player-close" title="Stop & Close Player" aria-label="Stop audio and close player">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
            <div class="sound-audio-body">
                <div class="sound-track-info">
                    <span class="sound-track-name" id="sound-track-title">lol</span>
                    <span class="sound-track-status" id="sound-track-status">▶ PLAYING</span>
                </div>
                <div class="sound-wave-screen" id="sound-wave-visualizer">
                    <div class="scope-bar"></div>
                    <div class="scope-bar"></div>
                    <div class="scope-bar"></div>
                    <div class="scope-bar"></div>
                    <div class="scope-bar"></div>
                    <div class="scope-bar"></div>
                    <div class="scope-bar"></div>
                    <div class="scope-bar"></div>
                    <div class="scope-bar"></div>
                    <div class="scope-bar"></div>
                    <div class="scope-bar"></div>
                    <div class="scope-bar"></div>
                </div>
                <div class="sound-controls-row">
                    <button class="sound-ctrl-btn" id="sound-play-toggle" aria-label="Play or pause audio">
                        <i data-lucide="pause" id="sound-play-icon"></i>
                    </button>
                    <div class="sound-progress-container" id="sound-progress-bg">
                        <div class="sound-progress-bar" id="sound-progress-fill"></div>
                    </div>
                    <span class="sound-time-display" id="sound-time-display">0:00</span>
                </div>
                <div class="sound-audio-notice" id="sound-audio-notice" style="display: none;">
                    🎵 Drop your MP3 file as <strong>audio/sound-design.mp3</strong> (or <strong>sound.mp3</strong>) in your project folder to play your custom audio track!
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(soundPlayerOverlay);

    let audioInstance = null;

    function formatAudioTime(seconds) {
        if (isNaN(seconds) || seconds < 0) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function stopAndCloseAudio() {
        if (audioInstance) {
            audioInstance.pause();
            audioInstance.currentTime = 0;
        }
        soundPlayerOverlay.classList.remove('sound-player-active');
        document.body.style.overflow = '';
    }

    const closeBtn = soundPlayerOverlay.querySelector('#sound-player-close');
    if (closeBtn) closeBtn.addEventListener('click', stopAndCloseAudio);

    soundPlayerOverlay.addEventListener('click', (e) => {
        if (e.target === soundPlayerOverlay) stopAndCloseAudio();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && soundPlayerOverlay.classList.contains('sound-player-active')) {
            stopAndCloseAudio();
        }
    });

    const playToggleBtn = soundPlayerOverlay.querySelector('#sound-play-toggle');
    const playIcon = soundPlayerOverlay.querySelector('#sound-play-icon');
    const progressFill = soundPlayerOverlay.querySelector('#sound-progress-fill');
    const progressBg = soundPlayerOverlay.querySelector('#sound-progress-bg');
    const timeDisplay = soundPlayerOverlay.querySelector('#sound-time-display');
    const waveVisualizer = soundPlayerOverlay.querySelector('#sound-wave-visualizer');
    const statusPill = soundPlayerOverlay.querySelector('#sound-track-status');
    const audioNotice = soundPlayerOverlay.querySelector('#sound-audio-notice');

    if (playToggleBtn) {
        playToggleBtn.addEventListener('click', () => {
            if (!audioInstance) return;
            if (audioInstance.paused) {
                audioInstance.play().then(() => {
                    if (playIcon) playIcon.setAttribute('data-lucide', 'pause');
                    if (waveVisualizer) waveVisualizer.classList.remove('is-paused');
                    if (statusPill) statusPill.textContent = '▶ PLAYING';
                    if (window.lucide) window.lucide.createIcons();
                }).catch(() => {});
            } else {
                audioInstance.pause();
                if (playIcon) playIcon.setAttribute('data-lucide', 'play');
                if (waveVisualizer) waveVisualizer.classList.add('is-paused');
                if (statusPill) statusPill.textContent = '⏸ PAUSED';
                if (window.lucide) window.lucide.createIcons();
            }
        });
    }

    if (progressBg) {
        progressBg.addEventListener('click', (e) => {
            if (!audioInstance || !audioInstance.duration) return;
            const rect = progressBg.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            audioInstance.currentTime = clickPos * audioInstance.duration;
        });
    }

    if (window.lucide) window.lucide.createIcons();

    chips.forEach(chip => {
        const type = chip.getAttribute('data-easteregg');

        chip.addEventListener('click', (e) => {
            e.preventDefault();

            if (type === 'camera') {
                // 1. Camera Flash
                flashOverlay.classList.remove('flash-active');
                void flashOverlay.offsetWidth;
                flashOverlay.classList.add('flash-active');
                if (window.showAppleToast) {
                    window.showAppleToast('📸 Camera Flash Engaged');
                }
            } 
            else if (type === 'clapper') {
                // 2. 3D Digital Clapperboard Snap
                clapperOverlay.classList.remove('clapper-active', 'clapper-snap');
                void clapperOverlay.offsetWidth;
                clapperOverlay.classList.add('clapper-active');
                
                const takeEl = clapperOverlay.querySelector('#clapper-take');
                if (takeEl) {
                    let currentTake = parseInt(takeEl.textContent) || 1;
                    takeEl.textContent = (currentTake + 1).toString().padStart(2, '0');
                }

                // Snap down after 0.8s
                setTimeout(() => {
                    clapperOverlay.classList.add('clapper-snap');
                    
                    // Flash screen
                    flashOverlay.classList.remove('flash-active');
                    void flashOverlay.offsetWidth;
                    flashOverlay.classList.add('flash-active');

                    if (window.showAppleToast) {
                        window.showAppleToast(`🎬 TAKE ${takeEl.textContent} - ACTION!`);
                    }
                }, 800);

                setTimeout(() => {
                    clapperOverlay.classList.remove('clapper-active', 'clapper-snap');
                }, 2000);
            } 
            else if (type === 'color') {
                // 3. DaVinci Color Grading Rainbow Breathing
                if (profileCard) {
                    profileCard.classList.toggle('rgb-breathing-active');
                    const isActive = profileCard.classList.contains('rgb-breathing-active');
                    if (window.showAppleToast) {
                        window.showAppleToast(isActive ? '🎨 DaVinci Color Breathing Active' : '🎨 Color Reset');
                    }
                }
            }
            else if (type === 'edit') {
                // 4. Digital Datamosh / VHS Glitch Transition
                glitchOverlay.classList.add('is-active');
                
                if (window.showAppleToast) {
                    window.showAppleToast('⚠️ INITIATING RENDER...');
                }

                setTimeout(() => {
                    glitchOverlay.classList.remove('is-active');
                    if (window.showAppleToast) {
                        window.showAppleToast('✅ RENDER COMPLETE');
                    }
                }, 1500);
            }
            else if (type === 'sound') {
                // 5. Sound Design MP3 Audio Player
                soundPlayerOverlay.classList.add('sound-player-active');
                document.body.style.overflow = 'hidden';

                if (!audioInstance) {
                    // Try candidate MP3 file paths
                    audioInstance = new Audio('audio/sound-design.mp3');

                    audioInstance.addEventListener('timeupdate', () => {
                        if (!audioInstance.duration) return;
                        const pct = (audioInstance.currentTime / audioInstance.duration) * 100;
                        if (progressFill) progressFill.style.width = `${pct}%`;
                        if (timeDisplay) timeDisplay.textContent = formatAudioTime(audioInstance.currentTime);
                    });

                    audioInstance.addEventListener('ended', () => {
                        if (playIcon) playIcon.setAttribute('data-lucide', 'play');
                        if (waveVisualizer) waveVisualizer.classList.add('is-paused');
                        if (statusPill) statusPill.textContent = '⏹ ENDED';
                        if (progressFill) progressFill.style.width = '0%';
                        if (window.lucide) window.lucide.createIcons();
                    });

                    audioInstance.addEventListener('error', () => {
                        // Fallback check sound.mp3
                        if (audioInstance.src.includes('audio/sound-design.mp3')) {
                            audioInstance.src = 'sound.mp3';
                            audioInstance.play().catch(() => {
                                if (audioNotice) audioNotice.style.display = 'block';
                                if (statusPill) statusPill.textContent = '⚠️ ADD MP3 FILE';
                            });
                        } else {
                            if (audioNotice) audioNotice.style.display = 'block';
                            if (statusPill) statusPill.textContent = '⚠️ ADD MP3 FILE';
                        }
                    });
                }

                audioNotice.style.display = 'none';
                audioInstance.play().then(() => {
                    if (playIcon) playIcon.setAttribute('data-lucide', 'pause');
                    if (waveVisualizer) waveVisualizer.classList.remove('is-paused');
                    if (statusPill) statusPill.textContent = '▶ PLAYING';
                    if (window.lucide) window.lucide.createIcons();
                }).catch(() => {
                    // If file is missing or browser blocked autoplay
                    if (playIcon) playIcon.setAttribute('data-lucide', 'play');
                    if (waveVisualizer) waveVisualizer.classList.add('is-paused');
                    if (statusPill) statusPill.textContent = '🎵 READY';
                    if (window.lucide) window.lucide.createIcons();
                });

                if (window.showAppleToast) {
                    window.showAppleToast('🎧 Sound Design Audio Player Engaged!');
                }
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initEasterEggs();
});



