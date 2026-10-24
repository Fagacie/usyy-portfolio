export type Recognition = {
  title: string;
  subtitle: string;
  kind: string;
  year: string;
  href?: string;
  visual: string;
};

export const recognition: Recognition[] = [
  {
    title: 'PAMERKOM 2026 Project Showcase',
    subtitle: 'Recognition for participation in the PAMERKOM 2026 project showcase.',
    kind: 'Project recognition',
    year: '2026',
    href: '/cert/pamerkom',
    visual: 'award'
  },
  {
    title: "Dean's List Award — Semester 4",
    subtitle: 'Academic recognition at Universiti Malaysia Terengganu.',
    kind: 'Academic award',
    year: 'Semester 4',
    href: '/cert/deans-sem4',
    visual: 'academic'
  },
  {
    title: "Dean's List Award — Semester 3",
    subtitle: 'Academic recognition at Universiti Malaysia Terengganu.',
    kind: 'Academic award',
    year: 'Semester 3',
    href: '/cert/deans-sem3',
    visual: 'academic'
  },
  {
    title: 'Autumn School: Marine Robotics & Sensing',
    subtitle: 'Programme certificate in marine robotics and sensing.',
    kind: 'Programme',
    year: 'Certificate',
    href: '/cert/autumn-school',
    visual: 'marine'
  },
  {
    title: 'iFuture Tech Conference & Hackathon',
    subtitle: 'Technology conference and hackathon participation.',
    kind: 'Conference',
    year: 'Certificate',
    href: '/cert/ifuture',
    visual: 'technology'
  },
  {
    title: 'ASPIRE Leadership & Talent Program',
    subtitle: 'Leadership and talent development programme.',
    kind: 'Development programme',
    year: 'Certificate',
    href: '/cert/aspire',
    visual: 'leadership'
  },
  {
    title: 'Media & Publicity Officer Appointment',
    subtitle: 'Nigerian Muslims Community in Malaysia (NMCIM).',
    kind: 'Community leadership',
    year: '2026',
    href: '/cert/media-publicity-officer',
    visual: 'leadership'
  }
];
