const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");


// ========================================
// SETTINGS
// ========================================

const frameCount = 114;


// ========================================
// IMAGE PATH
// ========================================

function getFramePath(index) {

    const frameNumber = String(index).padStart(5, "0");

    return `assets/frames/scene${frameNumber}.png`;

}


// ========================================
// LOAD ALL FRAMES
// ========================================

const images = [];

for (let i = 1; i <= frameCount; i++) {

    const image = new Image();

    image.src = getFramePath(i);

    images.push(image);

}


// ========================================
// DRAW FRAME
// ========================================

function renderFrame(frameIndex) {

    const image = images[frameIndex];

    if (!image || !image.complete) {
        return;
    }


    context.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    context.drawImage(
        image,
        0,
        0,
        canvas.width,
        canvas.height
    );

}


// ========================================
// INITIALIZE CANVAS
// ========================================

images[0].onload = function () {

    canvas.width = images[0].naturalWidth;

    canvas.height = images[0].naturalHeight;

    renderFrame(0);

};


// ========================================
// GSAP
// ========================================

gsap.registerPlugin(ScrollTrigger);


// ========================================
// ANIMATION STATE
// ========================================

const animation = {
    progress: 0
};


// ========================================
// FULL PAGE SCROLL ANIMATION
// ========================================

gsap.to(animation, {

    progress: 1,

    ease: "none",

    scrollTrigger: {

        trigger: ".main-experience",

        start: "top top",

        end: "bottom bottom",

        scrub: 1

    },

    onUpdate: function () {


        // Total number of steps:
        //
        // 001 → 114
        // 114 → 001
        //
        // = 226 steps

        const totalSteps =
            (frameCount - 1) * 2;


        const currentStep =
            Math.floor(
                animation.progress * totalSteps
            );


        let frameIndex;


        // ====================================
        // FORWARD
        // ====================================

        if (currentStep <= frameCount - 1) {

            frameIndex = currentStep;

        }


        // ====================================
        // REVERSE
        // ====================================

        else {

            frameIndex =
                totalSteps - currentStep;

        }


        renderFrame(frameIndex);

    }

});


// ========================================
// HERO CONTENT ANIMATION
// ========================================

const heroContent =
    document.querySelector(".hero-content");


const scrollIndicator =
    document.querySelector(".scroll-indicator");


// ========================================
// HERO FADE
// ========================================

gsap.to(heroContent, {

    opacity: 0,

    y: -80,

    scale: 0.96,

    ease: "power2.out",

    scrollTrigger: {

        trigger: ".main-experience",

        start: "top top",

        end: "15% top",

        scrub: true

    }

});


// ========================================
// SCROLL INDICATOR FADE
// ========================================

gsap.to(scrollIndicator, {

    opacity: 0,

    y: 30,

    ease: "power2.out",

    scrollTrigger: {

        trigger: ".main-experience",

        start: "top top",

        end: "8% top",

        scrub: true

    }

});

// ========================================
// SECTION REVEAL ANIMATIONS
// ========================================


// ----------------------------------------
// SECTION LABELS
// ----------------------------------------

gsap.utils.toArray(".section-label").forEach((label) => {

    gsap.from(label, {

        opacity: 0,

        y: 30,

        duration: 1,

        ease: "power3.out",

        scrollTrigger: {

            trigger: label,

            start: "top 85%",

            toggleActions: "play none none reverse"

        }

    });

});


// ----------------------------------------
// SECTION HEADINGS
// ----------------------------------------

gsap.utils.toArray(".content-screen h2").forEach((heading) => {

    gsap.from(heading, {

        opacity: 0,

        y: 70,

        duration: 1.2,

        ease: "power3.out",

        scrollTrigger: {

            trigger: heading,

            start: "top 85%",

            toggleActions: "play none none reverse"

        }

    });

});


// ----------------------------------------
// SECTION DESCRIPTIONS
// ----------------------------------------

gsap.utils.toArray(".section-description").forEach((description) => {

    gsap.from(description, {

        opacity: 0,

        y: 40,

        duration: 1,

        delay: 0.1,

        ease: "power3.out",

        scrollTrigger: {

            trigger: description,

            start: "top 88%",

            toggleActions: "play none none reverse"

        }

    });

});


// ----------------------------------------
// SERVICE CARDS
// ----------------------------------------

gsap.utils.toArray(".service-card").forEach((card, index) => {

    gsap.from(card, {

        opacity: 0,

        y: 80,

        scale: 0.96,

        duration: 1,

        delay: index * 0.12,

        ease: "power3.out",

        scrollTrigger: {

            trigger: card,

            start: "top 88%",

            toggleActions: "play none none reverse"

        }

    });

});
/* ========================================
   PORTFOLIO FOLDER SYSTEM
======================================== */

const portfolioModal =
    document.getElementById("portfolioModal");

const portfolioModalTitle =
    document.getElementById("portfolioModalTitle");

const portfolioGallery =
    document.getElementById("portfolioGallery");

const portfolioClose =
    document.getElementById("portfolioClose");

const portfolioFolders =
    document.querySelectorAll(
        ".portfolio-folder"
    );

let lastPortfolioTrigger = null;


// ========================================
// FULL QUALITY IMAGE / VIDEO PREVIEW
// ========================================

const imageLightbox =
    document.getElementById("imageLightbox");

const imageLightboxImage =
    document.getElementById("imageLightboxImage");

const imageLightboxVideo =
    document.getElementById("imageLightboxVideo");

const imageLightboxClose =
    document.getElementById("imageLightboxClose");

let lastImageTrigger = null;

function openMediaPreview(media, trigger) {

    if (!media || !media.src) return;

    lastImageTrigger = trigger || null;

    const isVideo = media.tagName === "VIDEO";

    if (isVideo) {
        imageLightboxImage.hidden = true;
        imageLightboxImage.src = "";
        imageLightboxVideo.hidden = false;
        imageLightboxVideo.src = media.currentSrc || media.src;
        imageLightboxVideo.load();
    } else {
        imageLightboxVideo.pause();
        imageLightboxVideo.removeAttribute("src");
        imageLightboxVideo.load();
        imageLightboxVideo.hidden = true;
        imageLightboxImage.hidden = false;
        imageLightboxImage.src = media.currentSrc || media.src;
        imageLightboxImage.alt = media.alt || "Portfolio image preview";
    }

    imageLightbox.classList.add("active");
    imageLightbox.setAttribute("aria-hidden", "false");

    requestAnimationFrame(() => {
        imageLightboxClose.focus();
        if (isVideo) imageLightboxVideo.play().catch(() => {});
    });
}

function openImagePreview(image, trigger) {
    openMediaPreview(image, trigger);
}

function closeImagePreview() {

    imageLightbox.classList.remove("active");
    imageLightbox.setAttribute("aria-hidden", "true");
    imageLightboxImage.src = "";
    imageLightboxVideo.pause();
    imageLightboxVideo.removeAttribute("src");
    imageLightboxVideo.load();
    imageLightboxVideo.hidden = true;
    imageLightboxImage.hidden = false;

    if (
        lastImageTrigger &&
        document.contains(lastImageTrigger)
    ) {
        lastImageTrigger.focus();
    }

    lastImageTrigger = null;
}

imageLightboxClose.addEventListener(
    "click",
    closeImagePreview
);

/*
    PORTFOLIO DATA

    We are intentionally leaving the
    image arrays empty for now.

    Later we will simply add your
    real image filenames here.
*/

const portfolioData = {

    "branding": {
        title: "Roast & Root — Branding Case Study",
        folder: "assets/branding/case-study/",
        prefix: "brand",
        thumbnail: "assets/branding/brandthumb.png",
        caseStudy: true
    },

    "promotional-ads": {
        title: "Promotional Ads",
        folder: "assets/promotional-ads/portfolio/",
        prefix: "ad",
        thumbnail: "assets/promotional-ads/adthumb.png"
    },

    "social-media-posts": {
        title: "Social Media Posts",
        folder: "assets/social-media-posts/portfolio/",
        prefix: "social",
        thumbnail: "assets/social-media-posts/socialthumb.png"
    },

    "campaign-visuals": {
        title: "Campaign Visuals",
        folder: "assets/campaign-visuals/portfolio/",
        prefix: "camp",
        thumbnail: "assets/campaign-visuals/campthumb.png"
    },

    "thumbnails": {
        title: "Thumbnails",
        folder: "assets/thumbnails/portfolio/",
        prefix: "thumb",
        thumbnail: "assets/thumbnails/thumbthumb.png"
    },

    "video-design": {
        title: "Video & Motion",
        folder: "assets/video-design/portfolio/",
        prefix: "video",
        thumbnail: "assets/video-design/videothumb.png"
    }

};


/* ========================================
   AUTO-LOAD PORTFOLIO THUMBNAILS

   Each category can have one thumbnail in
   its main folder (outside /portfolio/).

   Naming convention:
   branding/brandthumb.png
   promotional-ads/adthumb.png
   social-media-posts/socialthumb.png
   campaign-visuals/campthumb.png
   thumbnails/thumbthumb.png
   video-design/videothumb.png

   Adding/replacing that single image is all
   that is needed to update the card.
======================================== */

function applyPortfolioThumbnails() {

    portfolioFolders.forEach(folder => {

        const category = folder.dataset.category;
        const portfolio = portfolioData[category];

        if (!portfolio || !portfolio.thumbnail) return;

        const placeholder = folder.querySelector(
            ".work-placeholder"
        );

        if (!placeholder) return;

        const preview = new Image();

        preview.onload = function () {

            placeholder.classList.add(
                "work-image-placeholder"
            );

            placeholder.innerHTML = `
                <img
                    src="${portfolio.thumbnail}"
                    alt="${portfolio.title} portfolio"
                    class="work-thumbnail"
                >

                <div class="work-thumbnail-overlay">

                    <span>${folder.querySelector(".work-placeholder > span")?.textContent.trim() || ""}</span>

                    <h3>
                        ${folder.querySelector(".work-placeholder h3")?.textContent.trim() || portfolio.title}
                    </h3>

                    <p>
                        View Collection
                    </p>

                    <div class="folder-arrow">
                        ↗
                    </div>

                </div>
            `;

        };

        // If the thumbnail is not present, the original placeholder
        // remains untouched.
        preview.onerror = function () {};
        preview.src = portfolio.thumbnail;

    });

}

applyPortfolioThumbnails();


/* ========================================
   BUILD IMAGE LIST

   Simple filenames:
   brand01, ad01, social01, camp01,
   ui01, thumb01, video01

   No spaces, hyphens or underscores are needed.
======================================== */

function buildPortfolioMedia(portfolio) {

    const media = [];

    const imageExtensions = [
        ".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif", ".svg"
    ];

    const videoExtensions = [
        ".mp4", ".webm", ".ogg", ".ogv", ".m4v"
    ];

    for (let index = 1; index <= 30; index++) {

        const number = String(index).padStart(2, "0");
        const base = `${portfolio.folder}${portfolio.prefix}${number}`;

        imageExtensions.forEach(extension => {
            media.push({
                src: base + extension,
                type: "image",
                title: portfolio.title
            });
        });

        videoExtensions.forEach(extension => {
            media.push({
                src: base + extension,
                type: "video",
                title: portfolio.title
            });
        });
    }

    return media;
}

/* ========================================
   OPEN FOLDER
======================================== */

function openPortfolioFolder(category, trigger) {

    const portfolio = portfolioData[category];

    if (!portfolio) return;

    lastPortfolioTrigger = trigger || null;

    portfolioModalTitle.textContent = portfolio.title;

    portfolioGallery.innerHTML = "";
    portfolioGallery.classList.toggle(
        "case-study-gallery",
        !!portfolio.caseStudy
    );

    const mediaItems = buildPortfolioMedia(portfolio);
    let loadedCount = 0;
    let pendingCount = mediaItems.length;

    const emptyMessage = document.createElement("div");
    emptyMessage.className = "gallery-empty";
    emptyMessage.innerHTML = portfolio.caseStudy
        ? `
            <span>ROAST &amp; ROOT</span>
            <p>Add media to <strong>${portfolio.folder}</strong></p>
          `
        : `
            <span>COLLECTION</span>
            <p>Add images or videos to <strong>${portfolio.folder}</strong></p>
          `;

    portfolioGallery.appendChild(emptyMessage);

    mediaItems.forEach(item => {

        let element;

        if (item.type === "video") {
            element = document.createElement("video");
            element.controls = false;
            element.muted = true;
            element.playsInline = true;
            element.preload = "metadata";
            element.className = portfolio.caseStudy
                ? "gallery-video gallery-case-study"
                : "gallery-video";
        } else {
            element = document.createElement("img");
            element.alt = item.title;
            element.className = portfolio.caseStudy
                ? "gallery-image gallery-case-study"
                : "gallery-image";
        }

        let finished = false;

        const markLoaded = () => {
            if (finished) return;
            finished = true;
            loadedCount++;
            pendingCount--;
            emptyMessage.remove();
        };

        const markFailed = () => {
            if (finished) return;
            finished = true;
            pendingCount--;
            if (pendingCount === 0 && loadedCount === 0) {
                emptyMessage.classList.add("visible");
            }
            element.remove();
        };

        element.addEventListener("load", markLoaded);
        element.addEventListener("loadeddata", markLoaded);
        element.addEventListener("error", markFailed);

        element.addEventListener("click", event => {
            event.stopPropagation();
            openMediaPreview(element, element);
        });

        element.src = item.src;
        portfolioGallery.appendChild(element);
    });

    portfolioModal.classList.add("active");
    portfolioModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
        portfolioClose.focus();
    });

}

/* ========================================
   CLOSE FOLDER
======================================== */

function closePortfolioFolder() {

    portfolioModal.classList.remove(
        "active"
    );

    portfolioModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";

    if (
        lastPortfolioTrigger &&
        document.contains(lastPortfolioTrigger)
    ) {

        lastPortfolioTrigger.focus();

    }

    lastPortfolioTrigger = null;

}


/* ========================================
   CARD CLICK + KEYBOARD ACCESS
======================================== */

portfolioFolders.forEach(folder => {

    folder.addEventListener(
        "click",
        () => {

            const category =
                folder.dataset.category;

            openPortfolioFolder(
                category,
                folder
            );

        }
    );

    folder.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                const category =
                    folder.dataset.category;

                openPortfolioFolder(
                    category,
                    folder
                );

            }

        }
    );

});


/* ========================================
   CLOSE BUTTON
======================================== */

portfolioClose.addEventListener(
    "click",
    closePortfolioFolder
);


/* ========================================
   CLICK OUTSIDE
======================================== */

portfolioModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            portfolioModal
        ) {

            closePortfolioFolder();

        }

    }
);


/* ========================================
   ESCAPE + FOCUS MANAGEMENT
======================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            imageLightbox.classList.contains("active")
        ) {

            closeImagePreview();

            return;

        }

        if (
            event.key === "Escape" &&
            videoPreviewModal?.classList.contains("active")
        ) {

            closeIntroductionVideo();

            return;

        }

        if (
            event.key === "Escape" &&
            portfolioModal.classList.contains(
                "active"
            )
        ) {

            closePortfolioFolder();

            return;

        }

        if (
            event.key === "Tab" &&
            portfolioModal.classList.contains(
                "active"
            )
        ) {

            const focusable =
                portfolioModal.querySelectorAll(
                    'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );

            if (!focusable.length) return;

            const first =
                focusable[0];

            const last =
                focusable[focusable.length - 1];

            if (
                event.shiftKey &&
                document.activeElement === first
            ) {

                event.preventDefault();

                last.focus();

            } else if (
                !event.shiftKey &&
                document.activeElement === last
            ) {

                event.preventDefault();

                first.focus();

            }

        }

    }
);


/* ========================================
   MOBILE NAVIGATION
======================================== */

const mobileMenuToggle =
    document.getElementById("mobileMenuToggle");

const mobileNavigation =
    document.getElementById("mobileNavigation");

const mobileNavigationLinks =
    mobileNavigation.querySelectorAll("a");


function setMobileMenu(open) {

    mobileNavigation.classList.toggle(
        "active",
        open
    );

    mobileMenuToggle.setAttribute(
        "aria-expanded",
        String(open)
    );

    mobileMenuToggle.setAttribute(
        "aria-label",
        open
            ? "Close navigation menu"
            : "Open navigation menu"
    );

    mobileNavigation.setAttribute(
        "aria-hidden",
        String(!open)
    );

}


mobileMenuToggle.addEventListener(
    "click",
    () => {

        const isOpen =
            mobileMenuToggle.getAttribute(
                "aria-expanded"
            ) === "true";

        setMobileMenu(!isOpen);

    }
);


mobileNavigationLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            setMobileMenu(false);

        }
    );

});


document.addEventListener(
    "click",
    event => {

        if (
            mobileMenuToggle.getAttribute(
                "aria-expanded"
            ) !== "true"
        ) return;

        if (
            !mobileNavigation.contains(event.target) &&
            !mobileMenuToggle.contains(event.target)
        ) {

            setMobileMenu(false);

        }

    }
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            mobileMenuToggle.getAttribute(
                "aria-expanded"
            ) === "true"
        ) {

            setMobileMenu(false);

            mobileMenuToggle.focus();

        }

    }
);


window.addEventListener(
    "resize",
    () => {

        if (window.innerWidth > 900) {

            setMobileMenu(false);

        }

    }
);


/* ========================================
   SMART NAVIGATION
======================================== */



const navbar =
    document.querySelector(".navbar");


window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 50
        ) {

            navbar.classList.add(
                "scrolled"
            );

        } else {

            navbar.classList.remove(
                "scrolled"
            );

        }

    }
);

/* ========================================
   CONTACT METHOD MODAL
======================================== */

const contactTrigger =
    document.getElementById("contactTrigger");


const contactModal =
    document.getElementById("contactModal");


const contactModalClose =
    document.getElementById("contactModalClose");


function openContactModal() {

    contactModal.classList.add("active");

    contactModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "hidden";

}


function closeContactModal() {

    contactModal.classList.remove("active");

    contactModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

}


if (contactTrigger) {

    contactTrigger.addEventListener(
        "click",
        event => {

            event.preventDefault();

            openContactModal();

        }
    );

}


contactModalClose.addEventListener(
    "click",
    closeContactModal
);


contactModal.addEventListener(
    "click",
    event => {

        if (event.target === contactModal) {

            closeContactModal();

        }

    }
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            contactModal.classList.contains("active")
        ) {

            closeContactModal();

        }

    }
);


// ----------------------------------------
// SERVICE WHATSAPP REQUESTS
// ----------------------------------------

const serviceWhatsappNumber = "923246799332";
const serviceNameModal = document.getElementById("serviceNameModal");
const serviceNameModalClose = document.getElementById("serviceNameModalClose");
const serviceNameForm = document.getElementById("serviceNameForm");
const visitorNameInput = document.getElementById("visitorNameInput");

let selectedServiceName = "";

function openServiceNameModal(serviceName) {

    if (!serviceNameModal || !serviceNameForm || !visitorNameInput) return;

    selectedServiceName = serviceName;

    const savedName = localStorage.getItem("nexoraVisitorName") || "";
    visitorNameInput.value = savedName;

    serviceNameModal.classList.add("active");
    serviceNameModal.setAttribute("aria-hidden", "false");

    requestAnimationFrame(() => {
        visitorNameInput.focus();
        visitorNameInput.select();
    });
}

function closeServiceNameModal() {

    if (!serviceNameModal) return;

    serviceNameModal.classList.remove("active");
    serviceNameModal.setAttribute("aria-hidden", "true");
    selectedServiceName = "";
}

function continueToServiceWhatsApp(event) {

    event.preventDefault();

    const visitorName = visitorNameInput.value.trim();

    if (!visitorName || !selectedServiceName) {
        visitorNameInput.focus();
        return;
    }

    localStorage.setItem("nexoraVisitorName", visitorName);

    const message =
        `Hi Nexora Creative! I have seen your portfolio and it is great and good. ` +
        `I want ${selectedServiceName} service from you. Can you please reach me out to ` +
        `discuss about doing the work together? Looking forward to you... That's ${visitorName}.`;

    const whatsappUrl =
        `https://wa.me/${serviceWhatsappNumber}?text=${encodeURIComponent(message)}`;

    // This runs directly from the user's form submission, so WhatsApp opens
    // after one press without relying on a second click.
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    closeServiceNameModal();
}

document.querySelectorAll(".service-row-arrow[data-service]").forEach(arrow => {

    arrow.addEventListener("click", event => {

        event.preventDefault();
        event.stopPropagation();

        openServiceNameModal(arrow.dataset.service);

    });

});

if (serviceNameForm) {
    serviceNameForm.addEventListener("submit", continueToServiceWhatsApp);
}

if (serviceNameModalClose) {
    serviceNameModalClose.addEventListener("click", closeServiceNameModal);
}

if (serviceNameModal) {
    serviceNameModal.addEventListener("click", event => {
        if (event.target === serviceNameModal) {
            closeServiceNameModal();
        }
    });
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && serviceNameModal?.classList.contains("active")) {
        closeServiceNameModal();
    }
});
