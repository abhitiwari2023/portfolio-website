// Default content shown when Firestore is empty / disabled.
// Used as the seed when admin clicks "Load defaults" in the panel.

window.DEFAULT_CONTENT = {
    hero: {
        statusText: 'Available for opportunities',
        line1: 'Building',
        line2: 'mobile apps',
        line3: '& automation that',
        line4: 'ships.',
        tagline: "I'm Abhishek Tiwari — an Android developer & automation engineer. I built the Stream Loop app, design n8n workflows, and ship internal dashboards that teams actually use.",
        stats: [
            { value: '10+', label: 'Projects Shipped' },
            { value: '3', label: 'Apps on Play Store' },
            { value: '15+', label: 'n8n Workflows' },
        ]
    },

    about: {
        title: "Engineer with a builder's mindset",
        subtitle: 'I turn ideas into shipped products — from native Android apps to backend automation flows.',
        cards: [
            { icon: 'mobile', color: 'cyan', title: 'Android Development', body: 'Native apps with Kotlin, Jetpack Compose, and clean architecture. From idea to Play Store release.' },
            { icon: 'bolt', color: 'violet', title: 'Workflow Automation', body: 'n8n workflows that connect systems, automate repetitive ops, and save teams hours every week.' },
            { icon: 'chart', color: 'pink', title: 'Internal Dashboards', body: 'Internal tools and dashboards that give teams visibility — built for clarity, speed, and real users.' },
        ],
        longText: "I'm a developer with a focus on shipping things that solve real problems. My day-to-day spans native Android development, backend automation with n8n, and internal tooling for the businesses I work with. Currently I'm focused on the Stream Loop app — a project I'm deeply invested in — while building automation workflows and dashboards that quietly do their job in the background."
    },

    experience: [
        {
            company: 'Current Company',
            role: 'Android Developer & Automation Engineer',
            period: 'Present',
            location: 'India',
            current: true,
            bullets: [
                'Leading mobile development for the Stream Loop app — architecture, UI, and release management',
                'Designed 15+ n8n automation workflows replacing manual ops processes',
                'Built internal dashboards giving teams real-time KPI visibility'
            ]
        },
        {
            company: 'Previous Company',
            role: 'Android Developer',
            period: '2023 — 2024',
            location: 'India',
            current: false,
            bullets: [
                'Shipped Android apps for clients across education and local-news verticals',
                'Implemented MVVM + clean architecture across multiple production codebases',
                'Integrated Firebase, push notifications, and analytics into client apps'
            ]
        }
    ],

    education: [
        {
            degree: 'Master of Computer Applications (MCA)',
            institution: 'Your College',
            period: '2022 — 2024',
            grade: '',
            highlights: 'Focused on mobile computing, software architecture, and data structures.'
        },
        {
            degree: 'Bachelor of Computer Applications (BCA)',
            institution: 'Your College',
            period: '2019 — 2022',
            grade: '',
            highlights: 'Built foundational skills in programming, databases, and web development.'
        }
    ],

    services: [
        {
            icon: '📱',
            title: 'Android App Development',
            description: 'Native Android apps in Kotlin/Java with modern architecture. From MVP to Play Store launch.',
            features: ['Kotlin + Jetpack Compose', 'MVVM / Clean Architecture', 'Play Store deployment', 'Post-launch support']
        },
        {
            icon: '⚡',
            title: 'Workflow Automation',
            description: 'n8n workflows that connect your stack and eliminate repetitive manual work.',
            features: ['Custom n8n flows', 'API & webhook integrations', 'Scheduled tasks & alerts', 'CRM / Slack / WhatsApp sync']
        },
        {
            icon: '📊',
            title: 'Internal Dashboards',
            description: 'Internal tools that surface the right data — fast, responsive, role-based.',
            features: ['Real-time data', 'Role-based access', 'Charts & KPIs', 'Mobile-friendly UI']
        }
    ],

    achievements: [
        { icon: '🚀', title: '3 Apps Live on Play Store', body: 'Tavite Group, Local News, and counting — apps used by real users.' },
        { icon: '🏆', title: 'Stream Loop Lead Engineer', body: 'Architected and built the Stream Loop mobile app end-to-end.' },
        { icon: '⚙️', title: '15+ n8n Workflows Deployed', body: 'Automated internal ops, saving the team hours every week.' },
        { icon: '🎓', title: 'MCA Graduate', body: 'Master\'s in Computer Applications with focus on mobile + software architecture.' }
    ],

    testimonials: [
        {
            name: 'Add a real testimonial',
            role: 'Manager / Client',
            company: 'Company name',
            quote: 'Edit this from the admin panel once you have a real quote. Until then this card is a placeholder so the section looks balanced.',
            avatar: ''
        },
        {
            name: 'Another testimonial',
            role: 'Lead / PM',
            company: 'Company name',
            quote: 'Replace me from /admin.html → Testimonials. Short, specific quotes (1-3 sentences) work best — what shipped, what changed, why it mattered.',
            avatar: ''
        }
    ],

    blog: [
        {
            title: 'Building Stream Loop with Jetpack Compose',
            excerpt: 'How I structured a media-heavy Android app using Compose, MVVM, and a clean state layer.',
            date: '2025-08-10',
            url: '#',
            tag: 'Android'
        },
        {
            title: 'My favourite n8n patterns for SaaS ops',
            excerpt: 'Five n8n workflow patterns I use repeatedly to automate lead capture, alerts, and reporting.',
            date: '2025-07-22',
            url: '#',
            tag: 'Automation'
        }
    ],

    contact: {
        phone: '+91 8817835384',
        email: '24.MCA.Abhi@gmail.com',
        location: 'Katni, MP, India',
        github: 'https://github.com/abhitiwari2023',
        linkedin: 'https://www.linkedin.com/in/24-mca-abhi/',
        twitter: 'https://x.com/ind_abhi_tiwari'
    },

    projects: {
        featured: {
            emoji: '🎬',
            title: 'Stream Loop App',
            subtitle: 'Mobile Streaming App',
            description: 'My most significant project — a feature-rich streaming app I\'ve been deeply involved in building end-to-end. From architecture decisions to UI polish, this is where I\'ve put my best engineering work.',
            bullets: [
                'Smooth media playback with seamless looping & background play support',
                'Modern UI built with Jetpack Compose, optimized for performance',
                'Clean architecture with MVVM, repository pattern, and dependency injection',
                'Integrated analytics, push notifications, and authentication flows'
            ],
            tags: ['Android', 'Kotlin', 'Jetpack Compose', 'Firebase'],
            url: '#contact',
            urlLabel: 'Discuss this project'
        },
        items: [
            {
                emoji: 'n8n',
                title: 'n8n Workflow Automations',
                description: 'Designed and deployed a suite of n8n workflows that connect SaaS tools, automate internal ops, and replace manual processes — saving the team measurable hours every week.',
                bullets: [
                    'Lead capture → CRM sync pipelines',
                    'Slack / WhatsApp notification flows',
                    'Scheduled report generation & delivery',
                    'Webhook-driven multi-system integrations'
                ],
                tags: ['n8n', 'Webhooks', 'REST APIs'],
                badge: 'Automation',
                color: 'pink',
                url: '',
                urlLabel: ''
            },
            {
                emoji: '📊',
                title: 'Internal Company Dashboards',
                description: 'Built internal dashboards giving teams real-time visibility into operations, KPIs, and pipeline data. Focused on clarity, fast load times, and surfacing the right data without the noise.',
                bullets: [
                    'Real-time KPI tracking & data visualization',
                    'Role-based access for different team members',
                    'Responsive layouts that work on every device',
                    'Integrated with internal APIs & automation pipelines'
                ],
                tags: ['Web', 'JavaScript', 'Charts'],
                badge: 'Internal Tools',
                color: 'cyan',
                url: '',
                urlLabel: ''
            },
            {
                emoji: '🎓',
                title: 'Tavite Group of Education',
                description: 'My first Play Store launch — a comprehensive educational app for Tavite Group, Katni (MP). Built for students, parents, and faculty to stay connected.',
                bullets: [
                    'Student info, course schedules & grade tracking',
                    'Push notifications for updates & events',
                    'Secure authentication & data encryption'
                ],
                tags: ['Android', 'Java'],
                badge: 'Live on Play Store',
                color: 'green',
                url: 'https://play.google.com/store/apps/details?id=tavitecollege.org',
                urlLabel: 'Play Store'
            },
            {
                emoji: '📰',
                title: 'Local News App',
                description: 'A dynamic local news app delivering real-time, location-based updates with personalized notifications and a clean dark-mode UI.',
                bullets: [
                    'Geolocation-based news personalization',
                    'Search, filters & breaking news alerts',
                    'Built-in analytics for content optimization'
                ],
                tags: ['Android', 'React Native'],
                badge: 'Live on Play Store',
                color: 'green',
                url: 'https://play.google.com/store/apps/details?id=localapp.vsr',
                urlLabel: 'Play Store'
            },
            {
                emoji: '🎵',
                title: 'MP3 Music Player App',
                description: 'A feature-rich MP3 player for Android with smart playlist management, advanced audio controls, multi-format support, and customizable themes.',
                bullets: [
                    'Sleek UI with intuitive navigation',
                    'Smart playlist management',
                    'Equalizer, crossfade & advanced controls',
                    'Multi-format audio support'
                ],
                tags: ['Android', 'Java'],
                badge: 'Open Source',
                color: 'violet',
                url: 'https://github.com/abhitiwari2023/Mp3-music-player-app',
                urlLabel: 'View on GitHub'
            }
        ]
    },

    skills: [
        {
            title: 'Languages',
            color: 'cyan',
            items: ['Kotlin', 'Java', 'Python', 'JavaScript', 'C++']
        },
        {
            title: 'Frameworks',
            color: 'violet',
            items: ['Android SDK', 'Jetpack Compose', 'Flutter', 'React Native']
        },
        {
            title: 'Automation',
            color: 'pink',
            items: ['n8n Workflows', 'Webhooks & APIs', 'Node.js', 'Postgres / MySQL']
        },
        {
            title: 'Architecture',
            color: 'green',
            items: ['MVVM', 'Clean Architecture', 'MVI', 'Repository Pattern']
        },
        {
            title: 'Libraries',
            color: 'orange',
            items: ['Room Database', 'Retrofit', 'Dagger Hilt', 'Coroutines & Flow', 'RxJava']
        },
        {
            title: 'Tools',
            color: 'cyan',
            items: ['Git & GitHub', 'Android Studio', 'Firebase', 'Jira']
        }
    ]
};
