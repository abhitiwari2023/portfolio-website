// Festival theme system — auto-detect by date, allow manual override.
// Themes apply CSS variables on :root and toggle a body class for decorations.

const THEMES = {
    default: {
        name: 'Cosmic',
        emoji: '✨',
        vars: {
            '--bg-base': '#06060d',
            '--bg-elev': '#10101f',
            '--accent-1': '#22d3ee',
            '--accent-2': '#8b5cf6',
            '--accent-3': '#ec4899',
            '--blob-1': '#8b5cf6',
            '--blob-2': '#22d3ee',
            '--blob-3': '#ec4899',
            '--grid-color': 'rgba(139, 92, 246, 0.06)',
        }
    },
    republic: {
        name: 'Republic Day',
        emoji: '🇮🇳',
        vars: {
            '--bg-base': '#0a0e1a',
            '--bg-elev': '#101627',
            '--accent-1': '#FF9933',
            '--accent-2': '#FFFFFF',
            '--accent-3': '#138808',
            '--blob-1': '#FF9933',
            '--blob-2': '#1e40af',
            '--blob-3': '#138808',
            '--grid-color': 'rgba(255, 153, 51, 0.06)',
        }
    },
    independence: {
        name: 'Independence Day',
        emoji: '🇮🇳',
        vars: {
            '--bg-base': '#0a0e1a',
            '--bg-elev': '#101627',
            '--accent-1': '#FF9933',
            '--accent-2': '#FFFFFF',
            '--accent-3': '#138808',
            '--blob-1': '#138808',
            '--blob-2': '#FF9933',
            '--blob-3': '#1e40af',
            '--grid-color': 'rgba(19, 136, 8, 0.06)',
        }
    },
    holi: {
        name: 'Holi',
        emoji: '🎨',
        vars: {
            '--bg-base': '#0d0612',
            '--bg-elev': '#1a0f1f',
            '--accent-1': '#fbbf24',
            '--accent-2': '#ec4899',
            '--accent-3': '#22d3ee',
            '--blob-1': '#ec4899',
            '--blob-2': '#22d3ee',
            '--blob-3': '#fbbf24',
            '--grid-color': 'rgba(236, 72, 153, 0.06)',
        }
    },
    diwali: {
        name: 'Diwali',
        emoji: '🪔',
        vars: {
            '--bg-base': '#0d0805',
            '--bg-elev': '#1a0f08',
            '--accent-1': '#FFD700',
            '--accent-2': '#FF6B00',
            '--accent-3': '#FF1744',
            '--blob-1': '#FFD700',
            '--blob-2': '#FF6B00',
            '--blob-3': '#D32F2F',
            '--grid-color': 'rgba(255, 215, 0, 0.08)',
        }
    },
    christmas: {
        name: 'Christmas',
        emoji: '🎄',
        vars: {
            '--bg-base': '#050d08',
            '--bg-elev': '#0a1a10',
            '--accent-1': '#D32F2F',
            '--accent-2': '#2E7D32',
            '--accent-3': '#FFD700',
            '--blob-1': '#D32F2F',
            '--blob-2': '#2E7D32',
            '--blob-3': '#FFFFFF',
            '--grid-color': 'rgba(46, 125, 50, 0.06)',
        }
    },
    newyear: {
        name: 'New Year',
        emoji: '🎆',
        vars: {
            '--bg-base': '#06060d',
            '--bg-elev': '#10101f',
            '--accent-1': '#FFD700',
            '--accent-2': '#C0C0C0',
            '--accent-3': '#8b5cf6',
            '--blob-1': '#FFD700',
            '--blob-2': '#8b5cf6',
            '--blob-3': '#C0C0C0',
            '--grid-color': 'rgba(255, 215, 0, 0.05)',
        }
    },
};

// Festival date table (year-specific because lunar dates shift).
// Edit/extend from admin panel later.
const FESTIVAL_DATES = {
    republic:     { from: '01-26', to: '01-26' },
    holi:         { from: '03-13', to: '03-15' }, // approx, varies by year
    independence: { from: '08-15', to: '08-15' },
    diwali:       { from: '10-19', to: '10-23' }, // approx, varies by year
    christmas:    { from: '12-24', to: '12-26' },
    newyear:      { from: '12-30', to: '01-02' },
};

function inRange(today, from, to) {
    const [fm, fd] = from.split('-').map(Number);
    const [tm, td] = to.split('-').map(Number);
    const m = today.getMonth() + 1;
    const d = today.getDate();
    if (fm <= tm) {
        return (m > fm || (m === fm && d >= fd)) && (m < tm || (m === tm && d <= td));
    }
    // wraps year (e.g. New Year)
    return (m > fm || (m === fm && d >= fd)) || (m < tm || (m === tm && d <= td));
}

function detectFestival(today = new Date()) {
    for (const [key, range] of Object.entries(FESTIVAL_DATES)) {
        if (inRange(today, range.from, range.to)) return key;
    }
    return 'default';
}

function applyTheme(themeKey) {
    const theme = THEMES[themeKey] || THEMES.default;
    const root = document.documentElement;
    Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v));
    document.body.dataset.theme = themeKey;

    // Update theme badge in nav if present
    const badge = document.getElementById('theme-badge');
    if (badge) {
        badge.textContent = `${theme.emoji} ${theme.name}`;
        badge.title = `Active theme: ${theme.name}`;
    }
}

function getEffectiveTheme() {
    // Admin override stored in localStorage takes priority over auto-detect.
    const override = localStorage.getItem('themeOverride');
    if (override && THEMES[override]) return override;
    return detectFestival();
}

function initTheme() {
    applyTheme(getEffectiveTheme());
}

// expose
window.PortfolioThemes = {
    THEMES,
    FESTIVAL_DATES,
    applyTheme,
    detectFestival,
    getEffectiveTheme,
    initTheme,
    setOverride(key) {
        if (key === 'auto' || !key) localStorage.removeItem('themeOverride');
        else localStorage.setItem('themeOverride', key);
        applyTheme(getEffectiveTheme());
    },
    clearOverride() {
        localStorage.removeItem('themeOverride');
        applyTheme(getEffectiveTheme());
    }
};

// Auto-init on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
} else {
    initTheme();
}
