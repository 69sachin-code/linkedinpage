const fallbackCareer = {
  profile: {
    name: "Sachin Hattangadi",
    title: "Agile, product delivery, and quality leadership across BFSI technology",
    summary:
      "A career webpage designed to turn LinkedIn data into a crisp, visual story of progression, strengths, education, and credentials.",
    location: "Mumbai Metropolitan Region",
    linkedin: "https://www.linkedin.com/in/sachin-hattangadi-a2a77822/",
    email: "",
    experienceLabel: "TBD",
  },
  snapshot: [
    {
      label: "Positioning",
      value: "Career-led personal brand",
      detail: "A first-screen story that makes your professional direction obvious.",
    },
    {
      label: "Audience",
      value: "Recruiters and hiring managers",
      detail: "Structured around screening speed, credibility, and next-step clarity.",
    },
    {
      label: "Profile Source",
      value: "LinkedIn-ready",
      detail: "Built so exported profile data can become timeline and credential content.",
    },
    {
      label: "Outcome",
      value: "Memorable career atlas",
      detail: "A polished narrative layer above a standard LinkedIn profile.",
    },
  ],
  timeline: [
    {
      date: "Add dates",
      role: "Current or target role",
      company: "Company or domain",
      summary:
        "This placeholder will become your current role summary after LinkedIn data is added.",
    },
    {
      date: "Earlier",
      role: "Previous role",
      company: "Company or domain",
      summary:
        "Your exported positions will appear here as a clean, chronological career journey.",
    },
  ],
  skills: [
    {
      category: "Core strengths",
      description: "Prioritized skills from your LinkedIn profile.",
      items: ["Leadership", "Communication", "Execution"],
    },
    {
      category: "Tools and platforms",
      description: "Software, systems, and platforms you want recruiters to notice.",
      items: ["LinkedIn", "Analytics", "Documentation"],
    },
    {
      category: "Domain knowledge",
      description: "Industry and functional expertise grouped for quick scanning.",
      items: ["Strategy", "Operations", "Stakeholder management"],
    },
  ],
  education: [
    {
      institution: "Institution name",
      credential: "Degree or program",
      period: "Year",
      detail: "Add education details from LinkedIn export.",
    },
  ],
  certifications: [
    {
      name: "Certification name",
      issuer: "Issuing organization",
      date: "Year",
      url: "#",
    },
  ],
};

async function loadCareer() {
  try {
    const response = await fetch("data/career.json", { cache: "no-store" });
    if (!response.ok) return fallbackCareer;
    return await response.json();
  } catch {
    return fallbackCareer;
  }
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function setLink(id, href) {
  const element = document.getElementById(id);
  if (!element || !href) return;
  element.href = href;
}

function card(className, innerHTML) {
  const element = document.createElement("article");
  element.className = className;
  element.innerHTML = innerHTML;
  return element;
}

function renderSnapshot(items) {
  const grid = document.getElementById("snapshot-grid");
  grid.replaceChildren(
    ...items.map((item) =>
      card(
        "snapshot-card",
        `<strong>${item.value}</strong><p>${item.detail}</p>`
      )
    )
  );
}

function renderTimeline(items) {
  const list = document.getElementById("timeline-list");
  list.replaceChildren(
    ...items.map((item) =>
      card(
        "timeline-item",
        `<div class="timeline-date">${item.date}</div>
        <div>
          <div class="timeline-role">${item.role}</div>
          <div class="timeline-company">${item.company}</div>
          <p>${item.summary}</p>
        </div>`
      )
    )
  );
}

function renderSkills(groups) {
  const grid = document.getElementById("skill-grid");
  grid.replaceChildren(
    ...groups.map((group) =>
      card(
        "skill-card",
        `<h3>${group.category}</h3>
        <p>${group.description}</p>
        <div class="skill-list">
          ${group.items.map((item) => `<span class="skill-pill">${item}</span>`).join("")}
        </div>`
      )
    )
  );
}

function renderEducation(items) {
  const list = document.getElementById("education-list");
  list.replaceChildren(
    ...items.map((item) =>
      card(
        "credential-card",
        `<span class="credential-meta">${item.period}</span>
        <h3>${item.institution}</h3>
        <p><strong>${item.credential}</strong></p>
        <p>${item.detail}</p>`
      )
    )
  );
}

function renderCertifications(items) {
  const list = document.getElementById("certification-list");
  list.replaceChildren(
    ...items.map((item) =>
      card(
        "credential-card",
        `<span class="credential-meta">${item.date}</span>
        <h3>${item.name}</h3>
        <p>${item.issuer}</p>
        ${
          item.url && item.url !== "#"
            ? `<p><a href="${item.url}" target="_blank" rel="noreferrer">View credential</a></p>`
            : ""
        }`
      )
    )
  );
}

function countSkills(groups) {
  return groups.reduce((total, group) => total + group.items.length, 0);
}

async function init() {
  const career = await loadCareer();
  setText("profile-name", career.profile.name);
  setText("profile-title", career.profile.title);
  setText("profile-summary", career.profile.summary);
  setText("metric-experience", career.profile.experienceLabel || "TBD");
  setText("metric-skills", countSkills(career.skills));
  setText("metric-certs", career.certifications.length);

  setLink("linkedin-link", career.profile.linkedin);
  setLink("bottom-linkedin-link", career.profile.linkedin);

  if (career.profile.email) {
    setLink("email-link", `mailto:${career.profile.email}`);
    setLink("bottom-email-link", `mailto:${career.profile.email}`);
  }

  renderSnapshot(career.snapshot);
  renderTimeline(career.timeline);
  renderSkills(career.skills);
  renderEducation(career.education);
  renderCertifications(career.certifications);
}

init();
