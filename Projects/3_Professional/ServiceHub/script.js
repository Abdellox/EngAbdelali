// Language translations
const translations = {
    ar: {
        dir: 'rtl',
        lang: 'ar',
        siteName: 'خدماتي',
        nav: {
            services: 'الخدمات',
            howItWorks: 'كيف يعمل',
            professionals: 'المحترفون',
            about: 'من نحن'
        },
        buttons: {
            login: 'تسجيل الدخول',
            signup: 'إنشاء حساب',
            search: 'بحث',
            viewProfile: 'عرض الملف الشخصي',
            registerPro: 'سجل كمحترف الآن'
        },
        hero: {
            title: 'ابحث عن المحترف المناسب لاحتياجاتك',
            subtitle: 'منصة تربط بين العملاء والمحترفين في جميع المجالات',
            searchPlaceholder: 'ابحث عن خدمة... (سباك، كهربائي، مربية أطفال، بستاني...)',
            stats: {
                professionals: 'محترف',
                clients: 'عميل راضٍ',
                professions: 'مهنة'
            }
        },
        services: {
            title: 'الخدمات الأكثر طلباً',
            babysitter: { name: 'مربية أطفال', desc: 'محترفون في رعاية الأطفال' },
            plumber: { name: 'سباك', desc: 'خدمات السباكة والصيانة' },
            electrician: { name: 'كهربائي', desc: 'أعمال الكهرباء والإصلاح' },
            gardener: { name: 'بستاني', desc: 'العناية بالحدائق والنباتات' },
            painter: { name: 'دهان', desc: 'أعمال الدهان والديكور' },
            cleaner: { name: 'تنظيف', desc: 'خدمات التنظيف المنزلي' },
            carpenter: { name: 'نجار', desc: 'أعمال النجارة والأثاث' },
            mechanic: { name: 'ميكانيكي', desc: 'صيانة وإصلاح السيارات' }
        },
        howItWorks: {
            title: 'كيف يعمل الموقع',
            step1: { title: 'اختر الخدمة', desc: 'ابحث عن المهنة التي تحتاجها من بين أكثر من 50 مهنة' },
            step2: { title: 'تصفح الملفات الشخصية', desc: 'اطلع على ملفات المحترفين وتقييماتهم وأعمالهم السابقة' },
            step3: { title: 'أرسل طلب', desc: 'اختر المحترف المناسب وأرسل طلب الخدمة مع التفاصيل' },
            step4: { title: 'احصل على الخدمة', desc: 'تواصل مع المحترف وأنجز العمل بجودة عالية' }
        },
        forProfessionals: {
            title: 'هل أنت محترف؟',
            subtitle: 'انضم إلى منصتنا واحصل على المزيد من العملاء',
            benefits: [
                '✓ إنشاء ملف شخصي احترافي',
                '✓ الوصول إلى آلاف العملاء',
                '✓ إدارة طلباتك بسهولة',
                '✓ بناء سمعتك من خلال التقييمات',
                '✓ دفع آمن ومضمون'
            ]
        },
        featured: {
            title: 'محترفون مميزون',
            reviews: 'تقييم'
        },
        footer: {
            description: 'منصة تربط بين العملاء والمحترفين في جميع المجالات',
            quickLinks: 'روابط سريعة',
            support: 'الدعم',
            followUs: 'تابعنا',
            helpCenter: 'مركز المساعدة',
            terms: 'الشروط والأحكام',
            privacy: 'سياسة الخصوصية',
            contact: 'اتصل بنا',
            copyright: '© 2024 خدماتي. جميع الحقوق محفوظة.'
        }
    },
    en: {
        dir: 'ltr',
        lang: 'en',
        siteName: 'ServiceHub',
        nav: {
            services: 'Services',
            howItWorks: 'How It Works',
            professionals: 'Professionals',
            about: 'About Us'
        },
        buttons: {
            login: 'Login',
            signup: 'Sign Up',
            search: 'Search',
            viewProfile: 'View Profile',
            registerPro: 'Register as Professional'
        },
        hero: {
            title: 'Find the Right Professional for Your Needs',
            subtitle: 'Platform connecting clients with professionals in all fields',
            searchPlaceholder: 'Search for a service... (plumber, electrician, babysitter, gardener...)',
            stats: {
                professionals: 'Professionals',
                clients: 'Happy Clients',
                professions: 'Professions'
            }
        },
        services: {
            title: 'Most Requested Services',
            babysitter: { name: 'Babysitter', desc: 'Professional childcare services' },
            plumber: { name: 'Plumber', desc: 'Plumbing and maintenance services' },
            electrician: { name: 'Electrician', desc: 'Electrical work and repairs' },
            gardener: { name: 'Gardener', desc: 'Garden and plant care' },
            painter: { name: 'Painter', desc: 'Painting and decoration work' },
            cleaner: { name: 'Cleaner', desc: 'Home cleaning services' },
            carpenter: { name: 'Carpenter', desc: 'Carpentry and furniture work' },
            mechanic: { name: 'Mechanic', desc: 'Car maintenance and repair' }
        },
        howItWorks: {
            title: 'How It Works',
            step1: { title: 'Choose Service', desc: 'Search for the profession you need from over 50 professions' },
            step2: { title: 'Browse Profiles', desc: 'View professional profiles, ratings, and previous work' },
            step3: { title: 'Send Request', desc: 'Choose the right professional and send service request with details' },
            step4: { title: 'Get Service', desc: 'Connect with the professional and get quality work done' }
        },
        forProfessionals: {
            title: 'Are You a Professional?',
            subtitle: 'Join our platform and get more clients',
            benefits: [
                '✓ Create professional profile',
                '✓ Access thousands of clients',
                '✓ Manage your orders easily',
                '✓ Build your reputation through reviews',
                '✓ Safe and secure payment'
            ]
        },
        featured: {
            title: 'Featured Professionals',
            reviews: 'reviews'
        },
        footer: {
            description: 'Platform connecting clients with professionals in all fields',
            quickLinks: 'Quick Links',
            support: 'Support',
            followUs: 'Follow Us',
            helpCenter: 'Help Center',
            terms: 'Terms & Conditions',
            privacy: 'Privacy Policy',
            contact: 'Contact Us',
            copyright: '© 2024 ServiceHub. All rights reserved.'
        }
    },
    fr: {
        dir: 'ltr',
        lang: 'fr',
        siteName: 'ServiceHub',
        nav: {
            services: 'Services',
            howItWorks: 'Comment ça marche',
            professionals: 'Professionnels',
            about: 'À propos'
        },
        buttons: {
            login: 'Connexion',
            signup: 'S\'inscrire',
            search: 'Rechercher',
            viewProfile: 'Voir le profil',
            registerPro: 'S\'inscrire comme professionnel'
        },
        hero: {
            title: 'Trouvez le professionnel adapté à vos besoins',
            subtitle: 'Plateforme connectant clients et professionnels dans tous les domaines',
            searchPlaceholder: 'Rechercher un service... (plombier, électricien, baby-sitter, jardinier...)',
            stats: {
                professionals: 'Professionnels',
                clients: 'Clients satisfaits',
                professions: 'Métiers'
            }
        },
        services: {
            title: 'Services les plus demandés',
            babysitter: { name: 'Baby-sitter', desc: 'Services professionnels de garde d\'enfants' },
            plumber: { name: 'Plombier', desc: 'Services de plomberie et maintenance' },
            electrician: { name: 'Électricien', desc: 'Travaux électriques et réparations' },
            gardener: { name: 'Jardinier', desc: 'Entretien de jardin et plantes' },
            painter: { name: 'Peintre', desc: 'Travaux de peinture et décoration' },
            cleaner: { name: 'Nettoyeur', desc: 'Services de nettoyage domestique' },
            carpenter: { name: 'Menuisier', desc: 'Travaux de menuiserie et meubles' },
            mechanic: { name: 'Mécanicien', desc: 'Entretien et réparation automobile' }
        },
        howItWorks: {
            title: 'Comment ça marche',
            step1: { title: 'Choisir le service', desc: 'Recherchez le métier dont vous avez besoin parmi plus de 50 métiers' },
            step2: { title: 'Parcourir les profils', desc: 'Consultez les profils, évaluations et travaux précédents' },
            step3: { title: 'Envoyer une demande', desc: 'Choisissez le bon professionnel et envoyez une demande avec détails' },
            step4: { title: 'Obtenir le service', desc: 'Connectez-vous avec le professionnel et obtenez un travail de qualité' }
        },
        forProfessionals: {
            title: 'Êtes-vous un professionnel?',
            subtitle: 'Rejoignez notre plateforme et obtenez plus de clients',
            benefits: [
                '✓ Créer un profil professionnel',
                '✓ Accéder à des milliers de clients',
                '✓ Gérer vos commandes facilement',
                '✓ Construire votre réputation via les avis',
                '✓ Paiement sûr et sécurisé'
            ]
        },
        featured: {
            title: 'Professionnels en vedette',
            reviews: 'avis'
        },
        footer: {
            description: 'Plateforme connectant clients et professionnels dans tous les domaines',
            quickLinks: 'Liens rapides',
            support: 'Support',
            followUs: 'Suivez-nous',
            helpCenter: 'Centre d\'aide',
            terms: 'Conditions générales',
            privacy: 'Politique de confidentialité',
            contact: 'Contactez-nous',
            copyright: '© 2024 ServiceHub. Tous droits réservés.'
        }
    }
};

// Current language
let currentLang = 'ar';

// Language switcher
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        switchLanguage(lang);
    });
});

function switchLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];
    
    // Update HTML attributes
    document.documentElement.setAttribute('lang', t.lang);
    document.documentElement.setAttribute('dir', t.dir);
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update content
    document.querySelector('.logo h1').textContent = t.siteName;
    
    // Navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks[0].textContent = t.nav.services;
    navLinks[1].textContent = t.nav.howItWorks;
    navLinks[2].textContent = t.nav.professionals;
    navLinks[3].textContent = t.nav.about;
    
    // Buttons
    document.querySelectorAll('.btn-secondary')[0].textContent = t.buttons.login;
    document.querySelectorAll('.btn-primary')[0].textContent = t.buttons.signup;
    document.querySelector('.btn-search').textContent = t.buttons.search;
    
    // Hero
    document.querySelector('.hero-title').textContent = t.hero.title;
    document.querySelector('.hero-subtitle').textContent = t.hero.subtitle;
    document.querySelector('.search-box input').placeholder = t.hero.searchPlaceholder;
    
    const stats = document.querySelectorAll('.stat-label');
    stats[0].textContent = t.hero.stats.professionals;
    stats[1].textContent = t.hero.stats.clients;
    stats[2].textContent = t.hero.stats.professions;
    
    // Services
    document.querySelectorAll('.section-title')[0].textContent = t.services.title;
    
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceKeys = ['babysitter', 'plumber', 'electrician', 'gardener', 'painter', 'cleaner', 'carpenter', 'mechanic'];
    serviceCards.forEach((card, index) => {
        const key = serviceKeys[index];
        card.querySelector('h3').textContent = t.services[key].name;
        card.querySelector('p').textContent = t.services[key].desc;
    });
    
    // How It Works
    document.querySelectorAll('.section-title')[1].textContent = t.howItWorks.title;
    
    const steps = document.querySelectorAll('.step');
    steps[0].querySelector('h3').textContent = t.howItWorks.step1.title;
    steps[0].querySelector('p').textContent = t.howItWorks.step1.desc;
    steps[1].querySelector('h3').textContent = t.howItWorks.step2.title;
    steps[1].querySelector('p').textContent = t.howItWorks.step2.desc;
    steps[2].querySelector('h3').textContent = t.howItWorks.step3.title;
    steps[2].querySelector('p').textContent = t.howItWorks.step3.desc;
    steps[3].querySelector('h3').textContent = t.howItWorks.step4.title;
    steps[3].querySelector('p').textContent = t.howItWorks.step4.desc;
    
    // For Professionals
    document.querySelector('.professionals-text h2').textContent = t.forProfessionals.title;
    document.querySelector('.professionals-text p').textContent = t.forProfessionals.subtitle;
    
    const benefits = document.querySelectorAll('.benefits-list li');
    t.forProfessionals.benefits.forEach((benefit, index) => {
        benefits[index].textContent = benefit;
    });
    
    document.querySelector('.btn-large').textContent = t.buttons.registerPro;
    
    // Featured Professionals
    document.querySelectorAll('.section-title')[2].textContent = t.featured.title;
    
    document.querySelectorAll('.professional-card .btn-secondary').forEach(btn => {
        btn.textContent = t.buttons.viewProfile;
    });
    
    document.querySelectorAll('.rating-text').forEach(rating => {
        const match = rating.textContent.match(/[\d.]+\s+\((\d+)/);
        if (match) {
            const number = match[1];
            rating.textContent = rating.textContent.replace(/\d+\s+\w+\)/, `${number} ${t.featured.reviews})`);
        }
    });
    
    // Footer
    document.querySelector('.footer-section p').textContent = t.footer.description;
    
    const footerHeadings = document.querySelectorAll('.footer-section h4');
    footerHeadings[0].textContent = t.footer.quickLinks;
    footerHeadings[1].textContent = t.footer.support;
    footerHeadings[2].textContent = t.footer.followUs;
    
    const quickLinks = document.querySelectorAll('.footer-section ul')[0].querySelectorAll('a');
    quickLinks[0].textContent = t.nav.services;
    quickLinks[1].textContent = t.nav.howItWorks;
    quickLinks[2].textContent = t.nav.professionals;
    quickLinks[3].textContent = t.nav.about;
    
    const supportLinks = document.querySelectorAll('.footer-section ul')[1].querySelectorAll('a');
    supportLinks[0].textContent = t.footer.helpCenter;
    supportLinks[1].textContent = t.footer.terms;
    supportLinks[2].textContent = t.footer.privacy;
    supportLinks[3].textContent = t.footer.contact;
    
    document.querySelector('.footer-bottom p').textContent = t.footer.copyright;
}

// Smooth scrolling for navigation links
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

// Search functionality
document.querySelector('.btn-search').addEventListener('click', () => {
    const searchInput = document.querySelector('.search-box input');
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        alert(`${translations[currentLang].buttons.search}: ${searchTerm}`);
        // Here you would implement actual search functionality
    }
});

// Service card click handlers
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
        const serviceName = card.querySelector('h3').textContent;
        alert(`${translations[currentLang].buttons.search}: ${serviceName}`);
        // Here you would navigate to service page
    });
});

// Initialize with Arabic
switchLanguage('ar');
