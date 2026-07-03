// 平滑滚动与导航活动状态
document.addEventListener('DOMContentLoaded', function() {
    // 导航链接点击事件
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 如果是锚点链接
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // 表单提交事件
    const contactForm = document.querySelector('.contact-form');
    const contactFormFull = document.querySelector('.contact-form-full');
    const appointmentForm = document.querySelector('.appointment-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const name = this.querySelector('input[type="text"]').value;
            
            // 显示成功提示
            showNotification('感谢您的消息！我们将尽快联系您。', 'success');
            
            // 重置表单
            this.reset();
        });
    }

    if (contactFormFull) {
        contactFormFull.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 显示成功提示
            showNotification('消息已发送！我们会尽快回复您的邮件。', 'success');
            
            // 重置表单
            this.reset();
        });
    }

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 显示成功提示
            showNotification('维修预约已提交！我们会尽快与您联系。', 'success');
            
            // 重置表单
            this.reset();
        });
    }

    // 产品卡片点击事件
    const productButtons = document.querySelectorAll('.product-card .btn-outline');
    productButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.closest('.product-card').querySelector('h3').textContent;
            showNotification(`您查看了 ${productName} 的详情`, 'info');
        });
    });

    // 按钮点击事件
    const heroPrimaryBtn = document.querySelector('.btn-primary');
    if (heroPrimaryBtn) {
        heroPrimaryBtn.addEventListener('click', function() {
            const productsSection = document.getElementById('products');
            productsSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // 启用滚动动画观察器
    initScrollAnimations();
});

// 滚动时的动画效果
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 观察所有需要动画的元素
    const animatedElements = document.querySelectorAll(
        '.product-card, .feature-item, .contact-item, .stat-card'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease-out';
        observer.observe(element);
    });
}

// 显示通知消息
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('notification-leaving');
        notification.addEventListener('animationend', () => {
            notification.remove();
        }, { once: true });
    }, 3000);
}



// 监听滚动事件，处理导航栏样式
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// 鼠标跟随效果（可选的高级效果）
document.addEventListener('mousemove', function(event) {
    const blobs = document.querySelectorAll('.gradient-blob');
    
    blobs.forEach(blob => {
        if (blob.closest('.hero')) {
            const rect = blob.parentElement.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) * 0.02;
            const moveY = (y - centerY) * 0.02;
            
            blob.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
});

// 延迟加载图片
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// 防抖函数（用于优化滚动事件）
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

    // 响应式导航（移动端菜单）
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('menu-open');
            menuToggle.classList.toggle('menu-open'); // For hamburger icon animation
        });

        // Close menu when a link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('menu-open');
                menuToggle.classList.remove('menu-open');
            });
        });
    }


console.log('米智电脑数码网站已加载 🚀');
