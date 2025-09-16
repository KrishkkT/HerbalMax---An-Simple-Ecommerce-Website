 // Image Gallery with Auto-scroll
        const images = [
            "img/img13.jpg",
            "img/img14.jpg",
            "img/img15.jpg"
        ];

        let currentImageIndex = 0;
        const mainImage = document.getElementById('mainImage');
        const imageCounter = document.getElementById('imageCounter');
        const thumbnails = document.querySelectorAll('.thumbnail');

        // Auto-scroll images every 4 seconds
        function autoScrollImages() {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            updateImage();
        }

        function updateImage() {
            mainImage.classList.add('fade-in');
            mainImage.src = images[currentImageIndex];
            imageCounter.textContent = `${currentImageIndex + 1}/4`;

            // Update active thumbnail
            thumbnails.forEach((thumb, index) => {
                thumb.classList.toggle('active', index === currentImageIndex);
            });

            setTimeout(() => {
                mainImage.classList.remove('fade-in');
            }, 500);
        }

        // Manual image selection
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                currentImageIndex = index;
                updateImage();
                // Reset auto-scroll timer
                clearInterval(autoScrollTimer);
                autoScrollTimer = setInterval(autoScrollImages, 4000);
            });
        });

        // Start auto-scroll
        let autoScrollTimer = setInterval(autoScrollImages, 4000);

        // Countdown Timer
        function startCountdown() {
            const countdownElement = document.getElementById('countdown');
            let hours = 23, minutes = 59, seconds = 59;

            setInterval(() => {
                seconds--;
                if (seconds < 0) {
                    seconds = 59;
                    minutes--;
                    if (minutes < 0) {
                        minutes = 59;
                        hours--;
                        if (hours < 0) {
                            hours = 23;
                        }
                    }
                }

                countdownElement.textContent =
                    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }, 1000);
        }

        startCountdown();

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Form Submission Handler
        document.getElementById('orderForm').addEventListener('submit', async function (e) {
            e.preventDefault();

            const submitButton = this.querySelector('button[type="submit"]');
            const originalHTML = submitButton.innerHTML;

            // Show loading state
            submitButton.innerHTML = '<div class="spinner"></div> પ્રોસેસિંગ...';
            submitButton.disabled = true;
            submitButton.classList.add('loading');

            const form = e.target;
            const payload = {
                first_name: form.first_name.value,
                last_name: form.last_name.value || '',
                phone: form.phone.value,
                address: form.address.value,
                pincode: form.pincode.value,
                product: form.product.value,
                offer_price: form.offer_price.value
            };

            try {
                const res = await fetch("https://crm.herbalmaxplus.shop/lead-proxy.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    mode: 'cors',
                    body: JSON.stringify(payload)
                });
                const json = await res.json();

                // Success state
                submitButton.innerHTML = '<i class="fas fa-check"></i> ઓર્ડર સફળ!';
                submitButton.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';

                setTimeout(() => {
                    alert("✅ તમારો ઓર્ડર સફળતાપૂર્વક મોકલાયો છે!\n\n🎉 અભિનંદન! તમે ₹1,280 બચાવ્યા છે.\n\n📞 અમે 24 કલાકમાં તમારી સાથે સંપર્ક કરીશું.\n\n📦 તમારો ઓર્ડર 3-5 દિવસમાં પહોંચાડવામાં આવશે.");

                    // Reset form
                    form.reset();
                    submitButton.innerHTML = originalHTML;
                    submitButton.style.background = '';
                    submitButton.disabled = false;
                    submitButton.classList.remove('loading');
                }, 2000);

            } catch (err) {
                console.error("Error sending to CRM:", err);

                // Error state
                submitButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> ફરી પ્રયાસ કરો';
                submitButton.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';

                setTimeout(() => {
                    submitButton.innerHTML = originalHTML;
                    submitButton.style.background = '';
                    submitButton.disabled = false;
                    submitButton.classList.remove('loading');
                }, 3000);
            }

            /* Continue with Formspree submission for backup
            setTimeout(() => {
                form.submit();
            }, 1000);*/
        });

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add intersection observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.feature-card, .testimonial, .ingredient-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });