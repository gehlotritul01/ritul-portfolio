import { useState, useEffect, useRef } from "react";

// ─── DATA (LinkedIn + CV merged) ─────────────────────────────────────────────

const EXPERIENCES = [
{
company: "IBM",
role: "IBMer – Full Stack Developer",
period: "Jul 2024 – Present · 2 yrs",
location: "Mumbai, Maharashtra · On-site",
color: "#00FFD1",
logo: "🔵",
clients: [
{ name: "Mahindra Finance Super App", stack: ["React.js", "Redux Toolkit", "Vite", "REST APIs", "Tailwind CSS", "JS ES6+", "AWS S3"] },
{ name: "Unity Small Finance Bank", stack: ["OpenShift", "IBM API Connect", "DataPower", "MQ", "GitOps", "Argo CD", "Prometheus"] },
{ name: "JSW Mumbai", stack: ["Power BI", "Finlistics", "Microsoft Visio", "SQL", "WatsonX", "Excel"] },
{ name: "IndusInd Bank", stack: ["APIs", "Dynatrace", "ELK", "Jira", "SQL", "OpenShift", "Excel"] },
],
bullets: [
"Built scalable BFSI web apps with React.js, Redux Toolkit & ES6+, delivering high-performance digital banking.",
"End-to-end digital loan journeys: PAN validation, Aadhaar OTP, DigiLocker, Video KYC & nominee workflows.",
"Improved app performance 30–40% via lazy loading, memoization & optimised state management.",
"Integrated REST APIs with robust error handling, async flows & token-based auth across 4 client projects.",
],
},
{
company: "IEEE DTU",
role: "Industrial Relations Coordinator / Member",
period: "Sep 2021 – Feb 2024 · 2 yrs 6 mos",
location: "Delhi, India",
color: "#4FC3F7",
logo: "⚡",
bullets: [
"Served as Industrial Relations Coordinator (Jul 2022 – Jul 2023) and Member (Sep 2021 – Feb 2024).",
"Bridged student community with industry through technical events, workshops and networking initiatives.",
],
},
{
company: "CALIBRE_DTU",
role: "Researcher",
period: "Jan 2022 – Jan 2024 · 2 yrs 1 mo",
location: "Delhi, India · Hybrid",
color: "#7B2FBE",
logo: "🔬",
stack: ["Mixtral 8x7B", "Docker", "Flask", "NumPy", "TensorFlow", "Keras", "Python", "Git", "Big Data", "Data Analysis"],
bullets: [
"Conducted applied AI research with focus on LLMs, deep learning and data science workflows.",
"Built and deployed ML models using Mixtral 8x7B, TensorFlow and Keras in Docker-based environments.",
],
},
{
company: "Microsoft",
role: "Software Engineer – Internship",
period: "May 2023 – Jul 2023 · 3 mos",
location: "Hyderabad, Telangana · On-site",
color: "#00A651",
logo: "🪟",
stack: ["Python", "SQL", "CX", "XAML", "WinRT", "C++", "Git", "GitHub"],
bullets: [
"Windows ED Devices Team — built full-stack Co-pilot file recommendation system.",
"Scaled to 55M+ file share interactions using Python, SQL, C++, WinRT & Git.",
"Integrated NLP-based ML models to analyse file context and improve recommendation accuracy.",
],
},
{
company: "DRDO – Ministry of Defence, Govt. of India",
role: "Summer Internship",
period: "Jun 2022 – Aug 2022 · 3 mos",
location: "Delhi, India",
color: "#F59E0B",
logo: "🛡️",
stack: ["PowerPoint", "Excel", "PSpice", "MATLAB", "RF Design", "Python", "Proteus", "PCB Design", "Arduino"],
bullets: [
"Worked on GaN HEMT-based systems for defense, 5G & industrial high-frequency applications.",
"Designed and tested RF & semiconductor models; built structured datasets for device optimisation.",
],
},
{
company: "Cosmology Club, DTU",
role: "Member of Core Team & SRAD",
period: "Jul 2021 – Jun 2023 · 2 yrs",
location: "Delhi, India",
color: "#A78BFA",
logo: "🌌",
bullets: [
"Core team member of the university cosmology and astronomy club.",
"Contributed to SRAD (Student Research & Development) initiatives.",
],
},
{
company: "Microsoft",
role: "Mentee – Microsoft Intern Engage 2022",
period: "May 2022 – Jun 2022 · 2 mos",
location: "Remote",
color: "#00A651",
logo: "🪟",
stack: ["React", "SearchUI", "Kaggle Dataset", "JavaScript", "HTML", "CSS", "Bootstrap"],
bullets: [
"Selected as mentee in Microsoft Intern Engage 2022 program.",
"Built a search-based application using React, SearchUI and Kaggle datasets.",
],
},
{
company: "ASSETS – Finance & Investment Society of DTU",
role: "Member",
period: "Jan 2022 – Jul 2022 · 7 mos",
location: "Delhi, India",
color: "#F59E0B",
logo: "📈",
bullets: [
"Member of the Finance and Investment Society at DTU.",
"Engaged with finance, investment research and market analysis activities.",
],
},
];

const SKILLS_DATA = [
{ cat: "Frontend", icon: "⚛️", color: "#00FFD1", items: ["React.js", "Redux Toolkit", "TypeScript", "JavaScript ES6+", "Tailwind CSS", "Vite", "HTML5", "CSS3", "Bootstrap"] },
{ cat: "Backend & Microservices", icon: "🖧", color: "#4FC3F7", items: ["Java", "Spring Boot", "Node.js", "Express.js", "RESTful APIs", "Microservices", "Python", "Flask"] },
{ cat: "Database & Storage", icon: "🗄️", color: "#7B2FBE", items: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "SQL"] },
{ cat: "Cloud & DevOps", icon: "☁️", color: "#F59E0B", items: ["AWS S3/EC2", "Red Hat OpenShift", "Kubernetes", "Docker", "Argo CD", "Tekton", "CI/CD", "GitOps", "Helm"] },
{ cat: "AI & LLMs", icon: "🤖", color: "#FF6B9D", items: ["Agentic AI", "LLMs (Claude)", "WatsonX", "Mixtral 8x7B", "Hugging Face", "LSTM / TF", "NLP / NLTK"] },
{ cat: "Observability & Middleware", icon: "📡", color: "#00FFD1", items: ["Dynatrace", "ELK Stack", "Prometheus", "Grafana", "IBM API Connect", "DataPower", "IBM MQ", "Postman"] },
{ cat: "BA & Product", icon: "📋", color: "#4FC3F7", items: ["BRD / FRD", "Stakeholder Mgmt", "Agile / Scrum", "Jira", "Gap Analysis", "Impact Analysis", "UAT", "Finlistics"] },
{ cat: "Data & Analytics", icon: "📊", color: "#7B2FBE", items: ["Power BI", "SQL Analytics", "MATLAB", "NumPy", "PSpice", "Excel Dashboards", "Microsoft Visio"] },
];

const PROJECTS = [
{
title: "Customer Support Chatbot",
sub: "LLM-Based Full Stack Application",
desc: "Full-stack AI chatbot using Flask & interactive UI. Fine-tuned Mixtral 8x7B with Hugging Face Transformers & NLTK. Deployed via Docker with production-ready pipelines.",
tags: ["Flask", "Mixtral 8x7B", "Hugging Face", "Docker", "REST API", "NLP"],
icon: "💬", color: "#00FFD1",
},
{
title: "Next Word Predictor",
sub: "Full Stack ML Application",
desc: "Real-time text prediction using LSTM (TensorFlow/Keras) on Sherlock Holmes corpus. Python backend with lightweight UI, Git-managed deployment.",
tags: ["LSTM", "TensorFlow", "Keras", "Python", "API", "ML"],
icon: "⌨️", color: "#4FC3F7",
},
{
title: "Healthcare Recommender System",
sub: "Full Stack Data Application",
desc: "Classifies & tracks 10+ communicable diseases including COVID-19. Backend pipelines for data processing, model-driven insights & real-time predictions.",
tags: ["Healthcare", "Data Pipelines", "REST API", "Analytics", "ML"],
icon: "🏥", color: "#7B2FBE",
},
{
title: "AI Drive Cycle Prediction for HEV",
sub: "Published · ICEECT-2024",
desc: "AI-based drive cycle prediction for Hybrid Electric Vehicles. Supports energy optimisation and intelligent decision-making. Paper ID: 1229, Record No.: 61758.",
tags: ["AI/ML", "HEV", "Research", "Energy Optimisation", "Published"],
icon: "🚗", color: "#F59E0B", badge: "Published",
},
];

const CERTIFICATIONS = [
{ name: "Academy Accreditation – Databricks Fundamentals", issuer: "Databricks", date: "Jun 2026", color: "#FF4B1F", icon: "🟥", id: "184641774" },
{ name: "Knowledge Sharing for Business Impact", issuer: "IBM", date: "Mar 2026", color: "#00FFD1", icon: "🔵" },
{ name: "DevOps Loop Sales Foundation", issuer: "IBM", date: "Feb 2026", color: "#00FFD1", icon: "🔵" },
{ name: "IBM Z Resiliency", issuer: "IBM", date: "Jan 2026", color: "#00FFD1", icon: "🔵" },
{ name: "IBM Generative AI Foundations", issuer: "IBM", date: "Oct 2025", color: "#00FFD1", icon: "🔵" },
{ name: "watsonx: Technical Essentials", issuer: "IBM", date: "Oct 2025", color: "#00FFD1", icon: "🔵" },
{ name: "IBM Garage Foundation – Foundational", issuer: "IBM", date: "Oct 2025", color: "#00FFD1", icon: "🔵" },
{ name: "Generative AI for Hyperscalers – A Primer", issuer: "IBM", date: "Oct 2025", color: "#00FFD1", icon: "🔵" },
{ name: "Plan Agile with GitHub Projects & Azure Boards", issuer: "Microsoft", date: "Oct 2025", color: "#00A651", icon: "🪟" },
{ name: "Introduction to DevOps", issuer: "Microsoft", date: "Oct 2025", color: "#00A651", icon: "🪟" },
{ name: "Data Science Orientation", issuer: "Coursera", date: "Mar 2024", color: "#4FC3F7", icon: "🎓" },
{ name: "I took the GRE", issuer: "GRE® General Test", date: "Nov 2023", color: "#A78BFA", icon: "📝", id: "87896248" },
{ name: "AWS Certified Data Engineer – Associate", issuer: "Amazon Web Services", date: "Expected Jul 2026", color: "#F59E0B", icon: "🏅", status: "in-progress" },
];

// ─── STAR CANVAS ─────────────────────────────────────────────────────────────

function StarCanvas() {
const ref = useRef(null);
useEffect(() => {
const canvas = ref.current; if (!canvas) return;
const ctx = canvas.getContext("2d");
const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
resize();
window.addEventListener("resize", resize);
const stars = Array.from({ length: 320 }, () => ({
x: Math.random(), y: Math.random(),
r: Math.random() * 1.6 + 0.2,
op: Math.random() * 0.7 + 0.2,
sp: Math.random() * 0.018 + 0.004,
off: Math.random() * Math.PI * 2,
col: Math.random() > 0.82 ? 0 : Math.random() > 0.65 ? 1 : 2,
}));
const mw = Array.from({ length: 700 }, () => ({ x: Math.random(), y: Math.random() * 0.5 + 0.1, r: Math.random() * 0.8, op: Math.random() * 0.18 }));
let t = 0, raf;
const COLS = ["rgba(255,255,255,", "rgba(79,195,247,", "rgba(180,150,255,"];
const draw = () => {
t += 0.007;
const W = canvas.width, H = canvas.height;
ctx.clearRect(0, 0, W, H);
// BG
const bg = ctx.createLinearGradient(0, 0, 0, H);
bg.addColorStop(0, "#010308"); bg.addColorStop(0.45, "#050810"); bg.addColorStop(1, "#020507");
ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
// Milky Way
mw.forEach(p => { ctx.beginPath(); ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(160,130,255,${p.op})`; ctx.fill(); });
// NZ aurora curtains
for (let i = 0; i < 6; i++) {
const y0 = H * (0.68 + i * 0.04);
const g = ctx.createLinearGradient(0, y0, 0, y0 + 100);
const hue = 155 + Math.sin(t * 0.6 + i * 1.1) * 25;
g.addColorStop(0, `hsla(${hue},100%,60%,0)`);
g.addColorStop(0.45, `hsla(${hue},95%,52%,${0.038 + Math.sin(t * 0.5 + i) * 0.014})`);
g.addColorStop(1, `hsla(${hue},100%,45%,0)`);
ctx.fillStyle = g; ctx.fillRect(0, y0, W, 100);
}
// NZ hills
ctx.beginPath(); ctx.moveTo(0, H);
const pts = 10;
for (let i = 0; i <= pts; i++) {
const x = (i / pts) * W;
const hy = H - (32 + Math.sin(i * 1.5) * 20 + Math.sin(i * 0.8 + 0.9) * 12);
if (i === 0) ctx.lineTo(x, hy);
else { const px = ((i - 1) / pts) * W; const py = H - (32 + Math.sin((i - 1) * 1.5) * 20 + Math.sin((i - 1) * 0.8 + 0.9) * 12); ctx.bezierCurveTo(px + W / pts * 0.55, py, x - W / pts * 0.45, hy, x, hy); }
}
ctx.lineTo(W, H); ctx.closePath();
const hg = ctx.createLinearGradient(0, H - 80, 0, H);
hg.addColorStop(0, "rgba(0,18,12,0.95)"); hg.addColorStop(1, "rgba(1,6,4,1)");
ctx.fillStyle = hg; ctx.fill();
// Stars
stars.forEach(s => {
const tw = Math.sin(t * s.sp * 70 + s.off) * 0.38 + 0.62;
ctx.beginPath(); ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
ctx.fillStyle = COLS[s.col] + (s.op * tw) + ")"; ctx.fill();
});
raf = requestAnimationFrame(draw);
};
draw();
return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
}, []);
return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

// ─── TYPEWRITER ───────────────────────────────────────────────────────────────

function TW({ texts, speed = 72 }) {
const [disp, setDisp] = useState("");
const [idx, setIdx] = useState(0);
const [ch, setCh] = useState(0);
const [del, setDel] = useState(false);
useEffect(() => {
const cur = texts[idx]; let tm;
if (!del && ch < cur.length) tm = setTimeout(() => setCh(c => c + 1), speed);
else if (!del && ch === cur.length) tm = setTimeout(() => setDel(true), 2400);
else if (del && ch > 0) tm = setTimeout(() => setCh(c => c - 1), speed / 2.4);
// eslint-disable-next-line react-hooks/set-state-in-effect
else if (del) { setDel(false); setIdx(i => (i + 1) % texts.length); }
setDisp(cur.slice(0, ch));
return () => clearTimeout(tm);
}, [ch, del, idx, texts, speed]);
return <span style={{ color: "#00FFD1" }}>{disp}<span style={{ borderRight: "2px solid #00FFD1", marginLeft: 1, animation: "blink 1s step-end infinite" }}> </span></span>;
}

// ─── NAV ──────────────────────────────────────────────────────────────────────

const NAVS = ["About", "Experience", "Skills", "Projects", "Certifications", "Contact"];

function Nav({ active }) {
const [sc, setSc] = useState(false);
const [open, setOpen] = useState(false);
useEffect(() => { const h = () => setSc(window.scrollY > 50); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
const go = id => { document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };
return (
<nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, background: sc ? "rgba(3,6,14,0.94)" : "transparent", backdropFilter: sc ? "blur(18px)" : "none", borderBottom: sc ? "1px solid rgba(0,255,209,0.07)" : "none", transition: "all 0.3s" }}>
<div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 62 }}>
<div style={{ fontFamily: "'Orbitron',sans-serif", fontWeight: 900, fontSize: "1rem", letterSpacing: 3, color: "#00FFD1", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }} onClick={() => go("About")}>
RG<span style={{ color: "#4FC3F7" }}>.</span>
<span style={{ color: "rgba(255,255,255,0.18)", fontSize: "0.58rem", letterSpacing: 4 }}>PORTFOLIO</span>
</div>
<div style={{ display: "flex", gap: "1.6rem" }} className="nav-desk">
{NAVS.map(n => <button key={n} onClick={() => go(n)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter',sans-serif", fontSize: "0.78rem", fontWeight: 500, letterSpacing: 1.8, textTransform: "uppercase", color: active === n ? "#00FFD1" : "rgba(255,255,255,0.38)", borderBottom: active === n ? "1px solid #00FFD1" : "1px solid transparent", paddingBottom: 2, transition: "color 0.2s" }}>{n}</button>)}
</div>
<button onClick={() => setOpen(o => !o)} className="nav-mob" style={{ background: "none", border: "none", color: "#fff", fontSize: "1.3rem", cursor: "pointer", display: "none" }}>{open ? "✕" : "☰"}</button>
</div>
{open && <div style={{ background: "rgba(3,6,14,0.98)", padding: "1.2rem 1.5rem 1.8rem", display: "flex", flexDirection: "column", gap: "1.2rem", borderBottom: "1px solid rgba(0,255,209,0.1)" }}>
{NAVS.map(n => <button key={n} onClick={() => go(n)} style={{ background: "none", border: "none", color: "#fff", fontFamily: "'Inter',sans-serif", fontSize: "1rem", textAlign: "left", cursor: "pointer" }}>{n}</button>)}
</div>}
</nav>
);
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const Sec = ({ id, children, style = {} }) => (
<section id={id} style={{ position: "relative", zIndex: 10, maxWidth: 1160, margin: "0 auto", padding: "6rem 1.5rem", ...style }}>{children}</section>
);

const SecHead = ({ label, title, sub }) => (
<div style={{ marginBottom: "3.2rem" }}>
<div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.7rem" }}>
<span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.62rem", letterSpacing: 4, color: "#00FFD1", textTransform: "uppercase" }}>{label}</span>
<div style={{ flex: 1, height: 1, background: "linear-gradient(to right,rgba(0,255,209,0.3),transparent)" }} />
</div>
<h2 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "clamp(1.5rem,4vw,2.3rem)", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>{title}</h2>
{sub && <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.9rem", marginTop: "0.5rem" }}>{sub}</p>}
</div>
);

const Tag = ({ label, color = "#00FFD1" }) => {
const rgb = color === "#00FFD1" ? "0,255,209" : color === "#4FC3F7" ? "79,195,247" : color === "#7B2FBE" ? "123,47,190" : color === "#F59E0B" ? "245,158,11" : color === "#00A651" ? "0,166,81" : color === "#A78BFA" ? "167,139,250" : "255,107,157";
return <span style={{ background: `rgba(${rgb},0.09)`, border: `1px solid rgba(${rgb},0.22)`, color: `rgba(${rgb.split(",").map(Number).map(n => Math.min(255, n + 60)).join(",")},0.9)`, padding: "2px 9px", borderRadius: 20, fontSize: "0.71rem", whiteSpace: "nowrap" }}>{label}</span>;
};

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function Portfolio() {
const [active, setActive] = useState("About");
const [expandedExp, setExpandedExp] = useState(null);
const [certFilter, setCertFilter] = useState("All");

useEffect(() => {
const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1)); }), { threshold: 0.2 });
NAVS.forEach(n => { const el = document.getElementById(n.toLowerCase()); if (el) obs.observe(el); });
return () => obs.disconnect();
}, []);

const certIssuers = ["All", ...Array.from(new Set(CERTIFICATIONS.map(c => c.issuer)))];
const filteredCerts = certFilter === "All" ? CERTIFICATIONS : CERTIFICATIONS.filter(c => c.issuer === certFilter);

return (
<div style={{ background: "#030610", color: "#fff", fontFamily: "'Inter',sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
<style>{`
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
@keyframes blink{50%{opacity:0;}}
@keyframes fadeUp{from{opacity:0;transform:translateY(26px);}to{opacity:1;transform:translateY(0);}}
@keyframes pulseGlow{0%,100%{box-shadow:0 0 16px rgba(0,255,209,0.22);}50%{box-shadow:0 0 36px rgba(0,255,209,0.48),0 0 56px rgba(0,255,209,0.12);}}
@keyframes spin{from{transform:rotate(0deg) translateX(88px) rotate(0deg);}to{transform:rotate(360deg) translateX(88px) rotate(-360deg);}}
@keyframes spin2{from{transform:rotate(0deg) translateX(120px) rotate(0deg);}to{transform:rotate(-360deg) translateX(120px) rotate(360deg);}}
.exp-card:hover{border-color:rgba(0,255,209,0.28)!important;transform:translateX(3px);background:rgba(0,255,209,0.03)!important;}
.proj-card:hover{transform:translateY(-5px);box-shadow:0 22px 55px rgba(0,0,0,0.5)!important;}
.cert-card:hover{transform:translateY(-3px);border-color:rgba(0,255,209,0.35)!important;}
.exp-card,.proj-card,.cert-card{transition:all 0.25s ease;}
.skill-pill:hover{filter:brightness(1.4);}
.skill-pill{transition:filter 0.18s;}
@media(max-width:900px){.nav-desk{display:none!important;}.nav-mob{display:block!important;}.grid-4{grid-template-columns:1fr 1fr!important;}.grid-3{grid-template-columns:1fr 1fr!important;}.grid-2{grid-template-columns:1fr!important;}.orbit-deco{display:none!important;}}
@media(max-width:540px){.grid-4,.grid-3{grid-template-columns:1fr!important;}.stats-row{gap:1.5rem!important;}}
::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-track{background:#030610;}::-webkit-scrollbar-thumb{background:rgba(0,255,209,0.25);border-radius:3px;}
`}</style>

<StarCanvas />
<Nav active={active} />

{/* ── HERO ─────────────────────────────────────────────────────── */}
<div id="about" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "0 1.5rem", position: "relative", zIndex: 10 }}>
{/* Orbital ring decoration */}
<div className="orbit-deco" style={{ position: "absolute", right: "7%", top: "50%", transform: "translateY(-50%)", width: 260, height: 260, borderRadius: "50%", border: "1px solid rgba(0,255,209,0.07)" }}>
<div style={{ position: "absolute", inset: 28, borderRadius: "50%", border: "1px solid rgba(79,195,247,0.09)" }}>
<div style={{ position: "absolute", inset: 28, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,255,209,0.1),rgba(79,195,247,0.04))", border: "1px solid rgba(0,255,209,0.18)", animation: "pulseGlow 3.5s ease-in-out infinite" }} />
</div>
<div style={{ position: "absolute", top: "50%", left: "50%", marginTop: -4, marginLeft: -4, width: 8, height: 8, borderRadius: "50%", background: "#00FFD1", boxShadow: "0 0 12px #00FFD1", animation: "spin 7s linear infinite" }} />
<div style={{ position: "absolute", top: "50%", left: "50%", marginTop: -3, marginLeft: -3, width: 6, height: 6, borderRadius: "50%", background: "#4FC3F7", boxShadow: "0 0 10px #4FC3F7", animation: "spin2 11s linear infinite" }} />
</div>

<div style={{ maxWidth: 1160, margin: "0 auto", width: "100%", animation: "fadeUp 0.85s ease forwards" }}>
{/* Status badge */}
<div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: "rgba(0,255,209,0.06)", border: "1px solid rgba(0,255,209,0.18)", borderRadius: 30, padding: "5px 16px", marginBottom: "1.8rem" }}>
<span style={{ width: 7, height: 7, borderRadius: "50%", background: "#00FFD1", display: "inline-block", boxShadow: "0 0 7px #00FFD1" }} />
<span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.6rem", letterSpacing: 3, color: "#00FFD1", textTransform: "uppercase" }}>Open to Work · Mumbai | Hybrid | Remote</span>
</div>

<div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.5rem" }}>
<span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", fontStyle: "italic" }}>She / Her</span>
<span style={{ color: "rgba(0,255,209,0.3)" }}>·</span>
<span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" }}>6,655 followers · 500+ connections</span>
</div>

<h1 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "clamp(2.2rem,7vw,5rem)", fontWeight: 900, lineHeight: 1.07, marginBottom: "1.1rem", letterSpacing: -1 }}>
Ritul<br />
<span style={{ background: "linear-gradient(130deg,#00FFD1 0%,#4FC3F7 45%,#7B2FBE 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Gehlot ऋतुल</span>
</h1>

<div style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(0.95rem,2.4vw,1.35rem)", color: "rgba(255,255,255,0.55)", marginBottom: "1.6rem", minHeight: "2rem" }}>
<TW texts={["Full Stack Developer @ IBM", "BFSI Digital Platform Engineer", "Mobile & Web App Development", "Product & Project Management", "Cloud · APIs · Business Analysis"]} />
</div>

<p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.97rem", lineHeight: 1.88, maxWidth: 540, marginBottom: "2.6rem" }}>
Building enterprise BFSI platforms at IBM across 4 client projects — Mahindra Finance, Unity Small Finance Bank, JSW & IndusInd. Skilled in scalable BFSI apps, cloud-native middleware, and AI-powered solutions.
</p>

<div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3.8rem" }}>
<button onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })} style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", background: "#00FFD1", color: "#030610", border: "none", padding: "0.85rem 2.2rem", borderRadius: 6, cursor: "pointer", animation: "pulseGlow 3s ease-in-out infinite" }}>
View Work
</button>
<a href="https://www.linkedin.com/in/ritul-gehlot" target="_blank" rel="noreferrer" style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", background: "transparent", color: "#4FC3F7", border: "1.5px solid rgba(79,195,247,0.35)", padding: "0.85rem 2.2rem", borderRadius: 6, cursor: "pointer", textDecoration: "none" }}>
LinkedIn
</a>
</div>

<div className="stats-row" style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
{[["2 yrs", "at IBM"], ["4", "Client Projects"], ["12", "Certifications"], ["6,655", "LinkedIn Followers"]].map(([n, l]) => (
<div key={l} style={{ borderLeft: "2px solid rgba(0,255,209,0.25)", paddingLeft: "1rem" }}>
<div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "1.55rem", fontWeight: 900, color: "#00FFD1", lineHeight: 1 }}>{n}</div>
<div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.68rem", letterSpacing: 1.5, textTransform: "uppercase", marginTop: 4 }}>{l}</div>
</div>
))}
</div>
</div>
</div>

{/* ── EXPERIENCE ───────────────────────────────────────────────── */}
<div style={{ position: "relative", zIndex: 10, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
<Sec id="experience">
<SecHead label="Career Timeline" title="Experience (9)" sub="Full-stack engineering, research, and leadership across BFSI, cloud, and AI" />
<div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
{EXPERIENCES.map((e, i) => {
const isOpen = expandedExp === i;
return (
<div key={i} className="exp-card" onClick={() => setExpandedExp(isOpen ? null : i)} style={{ border: "1px solid rgba(255,255,255,0.07)", borderLeft: `3px solid ${e.color}`, borderRadius: 10, padding: "1.6rem 1.8rem", background: "rgba(3,6,14,0.75)", backdropFilter: "blur(10px)", cursor: "pointer" }}>
<div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.4rem" }}>
<div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
<span style={{ fontSize: "1.2rem" }}>{e.logo}</span>
<span style={{ fontFamily: "'Orbitron',sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#fff" }}>{e.company}</span>
</div>
<div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
<span style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.77rem", fontStyle: "italic" }}>{e.period}</span>
<span style={{ color: "#00FFD1", fontSize: "0.8rem" }}>{isOpen ? "▲" : "▼"}</span>
</div>
</div>
<div style={{ color: e.color, fontSize: "0.79rem", fontWeight: 600, letterSpacing: 0.8, marginLeft: "1.9rem", marginBottom: isOpen ? "1rem" : 0 }}>
{e.role} · {e.location}
</div>
{isOpen && (
<div style={{ marginLeft: "1.9rem", marginTop: "0.8rem" }}>
<ul style={{ paddingLeft: "1.2rem", display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1rem" }}>
{e.bullets.map((b, j) => <li key={j} style={{ color: "rgba(255,255,255,0.48)", fontSize: "0.86rem", lineHeight: 1.65 }}>{b}</li>)}
</ul>
{e.clients && (
<div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
{e.clients.map((c, j) => (
<div key={j} style={{ background: "rgba(0,255,209,0.04)", border: "1px solid rgba(0,255,209,0.1)", borderRadius: 8, padding: "0.7rem 1rem" }}>
<div style={{ color: "#00FFD1", fontWeight: 600, fontSize: "0.8rem", marginBottom: "0.5rem" }}>📂 {c.name}</div>
<div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
{c.stack.map((s, k) => <Tag key={k} label={s} color="#00FFD1" />)}
</div>
</div>
))}
</div>
)}
{e.stack && (
<div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "0.5rem" }}>
{e.stack.map((s, k) => <Tag key={k} label={s} color={e.color} />)}
</div>
)}
</div>
)}
</div>
);
})}
</div>
</Sec>
</div>

{/* ── SKILLS ───────────────────────────────────────────────────── */}
<div style={{ position: "relative", zIndex: 10, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
<Sec id="skills">
<SecHead label="Tech Stack" title="Skills & Technologies" />
<div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem" }}>
{SKILLS_DATA.map((s, i) => (
<div key={i} style={{ border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "1.3rem", background: "rgba(3,6,14,0.85)", backdropFilter: "blur(8px)" }}>
<div style={{ display: "flex", alignItems: "center", gap: "0.45rem", marginBottom: "0.9rem" }}>
<span style={{ fontSize: "1.2rem" }}>{s.icon}</span>
<span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.62rem", fontWeight: 700, color: s.color, letterSpacing: 1, textTransform: "uppercase" }}>{s.cat}</span>
</div>
<div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
{s.items.map((item, j) => (
<span key={j} className="skill-pill" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.52)", padding: "2px 8px", borderRadius: 20, fontSize: "0.7rem", cursor: "default" }}>{item}</span>
))}
</div>
</div>
))}
</div>
</Sec>
</div>

{/* ── PROJECTS ─────────────────────────────────────────────────── */}
<div style={{ position: "relative", zIndex: 10, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
<Sec id="projects">
<SecHead label="Built & Published" title="Projects & Research" />
<div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1.3rem" }}>
{PROJECTS.map((p, i) => (
<div key={i} className="proj-card" style={{ border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "1.8rem", background: "rgba(3,6,14,0.85)", backdropFilter: "blur(10px)", position: "relative", overflow: "hidden", boxShadow: "0 8px 28px rgba(0,0,0,0.32)" }}>
<div style={{ position: "absolute", top: 0, right: 0, width: 100, height: 100, background: `radial-gradient(circle at top right,${p.color}15,transparent 68%)` }} />
{p.badge && <span style={{ position: "absolute", top: 14, right: 14, background: `${p.color}18`, color: p.color, padding: "3px 11px", borderRadius: 20, fontSize: "0.68rem", fontWeight: 700, fontFamily: "'Orbitron',sans-serif", letterSpacing: 1, border: `1px solid ${p.color}28` }}>{p.badge}</span>}
<div style={{ fontSize: "1.9rem", marginBottom: "0.7rem" }}>{p.icon}</div>
<div style={{ fontFamily: "'Orbitron',sans-serif", fontWeight: 700, fontSize: "0.92rem", color: "#fff", marginBottom: "0.25rem" }}>{p.title}</div>
<div style={{ color: p.color, fontSize: "0.68rem", letterSpacing: 1, marginBottom: "0.8rem", textTransform: "uppercase", fontWeight: 600 }}>{p.sub}</div>
<p style={{ color: "rgba(255,255,255,0.42)", fontSize: "0.84rem", lineHeight: 1.7, marginBottom: "1.1rem" }}>{p.desc}</p>
<div style={{ display: "flex", flexWrap: "wrap", gap: "0.32rem" }}>
{p.tags.map((t, j) => <Tag key={j} label={t} color={p.color} />)}
</div>
</div>
))}
</div>
</Sec>
</div>

{/* ── CERTIFICATIONS ───────────────────────────────────────────── */}
<div style={{ position: "relative", zIndex: 10, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
<Sec id="certifications">
<SecHead label="Credentials" title={`Licences & Certifications (${CERTIFICATIONS.length})`} sub="Verified credentials from IBM, Microsoft, Databricks, Coursera & more" />

{/* Filter pills */}
<div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
{certIssuers.map(iss => (
<button key={iss} onClick={() => setCertFilter(iss)} style={{ background: certFilter === iss ? "rgba(0,255,209,0.15)" : "rgba(255,255,255,0.04)", border: certFilter === iss ? "1px solid rgba(0,255,209,0.4)" : "1px solid rgba(255,255,255,0.08)", color: certFilter === iss ? "#00FFD1" : "rgba(255,255,255,0.4)", padding: "4px 14px", borderRadius: 20, fontSize: "0.74rem", cursor: "pointer", fontFamily: "'Orbitron',sans-serif", letterSpacing: 1, transition: "all 0.18s" }}>{iss}</button>
))}
</div>

<div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem" }}>
{filteredCerts.map((c, i) => (
<div key={i} className="cert-card" style={{ border: `1px solid ${c.color}20`, borderRadius: 10, padding: "1.4rem", background: "rgba(3,6,14,0.85)", backdropFilter: "blur(8px)", position: "relative", overflow: "hidden" }}>
<div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right,${c.color},transparent)` }} />
<div style={{ fontSize: "1.7rem", marginBottom: "0.8rem" }}>{c.icon}</div>
<div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.78rem", fontWeight: 700, color: "#fff", lineHeight: 1.45, marginBottom: "0.45rem" }}>{c.name}</div>
<div style={{ color: c.color, fontSize: "0.72rem", fontWeight: 600, marginBottom: "0.3rem" }}>{c.issuer}</div>
<div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.72rem" }}>{c.date}</div>
{c.id && <div style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.66rem", marginTop: 3 }}>ID: {c.id}</div>}
{c.status === "in-progress"
? <span style={{ display: "inline-block", marginTop: "0.9rem", background: `${c.color}14`, color: c.color, padding: "3px 11px", borderRadius: 20, fontSize: "0.65rem", fontWeight: 700, fontFamily: "'Orbitron',sans-serif", letterSpacing: 1, border: `1px solid ${c.color}28` }}>IN PROGRESS</span>
: <span style={{ display: "inline-block", marginTop: "0.9rem", background: "rgba(0,255,209,0.07)", color: "#00FFD1", padding: "3px 11px", borderRadius: 20, fontSize: "0.65rem", fontWeight: 700, fontFamily: "'Orbitron',sans-serif", letterSpacing: 1, border: "1px solid rgba(0,255,209,0.18)" }}>✓ VERIFIED</span>}
</div>
))}
</div>
</Sec>
</div>

{/* ── CONTACT ──────────────────────────────────────────────────── */}
<div style={{ position: "relative", zIndex: 10, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
<Sec id="contact">
<div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
<SecHead label="Get In Touch" title={<>Let's <span style={{ background: "linear-gradient(135deg,#00FFD1,#4FC3F7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Connect</span></>} />
<p style={{ color: "rgba(255,255,255,0.38)", lineHeight: 1.88, marginBottom: "3rem", fontSize: "0.94rem" }}>
Open to full-stack engineering, BFSI tech, cloud/AI projects, and product management roles — Mumbai, hybrid, or remote.
</p>
<div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", alignItems: "center" }}>
{[
{ icon: "✉️", label: "gehlotritul01@gmail.com", href: "mailto:gehlotritul01@gmail.com" },
{ icon: "📞", label: "+91 98990 75371", href: "tel:+919899075371" },
{ icon: "🔗", label: "linkedin.com/in/ritul-gehlot", href: "https://www.linkedin.com/in/ritul-gehlot" },
].map((c, i) => (
<a key={i} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
style={{ display: "flex", alignItems: "center", gap: "0.85rem", background: "rgba(0,255,209,0.04)", border: "1px solid rgba(0,255,209,0.13)", color: "rgba(255,255,255,0.78)", padding: "0.95rem 2.5rem", borderRadius: 8, textDecoration: "none", fontWeight: 500, fontSize: "0.93rem", width: "100%", maxWidth: 400, justifyContent: "center", transition: "all 0.2s" }}
onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,255,209,0.09)"; e.currentTarget.style.borderColor = "rgba(0,255,209,0.35)"; }}
onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,255,209,0.04)"; e.currentTarget.style.borderColor = "rgba(0,255,209,0.13)"; }}>
<span>{c.icon}</span>{c.label}
</a>
))}
</div>

{/* Education & extras */}
<div style={{ marginTop: "3.5rem", display: "flex", flexDirection: "column", gap: "0.9rem", alignItems: "center" }}>
{[
{ icon: "🎓", title: "Delhi Technological University (Formerly DCE)", sub: "B.Tech, Electrical & Electronics Engineering · 2020–2024 · Minor: Computer & Data Science", color: "#4FC3F7" },
{ icon: "🤝", title: "Desh Ke Mentor – Volunteer", sub: "Mentored 10+ government school students · Academic & Career guidance", color: "#7B2FBE" },
{ icon: "🌌", title: "Cosmology Club DTU – Core Team & SRAD", sub: "Jul 2021 – Jun 2023 · Student Research & Development", color: "#A78BFA" },
].map((item, i) => (
<div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "1rem", padding: "1.1rem 1.6rem", borderRadius: 10, background: `${item.color}07`, border: `1px solid ${item.color}14`, width: "100%", maxWidth: 500, textAlign: "left" }}>
<span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{item.icon}</span>
<div>
<div style={{ fontFamily: "'Orbitron',sans-serif", fontWeight: 700, fontSize: "0.78rem", color: item.color, lineHeight: 1.4 }}>{item.title}</div>
<div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.74rem", marginTop: 4 }}>{item.sub}</div>
</div>
</div>
))}
</div>
</div>
</Sec>
</div>

{/* Footer */}
<div style={{ position: "relative", zIndex: 10, borderTop: "1px solid rgba(255,255,255,0.04)", padding: "1.8rem", textAlign: "center" }}>
<span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.6rem", letterSpacing: 3, color: "rgba(255,255,255,0.18)", textTransform: "uppercase" }}>
© 2025 Ritul Gehlot ऋतुल · Engineered from the stars 🌌
</span>
</div>
</div>
);
}