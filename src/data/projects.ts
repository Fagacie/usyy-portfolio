export type ProjectCategory = 'web' | 'iot' | 'research';

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: ProjectCategory;
  categoryLabel: string;
  role: string;
  period: string;
  status: string;
  stack: string[];
  visual: string;
  featured?: boolean;
  demoUrl?: string;
  repoUrl?: string;
  repoLabel?: string;
  overview: string;
  problem: string;
  features: string[];
  architecture: string[];
  engineeringNotes: string;
};

export const projects: Project[] = [
  {
    slug: 'psm-e-learning',
    title: 'PSM E-Learning Management System',
    shortTitle: 'PSM E-Learning',
    description: 'A full-stack learning platform for course delivery, role-based access, payments, and verifiable certificates.',
    category: 'web',
    categoryLabel: 'Full-stack platform',
    role: 'Full-stack developer',
    period: 'Aug 2025 – Jan 2026',
    status: 'Completed · Deployed',
    stack: ['Java', 'JSP / Servlets', 'MySQL', 'Paystack', 'Docker'],
    visual: 'learning',
    featured: true,
    demoUrl: 'https://psmels.software/landing',
    repoUrl: 'https://github.com/Fagacie/psm-elms',
    repoLabel: 'View source',
    overview: 'A full-stack e-learning platform designed to manage course content, learning workflows, payments, and digital credentials in one coherent experience.',
    problem: 'Learning platforms need clear separation between student, instructor, and administrator tasks, while access control and payment events must remain consistent with the learning record.',
    features: [
      'Role-based workflows for students, instructors, and administrators.',
      'Paystack payment-gateway integration.',
      'Certificate generation with QR-based verification.',
      'Course and assessment workflows backed by a relational database.'
    ],
    architecture: ['JSP and HTML presentation', 'Java Servlets application layer', 'JDBC-backed MySQL persistence', 'Docker-based deployment workflow'],
    engineeringNotes: 'The implementation emphasises server-side validation, role-aware navigation, persistence consistency, and complete flows that can be tested end to end. Public claims should be checked against the deployed workflow before adding new feature statements.'
  },
  {
    slug: 'iot-monitoring',
    title: 'Smart Campus Security & Environmental Monitoring',
    shortTitle: 'Smart Campus IoT',
    description: 'A connected monitoring-station prototype using a microcontroller, MQTT telemetry, and remote visualisation.',
    category: 'iot',
    categoryLabel: 'IoT prototype',
    role: 'Embedded systems developer',
    period: '2025',
    status: 'Prototype',
    stack: ['MicroPython', 'Raspberry Pi Pico W', 'MQTT', 'ThingSpeak'],
    visual: 'iot',
    featured: true,
    demoUrl: 'https://campus-iot.me/',
    repoUrl: 'https://github.com/Fagacie/smart-campus-iot-station',
    repoLabel: 'View source',
    overview: 'A connected hardware prototype intended to collect environmental and security-related telemetry and make readings available for remote monitoring.',
    problem: 'A monitoring station needs a dependable path from device readings to a remote dashboard, with communication failures and sensor initialisation handled explicitly.',
    features: [
      'MicroPython firmware on Raspberry Pi Pico W.',
      'MQTT-based telemetry communication.',
      'ThingSpeak-based remote visualisation.',
      'Device-to-dashboard troubleshooting across the sensing and connectivity layers.'
    ],
    architecture: ['Sensor and microcontroller layer', 'MicroPython device logic', 'MQTT messaging', 'Remote telemetry visualisation'],
    engineeringNotes: 'This remains a prototype-oriented project. The portfolio distinguishes a live dashboard link from a claim that the physical station is production-ready.'
  },
  {
    slug: 'pku-management',
    title: 'PKU Management System',
    shortTitle: 'PKU Management',
    description: 'A healthcare-management application for patient lifecycle, appointment, and staff-record workflows.',
    category: 'web',
    categoryLabel: 'Management system',
    role: 'Full-stack developer',
    period: 'Academic project',
    status: 'Academic project',
    stack: ['Java', 'JSP / Servlets', 'MySQL'],
    visual: 'health',
    repoUrl: 'https://github.com/Fagacie/pkumanagementsystem.git',
    repoLabel: 'View source',
    overview: 'A web-based healthcare management solution for organising patient, appointment, and staff information.',
    problem: 'Healthcare administration involves related records and tasks that must remain understandable to staff and consistent in the underlying database.',
    features: [
      'Patient lifecycle and record workflows.',
      'Appointment management.',
      'Staff-record management.',
      'Relational persistence using MySQL.'
    ],
    architecture: ['JSP interface', 'Java Servlets request handling', 'JDBC database access', 'MySQL relational data model'],
    engineeringNotes: 'The case study focuses on application structure, data modelling, and the workflow requirements rather than unsupported performance or clinical outcomes.'
  },
  {
    slug: 'weatherhub',
    title: 'WeatherHub',
    shortTitle: 'WeatherHub',
    description: 'A responsive weather application that retrieves meteorological information through a REST API.',
    category: 'web',
    categoryLabel: 'API-driven web app',
    role: 'Frontend developer',
    period: 'Academic project',
    status: 'Live demo',
    stack: ['JavaScript', 'REST API', 'Firebase'],
    visual: 'weather',
    demoUrl: 'https://weather-hub-9c3f8.web.app/',
    repoUrl: 'https://github.com/Fagacie',
    repoLabel: 'Browse GitHub profile',
    overview: 'A responsive weather application built around API-driven data retrieval and a focused weather-viewing interface.',
    problem: 'Weather information is only useful when current data can be retrieved reliably and presented clearly across screen sizes.',
    features: [
      'REST API integration for weather data.',
      'Responsive interface for different viewports.',
      'Firebase-hosted deployment.',
      'Clear loading and data presentation patterns.'
    ],
    architecture: ['Browser-based JavaScript interface', 'External weather REST API', 'Firebase hosting'],
    engineeringNotes: 'The linked GitHub destination is a profile, not a verified project repository. The portfolio labels it accordingly instead of implying that the URL is a direct source repository.'
  },
  {
    slug: 'masakjerr',
    title: 'MasakJerr! Recipe Management',
    shortTitle: 'MasakJerr!',
    description: 'A full-stack recipe application for organising recipes and user data.',
    category: 'web',
    categoryLabel: 'Full-stack web app',
    role: 'Full-stack developer',
    period: 'Academic project',
    status: 'Academic project',
    stack: ['Java', 'Spring Boot', 'MySQL'],
    visual: 'recipe',
    repoUrl: 'https://github.com/Fagacie/masakjerr-project1.git',
    repoLabel: 'View source',
    overview: 'A recipe-management application built to organise recipe content and associated user data through a Java web stack.',
    problem: 'Recipe content and user data benefit from structured persistence and clear create, browse, and management workflows.',
    features: [
      'Recipe content management.',
      'Java server-side request handling.',
      'MySQL-backed data persistence.',
      'A web interface for recipe-related tasks.'
    ],
    architecture: ['JSP presentation layer', 'Java Servlets', 'JDBC persistence', 'MySQL database'],
    engineeringNotes: 'The case study describes the application scope and stack without inventing usage statistics, business impact, or production status.'
  },
  {
    slug: 'elite-soccer',
    title: 'Elite Soccer Feed',
    shortTitle: 'Elite Soccer Feed',
    description: 'A football website concept with a responsive homepage and dedicated player-profile pages.',
    category: 'web',
    categoryLabel: 'Frontend experience',
    role: 'Frontend developer',
    period: 'Academic project',
    status: 'Live site',
    stack: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
    visual: 'football',
    demoUrl: 'https://elitesoccerfeed.vercel.app/',
    repoUrl: 'https://github.com/Fagacie/ESFhomepage.git',
    repoLabel: 'View source',
    overview: 'A football information website concept focused on a responsive landing experience and player-profile browsing.',
    problem: 'A sports site must present information with clear hierarchy and a layout that adapts naturally from desktop to mobile.',
    features: [
      'Responsive homepage layout.',
      'Dedicated player-profile pages.',
      'Reusable HTML, CSS, and JavaScript patterns.',
      'Static deployment through Vercel.'
    ],
    architecture: ['Semantic HTML structure', 'Responsive CSS layout', 'Vanilla JavaScript interactions', 'Vercel deployment'],
    engineeringNotes: 'This project is presented as a website concept. The page avoids describing it as a live editorial platform or claiming user traffic without evidence.'
  }
];

export const projectCategories = [
  { label: 'All projects', value: 'all' },
  { label: 'Full-stack & web', value: 'web' },
  { label: 'IoT & hardware', value: 'iot' },
  { label: 'Research', value: 'research' }
] as const;
