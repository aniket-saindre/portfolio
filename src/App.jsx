import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

const ME = {
  name: "Aniket Saindre",
  email: "aniketsaindre1@gmail.com",
  phone: "+353 0892475171",
  location: "Dublin, Ireland",
  linkedin: "https://www.linkedin.com/in/aniket-saindre/",
  github: "https://github.com/aniket-saindre", // TODO: replace with your GitHub profile link
  resume: "/Aniket_Saindre_Resume.pdf"
};

const NAV = ["About", "Skills", "Experience", "Projects", "Education", "Contact"];
const ROLES = ["React interfaces", "MongoDB data", "REST Application Programming Interfaces", "Artificial Intelligence features"];

const SKILLS = [
  ["Frontend", ["HTML", "CSS", "JavaScript", "React.js", "Bootstrap", "Tailwind CSS"]],
  ["Backend", ["Node.js", "Express.js", "REST Application Programming Interfaces"]],
  ["Databases", ["MongoDB", "MySQL"]],
  ["Tools and practices", ["Git and GitHub", "VS Code", "Postman", "Object-Oriented Programming", "Agile Development"]],
  ["Learning in my Master's", ["Python", "Natural Language Processing", "Cloud Computing", "Big Data", "Distributed Systems", "Information Security"]]
];

const JOBS = [
  {
    role: "Software Engineer, Full-Stack",
    org: "Rego Digital Solutions Pvt. Ltd., Pune",
    when: "Aug 2023 – Sep 2025",
    points: [
      "Built and maintained web application screens in React.js, working with Node.js and Express.js on the backend.",
      "Made reusable React components and responsive layouts with Bootstrap and Tailwind CSS, so new pages took less time to build.",
      "Helped write REST Application Programming Interfaces with login authentication and middleware.",
      "Fixed slow MongoDB queries, which made data load faster.",
      "Worked in Agile sprints with six teammates, using GitHub for code and Postman for testing."
    ]
  },
  {
    role: "Graphical User Interface Developer Intern",
    org: "Scriptlet Solutions Pvt. Ltd., Jalgaon (Remote)",
    when: "Feb 2022 – Apr 2022",
    points: [
      "Developed simple graphical user interfaces using HTML and CSS for web applications.",
      "Focused on clean, responsive layouts for a better user experience."
    ]
  }
];

const PROJECTS = [
  {
    title: "Mobile Botnet Detection",
    sub: "Deep Learning approach using a Support Vector Machine · Co-Author and Co-Developer",
    text: "A machine learning model that uses 342 static features of mobile apps to spot botnets, reaching 90% accuracy with few false alarms.",
    tech: ["Machine Learning", "Support Vector Machine", "Deep Learning"],
    stat: "90%"
  },
  {
    title: "Food Delivery Platform",
    sub: "Responsive front-end application",
    text: "A responsive food delivery platform with dynamic listings, menus and smooth navigation using React Router and Bootstrap.",
    tech: ["React.js", "React Router", "Bootstrap", "HTML", "CSS"]
  },
  {
    title: "User Management System",
    sub: "Authentication and file upload",
    text: "A web app with login, create, read, update and delete operations, file upload and form validation.",
    tech: ["Authentication", "CRUD", "File upload", "Form validation"]
  }
];

const TERMS = [
  ["Autumn 2026", ["Big Data", "Cloud Computing", "Distributed Systems", "Text Analytics", "Information Security"]],
  ["Spring 2027 (upcoming)", ["Generative Artificial Intelligence and Large Language Models", "Data Mining with Python", "Machine Learning with Python", "Ethical Hacking", "Advanced Data Structures and Algorithms"]]
];

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Heading({ title, note }) {
  return (
    <Reveal className="heading">
      <h2>{title}</h2>
      {note && <p>{note}</p>}
    </Reveal>
  );
}

function Typer() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const full = ROLES[i];
    const t = setTimeout(
      () => {
        if (!del) {
          setText(full.slice(0, text.length + 1));
          if (text.length + 1 === full.length) setTimeout(() => setDel(true), 1400);
        } else {
          setText(full.slice(0, text.length - 1));
          if (text.length - 1 === 0) { setDel(false); setI((i + 1) % ROLES.length); }
        }
      },
      del ? 35 : 70
    );
    return () => clearTimeout(t);
  }, [text, del, i]);
  return <span className="typer" aria-live="off">{text}<i className="caret" /></span>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`nav ${scrolled ? "nav--solid" : ""}`}>
      <a className="logo" href="#top">AS<span>.</span></a>
      <nav className={open ? "open" : ""} aria-label="Main">
        {NAV.map((n) => (
          <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setOpen(false)}>{n}</a>
        ))}
        <a className="btn btn--small" href={ME.resume} download>Download resume</a>
      </nav>
      <button className="burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span /><span /><span />
      </button>
    </header>
  );
}

function Hero() {
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  const letters = ME.name.split("");
  return (
    <section id="top" className="hero" onMouseMove={move}>
      <div className="glow" aria-hidden />
      <div className="orb orb--a" aria-hidden /><div className="orb orb--b" aria-hidden />
      <div className="wrap hero__inner">
        <motion.p className="pill" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <b className="dot" /> Open to internship, part-time and graduate developer roles in Dublin
        </motion.p>
        <h1 aria-label={ME.name}>
          {letters.map((c, k) => (
            <motion.span
              key={k}
              aria-hidden
              className="ch"
              initial={{ opacity: 0, y: 70, rotate: 6 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 0.25 + k * 0.045, type: "spring", stiffness: 140, damping: 16 }}
            >
              {c === " " ? "\u00A0" : c}
            </motion.span>
          ))}
        </h1>
        <motion.p className="hero__line" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
          Full-stack developer building <Typer />
        </motion.p>
        <motion.p className="hero__sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
          Two years of shipping React and MongoDB products, now studying Natural Language Processing at University College Dublin to bring Artificial Intelligence into apps real people use.
        </motion.p>
        <motion.div className="cta" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}>
          <a className="btn" href={ME.resume} download>Download resume</a>
          <a className="btn btn--ghost" href="#projects">See my projects</a>
          <a className="btn btn--ghost" href="#contact">Contact me</a>
        </motion.div>
      </div>
      <a className="scroll" href="#about" aria-label="Scroll to About"><span /></a>
    </section>
  );
}

function About() {
  const facts = [
    ["Based in", "Dublin, Ireland"],
    ["Studying", "MSc Computer Science (Negotiated Learning), University College Dublin"],
    ["Focus", "Natural Language Processing"],
    ["Experience", "2 years as a full-stack developer"]
  ];
  return (
    <section id="about" className="section">
      <div className="wrap">
        <Heading title="About me" />
        <div className="about">
          <Reveal>
            <p className="lead">
              I have worked for two years as a developer, mostly building React.js interfaces and working with MongoDB data.
            </p>
            <p>
              I am now doing an MSc in Computer Science at University College Dublin, studying Text Analytics, Cloud Computing, Distributed Systems, Big Data and Information Security, with Machine Learning and Generative Artificial Intelligence modules coming in spring.
            </p>
            <p>
              I am looking for an internship, part-time or graduate developer role where I can learn on the job and work on Artificial Intelligence features that real users use.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="facts">
              {facts.map(([k, v]) => (
                <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section section--alt">
      <div className="wrap">
        <Heading title="Skills" note="The tools I use to build, and what I am learning next." />
        <div className="skills">
          {SKILLS.map(([group, items], g) => (
            <Reveal key={group} delay={g * 0.06} className="card">
              <h3>{group}</h3>
              <ul className="chips">
                {items.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section">
      <div className="wrap">
        <Heading title="Work experience" />
        <div className="timeline">
          {JOBS.map((j, n) => (
            <Reveal key={j.org} delay={n * 0.08} className="job">
              <span className="node" aria-hidden />
              <p className="when">{j.when}</p>
              <h3>{j.role}</h3>
              <p className="org">{j.org}</p>
              <ul>{j.points.map((p) => <li key={p}>{p}</li>)}</ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section section--alt">
      <div className="wrap">
        <Heading title="Projects" note="Academic projects from my Bachelor's degree." />
        <div className="projects">
          {PROJECTS.map((p, n) => (
            <Reveal key={p.title} delay={n * 0.08}>
              <motion.article className={`project ${n === 0 ? "project--lead" : ""}`} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                {p.stat && <div className="bigstat"><b>{p.stat}</b><span>accuracy</span></div>}
                <h3>{p.title}</h3>
                <p className="sub">{p.sub}</p>
                <p>{p.text}</p>
                <ul className="chips">{p.tech.map((t) => <li key={t}>{t}</li>)}</ul>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="section">
      <div className="wrap">
        <Heading title="Education" />
        <div className="edu">
          <Reveal className="card card--hi">
            <p className="when">Sep 2026 – Current</p>
            <h3>Master of Science in Computer Science (Negotiated Learning)</h3>
            <p className="org">University College Dublin, Dublin, Ireland · Focus: Natural Language Processing</p>
            <div className="terms">
              {TERMS.map(([t, mods]) => (
                <div key={t}>
                  <h4>{t}</h4>
                  <ul>{mods.map((m) => <li key={m}>{m}</li>)}</ul>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="card">
            <p className="when">2019 – 2023</p>
            <h3>Bachelor of Engineering in Information Technology</h3>
            <p className="org">MVPs KBTCOE, Nashik, under Savitribai Phule Pune University</p>
            <p>Cumulative Grade Point Average: 7.68</p>
          </Reveal>
        </div>
        <div className="extras">
          <Reveal className="card">
            <h3>Certifications</h3>
            <ul>
              <li>Capgemini's Campus to Technical Careers Training Program (Java Full-Stack Web Development)</li>
              <li>Google IT Automation with Python (6 courses)</li>
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="card">
            <h3>Extra-curricular</h3>
            <ul>
              <li><b>Secretary,</b> Information Technology Student's Association: led technical events and workshops, boosting student engagement and teamwork.</li>
              <li><b>Anchor,</b> College Cultural Fest: hosted large-scale events, showcasing public speaking and organisational skills.</li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" });
  const [state, setState] = useState({ status: "idle", error: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setState({ status: "sending", error: "" });
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setState({ status: "sent", error: "" });
      setForm({ name: "", email: "", message: "", website: "" });
    } catch (err) {
      setState({ status: "error", error: err.message });
    }
  };

  return (
    <section id="contact" className="section section--alt">
      <div className="wrap">
        <Heading title="Let's talk" note="Hiring, interviewing or just curious? Send a message and I will reply soon." />
        <div className="contact">
          <Reveal className="links">
            <a className="card link" href={`mailto:${ME.email}`}><span>Email</span><b>{ME.email}</b></a>
            <a className="card link" href={`tel:${ME.phone.replace(/\s/g, "")}`}><span>Phone</span><b>{ME.phone}</b></a>
            <a className="card link" href={ME.linkedin} target="_blank" rel="noreferrer"><span>LinkedIn</span><b>aniket-saindre</b></a>
            <a className="card link" href={ME.github} target="_blank" rel="noreferrer"><span>GitHub</span><b>View my code</b></a>
            <div className="card link"><span>Location</span><b>{ME.location}</b></div>
            <a className="btn" href={ME.resume} download>Download resume</a>
          </Reveal>

          <Reveal delay={0.1}>
            <form className="card form" onSubmit={submit} noValidate>
              <label>Your name<input value={form.name} onChange={set("name")} required autoComplete="name" /></label>
              <label>Your email<input type="email" value={form.email} onChange={set("email")} required autoComplete="email" /></label>
              <label>Message<textarea rows="5" value={form.message} onChange={set("message")} required /></label>
              <input className="hp" tabIndex="-1" autoComplete="off" aria-hidden value={form.website} onChange={set("website")} />
              <button className="btn" disabled={state.status === "sending"}>{state.status === "sending" ? "Sending…" : "Send message"}</button>
              <AnimatePresence mode="wait">
                {state.status === "sent" && (
                  <motion.p key="ok" className="note ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    Message sent. Thank you, I will get back to you soon.
                  </motion.p>
                )}
                {state.status === "error" && (
                  <motion.p key="err" className="note err" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    {state.error} You can also email <a href={`mailto:${ME.email}`}>{ME.email}</a>.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return (
    <>
      <motion.div className="progress" style={{ scaleX: bar }} />
      <Header />
      <main>
        <Hero /><About /><Skills /><Experience /><Projects /><Education /><Contact />
      </main>
      <footer className="footer">© {new Date().getFullYear()} {ME.name} · Dublin, Ireland</footer>
    </>
  );
}
