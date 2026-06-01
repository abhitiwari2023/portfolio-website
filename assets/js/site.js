// Renders all dynamic sections of the public site from content data.
// Subscribes to Firestore (if configured) so admin edits show up live.

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));

const colorMap = {
    cyan: { chip: 'chip-cyan', accent: 'cyan-300', bg: 'from-cyan-500/20 to-cyan-500/5', border: 'cyan-500/20', dot: 'cyan-400' },
    violet: { chip: '', accent: 'violet-300', bg: 'from-violet-500/20 to-violet-500/5', border: 'violet-500/20', dot: 'violet-400' },
    pink: { chip: 'chip-pink', accent: 'pink-300', bg: 'from-pink-500/20 to-pink-500/5', border: 'pink-500/20', dot: 'pink-400' },
    green: { chip: 'chip-green', accent: 'emerald-300', bg: 'from-emerald-500/20 to-emerald-500/5', border: 'emerald-500/20', dot: 'emerald-400' },
    orange: { chip: 'chip-orange', accent: 'orange-300', bg: 'from-orange-500/20 to-orange-500/5', border: 'orange-500/20', dot: 'orange-400' },
};

function renderHero(h) {
    const el = document.getElementById('hero-content');
    if (!el) return;
    el.innerHTML = `
        <div class="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <span class="status-dot"></span>
            <span class="text-sm text-gray-300 font-medium">${esc(h.statusText)}</span>
        </div>
        <h1 class="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">
            <span class="text-white">${esc(h.line1)} </span>
            <span class="text-gradient">${esc(h.line2)}</span><br>
            <span class="text-white">${esc(h.line3)} </span>
            <span class="text-gradient">${esc(h.line4)}</span>
        </h1>
        <p class="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl leading-relaxed">${esc(h.tagline)}</p>
        <div class="flex flex-wrap gap-4 mb-12">
            <a href="#projects" class="btn-glow inline-flex items-center gap-2">View My Work
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
            </a>
            <a href="#contact" class="btn-ghost inline-flex items-center gap-2">Get in Touch</a>
        </div>
        <div class="grid grid-cols-3 gap-4 max-w-lg">
            ${(h.stats || []).map(s => `
                <div class="glass rounded-2xl p-4 text-center">
                    <div class="font-display text-2xl md:text-3xl font-bold text-gradient">${esc(s.value)}</div>
                    <div class="text-xs text-gray-400 mt-1">${esc(s.label)}</div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderAbout(a) {
    const el = document.getElementById('about-content');
    if (!el) return;
    const icons = {
        mobile: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>',
        bolt:   '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>',
        chart:  '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>'
    };
    el.innerHTML = `
        <div class="max-w-3xl mx-auto text-center mb-16">
            <span class="chip mb-4">About Me</span>
            <h2 class="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-4">${esc(a.title).replace(/(builder's mindset|.*$)/, '<span class="text-gradient">$1</span>')}</h2>
            <p class="text-gray-400 text-lg">${esc(a.subtitle)}</p>
        </div>
        <div class="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            ${(a.cards || []).map(c => {
                const cm = colorMap[c.color] || colorMap.violet;
                return `
                <div class="glass-card rounded-2xl p-6">
                    <div class="w-12 h-12 rounded-xl bg-gradient-to-br ${cm.bg} border border-${cm.border} flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-${cm.accent}" fill="none" stroke="currentColor" viewBox="0 0 24 24">${icons[c.icon] || icons.mobile}</svg>
                    </div>
                    <h3 class="font-display text-xl font-bold text-white mb-2">${esc(c.title)}</h3>
                    <p class="text-gray-400 text-sm leading-relaxed">${esc(c.body)}</p>
                </div>`;
            }).join('')}
        </div>
        <div class="max-w-4xl mx-auto mt-12 glass rounded-2xl p-8 md:p-10">
            <p class="text-gray-300 text-lg leading-relaxed">${esc(a.longText)}</p>
        </div>
    `;
}

function renderExperience(items) {
    const el = document.getElementById('experience-content');
    if (!el) return;
    el.innerHTML = `
        <div class="max-w-3xl mx-auto text-center mb-16">
            <span class="chip-pink chip">Experience</span>
            <h2 class="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-4">Where I've <span class="text-gradient">worked</span></h2>
            <p class="text-gray-400 text-lg">A short timeline of the teams I've shipped for.</p>
        </div>
        <div class="max-w-4xl mx-auto relative">
            <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/30 via-violet-500/30 to-pink-500/30 md:-translate-x-1/2"></div>
            ${(items || []).map((e, i) => `
                <div class="relative mb-10 md:mb-12 md:grid md:grid-cols-2 md:gap-8 ${i % 2 === 0 ? '' : 'md:[&>*:first-child]:order-2'}">
                    <div class="absolute left-4 md:left-1/2 top-2 w-3 h-3 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 ring-4 ring-ink-900 md:-translate-x-1/2 z-10"></div>
                    <div class="pl-12 md:pl-0 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}">
                        <span class="chip-cyan chip">${esc(e.period)}</span>
                    </div>
                    <div class="pl-12 md:pl-0 ${i % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'} mt-2 md:mt-0">
                        <div class="glass-card rounded-2xl p-6 ${i % 2 === 0 ? '' : 'md:text-left'}">
                            <div class="flex items-start justify-between gap-3 mb-2">
                                <div>
                                    <h3 class="font-display text-xl font-bold text-white">${esc(e.role)}</h3>
                                    <div class="text-cyan-300 text-sm font-medium">${esc(e.company)}</div>
                                </div>
                                ${e.current ? '<span class="chip-green chip text-[10px]">Current</span>' : ''}
                            </div>
                            <div class="text-xs text-gray-500 mb-3">${esc(e.location || '')}</div>
                            <ul class="space-y-1.5 text-gray-400 text-sm text-left">
                                ${(e.bullets || []).map(b => `<li class="flex items-start gap-2"><span class="text-violet-400 mt-1">▸</span><span>${esc(b)}</span></li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderProjects(p) {
    const el = document.getElementById('projects-content');
    if (!el) return;
    const f = p.featured || {};
    el.innerHTML = `
        <div class="max-w-3xl mx-auto text-center mb-16">
            <span class="chip-cyan chip">Selected Work</span>
            <h2 class="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-4">Projects I've <span class="text-gradient">built</span></h2>
            <p class="text-gray-400 text-lg">A mix of mobile apps, automation pipelines, and internal tooling.</p>
        </div>
        <div class="max-w-6xl mx-auto mb-12">
            <div class="glass-card rounded-3xl p-8 md:p-10 gradient-border relative overflow-hidden">
                <div class="absolute top-6 right-6"><span class="featured-ribbon">★ Featured</span></div>
                <div class="grid md:grid-cols-5 gap-8 items-center">
                    <div class="md:col-span-2">
                        <div class="aspect-square rounded-2xl bg-gradient-to-br from-violet-600 via-pink-500 to-cyan-500 p-1">
                            <div class="w-full h-full rounded-2xl bg-ink-900 flex items-center justify-center relative overflow-hidden">
                                <div class="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-pink-500/10 to-cyan-500/20"></div>
                                <div class="relative text-center">
                                    <div class="text-6xl mb-3">${esc(f.emoji)}</div>
                                    <div class="font-display text-3xl font-bold text-gradient">${esc(f.title)}</div>
                                    <div class="text-sm text-gray-400 mt-2">${esc(f.subtitle)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="md:col-span-3">
                        <div class="flex flex-wrap gap-2 mb-4">
                            ${(f.tags || []).map(t => `<span class="chip-cyan chip">${esc(t)}</span>`).join('')}
                        </div>
                        <h3 class="font-display text-3xl md:text-4xl font-bold text-white mb-4">${esc(f.title)}</h3>
                        <p class="text-gray-300 leading-relaxed mb-4">${esc(f.description)}</p>
                        <ul class="space-y-2 text-gray-400 text-sm mb-6">
                            ${(f.bullets || []).map(b => `<li class="flex items-start gap-2"><span class="text-cyan-400 mt-1">▸</span><span>${esc(b)}</span></li>`).join('')}
                        </ul>
                        ${f.url ? `<a href="${esc(f.url)}" class="btn-glow text-sm inline-flex items-center gap-2">${esc(f.urlLabel || 'Learn more')}
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/></svg></a>` : ''}
                    </div>
                </div>
            </div>
        </div>
        <div class="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            ${(p.items || []).map(item => {
                const cm = colorMap[item.color] || colorMap.violet;
                const emojiBlock = item.emoji && item.emoji.length <= 3
                    ? `<div class="w-14 h-14 rounded-xl bg-gradient-to-br from-${item.color || 'violet'}-500 to-${(item.color === 'pink' ? 'violet' : 'pink')}-500 flex items-center justify-center text-3xl shadow-lg shadow-${item.color || 'violet'}-500/30">${esc(item.emoji)}</div>`
                    : `<div class="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center text-white font-display font-bold text-lg shadow-lg shadow-pink-500/30">${esc(item.emoji)}</div>`;
                return `
                <div class="glass-card rounded-2xl p-7">
                    <div class="flex items-start justify-between mb-4">
                        ${emojiBlock}
                        <div class="flex gap-2">${item.badge ? `<span class="${cm.chip || 'chip'} chip">${esc(item.badge)}</span>` : ''}</div>
                    </div>
                    <h3 class="font-display text-2xl font-bold text-white mb-3">${esc(item.title)}</h3>
                    <p class="text-gray-400 text-sm leading-relaxed mb-4">${esc(item.description)}</p>
                    <ul class="space-y-1.5 text-gray-400 text-sm mb-5">
                        ${(item.bullets || []).map(b => `<li class="flex items-start gap-2"><span class="text-${cm.dot} mt-1">▸</span><span>${esc(b)}</span></li>`).join('')}
                    </ul>
                    <div class="flex items-center justify-between">
                        <div class="flex flex-wrap gap-2">${(item.tags || []).map(t => `<span class="chip">${esc(t)}</span>`).join('')}</div>
                        ${item.url ? `<a href="${esc(item.url)}" target="_blank" class="text-sm text-cyan-300 hover:text-white inline-flex items-center gap-1 group">${esc(item.urlLabel || 'View')}<svg class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></a>` : ''}
                    </div>
                </div>`;
            }).join('')}
        </div>
    `;
}

function renderSkills(skills) {
    const el = document.getElementById('skills-content');
    if (!el) return;
    el.innerHTML = `
        <div class="max-w-3xl mx-auto text-center mb-16">
            <span class="chip-pink chip">Tech Stack</span>
            <h2 class="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-4">Tools I <span class="text-gradient">work with</span></h2>
            <p class="text-gray-400 text-lg">A curated set of languages, frameworks, and tools I rely on day-to-day.</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
            ${(skills || []).map(cat => {
                const cm = colorMap[cat.color] || colorMap.violet;
                return `
                <div class="glass-card rounded-2xl p-6">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-10 h-10 rounded-xl bg-gradient-to-br ${cm.bg} border border-${cm.border} flex items-center justify-center">
                            <span class="w-5 h-5 rounded-full bg-${cm.dot}"></span>
                        </div>
                        <h3 class="font-display text-lg font-bold text-white">${esc(cat.title)}</h3>
                    </div>
                    <ul class="space-y-2 text-gray-300 text-sm">
                        ${(cat.items || []).map(i => `<li class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-${cm.dot}"></span>${esc(i)}</li>`).join('')}
                    </ul>
                </div>`;
            }).join('')}
        </div>
    `;
}

function renderServices(items) {
    const el = document.getElementById('services-content');
    if (!el) return;
    el.innerHTML = `
        <div class="max-w-3xl mx-auto text-center mb-16">
            <span class="chip-cyan chip">What I Offer</span>
            <h2 class="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-4">Services I <span class="text-gradient">provide</span></h2>
            <p class="text-gray-400 text-lg">If you're looking for any of these, let's talk.</p>
        </div>
        <div class="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            ${(items || []).map(s => `
                <div class="glass-card rounded-2xl p-7 flex flex-col">
                    <div class="text-4xl mb-4">${esc(s.icon)}</div>
                    <h3 class="font-display text-xl font-bold text-white mb-2">${esc(s.title)}</h3>
                    <p class="text-gray-400 text-sm leading-relaxed mb-5">${esc(s.description)}</p>
                    <ul class="space-y-2 text-sm text-gray-300 mb-6 flex-1">
                        ${(s.features || []).map(f => `<li class="flex items-start gap-2"><svg class="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg><span>${esc(f)}</span></li>`).join('')}
                    </ul>
                    <a href="#contact" class="btn-ghost text-sm inline-flex items-center justify-center gap-2 mt-auto">Hire for this</a>
                </div>
            `).join('')}
        </div>
    `;
}

function renderEducation(items) {
    const el = document.getElementById('education-content');
    if (!el) return;
    el.innerHTML = `
        <div class="max-w-3xl mx-auto text-center mb-16">
            <span class="chip-green chip">Education</span>
            <h2 class="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-4">My <span class="text-gradient">academic path</span></h2>
        </div>
        <div class="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            ${(items || []).map(e => `
                <div class="glass-card rounded-2xl p-6">
                    <div class="flex items-start gap-4">
                        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                            <svg class="w-6 h-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>
                        </div>
                        <div class="flex-1">
                            <h3 class="font-display text-lg font-bold text-white">${esc(e.degree)}</h3>
                            <div class="text-cyan-300 text-sm font-medium">${esc(e.institution)}</div>
                            <div class="text-xs text-gray-500 mt-1">${esc(e.period)} ${e.grade ? '· ' + esc(e.grade) : ''}</div>
                            ${e.highlights ? `<p class="text-gray-400 text-sm mt-3">${esc(e.highlights)}</p>` : ''}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderAchievements(items) {
    const el = document.getElementById('achievements-content');
    if (!el) return;
    el.innerHTML = `
        <div class="max-w-3xl mx-auto text-center mb-16">
            <span class="chip-orange chip">Achievements</span>
            <h2 class="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-4">Milestones & <span class="text-gradient">recognition</span></h2>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            ${(items || []).map(a => `
                <div class="glass-card rounded-2xl p-6 text-center">
                    <div class="text-4xl mb-3">${esc(a.icon)}</div>
                    <h3 class="font-display text-base font-bold text-white mb-2">${esc(a.title)}</h3>
                    <p class="text-gray-400 text-xs leading-relaxed">${esc(a.body)}</p>
                </div>
            `).join('')}
        </div>
    `;
}

function renderTestimonials(items) {
    const el = document.getElementById('testimonials-content');
    if (!el) return;
    el.innerHTML = `
        <div class="max-w-3xl mx-auto text-center mb-16">
            <span class="chip chip">Kind Words</span>
            <h2 class="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-4">What people <span class="text-gradient">say</span></h2>
        </div>
        <div class="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            ${(items || []).map(t => `
                <div class="glass-card rounded-2xl p-7">
                    <svg class="w-8 h-8 text-violet-400/50 mb-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                    <p class="text-gray-300 leading-relaxed mb-5">"${esc(t.quote)}"</p>
                    <div class="flex items-center gap-3 pt-4 border-t border-white/5">
                        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center font-bold text-white text-sm">${esc((t.name || '?').charAt(0))}</div>
                        <div>
                            <div class="text-white font-semibold text-sm">${esc(t.name)}</div>
                            <div class="text-gray-400 text-xs">${esc(t.role)}${t.company ? ' · ' + esc(t.company) : ''}</div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderBlog(items) {
    const el = document.getElementById('blog-content');
    if (!el) return;
    el.innerHTML = `
        <div class="max-w-3xl mx-auto text-center mb-16">
            <span class="chip-pink chip">Writing</span>
            <h2 class="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-4">From the <span class="text-gradient">blog</span></h2>
            <p class="text-gray-400 text-lg">Notes from building, shipping, and automating.</p>
        </div>
        <div class="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            ${(items || []).map(post => `
                <a href="${esc(post.url || '#')}" class="glass-card rounded-2xl p-7 block group">
                    <div class="flex items-center gap-3 mb-3">
                        <span class="chip-cyan chip">${esc(post.tag || 'Post')}</span>
                        <span class="text-xs text-gray-500">${esc(post.date || '')}</span>
                    </div>
                    <h3 class="font-display text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">${esc(post.title)}</h3>
                    <p class="text-gray-400 text-sm leading-relaxed mb-4">${esc(post.excerpt)}</p>
                    <span class="text-cyan-300 text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">Read more
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </span>
                </a>
            `).join('')}
        </div>
    `;
}

function renderContact(c) {
    // Update only the editable bits of the contact section
    const phone = document.getElementById('contact-phone');
    const email = document.getElementById('contact-email');
    const loc = document.getElementById('contact-location');
    const github = document.getElementById('contact-github');
    const linkedin = document.getElementById('contact-linkedin');
    const twitter = document.getElementById('contact-twitter');
    if (phone) { phone.textContent = c.phone; phone.href = 'tel:' + c.phone.replace(/\s+/g, ''); }
    if (email) { email.textContent = c.email; email.href = 'mailto:' + c.email; }
    if (loc) loc.textContent = c.location;
    if (github) github.href = c.github;
    if (linkedin) linkedin.href = c.linkedin;
    if (twitter) twitter.href = c.twitter;
}

function renderAll(data) {
    renderHero(data.hero);
    renderAbout(data.about);
    renderExperience(data.experience);
    renderProjects(data.projects);
    renderSkills(data.skills);
    renderServices(data.services);
    renderEducation(data.education);
    renderAchievements(data.achievements);
    renderTestimonials(data.testimonials);
    renderBlog(data.blog);
    renderContact(data.contact);

    // Re-trigger reveal animations on freshly rendered nodes
    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    }, 50);
}

// Boot
function boot() {
    // Initial render with defaults so page never looks empty
    renderAll(window.DEFAULT_CONTENT);

    // Then layer in Firestore content if available
    if (window.PortfolioData && window.PortfolioData.isReady()) {
        window.PortfolioData.subscribeContent((data) => renderAll(data));
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
} else {
    boot();
}
