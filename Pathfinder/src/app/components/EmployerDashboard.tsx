import { useState, useEffect, useRef, useCallback } from "react";

const candidates: Record<string, Candidate> = {
  alex: {
    name: "Alex Tan",
    role: "Senior Hardware Engineer",
    currentRole: "Hardware Engineer",
    module: "Talent Pool Re-Engagement Signal",
    currentFit: 57,
    futureFit: 91,
    missingSkill: "KiCad / EMI",
    status: "Gap Bridged",
    statusClass: "green",
    category: ["reengage", "future"],
    lastContact: "12 months ago",
    readiness: "+34%",
    eta: "Ready now",
    dot: "dot-green",
    keySignal: "Organised KiCad PCB workshop + RTL security report",
    scores: [
      ["Match Score", "91%", "+34 pts since last review", "green"],
      ["Warmth Level", "3 / 5", "Engaged opt-in", "amber"],
      ["Urgency", "High", "Senior role open", "blue"],
    ],
    badges: [
      ["Gap Bridged", "green"],
      ["Opted-in · 12 months ago", "orange"],
      ["Role Open Now", "gray"],
    ],
    skills: [
      ["KiCad PCB", 94, "green"],
      ["EMI Mitigation", 88, "green"],
      ["RTL Security", 82, "green"],
      ["Schematic Review", 61, "yellow"],
    ],
    warmth: ["Rejected", "Opted-in", "Upskilled", "Re-engage", "Offer"],
    warmthStage: 3,
    warmthCaption:
      "Alex opted in to light-touch updates 12 months ago. The system detected upskilling signals today: the exact gaps from the earlier rejection are now materially closed.",
    arc: [
      ["12 months ago · rejection log", "Strong foundational logic, but no industrial exposure to KiCad layout and EMI mitigation strategies."],
      ["Today · system alert", "Upskilling detected: organised a 3-day KiCad PCB workshop and authored a report on RTL security risks. The previous gap is now bridged."],
    ],
    recommendation: "High-priority re-engagement. Alex has closed the exact gap recorded in the previous rejection and now matches a live senior hardware role.",
    nextSteps: [
      ["Send targeted email", "Reference the specific KiCad and RTL security signals."],
      ["Offer 20-minute call", "Keep the ask low-friction because the lead is warm."],
      ["Fast-track technical screen", "Focus on EMI and schematic review validation."],
    ],
    risk: "Low risk. The main check is whether the workshop/report demonstrates hands-on industry depth or mainly academic exposure.",
    subjects: {
      direct: "Reconnecting — Senior Hardware Engineering Role",
      warm: "You closed the gap, Alex",
      data: "91% match: Senior Hardware Engineer",
      forward: "Let's revisit your hardware engineering path",
    },
  },
  david: {
    name: "David Lin",
    role: "Junior Embedded Engineer",
    currentRole: "Software Student",
    module: "Inbound Trajectory Analysis",
    currentFit: 23,
    futureFit: 87,
    missingSkill: "Embedded Keywords",
    status: "ATS Missed",
    statusClass: "blue",
    category: ["ats", "future"],
    lastContact: "New inbound",
    readiness: "+64%",
    eta: "~6 months",
    dot: "dot-blue",
    keySignal: "Raspberry Pi + OpenCV line-follower with PID tuning",
    scores: [
      ["Trajectory Score", "87%", "Hardware-bound vector", "blue"],
      ["ATS Score", "23%", "Would be filtered out", "red"],
      ["Gap to Role", "~6 mo", "Estimated ramp time", "amber"],
    ],
    badges: [
      ["High Trajectory Fit", "blue"],
      ["ATS Would Reject", "red"],
      ["Junior Role Match", "gray"],
    ],
    skills: [
      ["C++ Logic", 90, "green"],
      ["HW Integration", 75, "green"],
      ["PID / Sensors", 62, "yellow"],
      ["RTOS", 18, "red"],
    ],
    warmth: ["Applied", "Screened", "Signal Found", "Interview", "Offer"],
    warmthStage: 3,
    warmthCaption: "David lacks standard embedded keywords, but project behaviour shows hardware-constrained problem solving, sensor logic and control-system thinking.",
    arc: [
      ["ATS view — where he has been", 'Resume shows C++ console games and academic software projects. No exact "Embedded Systems" keyword detected.'],
      ["Career OS view — where he is heading", 'Built an autonomous line-follower using Raspberry Pi and OpenCV. Solved wiring constraints through a "Nuclear Swap" motor inversion algorithm and tuned PID constants.'],
    ],
    recommendation: "Do not reject based on ATS score. David is a strong junior embedded prospect if the company can support RTOS ramp-up.",
    nextSteps: [
      ["Invite to technical screen", "Ask him to explain the motor inversion and PID tuning decisions."],
      ["Assign embedded mini-task", "Small RTOS or sensor integration task to test role readiness."],
      ["Map 6-month ramp plan", "Close RTOS and production firmware gaps."],
    ],
    risk: "Medium risk. He has strong trajectory signals but still needs structured RTOS and production embedded experience.",
    subjects: {
      direct: "Junior Embedded Engineer opportunity",
      warm: "Your project work stood out to us",
      data: "Strong project signal for embedded role",
      forward: "A possible next step in embedded engineering",
    },
  },
  amanda: {
    name: "Amanda Lee",
    role: "Product Analyst",
    currentRole: "Data Analyst",
    module: "Future-Fit Talent Pool",
    currentFit: 72,
    futureFit: 94,
    missingSkill: "Tableau",
    status: "Growing",
    statusClass: "orange",
    category: ["reengage", "future"],
    lastContact: "60 days ago",
    readiness: "+13%",
    eta: "2 months",
    dot: "dot-orange",
    keySignal: "Completed Tableau certification and dashboard portfolio",
    scores: [
      ["Current Fit", "72%", "Solid baseline", "blue"],
      ["Future Fit", "94%", "After Tableau proof", "green"],
      ["Readiness", "2 mo", "Portfolio review needed", "amber"],
    ],
    badges: [
      ["Growing", "orange"],
      ["Future-Fit", "green"],
      ["Reconnect", "blue"],
    ],
    skills: [
      ["SQL", 86, "green"],
      ["Tableau", 78, "green"],
      ["Product Metrics", 68, "yellow"],
      ["Stakeholder Comms", 72, "green"],
    ],
    warmth: ["Tracked", "Learned", "Certified", "Reconnect", "Interview"],
    warmthStage: 3,
    warmthCaption: "Amanda's Tableau certification moved her profile closer to the Product Analyst role, making her a good re-engagement target.",
    arc: [
      ["Earlier review", "Strong data foundation, but weaker dashboard and product reporting evidence."],
      ["Recent update", "Completed Tableau certification and added dashboard work that aligns with Product Analyst needs."],
    ],
    recommendation: "Reconnect now while the learning signal is recent. Position the message around Tableau growth and Product Analyst alignment.",
    nextSteps: [
      ["Send reconnect email", "Mention her Tableau certification directly."],
      ["Request portfolio sample", "Validate practical dashboard ability."],
      ["Schedule analyst screen", "Focus on product metrics and communication."],
    ],
    risk: "Low to medium risk. Product thinking still needs validation beyond BI tool proficiency.",
    subjects: {
      direct: "Reconnecting about a Product Analyst role",
      warm: "Amanda, your recent growth stood out",
      data: "Your profile is now 94% aligned",
      forward: "Your Tableau progress opens a new path",
    },
  },
  marcus: {
    name: "Marcus Wong",
    role: "Product Manager",
    currentRole: "Business Analyst",
    module: "Future-Fit Talent Pool",
    currentFit: 68,
    futureFit: 90,
    missingSkill: "Agile",
    status: "Tracking",
    statusClass: "blue",
    category: ["reengage", "future"],
    lastContact: "45 days ago",
    readiness: "+11%",
    eta: "4 months",
    dot: "dot-blue",
    keySignal: "Completed Agile Fundamentals and led sprint documentation",
    scores: [
      ["Current Fit", "68%", "BA experience strong", "blue"],
      ["Future Fit", "90%", "PM trajectory visible", "green"],
      ["Readiness", "4 mo", "Needs ownership proof", "amber"],
    ],
    badges: [
      ["Tracking", "blue"],
      ["Agile Growth", "green"],
      ["PM Path", "gray"],
    ],
    skills: [
      ["Requirements", 84, "green"],
      ["Agile", 74, "green"],
      ["Roadmapping", 55, "yellow"],
      ["Leadership", 49, "yellow"],
    ],
    warmth: ["Tracked", "Agile Signal", "Nurture", "Reconnect", "Interview"],
    warmthStage: 2,
    warmthCaption: "Marcus has moved from business analysis toward product management, but still needs stronger ownership signals.",
    arc: [
      ["Earlier review", "Good requirements and stakeholder background, but insufficient Agile and product ownership evidence."],
      ["Recent update", "Completed Agile Fundamentals and showed stronger sprint coordination behaviour."],
    ],
    recommendation: "Keep nurturing for 4 months unless a junior PM opening appears. Reconnect with a career-goal conversation rather than direct offer.",
    nextSteps: [
      ["Send nurture email", "Ask about PM direction and recent Agile work."],
      ["Suggest portfolio proof", "Request roadmap or sprint artefact examples."],
      ["Review in 60 days", "Check whether ownership signals improve."],
    ],
    risk: "Medium risk. Agile training alone does not prove product decision-making ability.",
    subjects: {
      direct: "Reconnecting about your Product Manager path",
      warm: "Marcus, your Agile progress caught our attention",
      data: "90% future-fit for Product Manager track",
      forward: "Your BA experience can move toward product",
    },
  },
  sarah: {
    name: "Sarah Ng",
    role: "Senior Product Analyst",
    currentRole: "Junior Analyst",
    module: "Talent Pool Alert",
    currentFit: 75,
    futureFit: 92,
    missingSkill: "Product Analytics",
    status: "High Potential",
    statusClass: "green",
    category: ["reengage", "future"],
    lastContact: "30 days ago",
    readiness: "+17%",
    eta: "3 months",
    dot: "dot-green",
    keySignal: "Built product analytics case study and cohort dashboard",
    scores: [
      ["Current Fit", "75%", "Strong analyst baseline", "blue"],
      ["Future Fit", "92%", "High potential", "green"],
      ["Urgency", "Medium", "Interview soon", "amber"],
    ],
    badges: [
      ["High Potential", "green"],
      ["Interview Recommended", "blue"],
      ["Recent Growth", "orange"],
    ],
    skills: [
      ["Analytics", 88, "green"],
      ["Cohort Analysis", 81, "green"],
      ["Product Sense", 66, "yellow"],
      ["Experiment Design", 54, "yellow"],
    ],
    warmth: ["Tracked", "Case Study", "Growth Signal", "Interview", "Offer"],
    warmthStage: 3,
    warmthCaption: "Sarah's recent product analytics case study makes her the strongest near-term analyst re-engagement candidate.",
    arc: [
      ["Earlier review", "Good junior analyst profile, but little product-context evidence."],
      ["Recent update", "Built a product analytics case study with cohort dashboard and stronger business interpretation."],
    ],
    recommendation: "Interview Sarah soon. Her growth signal is fresh and her future-fit score is already above 90%.",
    nextSteps: [
      ["Invite to interview", "Use her case study as conversation anchor."],
      ["Test product judgement", "Ask experiment and metrics trade-off questions."],
      ["Compare with Amanda", "Decide whether analyst or product analyst track fits better."],
    ],
    risk: "Medium-low risk. Needs validation on experiment design and product decision-making.",
    subjects: {
      direct: "Interview opportunity for Senior Product Analyst track",
      warm: "Sarah, your product analytics work stood out",
      data: "92% future-fit for Senior Product Analyst",
      forward: "Your analytics work is moving toward product impact",
    },
  },
};

type Candidate = {
  name: string;
  role: string;
  currentRole: string;
  module: string;
  currentFit: number;
  futureFit: number;
  missingSkill: string;
  status: string;
  statusClass: string;
  category: string[];
  lastContact: string;
  readiness: string;
  eta: string;
  dot: string;
  keySignal: string;
  scores: [string, string, string, string][];
  badges: [string, string][];
  skills: [string, number, string][];
  warmth: string[];
  warmthStage: number;
  warmthCaption: string;
  arc: [string, string][];
  recommendation: string;
  nextSteps: [string, string][];
  risk: string;
  subjects: Record<string, string>;
};

const TECH_TERMS = ["KiCad", "RTL security", "Raspberry Pi", "OpenCV", "Nuclear Swap", "PID", "Tableau", "Agile", "cohort dashboard"];

function highlightTech(text: string) {
  let parts: (string | JSX.Element)[] = [text];
  TECH_TERMS.forEach((term) => {
    parts = parts.flatMap((part) => {
      if (typeof part !== "string") return [part];
      const segments = part.split(term);
      return segments.flatMap((seg, i) =>
        i < segments.length - 1
          ? [seg, <span key={`${term}-${i}`} style={{ display: "inline-flex", padding: "2px 7px", borderRadius: 6, border: "1px solid #cbd5e1", background: "#f8fafc", fontSize: 12, fontWeight: 700 }}>{term}</span>]
          : [seg]
      );
    });
  });
  return <>{parts}</>;
}

function Badge({ text, cls }: { text: string; cls: string }) {
  const styles: Record<string, React.CSSProperties> = {
    green: { background: "#dcfce7", color: "#166534", borderColor: "#bbf7d0" },
    orange: { background: "#ffedd5", color: "#9a3412", borderColor: "#fed7aa" },
    blue: { background: "#dbeafe", color: "#1e40af", borderColor: "#bfdbfe" },
    gray: { background: "#f8fafc", color: "#64748b", borderColor: "#e2e8f0" },
    red: { background: "#fee2e2", color: "#991b1b", borderColor: "#fecaca" },
    amber: { background: "#fef3c7", color: "#92400e", borderColor: "#fde68a" },
  };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 11px", borderRadius: 999, fontSize: 11, fontWeight: 700, border: "1px solid transparent", whiteSpace: "nowrap", ...styles[cls] }}>
      {text}
    </span>
  );
}

function Dot({ type }: { type: string }) {
  const colors: Record<string, string> = {
    "dot-green": "#22c55e",
    "dot-blue": "#60a5fa",
    "dot-orange": "#f97316",
    "dot-gray": "#64748b",
  };
  return <span style={{ width: 9, height: 9, borderRadius: "50%", background: colors[type] || "#64748b", display: "inline-block", flexShrink: 0 }} />;
}

function messageBody(c: Candidate, id: string, tone: string): string {
  const firstName = c.name.split(" ")[0];
  const direct: Record<string, string> = {
    alex: `Hi Alex,\n\nIt's been about a year since we last spoke. At that time, the main gap was KiCad and EMI experience.\n\nWe noticed your recent KiCad PCB workshop and RTL security report. Those are exactly the signals we were hoping to see.\n\nA Senior Hardware Engineer role is open now, and your profile is a strong match. Would you be open to a 20-minute call this week?\n\nBest regards,\nTechNova Hiring Team`,
    david: `Hi David,\n\nMost screening systems would have missed your profile because it lacks standard embedded keywords.\n\nWe looked closer at your Raspberry Pi line-follower, especially the Nuclear Swap motor inversion logic and PID tuning. That shows real embedded thinking.\n\nWe have a Junior Embedded Engineer opening and would like to speak with you. Are you open to a quick call this week?\n\nBest regards,\nTechNova Hiring Team`,
    amanda: `Hi Amanda,\n\nWe noticed your recent Tableau certification and updated dashboard work.\n\nYour profile now aligns much more closely with our Product Analyst role. We would like to reconnect and explore whether this opportunity fits your current goals.\n\nWould you be open to a short conversation this week?\n\nBest regards,\nTechNova Hiring Team`,
    marcus: `Hi Marcus,\n\nWe noticed your recent Agile Fundamentals training and continued project coordination experience.\n\nYour profile is developing toward our Product Manager track. We would like to reconnect and understand your current career goals.\n\nWould you be open to a short conversation?\n\nBest regards,\nTechNova Hiring Team`,
    sarah: `Hi Sarah,\n\nYour recent product analytics case study and cohort dashboard stood out to our team.\n\nYour profile now aligns strongly with our Senior Product Analyst track. We would like to invite you to discuss the opportunity.\n\nWould you be available for a short interview conversation?\n\nBest regards,\nTechNova Hiring Team`,
  };
  if (tone === "warm")
    return `Hi ${firstName},\n\nWe have been following your professional growth, and your recent progress genuinely stood out.\n\n${c.keySignal}. That signal makes your profile much more aligned with the ${c.role} path than before.\n\nWe would love to reconnect, learn what you are working toward now, and see whether there is a good fit with TechNova.\n\nBest regards,\nTechNova Hiring Team`;
  if (tone === "data")
    return `Hi ${firstName},\n\nWe reviewed your updated profile and noticed stronger alignment with the ${c.role} track.\n\nThe main improvement is: ${c.keySignal}.\n\nThis makes your profile more relevant than before. Would you be open to a short conversation this week?\n\nBest regards,\nTechNova Hiring Team`;
  if (tone === "forward")
    return `Hi ${firstName},\n\nYour recent growth suggests a clear next step toward ${c.role}.\n\nWhat stood out was this signal: ${c.keySignal}. It shows that your profile is not standing still — it is moving toward the role we are hiring for.\n\nWe would like to reconnect and discuss how this path could fit with TechNova.\n\nBest regards,\nTechNova Hiring Team`;
  return direct[id] || direct.amanda;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

export function EmployerDashboard() {
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCandidateId, setActiveCandidateId] = useState("alex");
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("dashboard");
  const [tone, setTone] = useState("direct");
  const [assistantCandidateId, setAssistantCandidateId] = useState("alex");
  const [messageText, setMessageText] = useState("");
  const [subject, setSubject] = useState("");
  const [regenCount, setRegenCount] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [skillWidths, setSkillWidths] = useState<number[]>([]);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const isMobile = useIsMobile();

  const showToast = useCallback((text: string) => {
    setToast(text);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setSidebarOpen(false);
    setTimeout(() => {
      sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const activeCandidate = candidates[activeCandidateId];

  useEffect(() => {
    setSkillWidths(new Array(activeCandidate.skills.length).fill(0));
    const timers = activeCandidate.skills.map((_, i) =>
      setTimeout(() => {
        setSkillWidths((prev) => {
          const next = [...prev];
          next[i] = activeCandidate.skills[i][1] as number;
          return next;
        });
      }, i * 140)
    );
    return () => timers.forEach(clearTimeout);
  }, [activeCandidateId]);

  useEffect(() => {
    const c = candidates[assistantCandidateId];
    setSubject(`Subject: ${c.subjects[tone]}`);
    setMessageText(messageBody(c, assistantCandidateId, tone));
    setRegenCount(0);
  }, [assistantCandidateId, tone]);

  const handleRegenerate = () => {
    const c = candidates[assistantCandidateId];
    const firstName = c.name.split(" ")[0];
    const newCount = regenCount + 1;
    setRegenCount(newCount);
    const variants = [
      messageBody(c, assistantCandidateId, tone),
      `Hi ${firstName},\n\nI wanted to personally reconnect because your profile has changed in a meaningful way.\n\nThe key signal we noticed was: ${c.keySignal}. This directly improves your fit for the ${c.role} opportunity.\n\nYour recent progress makes your profile worth revisiting for this role.\n\nWould you be open to a 20-minute call this week?\n\nBest regards,\nTechNova Hiring Team`,
      `Hi ${firstName},\n\nYour recent progress caught our attention.\n\nFor the ${c.role} role, we are looking for evidence of growth, practical problem-solving and role direction. Your strongest signal is: ${c.keySignal}.\n\nWe would like to reconnect and explore whether this opportunity matches your current plans.\n\nBest regards,\nTechNova Hiring Team`,
    ];
    setSubject(`Subject: ${c.subjects[tone]}`);
    setMessageText(variants[newCount % variants.length]);
    showToast("New draft generated");
  };

  const handleCopy = async () => {
    const full = `${subject}\n\n${messageText}`;
    try {
      await navigator.clipboard.writeText(full);
      showToast("Draft copied to clipboard");
    } catch {
      showToast("Select text manually if clipboard is blocked");
    }
  };

  const filteredCandidates = Object.entries(candidates).filter(([, c]) => {
    const q = searchQuery.toLowerCase().trim();
    const text = `${c.name} ${c.role} ${c.currentRole} ${c.missingSkill} ${c.keySignal} ${c.status}`.toLowerCase();
    return (!q || text.includes(q)) && (activeFilter === "all" || c.category.includes(activeFilter));
  });

  const css = dark
    ? { "--bg": "#020617", "--surface": "#0f172a", "--surface-soft": "#111827", "--text": "#e5e7eb", "--muted": "#94a3b8", "--hint": "#64748b", "--border": "#1e293b", "--border-strong": "#334155", "--shadow": "0 8px 24px rgba(0,0,0,.22)" }
    : { "--bg": "#f5f7fb", "--surface": "#ffffff", "--surface-soft": "#f8fafc", "--text": "#111827", "--muted": "#64748b", "--hint": "#94a3b8", "--border": "#e2e8f0", "--border-strong": "#cbd5e1", "--shadow": "0 8px 24px rgba(15,23,42,.08)" };

  const v = (name: string) => `var(${name})`;
  const scoreColor = (type: string) =>
    type === "green" ? "#16a34a" : type === "red" ? "#dc2626" : type === "amber" ? "#92400e" : "#2563eb";
  const fillColor = (cls: string) =>
    cls === "green" ? "#22c55e" : cls === "yellow" ? "#f59e0b" : "#ef4444";

  const navItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "matching", label: "Talent Matching" },
    { id: "intelligence", label: "Candidate Profile" },
    { id: "reengagement", label: "Re-Engagement" },
    { id: "assistant", label: "Message Drafts" },
  ];

  const SIDEBAR_WIDTH = 270;

  const SidebarContent = () => (
    <>
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); scrollToSection("dashboard"); }}
        style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 22, fontWeight: 700, marginBottom: 28, padding: "4px 8px", color: "#fff", textDecoration: "none" }}
      >
        <div style={{ width: 36, height: 36, display: "grid", placeItems: "center", borderRadius: 11, background: "linear-gradient(135deg,#2563eb,#22c55e)", boxShadow: "0 8px 20px rgba(37,99,235,.32)", flexShrink: 0 }}>PF</div>
        <span>PathFinder</span>
      </a>

      <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: ".9px", padding: "8px 10px" }}>Workspace</div>
      {navItems.map((item) => (
        <button key={item.id} onClick={() => scrollToSection(item.id)} style={{ width: "100%", border: 0, background: activeSection === item.id ? "#1e293b" : "transparent", color: "#cbd5e1", textAlign: "left", cursor: "pointer", borderRadius: 12, padding: "13px 12px", marginBottom: 3, display: "flex", alignItems: "center", fontSize: 14, opacity: activeSection === item.id ? 1 : 0.88, transition: ".18s ease" }}>
          {item.label}
        </button>
      ))}

      <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: ".9px", padding: "18px 10px 8px" }}>Live Signals</div>
      {Object.entries(candidates).map(([id, c]) => (
        <button key={id} onClick={() => { setActiveCandidateId(id); scrollToSection("intelligence"); }} style={{ width: "100%", border: activeCandidateId === id ? "1px solid #334155" : "1px solid transparent", background: activeCandidateId === id ? "#1e293b" : "transparent", color: "#cbd5e1", textAlign: "left", cursor: "pointer", borderRadius: 12, padding: "13px 12px", marginBottom: 8, transition: ".18s ease" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#e2e8f0", fontWeight: 600, fontSize: 13, marginBottom: 3 }}>
            {c.name}<Dot type={c.dot} />
          </div>
          <div style={{ color: "#94a3b8", fontSize: 11, lineHeight: 1.45 }}>{c.status} · {c.role}</div>
        </button>
      ))}

      <div style={{ marginTop: 20, background: "#111827", border: "1px solid #1f2937", borderRadius: 14, padding: 14 }}>
        <div style={{ fontSize: 12, marginBottom: 8, color: "#e2e8f0", fontWeight: 600 }}>Dashboard Focus</div>
        <p style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.55 }}>Track candidate fit, skill progress, warm leads and recruiter-ready outreach in one clean dashboard.</p>
      </div>
    </>
  );

  return (
    <div style={{ fontFamily: "'Poppins', system-ui, sans-serif", background: v("--bg"), color: v("--text"), minHeight: "100vh", ...css } as React.CSSProperties}>

      {/* Desktop sidebar */}
      {!isMobile && (
        <aside style={{ position: "fixed", inset: "0 auto 0 0", width: SIDEBAR_WIDTH, height: "100vh", background: "#0f172a", color: "#fff", padding: "24px 18px", overflowY: "auto", zIndex: 20 }}>
          <SidebarContent />
        </aside>
      )}

      {/* Mobile header */}
      {isMobile && (
        <header style={{ position: "fixed", top: 0, left: 0, right: 0, height: 56, background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", zIndex: 30 }}>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection("dashboard"); }} style={{ display: "flex", alignItems: "center", gap: 10, color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 18 }}>
            <div style={{ width: 30, height: 30, display: "grid", placeItems: "center", borderRadius: 9, background: "linear-gradient(135deg,#2563eb,#22c55e)", flexShrink: 0, fontSize: 12, fontWeight: 700 }}>PF</div>
            PathFinder
          </a>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "transparent", border: 0, color: "#fff", cursor: "pointer", fontSize: 22, padding: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {sidebarOpen ? "✕" : "☰"}
          </button>
        </header>
      )}

      {/* Mobile slide-out drawer */}
      {isMobile && sidebarOpen && (
        <>
          <div onClick={() => setSidebarOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", zIndex: 40 }} />
          <aside style={{ position: "fixed", top: 0, left: 0, bottom: 0, width: 280, background: "#0f172a", color: "#fff", padding: "16px 18px", overflowY: "auto", zIndex: 50, transform: "translateX(0)", transition: ".25s ease" }}>
            <SidebarContent />
          </aside>
        </>
      )}

      {/* Main content */}
      <main style={{ marginLeft: isMobile ? 0 : SIDEBAR_WIDTH, padding: isMobile ? "72px 16px 24px" : 28, minHeight: "100vh" }}>

        {/* Dashboard */}
        <section ref={(el) => { sectionRefs.current["dashboard"] = el; }} id="dashboard">
          <div style={{ display: "flex", alignItems: isMobile ? "stretch" : "flex-start", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", gap: 16, marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 12, color: "#2563eb", fontWeight: 700, letterSpacing: ".7px", textTransform: "uppercase", marginBottom: 6 }}>Employer Workspace</div>
              <h1 style={{ fontSize: isMobile ? 22 : 30, lineHeight: 1.15, marginBottom: 6, fontWeight: 700 }}>Talent Re-Engagement Dashboard</h1>
              <p style={{ color: v("--muted"), fontSize: 14 }}>TechNova HR Team · Candidate matching, growth tracking and outreach management in one clean view.</p>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <button onClick={() => { setDark(d => !d); showToast(dark ? "Light mode on" : "Dark mode on"); }} style={{ background: v("--surface"), border: `1px solid ${v("--border")}`, borderRadius: 12, padding: "10px 14px", color: v("--text"), fontSize: 13, cursor: "pointer", fontWeight: 600 }}>
                {dark ? "☀️ Light" : "🌙 Dark"}
              </button>
              <div style={{ background: v("--surface"), border: `1px solid ${v("--border")}`, borderRadius: 12, padding: "10px 14px", fontSize: 13, boxShadow: v("--shadow") }}>TechNova HR Team</div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(5, minmax(140px, 1fr))", gap: 12, marginBottom: 22 }}>
            {[
              { title: "Open Positions", num: 8, sub: "2 urgent engineering roles" },
              { title: "Active Candidates", num: 146, sub: "38 added this month" },
              { title: "Future-Fit Talent", num: 58, sub: "High growth trajectory" },
              { title: "Re-Engagement Leads", num: 23, sub: "Candidates ready to reconnect" },
              { title: "Profile Review Needed", num: 17, sub: "Low keyword match, strong practical evidence" },
            ].map((card) => (
              <div key={card.title} style={{ background: v("--surface"), padding: isMobile ? 14 : 20, borderRadius: 16, border: `1px solid ${v("--border")}`, boxShadow: v("--shadow"), position: "relative", overflow: "hidden" }}>
                <div style={{ fontSize: 11, color: v("--muted"), marginBottom: 8, textTransform: "uppercase", letterSpacing: ".4px", fontWeight: 600 }}>{card.title}</div>
                <div style={{ fontSize: isMobile ? 26 : 32, fontWeight: 700, color: "#2563eb", lineHeight: 1 }}>{card.num}</div>
                <p style={{ color: v("--muted"), fontSize: 11, marginTop: 6 }}>{card.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Matching */}
        <section ref={(el) => { sectionRefs.current["matching"] = el; }} id="matching" style={{ background: v("--surface"), border: `1px solid ${v("--border")}`, borderRadius: 16, padding: isMobile ? 16 : 24, marginBottom: 22, boxShadow: v("--shadow") }}>
          <div style={{ display: "flex", alignItems: "flex-start", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", gap: 16, marginBottom: 18 }}>
            <div>
              <h2 style={{ fontSize: isMobile ? 17 : 20, marginBottom: 3, fontWeight: 700 }}>Talent Matching</h2>
              <p style={{ color: v("--muted"), fontSize: 13 }}>Overview of candidates, target roles, readiness signals and recommended actions.</p>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", width: isMobile ? "100%" : "auto" }}>
              <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search candidate or skill..." style={{ width: isMobile ? "100%" : 220, border: `1px solid ${v("--border")}`, borderRadius: 10, padding: "10px 12px", background: v("--surface-soft"), color: v("--text"), outline: "none", fontFamily: "inherit", fontSize: 14 }} />
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {["all", "reengage", "ats", "future"].map((f) => (
                  <button key={f} onClick={() => setActiveFilter(f)} style={{ border: `1px solid ${activeFilter === f ? "#bfdbfe" : v("--border")}`, background: activeFilter === f ? "#dbeafe" : v("--surface-soft"), color: activeFilter === f ? "#1e40af" : v("--muted"), padding: "7px 10px", borderRadius: 999, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
                    {f === "all" ? "All" : f === "reengage" ? "Re-engage" : f === "ats" ? "ATS Missed" : "Future-Fit"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: card list instead of table */}
          {isMobile ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {filteredCandidates.length === 0 ? (
                <p style={{ color: v("--muted"), fontSize: 13, padding: 12 }}>No matching candidates found.</p>
              ) : filteredCandidates.map(([id, c]) => (
                <div key={id} onClick={() => { setActiveCandidateId(id); scrollToSection("intelligence"); }} style={{ background: v("--surface-soft"), border: `1px solid ${v("--border")}`, borderRadius: 12, padding: 14, cursor: "pointer" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <div>
                      <strong style={{ fontSize: 14 }}>{c.name}</strong>
                      <div style={{ fontSize: 12, color: v("--muted") }}>{c.currentRole} → {c.role}</div>
                    </div>
                    <Badge text={c.status} cls={c.statusClass} />
                  </div>
                  <div style={{ display: "flex", gap: 16, marginBottom: 8 }}>
                    <div><span style={{ fontSize: 11, color: v("--muted") }}>Current</span><br /><strong style={{ fontSize: 14 }}>{c.currentFit}%</strong></div>
                    <div><span style={{ fontSize: 11, color: v("--muted") }}>Future</span><br /><strong style={{ fontSize: 14, color: "#2563eb" }}>{c.futureFit}%</strong></div>
                  </div>
                  <div style={{ fontSize: 12, color: v("--muted"), marginBottom: 10 }}>{c.keySignal}</div>
                  <button onClick={(e) => { e.stopPropagation(); setActiveCandidateId(id); scrollToSection("intelligence"); }} style={{ background: "#2563eb", color: "#fff", border: 0, padding: "8px 14px", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 12 }}>Inspect</button>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ overflowX: "auto", borderRadius: 12, border: `1px solid ${v("--border")}` }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}>
                <thead>
                  <tr>
                    {["Candidate", "Target Role", "Current Fit", "Future Fit", "Key Signal", "Status", "Action"].map((h) => (
                      <th key={h} style={{ textAlign: "left", padding: "14px 16px", background: v("--surface-soft"), color: v("--muted"), fontSize: 12, textTransform: "uppercase", letterSpacing: ".4px", fontWeight: 700 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredCandidates.length === 0 ? (
                    <tr><td colSpan={7} style={{ padding: "15px 16px", color: v("--muted"), fontSize: 13 }}>No matching candidates found.</td></tr>
                  ) : filteredCandidates.map(([id, c]) => (
                    <tr key={id} onClick={() => { setActiveCandidateId(id); scrollToSection("intelligence"); }} style={{ cursor: "pointer" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(37,99,235,.04)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                      <td style={{ padding: "15px 16px", borderTop: `1px solid ${v("--border")}`, fontSize: 13 }}><strong>{c.name}</strong><br /><span style={{ color: v("--muted"), fontSize: 12 }}>{c.currentRole}</span></td>
                      <td style={{ padding: "15px 16px", borderTop: `1px solid ${v("--border")}`, fontSize: 13 }}>{c.role}</td>
                      <td style={{ padding: "15px 16px", borderTop: `1px solid ${v("--border")}`, fontSize: 13 }}>{c.currentFit}%</td>
                      <td style={{ padding: "15px 16px", borderTop: `1px solid ${v("--border")}`, fontSize: 13 }}><strong>{c.futureFit}%</strong></td>
                      <td style={{ padding: "15px 16px", borderTop: `1px solid ${v("--border")}`, fontSize: 13 }}>{c.keySignal}</td>
                      <td style={{ padding: "15px 16px", borderTop: `1px solid ${v("--border")}`, fontSize: 13 }}><Badge text={c.status} cls={c.statusClass} /></td>
                      <td style={{ padding: "15px 16px", borderTop: `1px solid ${v("--border")}`, fontSize: 13 }}>
                        <button onClick={(e) => { e.stopPropagation(); setActiveCandidateId(id); scrollToSection("intelligence"); }} style={{ background: "#2563eb", color: "#fff", border: 0, padding: "10px 15px", borderRadius: 10, cursor: "pointer", fontWeight: 600, fontSize: 13 }}>Inspect</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Intelligence */}
        <section ref={(el) => { sectionRefs.current["intelligence"] = el; }} id="intelligence" style={{ background: v("--surface"), border: `1px solid ${v("--border")}`, borderRadius: 16, padding: isMobile ? 16 : 24, marginBottom: 22, boxShadow: v("--shadow") }}>
          <div style={{ display: "flex", alignItems: "flex-start", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", gap: 12, marginBottom: 18 }}>
            <div>
              <h2 style={{ fontSize: isMobile ? 17 : 20, marginBottom: 3, fontWeight: 700 }}>Candidate Profile Panel</h2>
              <p style={{ color: v("--muted"), fontSize: 13 }}>Review skill progress, candidate history, readiness level and next steps.</p>
            </div>
            <button onClick={() => { setAssistantCandidateId(activeCandidateId); scrollToSection("assistant"); }} style={{ background: v("--surface-soft"), color: v("--text"), border: `1px solid ${v("--border")}`, padding: "10px 15px", borderRadius: 10, cursor: "pointer", fontWeight: 600, fontSize: 13, width: isMobile ? "100%" : "auto" }}>Generate Outreach</button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.15fr .85fr", gap: 18 }}>
            <div style={{ background: `linear-gradient(180deg,${v("--surface-soft")},${v("--surface")})`, border: `1px solid ${v("--border")}`, borderRadius: 16, overflow: "hidden" }}>
              <div style={{ padding: isMobile ? 16 : 22, borderBottom: `1px solid ${v("--border")}`, display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", gap: 14 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".7px", textTransform: "uppercase", color: "#2563eb", marginBottom: 8 }}>{activeCandidate.module}</div>
                  <h3 style={{ fontSize: isMobile ? 20 : 26, lineHeight: 1.12, marginBottom: 5, fontWeight: 700 }}>{activeCandidate.name}</h3>
                  <p style={{ fontSize: 13, color: v("--muted") }}>Target Position: {activeCandidate.role}</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
                    {activeCandidate.badges.map(([text, cls]) => <Badge key={text} text={text} cls={cls} />)}
                  </div>
                </div>
                <button onClick={() => { setAssistantCandidateId(activeCandidateId); scrollToSection("assistant"); }} style={{ background: "#2563eb", color: "#fff", border: 0, padding: "10px 15px", borderRadius: 10, cursor: "pointer", fontWeight: 600, fontSize: 13, whiteSpace: "nowrap", alignSelf: isMobile ? "flex-start" : "flex-start" }}>Draft Message</button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 12, padding: isMobile ? "14px 16px 0" : "18px 22px 0" }}>
                {activeCandidate.scores.map(([label, value, note, type]) => (
                  <div key={label} style={{ background: v("--surface"), border: `1px solid ${v("--border")}`, borderRadius: 13, padding: 15 }}>
                    <div style={{ color: v("--hint"), fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".4px", marginBottom: 6 }}>{label}</div>
                    <div style={{ fontSize: 22, lineHeight: 1, fontWeight: 700, color: scoreColor(type) }}>{value}</div>
                    <div style={{ color: v("--muted"), fontSize: 11, marginTop: 6 }}>{note}</div>
                  </div>
                ))}
              </div>

              <div style={{ margin: isMobile ? "12px 16px" : "16px 22px", padding: isMobile ? 14 : 18, background: v("--surface"), border: `1px solid ${v("--border")}`, borderRadius: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: v("--muted"), letterSpacing: ".5px", textTransform: "uppercase", marginBottom: 14, display: "flex", justifyContent: "space-between" }}>
                  <span>{activeCandidateId === "david" ? "Trajectory signal breakdown" : "Skill gap diff — then vs now"}</span>
                  <span>Live</span>
                </div>
                {activeCandidate.skills.map(([label, pct, cls], i) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: i < activeCandidate.skills.length - 1 ? 12 : 0 }}>
                    <span style={{ width: isMobile ? 90 : 120, flexShrink: 0, fontSize: 12, color: v("--muted"), fontWeight: 600 }}>{label}</span>
                    <div style={{ height: 9, flex: 1, background: v("--border"), overflow: "hidden", borderRadius: 999 }}>
                      <div style={{ height: "100%", width: `${skillWidths[i] ?? 0}%`, borderRadius: 999, background: fillColor(cls as string), transition: "width .9s cubic-bezier(.4,0,.2,1)" }} />
                    </div>
                    <span style={{ width: 36, textAlign: "right", fontFamily: "'DM Mono', monospace", fontSize: 12, color: v("--muted") }}>{skillWidths[i] ?? 0}%</span>
                  </div>
                ))}
              </div>

              <div style={{ margin: isMobile ? "12px 16px" : "16px 22px", padding: isMobile ? 14 : 18, background: v("--surface"), border: `1px solid ${v("--border")}`, borderRadius: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: v("--muted"), letterSpacing: ".5px", textTransform: "uppercase", marginBottom: 14 }}>Opt-in warmth tracker</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: isMobile ? 4 : 7, marginBottom: 12 }}>
                  {activeCandidate.warmth.map((step, i) => {
                    const isDone = i < activeCandidate.warmthStage;
                    const isActive = i === activeCandidate.warmthStage;
                    return (
                      <div key={step} style={{ textAlign: "center", padding: isMobile ? "6px 2px" : "8px 4px", borderRadius: 10, fontSize: isMobile ? 9 : 10, fontWeight: 700, border: `1px solid ${isDone ? "#bbf7d0" : isActive ? "#fde68a" : v("--border")}`, color: isDone ? "#166534" : isActive ? "#92400e" : v("--muted"), background: isDone ? "#dcfce7" : isActive ? "#fef3c7" : v("--surface-soft") }}>
                        {step}
                      </div>
                    );
                  })}
                </div>
                <p style={{ color: v("--muted"), fontSize: 12, lineHeight: 1.55 }}>{activeCandidate.warmthCaption}</p>
              </div>

              <div style={{ margin: isMobile ? "12px 16px" : "16px 22px", padding: isMobile ? 14 : 18, background: v("--surface"), border: `1px solid ${v("--border")}`, borderRadius: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: v("--muted"), letterSpacing: ".5px", textTransform: "uppercase", marginBottom: 14 }}>Career arc translation</div>
                {activeCandidate.arc.map(([label, text], i) => (
                  <div key={label} style={{ display: "flex", gap: 13, padding: "13px 0", borderBottom: i < activeCandidate.arc.length - 1 ? `1px solid ${v("--border")}` : "none" }}>
                    <div style={{ width: 34, height: 34, borderRadius: 10, display: "grid", placeItems: "center", background: v("--surface-soft"), flexShrink: 0, fontSize: 10, fontWeight: 700 }}>{i === 0 ? "Past" : "Now"}</div>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: v("--hint"), textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 4 }}>{label}</div>
                      <div style={{ color: v("--text"), fontSize: 13, lineHeight: 1.6 }}>{highlightTech(text)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ background: v("--surface"), border: `1px solid ${v("--border")}`, borderRadius: 16, padding: isMobile ? 14 : 20, marginBottom: 16, boxShadow: v("--shadow") }}>
                <h3 style={{ fontSize: 16, marginBottom: 10, fontWeight: 700 }}>Hiring Recommendation</h3>
                <div style={{ padding: 15, background: "#dbeafe", color: "#1e40af", border: "1px solid #bfdbfe", borderRadius: 14, fontSize: 13, lineHeight: 1.55, fontWeight: 500 }}>{activeCandidate.recommendation}</div>
              </div>

              <div style={{ background: v("--surface"), border: `1px solid ${v("--border")}`, borderRadius: 16, padding: isMobile ? 14 : 20, marginBottom: 16, boxShadow: v("--shadow") }}>
                <h3 style={{ fontSize: 16, marginBottom: 10, fontWeight: 700 }}>Suggested Next Steps</h3>
                <div style={{ display: "grid", gap: 12 }}>
                  {activeCandidate.nextSteps.map(([title, desc], i) => (
                    <div key={title} style={{ display: "grid", gridTemplateColumns: "30px 1fr", gap: 10 }}>
                      <div style={{ width: 30, height: 30, borderRadius: "50%", display: "grid", placeItems: "center", background: v("--surface-soft"), border: `1px solid ${v("--border")}`, fontSize: 12, fontWeight: 700, color: "#2563eb" }}>{i + 1}</div>
                      <div>
                        <strong style={{ display: "block", fontSize: 13, marginBottom: 2 }}>{title}</strong>
                        <span style={{ display: "block", color: v("--muted"), fontSize: 12, lineHeight: 1.45 }}>{desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: v("--surface"), border: `1px solid ${v("--border")}`, borderRadius: 16, padding: isMobile ? 14 : 20, boxShadow: v("--shadow") }}>
                <h3 style={{ fontSize: 16, marginBottom: 10, fontWeight: 700 }}>Risk Check</h3>
                <p style={{ color: v("--muted"), fontSize: 12, lineHeight: 1.55 }}>{activeCandidate.risk}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Re-engagement */}
        <section ref={(el) => { sectionRefs.current["reengagement"] = el; }} id="reengagement" style={{ background: v("--surface"), border: `1px solid ${v("--border")}`, borderRadius: 16, padding: isMobile ? 16 : 24, marginBottom: 22, boxShadow: v("--shadow") }}>
          <div style={{ marginBottom: 18 }}>
            <h2 style={{ fontSize: isMobile ? 17 : 20, marginBottom: 3, fontWeight: 700 }}>Future-Fit Talent Pool and Re-Engagement Hub</h2>
            <p style={{ color: v("--muted"), fontSize: 13 }}>See who is ready to reconnect, why they are relevant, and what action should come next.</p>
          </div>

          {isMobile ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {Object.entries(candidates).map(([id, c]) => (
                <div key={id} onClick={() => { setActiveCandidateId(id); scrollToSection("intelligence"); }} style={{ background: v("--surface-soft"), border: `1px solid ${v("--border")}`, borderRadius: 12, padding: 14, cursor: "pointer" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <strong style={{ fontSize: 14 }}>{c.name}</strong>
                    <span style={{ fontSize: 12, color: v("--muted") }}>{c.lastContact}</span>
                  </div>
                  <div style={{ fontSize: 12, color: v("--muted"), marginBottom: 4 }}>{c.role}</div>
                  <div style={{ display: "flex", gap: 16, marginBottom: 10 }}>
                    <div><span style={{ fontSize: 11, color: v("--muted") }}>Readiness</span><br /><strong style={{ color: "#16a34a" }}>{c.readiness}</strong></div>
                    <div><span style={{ fontSize: 11, color: v("--muted") }}>ETA</span><br /><strong>{c.eta}</strong></div>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); setAssistantCandidateId(id); scrollToSection("assistant"); }} style={{ background: v("--surface-soft"), color: v("--text"), border: `1px solid ${v("--border")}`, padding: "8px 14px", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 12 }}>Reconnect</button>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ overflowX: "auto", borderRadius: 12, border: `1px solid ${v("--border")}` }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}>
                <thead>
                  <tr>
                    {["Candidate", "Career Goal", "Last Contact", "Readiness Increase", "ETA", "Recommendation"].map((h) => (
                      <th key={h} style={{ textAlign: "left", padding: "14px 16px", background: v("--surface-soft"), color: v("--muted"), fontSize: 12, textTransform: "uppercase", letterSpacing: ".4px", fontWeight: 700 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(candidates).map(([id, c]) => (
                    <tr key={id} onClick={() => { setActiveCandidateId(id); scrollToSection("intelligence"); }} style={{ cursor: "pointer" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(37,99,235,.04)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                      <td style={{ padding: "15px 16px", borderTop: `1px solid ${v("--border")}`, fontSize: 13 }}><strong>{c.name}</strong></td>
                      <td style={{ padding: "15px 16px", borderTop: `1px solid ${v("--border")}`, fontSize: 13 }}>{c.role}</td>
                      <td style={{ padding: "15px 16px", borderTop: `1px solid ${v("--border")}`, fontSize: 13 }}>{c.lastContact}</td>
                      <td style={{ padding: "15px 16px", borderTop: `1px solid ${v("--border")}`, fontSize: 13 }}><strong>{c.readiness}</strong></td>
                      <td style={{ padding: "15px 16px", borderTop: `1px solid ${v("--border")}`, fontSize: 13 }}>{c.eta}</td>
                      <td style={{ padding: "15px 16px", borderTop: `1px solid ${v("--border")}`, fontSize: 13 }}>
                        <button onClick={(e) => { e.stopPropagation(); setAssistantCandidateId(id); scrollToSection("assistant"); }} style={{ background: v("--surface-soft"), color: v("--text"), border: `1px solid ${v("--border")}`, padding: "10px 15px", borderRadius: 10, cursor: "pointer", fontWeight: 600, fontSize: 13 }}>Reconnect</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Insights */}
        <section style={{ background: v("--surface"), border: `1px solid ${v("--border")}`, borderRadius: 16, padding: isMobile ? 16 : 24, marginBottom: 22, boxShadow: v("--shadow") }}>
          <div style={{ marginBottom: 18 }}>
            <h2 style={{ fontSize: isMobile ? 17 : 20, marginBottom: 3, fontWeight: 700 }}>Hiring Insights</h2>
            <p style={{ color: v("--muted"), fontSize: 13 }}>Practical summaries to support sourcing, screening and re-engagement decisions.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 16 }}>
            {[
              {
                title: "Talent Availability Forecast",
                content: (<><p style={{ color: v("--muted"), fontSize: 13, lineHeight: 1.55 }}>Future-fit candidates expected in the next 90 days.</p><ForecastBar /><p style={{ color: v("--muted"), fontSize: 13 }}><strong>35% increase expected</strong> if warm leads are reactivated.</p></>),
              },
              { title: "Screening Blind Spot", content: <p style={{ color: v("--muted"), fontSize: 13, lineHeight: 1.55 }}>Some candidates may lack exact job keywords but still show strong evidence through projects, skill growth and role direction.</p> },
              { title: "Recruitment Recommendation", content: <p style={{ color: v("--muted"), fontSize: 13, lineHeight: 1.55 }}>Prioritise candidates who have closed previous skill gaps and show recent proof of learning before restarting cold sourcing.</p> },
            ].map((box) => (
              <div key={box.title} style={{ background: v("--surface-soft"), border: `1px solid ${v("--border")}`, padding: 18, borderRadius: 14 }}>
                <h3 style={{ fontSize: 14, marginBottom: 8, fontWeight: 700 }}>{box.title}</h3>
                {box.content}
              </div>
            ))}
          </div>
        </section>

        {/* Assistant */}
        <section ref={(el) => { sectionRefs.current["assistant"] = el; }} id="assistant" style={{ background: v("--surface"), border: `1px solid ${v("--border")}`, borderRadius: 16, padding: isMobile ? 16 : 24, marginBottom: 22, boxShadow: v("--shadow") }}>
          <div style={{ marginBottom: 18 }}>
            <h2 style={{ fontSize: isMobile ? 17 : 20, marginBottom: 3, fontWeight: 700 }}>Outreach Drafting Assistant</h2>
            <p style={{ color: v("--muted"), fontSize: 13 }}>Create clear recruiter messages with tone control, regeneration, copy and send-preview actions.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "310px 1fr", gap: 18 }}>
            <div style={{ background: v("--surface-soft"), border: `1px solid ${v("--border")}`, borderRadius: 14, padding: 18 }}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontWeight: 700, fontSize: 13, marginBottom: 8 }}>Select Candidate</label>
                <select value={assistantCandidateId} onChange={(e) => setAssistantCandidateId(e.target.value)} style={{ width: "100%", border: `1px solid ${v("--border")}`, background: v("--surface"), color: v("--text"), borderRadius: 10, padding: 12, outline: "none", fontSize: 14, fontFamily: "inherit" }}>
                  {Object.entries(candidates).map(([id, c]) => (
                    <option key={id} value={id}>{c.name} — {c.role}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontWeight: 700, fontSize: 13, marginBottom: 8 }}>Message Tone</label>
                <select value={tone} onChange={(e) => setTone(e.target.value)} style={{ width: "100%", border: `1px solid ${v("--border")}`, background: v("--surface"), color: v("--text"), borderRadius: 10, padding: 12, outline: "none", fontSize: 14, fontFamily: "inherit" }}>
                  <option value="direct">Direct and concise</option>
                  <option value="warm">Warm and human</option>
                  <option value="data">Data-driven</option>
                  <option value="forward">Forward-looking</option>
                </select>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontWeight: 700, fontSize: 13, marginBottom: 8 }}>Candidate Signal Summary</label>
                <div style={{ padding: 15, background: "#dbeafe", color: "#1e40af", border: "1px solid #bfdbfe", borderRadius: 14, fontSize: 13, lineHeight: 1.55, fontWeight: 500 }}>
                  {candidates[assistantCandidateId].status}. Key update: {candidates[assistantCandidateId].keySignal}. Recommended action: {candidates[assistantCandidateId].recommendation}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
                <button onClick={handleRegenerate} style={{ background: "#2563eb", color: "#fff", border: 0, padding: "10px 14px", borderRadius: 10, cursor: "pointer", fontWeight: 600, fontSize: 13, flex: isMobile ? "1 1 auto" : "0 0 auto" }}>Regenerate</button>
                <button onClick={handleCopy} style={{ background: v("--surface-soft"), color: v("--text"), border: `1px solid ${v("--border")}`, padding: "10px 14px", borderRadius: 10, cursor: "pointer", fontWeight: 600, fontSize: 13, flex: isMobile ? "1 1 auto" : "0 0 auto" }}>Copy</button>
                <button onClick={() => showToast(`Message marked as sent to ${candidates[assistantCandidateId].name}`)} style={{ background: "#ea4335", color: "#fff", border: 0, padding: "10px 14px", borderRadius: 10, cursor: "pointer", fontWeight: 600, fontSize: 13, flex: isMobile ? "1 1 auto" : "0 0 auto" }}>Mark Sent</button>
              </div>
            </div>
            <div>
              <div style={{ background: v("--surface"), border: `1px solid ${v("--border")}`, borderRadius: 12, padding: "12px 14px", marginBottom: 12, color: v("--muted"), fontSize: 13 }}>{subject}</div>
              <label style={{ display: "block", fontWeight: 700, fontSize: 13, marginBottom: 8 }}>Suggested Outreach Message</label>
              <textarea value={messageText} onChange={(e) => setMessageText(e.target.value)} style={{ width: "100%", border: `1px solid ${v("--border")}`, background: v("--surface"), color: v("--text"), borderRadius: 10, padding: 12, outline: "none", fontSize: 14, fontFamily: "inherit", minHeight: isMobile ? 220 : 320, resize: "vertical", lineHeight: 1.65 }} />
            </div>
          </div>
        </section>
      </main>

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", right: 16, bottom: 16, background: "#111827", color: "#fff", padding: "14px 18px", borderRadius: 14, boxShadow: "0 14px 30px rgba(0,0,0,.2)", zIndex: 60, fontSize: 14, maxWidth: "calc(100vw - 32px)" }}>
          {toast}
        </div>
      )}
    </div>
  );
}

function ForecastBar() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(85), 250);
    return () => clearTimeout(t);
  }, []);
  return (
    <div style={{ width: "100%", height: 10, background: "#e2e8f0", borderRadius: 999, overflow: "hidden", margin: "12px 0 8px" }}>
      <div style={{ height: "100%", width: `${width}%`, background: "#2563eb", borderRadius: 999, transition: "width 1s ease" }} />
    </div>
  );
}
