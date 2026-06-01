// Admin panel — login, tab navigation, and CRUD editors for every section.

// Wait for data-layer to load (it's a module loaded in parallel)
const waitForDataLayer = () => new Promise(resolve => {
    const check = () => window.PortfolioData ? resolve() : setTimeout(check, 50);
    check();
});

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));

let currentData = null;
let currentTab = 'hero';

function toast(msg, type = 'success') {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.toggle('error', type === 'error');
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2400);
}

async function save(patch) {
    try {
        await window.PortfolioData.saveContent(patch);
        toast('Saved ✓');
    } catch (e) {
        console.error(e);
        toast('Save failed: ' + e.message, 'error');
    }
}

// ============== EDITORS ==============

function renderHeroEditor() {
    const h = currentData.hero || {};
    return `
        <div class="space-y-5">
            <h2 class="font-display text-2xl font-bold text-white">Hero Section</h2>
            <p class="text-gray-400 text-sm">The first thing visitors see. Headline reads: <em>"${esc(h.line1)} <span class="text-cyan-300">${esc(h.line2)}</span> ${esc(h.line3)} <span class="text-cyan-300">${esc(h.line4)}</span>"</em></p>

            <div class="card space-y-3">
                <div><label>Status Pill Text</label><input id="f-statusText" value="${esc(h.statusText)}"></div>
                <div class="grid grid-cols-2 gap-3">
                    <div><label>Line 1 (plain)</label><input id="f-line1" value="${esc(h.line1)}"></div>
                    <div><label>Line 2 (gradient)</label><input id="f-line2" value="${esc(h.line2)}"></div>
                    <div><label>Line 3 (plain)</label><input id="f-line3" value="${esc(h.line3)}"></div>
                    <div><label>Line 4 (gradient)</label><input id="f-line4" value="${esc(h.line4)}"></div>
                </div>
                <div><label>Tagline / sub-text</label><textarea id="f-tagline" rows="3">${esc(h.tagline)}</textarea></div>
            </div>

            <div class="card">
                <div class="flex items-center justify-between mb-3">
                    <h3 class="font-semibold text-white">Stats (3 cards)</h3>
                </div>
                <div id="stats-list" class="space-y-2"></div>
            </div>

            <button class="btn-primary" onclick="window.adminActions.saveHero()">Save Hero</button>
        </div>
    `;
}

function mountStatsList() {
    const list = document.getElementById('stats-list');
    if (!list) return;
    const stats = (currentData.hero || {}).stats || [];
    list.innerHTML = stats.map((s, i) => `
        <div class="grid grid-cols-[1fr_2fr_auto] gap-2 items-end">
            <div><label>Value</label><input class="stat-value" data-i="${i}" value="${esc(s.value)}"></div>
            <div><label>Label</label><input class="stat-label" data-i="${i}" value="${esc(s.label)}"></div>
            <button class="btn-danger" onclick="window.adminActions.removeStat(${i})">✕</button>
        </div>
    `).join('') + `<button class="btn-ghost text-sm mt-2" onclick="window.adminActions.addStat()">+ Add stat</button>`;
}

function renderAboutEditor() {
    const a = currentData.about || {};
    return `
        <div class="space-y-5">
            <h2 class="font-display text-2xl font-bold text-white">About Section</h2>
            <div class="card space-y-3">
                <div><label>Title</label><input id="f-title" value="${esc(a.title)}"></div>
                <div><label>Subtitle</label><input id="f-subtitle" value="${esc(a.subtitle)}"></div>
                <div><label>Long bio paragraph</label><textarea id="f-longText" rows="5">${esc(a.longText)}</textarea></div>
            </div>
            <div class="card">
                <h3 class="font-semibold text-white mb-3">3 Highlight Cards</h3>
                <div id="about-cards-list" class="space-y-3"></div>
            </div>
            <button class="btn-primary" onclick="window.adminActions.saveAbout()">Save About</button>
        </div>
    `;
}

function mountAboutCardsList() {
    const list = document.getElementById('about-cards-list');
    if (!list) return;
    const cards = (currentData.about || {}).cards || [];
    list.innerHTML = cards.map((c, i) => `
        <div class="border border-white/5 rounded-lg p-3 space-y-2">
            <div class="grid grid-cols-2 gap-2">
                <div><label>Icon</label>
                    <select class="ac-icon" data-i="${i}">
                        <option value="mobile" ${c.icon==='mobile'?'selected':''}>Mobile</option>
                        <option value="bolt" ${c.icon==='bolt'?'selected':''}>Bolt</option>
                        <option value="chart" ${c.icon==='chart'?'selected':''}>Chart</option>
                    </select>
                </div>
                <div><label>Color</label>
                    <select class="ac-color" data-i="${i}">
                        ${['cyan','violet','pink','green','orange'].map(co => `<option value="${co}" ${c.color===co?'selected':''}>${co}</option>`).join('')}
                    </select>
                </div>
            </div>
            <div><label>Title</label><input class="ac-title" data-i="${i}" value="${esc(c.title)}"></div>
            <div><label>Body</label><textarea class="ac-body" data-i="${i}" rows="2">${esc(c.body)}</textarea></div>
        </div>
    `).join('');
}

function renderExperienceEditor() {
    const items = currentData.experience || [];
    return `
        <div class="space-y-5">
            <h2 class="font-display text-2xl font-bold text-white">Experience</h2>
            <p class="text-gray-400 text-sm">Add jobs in reverse chronological order (newest first).</p>
            <div id="exp-list" class="space-y-3">${items.map((e, i) => expCard(e, i)).join('')}</div>
            <div class="flex gap-2">
                <button class="btn-ghost" onclick="window.adminActions.addExperience()">+ Add experience</button>
                <button class="btn-primary" onclick="window.adminActions.saveExperience()">Save Experience</button>
            </div>
        </div>
    `;
}
function expCard(e, i) {
    return `
        <div class="card space-y-2" data-i="${i}">
            <div class="flex justify-between items-center mb-1">
                <strong class="text-white">#${i+1} — ${esc(e.role || 'new role')}</strong>
                <button class="btn-danger" onclick="window.adminActions.removeExperience(${i})">Delete</button>
            </div>
            <div class="grid grid-cols-2 gap-2">
                <div><label>Role</label><input class="ex-role" data-i="${i}" value="${esc(e.role)}"></div>
                <div><label>Company</label><input class="ex-company" data-i="${i}" value="${esc(e.company)}"></div>
                <div><label>Period</label><input class="ex-period" data-i="${i}" value="${esc(e.period)}" placeholder="2024 — Present"></div>
                <div><label>Location</label><input class="ex-location" data-i="${i}" value="${esc(e.location || '')}"></div>
            </div>
            <div><label><input type="checkbox" class="ex-current" data-i="${i}" ${e.current?'checked':''} style="width:auto;"> Current job</label></div>
            <div><label>Bullets (one per line)</label><textarea class="ex-bullets" data-i="${i}" rows="3">${esc((e.bullets || []).join('\n'))}</textarea></div>
        </div>
    `;
}

function renderProjectsEditor() {
    const p = currentData.projects || {};
    const f = p.featured || {};
    const items = p.items || [];
    return `
        <div class="space-y-5">
            <h2 class="font-display text-2xl font-bold text-white">Projects</h2>

            <div class="card space-y-3 border-l-4 border-yellow-500">
                <h3 class="font-semibold text-white">⭐ Featured Project</h3>
                <div class="grid grid-cols-3 gap-2">
                    <div><label>Emoji</label><input id="pf-emoji" value="${esc(f.emoji)}"></div>
                    <div class="col-span-2"><label>Title</label><input id="pf-title" value="${esc(f.title)}"></div>
                </div>
                <div><label>Subtitle</label><input id="pf-subtitle" value="${esc(f.subtitle)}"></div>
                <div><label>Description</label><textarea id="pf-description" rows="3">${esc(f.description)}</textarea></div>
                <div><label>Bullets (one per line)</label><textarea id="pf-bullets" rows="4">${esc((f.bullets || []).join('\n'))}</textarea></div>
                <div><label>Tags (comma separated)</label><input id="pf-tags" value="${esc((f.tags || []).join(', '))}"></div>
                <div class="grid grid-cols-2 gap-2">
                    <div><label>Button URL</label><input id="pf-url" value="${esc(f.url)}"></div>
                    <div><label>Button label</label><input id="pf-urlLabel" value="${esc(f.urlLabel)}"></div>
                </div>
            </div>

            <div class="card">
                <h3 class="font-semibold text-white mb-3">Other Projects</h3>
                <div id="proj-list" class="space-y-3">${items.map((it, i) => projCard(it, i)).join('')}</div>
                <button class="btn-ghost mt-3" onclick="window.adminActions.addProject()">+ Add project</button>
            </div>

            <button class="btn-primary" onclick="window.adminActions.saveProjects()">Save All Projects</button>
        </div>
    `;
}
function projCard(it, i) {
    return `
        <div class="card space-y-2" data-i="${i}">
            <div class="flex justify-between items-center mb-1">
                <strong class="text-white">#${i+1} — ${esc(it.title || 'new project')}</strong>
                <button class="btn-danger" onclick="window.adminActions.removeProject(${i})">Delete</button>
            </div>
            <div class="grid grid-cols-3 gap-2">
                <div><label>Emoji / Icon text</label><input class="pi-emoji" data-i="${i}" value="${esc(it.emoji)}"></div>
                <div class="col-span-2"><label>Title</label><input class="pi-title" data-i="${i}" value="${esc(it.title)}"></div>
            </div>
            <div><label>Description</label><textarea class="pi-description" data-i="${i}" rows="2">${esc(it.description)}</textarea></div>
            <div><label>Bullets (one per line)</label><textarea class="pi-bullets" data-i="${i}" rows="3">${esc((it.bullets || []).join('\n'))}</textarea></div>
            <div class="grid grid-cols-3 gap-2">
                <div><label>Tags (comma)</label><input class="pi-tags" data-i="${i}" value="${esc((it.tags || []).join(', '))}"></div>
                <div><label>Badge text</label><input class="pi-badge" data-i="${i}" value="${esc(it.badge)}"></div>
                <div><label>Color</label>
                    <select class="pi-color" data-i="${i}">
                        ${['cyan','violet','pink','green','orange'].map(co => `<option value="${co}" ${it.color===co?'selected':''}>${co}</option>`).join('')}
                    </select>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-2">
                <div><label>Link URL</label><input class="pi-url" data-i="${i}" value="${esc(it.url)}"></div>
                <div><label>Link label</label><input class="pi-urlLabel" data-i="${i}" value="${esc(it.urlLabel)}"></div>
            </div>
        </div>
    `;
}

function renderSkillsEditor() {
    const cats = currentData.skills || [];
    return `
        <div class="space-y-5">
            <h2 class="font-display text-2xl font-bold text-white">Skills</h2>
            <div id="skills-list" class="space-y-3">${cats.map((c, i) => `
                <div class="card space-y-2" data-i="${i}">
                    <div class="flex justify-between items-center mb-1">
                        <strong class="text-white">${esc(c.title || 'category')}</strong>
                        <button class="btn-danger" onclick="window.adminActions.removeSkillCat(${i})">Delete</button>
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <div><label>Category Title</label><input class="sk-title" data-i="${i}" value="${esc(c.title)}"></div>
                        <div><label>Color</label>
                            <select class="sk-color" data-i="${i}">
                                ${['cyan','violet','pink','green','orange'].map(co => `<option value="${co}" ${c.color===co?'selected':''}>${co}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    <div><label>Items (one per line)</label><textarea class="sk-items" data-i="${i}" rows="4">${esc((c.items || []).join('\n'))}</textarea></div>
                </div>`).join('')}</div>
            <div class="flex gap-2">
                <button class="btn-ghost" onclick="window.adminActions.addSkillCat()">+ Add category</button>
                <button class="btn-primary" onclick="window.adminActions.saveSkills()">Save Skills</button>
            </div>
        </div>
    `;
}

function renderServicesEditor() {
    const items = currentData.services || [];
    return `
        <div class="space-y-5">
            <h2 class="font-display text-2xl font-bold text-white">Services</h2>
            <div id="services-list" class="space-y-3">${items.map((s, i) => `
                <div class="card space-y-2" data-i="${i}">
                    <div class="flex justify-between items-center mb-1">
                        <strong class="text-white">${esc(s.title || 'service')}</strong>
                        <button class="btn-danger" onclick="window.adminActions.removeService(${i})">Delete</button>
                    </div>
                    <div class="grid grid-cols-[80px_1fr] gap-2">
                        <div><label>Icon</label><input class="sv-icon" data-i="${i}" value="${esc(s.icon)}"></div>
                        <div><label>Title</label><input class="sv-title" data-i="${i}" value="${esc(s.title)}"></div>
                    </div>
                    <div><label>Description</label><textarea class="sv-description" data-i="${i}" rows="2">${esc(s.description)}</textarea></div>
                    <div><label>Features (one per line)</label><textarea class="sv-features" data-i="${i}" rows="4">${esc((s.features || []).join('\n'))}</textarea></div>
                </div>`).join('')}</div>
            <div class="flex gap-2">
                <button class="btn-ghost" onclick="window.adminActions.addService()">+ Add service</button>
                <button class="btn-primary" onclick="window.adminActions.saveServices()">Save Services</button>
            </div>
        </div>
    `;
}

function renderEducationEditor() {
    const items = currentData.education || [];
    return `
        <div class="space-y-5">
            <h2 class="font-display text-2xl font-bold text-white">Education</h2>
            <div id="edu-list" class="space-y-3">${items.map((e, i) => `
                <div class="card space-y-2" data-i="${i}">
                    <div class="flex justify-between items-center mb-1">
                        <strong class="text-white">${esc(e.degree || 'degree')}</strong>
                        <button class="btn-danger" onclick="window.adminActions.removeEducation(${i})">Delete</button>
                    </div>
                    <div><label>Degree</label><input class="ed-degree" data-i="${i}" value="${esc(e.degree)}"></div>
                    <div class="grid grid-cols-2 gap-2">
                        <div><label>Institution</label><input class="ed-institution" data-i="${i}" value="${esc(e.institution)}"></div>
                        <div><label>Period</label><input class="ed-period" data-i="${i}" value="${esc(e.period)}"></div>
                    </div>
                    <div><label>Grade / GPA (optional)</label><input class="ed-grade" data-i="${i}" value="${esc(e.grade)}"></div>
                    <div><label>Highlights</label><textarea class="ed-highlights" data-i="${i}" rows="2">${esc(e.highlights)}</textarea></div>
                </div>`).join('')}</div>
            <div class="flex gap-2">
                <button class="btn-ghost" onclick="window.adminActions.addEducation()">+ Add education</button>
                <button class="btn-primary" onclick="window.adminActions.saveEducation()">Save Education</button>
            </div>
        </div>
    `;
}

function renderAchievementsEditor() {
    const items = currentData.achievements || [];
    return `
        <div class="space-y-5">
            <h2 class="font-display text-2xl font-bold text-white">Achievements</h2>
            <div id="ach-list" class="space-y-3">${items.map((a, i) => `
                <div class="card space-y-2" data-i="${i}">
                    <div class="flex justify-between items-center mb-1">
                        <strong class="text-white">${esc(a.title || 'achievement')}</strong>
                        <button class="btn-danger" onclick="window.adminActions.removeAchievement(${i})">Delete</button>
                    </div>
                    <div class="grid grid-cols-[80px_1fr] gap-2">
                        <div><label>Icon</label><input class="ah-icon" data-i="${i}" value="${esc(a.icon)}"></div>
                        <div><label>Title</label><input class="ah-title" data-i="${i}" value="${esc(a.title)}"></div>
                    </div>
                    <div><label>Body</label><textarea class="ah-body" data-i="${i}" rows="2">${esc(a.body)}</textarea></div>
                </div>`).join('')}</div>
            <div class="flex gap-2">
                <button class="btn-ghost" onclick="window.adminActions.addAchievement()">+ Add achievement</button>
                <button class="btn-primary" onclick="window.adminActions.saveAchievements()">Save Achievements</button>
            </div>
        </div>
    `;
}

function renderTestimonialsEditor() {
    const items = currentData.testimonials || [];
    return `
        <div class="space-y-5">
            <h2 class="font-display text-2xl font-bold text-white">Testimonials</h2>
            <div id="t-list" class="space-y-3">${items.map((t, i) => `
                <div class="card space-y-2" data-i="${i}">
                    <div class="flex justify-between items-center mb-1">
                        <strong class="text-white">${esc(t.name || 'testimonial')}</strong>
                        <button class="btn-danger" onclick="window.adminActions.removeTestimonial(${i})">Delete</button>
                    </div>
                    <div class="grid grid-cols-3 gap-2">
                        <div><label>Name</label><input class="t-name" data-i="${i}" value="${esc(t.name)}"></div>
                        <div><label>Role</label><input class="t-role" data-i="${i}" value="${esc(t.role)}"></div>
                        <div><label>Company</label><input class="t-company" data-i="${i}" value="${esc(t.company)}"></div>
                    </div>
                    <div><label>Quote</label><textarea class="t-quote" data-i="${i}" rows="3">${esc(t.quote)}</textarea></div>
                </div>`).join('')}</div>
            <div class="flex gap-2">
                <button class="btn-ghost" onclick="window.adminActions.addTestimonial()">+ Add testimonial</button>
                <button class="btn-primary" onclick="window.adminActions.saveTestimonials()">Save Testimonials</button>
            </div>
        </div>
    `;
}

function renderBlogEditor() {
    const items = currentData.blog || [];
    return `
        <div class="space-y-5">
            <h2 class="font-display text-2xl font-bold text-white">Blog Posts</h2>
            <div id="b-list" class="space-y-3">${items.map((b, i) => `
                <div class="card space-y-2" data-i="${i}">
                    <div class="flex justify-between items-center mb-1">
                        <strong class="text-white">${esc(b.title || 'post')}</strong>
                        <button class="btn-danger" onclick="window.adminActions.removeBlog(${i})">Delete</button>
                    </div>
                    <div><label>Title</label><input class="b-title" data-i="${i}" value="${esc(b.title)}"></div>
                    <div><label>Excerpt</label><textarea class="b-excerpt" data-i="${i}" rows="2">${esc(b.excerpt)}</textarea></div>
                    <div class="grid grid-cols-3 gap-2">
                        <div><label>Date</label><input class="b-date" data-i="${i}" type="date" value="${esc(b.date)}"></div>
                        <div><label>Tag</label><input class="b-tag" data-i="${i}" value="${esc(b.tag)}"></div>
                        <div><label>URL</label><input class="b-url" data-i="${i}" value="${esc(b.url)}"></div>
                    </div>
                </div>`).join('')}</div>
            <div class="flex gap-2">
                <button class="btn-ghost" onclick="window.adminActions.addBlog()">+ Add post</button>
                <button class="btn-primary" onclick="window.adminActions.saveBlog()">Save Blog</button>
            </div>
        </div>
    `;
}

function renderContactEditor() {
    const c = currentData.contact || {};
    return `
        <div class="space-y-5">
            <h2 class="font-display text-2xl font-bold text-white">Contact Info</h2>
            <div class="card space-y-3">
                <div><label>Phone</label><input id="c-phone" value="${esc(c.phone)}"></div>
                <div><label>Email</label><input id="c-email" value="${esc(c.email)}"></div>
                <div><label>Location</label><input id="c-location" value="${esc(c.location)}"></div>
                <div><label>GitHub URL</label><input id="c-github" value="${esc(c.github)}"></div>
                <div><label>LinkedIn URL</label><input id="c-linkedin" value="${esc(c.linkedin)}"></div>
                <div><label>Twitter/X URL</label><input id="c-twitter" value="${esc(c.twitter)}"></div>
            </div>
            <button class="btn-primary" onclick="window.adminActions.saveContact()">Save Contact</button>
        </div>
    `;
}

async function renderThemeEditor() {
    const themes = window.PortfolioThemes.THEMES;
    const current = window.PortfolioThemes.getEffectiveTheme();
    const override = localStorage.getItem('themeOverride') || '';
    return `
        <div class="space-y-5">
            <h2 class="font-display text-2xl font-bold text-white">Theme</h2>
            <p class="text-gray-400 text-sm">Active theme: <strong class="text-white">${themes[current].emoji} ${themes[current].name}</strong></p>

            <div class="card space-y-3">
                <h3 class="font-semibold text-white">Manual Override</h3>
                <p class="text-xs text-gray-400">Force a theme regardless of date. Choose "Auto" to let festival dates take over.</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <button class="btn-ghost text-sm ${!override?'!border-violet-500':''}" onclick="window.adminActions.setTheme('')">🪄 Auto (festival-aware)</button>
                    ${Object.entries(themes).map(([k, t]) => `
                        <button class="btn-ghost text-sm ${override===k?'!border-violet-500':''}" onclick="window.adminActions.setTheme('${k}')">${t.emoji} ${t.name}</button>
                    `).join('')}
                </div>
            </div>

            <div class="card space-y-2">
                <h3 class="font-semibold text-white">Festival Dates (auto-switch windows)</h3>
                <div class="grid grid-cols-2 gap-2 text-sm text-gray-300">
                    ${Object.entries(window.PortfolioThemes.FESTIVAL_DATES).map(([k, r]) => `
                        <div class="flex justify-between border-b border-white/5 py-1">
                            <span>${themes[k]?.emoji || ''} ${themes[k]?.name || k}</span>
                            <span class="text-gray-500">${r.from} → ${r.to}</span>
                        </div>
                    `).join('')}
                </div>
                <p class="text-xs text-gray-500 mt-2">Holi & Diwali dates are approximate — adjust in <code class="bg-black/30 px-1 rounded">assets/js/themes.js</code> each year.</p>
            </div>
        </div>
    `;
}

function renderAdvancedEditor() {
    return `
        <div class="space-y-5">
            <h2 class="font-display text-2xl font-bold text-white">Advanced</h2>

            <div class="card space-y-3">
                <h3 class="font-semibold text-white">Seed defaults</h3>
                <p class="text-sm text-gray-400">Reset all content to the bundled defaults. Useful for a clean start.</p>
                <button class="btn-ghost" onclick="window.adminActions.seedDefaults()">Reset to defaults</button>
            </div>

            <div class="card space-y-3">
                <h3 class="font-semibold text-white">Export / Import JSON</h3>
                <p class="text-sm text-gray-400">Back up all your content, or restore from a backup.</p>
                <div class="flex gap-2">
                    <button class="btn-ghost" onclick="window.adminActions.exportJson()">⬇ Export JSON</button>
                    <label class="btn-ghost cursor-pointer">⬆ Import JSON
                        <input type="file" accept="application/json" onchange="window.adminActions.importJson(event)" style="display:none;width:auto;padding:0;border:0;">
                    </label>
                </div>
            </div>

            <div class="card space-y-2">
                <h3 class="font-semibold text-white">Raw JSON view</h3>
                <textarea readonly rows="14" style="font-family: monospace; font-size: 0.75rem;">${esc(JSON.stringify(currentData, null, 2))}</textarea>
            </div>
        </div>
    `;
}

// ============== ACTIONS ==============

const get = (id) => document.getElementById(id).value;
const getChecked = (id) => document.getElementById(id).checked;
const getAll = (sel) => Array.from(document.querySelectorAll(sel)).map(el => el.value);
const getAllChecked = (sel) => Array.from(document.querySelectorAll(sel)).map(el => el.checked);

window.adminActions = {
    async saveHero() {
        const stats = [];
        const vals = getAll('.stat-value');
        const labs = getAll('.stat-label');
        for (let i = 0; i < vals.length; i++) stats.push({ value: vals[i], label: labs[i] });
        await save({ hero: {
            statusText: get('f-statusText'),
            line1: get('f-line1'), line2: get('f-line2'),
            line3: get('f-line3'), line4: get('f-line4'),
            tagline: get('f-tagline'),
            stats
        }});
    },
    addStat() {
        currentData.hero = currentData.hero || {};
        currentData.hero.stats = currentData.hero.stats || [];
        currentData.hero.stats.push({ value: '0', label: 'New stat' });
        mountStatsList();
    },
    removeStat(i) {
        currentData.hero.stats.splice(i, 1);
        mountStatsList();
    },

    async saveAbout() {
        const cards = [];
        const titles = getAll('.ac-title');
        const bodies = getAll('.ac-body');
        const icons = getAll('.ac-icon');
        const colors = getAll('.ac-color');
        for (let i = 0; i < titles.length; i++) {
            cards.push({ title: titles[i], body: bodies[i], icon: icons[i], color: colors[i] });
        }
        await save({ about: {
            title: get('f-title'),
            subtitle: get('f-subtitle'),
            longText: get('f-longText'),
            cards
        }});
    },

    addExperience() {
        currentData.experience = currentData.experience || [];
        currentData.experience.push({ role: 'New Role', company: 'Company', period: '2025 — Present', location: '', current: false, bullets: [] });
        renderTab('experience');
    },
    removeExperience(i) { currentData.experience.splice(i, 1); renderTab('experience'); },
    async saveExperience() {
        const roles = getAll('.ex-role');
        const cos = getAll('.ex-company');
        const periods = getAll('.ex-period');
        const locs = getAll('.ex-location');
        const currents = getAllChecked('.ex-current');
        const bullets = getAll('.ex-bullets');
        const exp = [];
        for (let i = 0; i < roles.length; i++) {
            exp.push({
                role: roles[i], company: cos[i], period: periods[i],
                location: locs[i], current: currents[i],
                bullets: bullets[i].split('\n').filter(Boolean)
            });
        }
        await save({ experience: exp });
    },

    addProject() {
        currentData.projects = currentData.projects || { featured: {}, items: [] };
        currentData.projects.items = currentData.projects.items || [];
        currentData.projects.items.push({ title: 'New Project', description: '', emoji: '🚀', bullets: [], tags: [], badge: '', color: 'violet', url: '', urlLabel: '' });
        renderTab('projects');
    },
    removeProject(i) { currentData.projects.items.splice(i, 1); renderTab('projects'); },
    async saveProjects() {
        const featured = {
            emoji: get('pf-emoji'), title: get('pf-title'), subtitle: get('pf-subtitle'),
            description: get('pf-description'),
            bullets: get('pf-bullets').split('\n').filter(Boolean),
            tags: get('pf-tags').split(',').map(s => s.trim()).filter(Boolean),
            url: get('pf-url'), urlLabel: get('pf-urlLabel')
        };
        const titles = getAll('.pi-title');
        const items = [];
        for (let i = 0; i < titles.length; i++) {
            items.push({
                emoji: document.querySelectorAll('.pi-emoji')[i].value,
                title: titles[i],
                description: document.querySelectorAll('.pi-description')[i].value,
                bullets: document.querySelectorAll('.pi-bullets')[i].value.split('\n').filter(Boolean),
                tags: document.querySelectorAll('.pi-tags')[i].value.split(',').map(s => s.trim()).filter(Boolean),
                badge: document.querySelectorAll('.pi-badge')[i].value,
                color: document.querySelectorAll('.pi-color')[i].value,
                url: document.querySelectorAll('.pi-url')[i].value,
                urlLabel: document.querySelectorAll('.pi-urlLabel')[i].value
            });
        }
        await save({ projects: { featured, items } });
    },

    addSkillCat() {
        currentData.skills = currentData.skills || [];
        currentData.skills.push({ title: 'New Category', color: 'violet', items: [] });
        renderTab('skills');
    },
    removeSkillCat(i) { currentData.skills.splice(i, 1); renderTab('skills'); },
    async saveSkills() {
        const titles = getAll('.sk-title');
        const colors = getAll('.sk-color');
        const items = getAll('.sk-items');
        const skills = [];
        for (let i = 0; i < titles.length; i++) {
            skills.push({ title: titles[i], color: colors[i], items: items[i].split('\n').filter(Boolean) });
        }
        await save({ skills });
    },

    addService() {
        currentData.services = currentData.services || [];
        currentData.services.push({ icon: '⚡', title: 'New Service', description: '', features: [] });
        renderTab('services');
    },
    removeService(i) { currentData.services.splice(i, 1); renderTab('services'); },
    async saveServices() {
        const icons = getAll('.sv-icon');
        const titles = getAll('.sv-title');
        const descs = getAll('.sv-description');
        const feats = getAll('.sv-features');
        const services = [];
        for (let i = 0; i < icons.length; i++) {
            services.push({ icon: icons[i], title: titles[i], description: descs[i], features: feats[i].split('\n').filter(Boolean) });
        }
        await save({ services });
    },

    addEducation() {
        currentData.education = currentData.education || [];
        currentData.education.push({ degree: 'Degree', institution: 'Institution', period: '', grade: '', highlights: '' });
        renderTab('education');
    },
    removeEducation(i) { currentData.education.splice(i, 1); renderTab('education'); },
    async saveEducation() {
        const degrees = getAll('.ed-degree');
        const insts = getAll('.ed-institution');
        const periods = getAll('.ed-period');
        const grades = getAll('.ed-grade');
        const hs = getAll('.ed-highlights');
        const edu = [];
        for (let i = 0; i < degrees.length; i++) {
            edu.push({ degree: degrees[i], institution: insts[i], period: periods[i], grade: grades[i], highlights: hs[i] });
        }
        await save({ education: edu });
    },

    addAchievement() {
        currentData.achievements = currentData.achievements || [];
        currentData.achievements.push({ icon: '🏆', title: 'New Achievement', body: '' });
        renderTab('achievements');
    },
    removeAchievement(i) { currentData.achievements.splice(i, 1); renderTab('achievements'); },
    async saveAchievements() {
        const icons = getAll('.ah-icon');
        const titles = getAll('.ah-title');
        const bodies = getAll('.ah-body');
        const ach = [];
        for (let i = 0; i < icons.length; i++) ach.push({ icon: icons[i], title: titles[i], body: bodies[i] });
        await save({ achievements: ach });
    },

    addTestimonial() {
        currentData.testimonials = currentData.testimonials || [];
        currentData.testimonials.push({ name: 'New', role: '', company: '', quote: '' });
        renderTab('testimonials');
    },
    removeTestimonial(i) { currentData.testimonials.splice(i, 1); renderTab('testimonials'); },
    async saveTestimonials() {
        const names = getAll('.t-name');
        const roles = getAll('.t-role');
        const cos = getAll('.t-company');
        const quotes = getAll('.t-quote');
        const t = [];
        for (let i = 0; i < names.length; i++) t.push({ name: names[i], role: roles[i], company: cos[i], quote: quotes[i] });
        await save({ testimonials: t });
    },

    addBlog() {
        currentData.blog = currentData.blog || [];
        currentData.blog.push({ title: 'New Post', excerpt: '', date: new Date().toISOString().slice(0, 10), tag: 'Note', url: '#' });
        renderTab('blog');
    },
    removeBlog(i) { currentData.blog.splice(i, 1); renderTab('blog'); },
    async saveBlog() {
        const titles = getAll('.b-title');
        const exc = getAll('.b-excerpt');
        const dates = getAll('.b-date');
        const tags = getAll('.b-tag');
        const urls = getAll('.b-url');
        const blog = [];
        for (let i = 0; i < titles.length; i++) blog.push({ title: titles[i], excerpt: exc[i], date: dates[i], tag: tags[i], url: urls[i] });
        await save({ blog });
    },

    async saveContact() {
        await save({ contact: {
            phone: get('c-phone'), email: get('c-email'), location: get('c-location'),
            github: get('c-github'), linkedin: get('c-linkedin'), twitter: get('c-twitter')
        }});
    },

    setTheme(key) {
        window.PortfolioThemes.setOverride(key);
        toast(key ? `Theme set to ${window.PortfolioThemes.THEMES[key].name}` : 'Auto theme enabled');
        renderTab('theme');
    },

    async seedDefaults() {
        if (!confirm('Reset all content to bundled defaults? This will overwrite everything currently saved.')) return;
        await save(window.DEFAULT_CONTENT);
        toast('Defaults loaded ✓');
    },

    exportJson() {
        const blob = new Blob([JSON.stringify(currentData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `portfolio-content-${new Date().toISOString().slice(0,10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    },

    async importJson(ev) {
        const file = ev.target.files[0];
        if (!file) return;
        try {
            const text = await file.text();
            const data = JSON.parse(text);
            if (!confirm('Overwrite all content with imported JSON?')) return;
            await save(data);
            toast('Imported ✓');
        } catch (e) {
            toast('Invalid JSON: ' + e.message, 'error');
        }
    }
};

// ============== ROUTING ==============

const editors = {
    hero: renderHeroEditor,
    about: renderAboutEditor,
    experience: renderExperienceEditor,
    projects: renderProjectsEditor,
    skills: renderSkillsEditor,
    services: renderServicesEditor,
    education: renderEducationEditor,
    achievements: renderAchievementsEditor,
    testimonials: renderTestimonialsEditor,
    blog: renderBlogEditor,
    contact: renderContactEditor,
    theme: renderThemeEditor,
    advanced: renderAdvancedEditor,
};

async function renderTab(name) {
    currentTab = name;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === name));
    const target = document.getElementById('tab-content');
    const fn = editors[name] || (() => '<p class="text-gray-400">Coming soon.</p>');
    const html = await Promise.resolve(fn());
    target.innerHTML = html;
    if (name === 'hero') mountStatsList();
    if (name === 'about') mountAboutCardsList();
}

// ============== INIT ==============

async function init() {
    await waitForDataLayer();

    const loginView = document.getElementById('login-view');
    const dashView = document.getElementById('dashboard-view');
    const setupWarn = document.getElementById('setup-warning');

    if (!window.PortfolioData.isReady()) {
        setupWarn.classList.remove('hidden');
        document.getElementById('google-login-btn').disabled = true;
        return;
    }

    // Show admin email hint
    const hint = document.getElementById('admin-email-hint');
    const hintEmail = document.getElementById('admin-email-display');
    if (hint && hintEmail) {
        hintEmail.textContent = window.ADMIN_EMAIL;
        hint.classList.remove('hidden');
    }

    window.PortfolioData.onAuthChange(async (user) => {
        if (!user) {
            loginView.classList.remove('hidden');
            dashView.classList.add('hidden');
            return;
        }
        if (user.email !== window.ADMIN_EMAIL) {
            toast('This account is not the admin email', 'error');
            await window.PortfolioData.adminLogout();
            return;
        }
        document.getElementById('user-email').textContent = user.email;
        loginView.classList.add('hidden');
        dashView.classList.remove('hidden');
        currentData = await window.PortfolioData.loadContent();
        renderTab('hero');
    });

    document.getElementById('google-login-btn').addEventListener('click', async () => {
        const err = document.getElementById('login-error');
        err.classList.add('hidden');
        try {
            await window.PortfolioData.adminLogin();
        } catch (e) {
            err.textContent = e.message.replace('Firebase: ', '');
            err.classList.remove('hidden');
        }
    });

    document.getElementById('logout-btn').addEventListener('click', async () => {
        await window.PortfolioData.adminLogout();
    });

    document.querySelectorAll('.tab-btn').forEach(b => {
        b.addEventListener('click', () => renderTab(b.dataset.tab));
    });

    // Live-sync currentData when Firestore changes externally
    window.PortfolioData.subscribeContent((data) => {
        currentData = data;
    });
}

init();
