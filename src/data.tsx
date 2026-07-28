import React from 'react';
import { Experience } from './types';

const IconAI = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2a4 4 0 0 0-4 4v1a4 4 0 0 0-2 7.46V16a4 4 0 0 0 6 3.46A4 4 0 0 0 18 16v-1.54A4 4 0 0 0 16 7V6a4 4 0 0 0-4-4Z" />
    <path d="M9 10h.01M15 10h.01M9.5 15a4 4 0 0 0 5 0" />
  </svg>
);

const IconPayments = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <path d="M2 10h20M6 15h2" />
  </svg>
);

const IconLayers = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 2 10 5-10 5L2 7l10-5Z" />
    <path d="m2 12 10 5 10-5M2 17l10 5 10-5" />
  </svg>
);

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: 'enyata',
    role: 'Senior Frontend Developer',
    company: 'Enyata',
    location: 'Lagos, Nigeria',
    duration: 'November 2025 - Present',
    kpis: [
      'AI & RAG Interfaces',
      'User + Admin Architecture',
      'Workflow Automation',
    ],
    metrics:
      'Leading frontend architecture for AI-powered user and admin products, reusable systems, testing, and complex business workflows.',
    details: [
      'Built a natural-language interface that communicates with a Retrieval Augmented Generation service and returns relevant AI-tool embeddings.',
      'Led frontend architecture for user and admin applications, defining scalable project structure, component composition patterns, and development standards.',
      'Established unit-testing practices for newly developed components to improve reliability and reduce regressions.',
      'Integrated REST APIs across authentication, data fetching, state management, and error handling for complex business workflows.',
      'Built AI-powered chat, a platform-wide premium-feature credit system, and a visual n8n-style workflow automation engine.',
    ],
  },
  {
    id: 'smc-dao',
    role: 'Frontend Engineer (Contract)',
    company: 'SMC DAO',
    location: 'Remote',
    duration: 'April 2026 - Present',
    kpis: ['Bill-Payment Admin', 'AI Recruitment', 'Reusable Form Systems'],
    metrics:
      'Architecting bill-payment administration and AI recruitment workflows with reusable, API-driven frontend foundations.',
    details: [
      "Spearheaded the frontend architecture of Peniremit's bill-payment administration platform across providers, services, packages, and fulfillment workflows.",
      'Designed reusable administrative modules and shared data-management patterns to improve delivery speed and maintainability.',
      'Collaborated with backend engineers on API contracts, synchronization, business rules, and operational tooling.',
      'Built AI recruitment features for candidate onboarding, application processing, and job administration.',
      'Developed reusable form systems, role-based access controls, file uploads, and complex API-driven experiences.',
    ],
  },
  {
    id: 'pertinence',
    role: 'Frontend Developer',
    company: 'Pertinence Group',
    location: 'Lagos, Nigeria',
    duration: 'March 2023 - November 2025',
    kpis: [
      '4 Enterprise Products',
      'Shared Component Library',
      'Web + Mobile Delivery',
    ],
    metrics:
      'Led architecture and reusable frontend foundations across Realvest, Greenland, OneApp, and Pettysave.',
    details: [
      'Led frontend architecture across multiple enterprise applications, establishing scalable structure, coding standards, and reusable design systems.',
      'Built and maintained a shared component library that improved reuse, UI consistency, maintainability, and developer productivity.',
      'Modernized existing codebases with reusable custom components, performance improvements, and Capacitor packaging for Android and iOS.',
      'Integrated RESTful APIs and delivered unit testing with Jest and Vue Test Utils alongside backend, product, design, and QA teams.',
      'Delivered wallets, subscriptions, referrals, marketplaces, dashboards, user management, authentication, and payment workflows.',
    ],
  },
  {
    id: 'pertinence-intern',
    role: 'Frontend Developer (Part-Time Intern)',
    company: 'Pertinence Group',
    location: 'Lagos, Nigeria',
    duration: 'January 2022 - February 2023',
    kpis: ['Bundle Size -100KB', 'Custom UI Components', 'Production Features'],
    metrics:
      'Maintained OneApp and improved frontend performance by replacing framework-dependent UI components.',
    details: [
      'Maintained and enhanced OneApp, a centralized real-estate platform for internal and customer-facing teams.',
      'Replaced Vuetify components with custom reusable components, improving page-load performance and reducing bundle size by 100KB.',
      'Shipped production features across product, subscription, and payment modules.',
    ],
  },
  {
    id: 'dwayremit',
    role: 'Frontend Developer (Contract)',
    company: 'Dwayremit',
    location: 'Remote, United Kingdom',
    duration: 'January 2022 - March 2023',
    kpis: ['Cross-Border Payments', 'Multiple Gateways', 'Treasury Workflows'],
    metrics:
      'Delivered secure customer, administrative, and payment-link applications for a cross-border remittance platform.',
    details: [
      'Developed secure, responsive customer-facing, administrative, and payment-link applications.',
      'Integrated payment gateways and financial-service providers for real-time transactions, currency conversion, and treasury management.',
      'Implemented exchange-rate calculators, treasury operations, beneficiary management, and compliance workflows.',
      'Built reusable components and collaborated with backend engineers and product stakeholders on scalable API integrations.',
    ],
  },
];

export const SKILL_COMMENTARY: Record<string, string> = {
  JavaScript:
    'Core language used across four-plus years of production frontend engineering.',
  TypeScript:
    'Used to build scalable, maintainable application architectures and reusable component systems.',
  React:
    'Applied across enterprise SaaS, AI, FinTech, and customer-facing product work.',
  'Next.js': 'Used for performant, scalable web application delivery.',
  'Vue.js':
    'Used extensively across enterprise applications and shared component systems.',
  'Nuxt.js':
    'Part of the production framework toolkit for Vue-based applications.',
  'Node.js':
    'Used for full-stack JavaScript application development and integrations.',
  'Express.js': 'Used to build and connect JavaScript backend services.',
  Capacitor: 'Used to package web applications for Android and iOS.',
  MongoDB: 'Database experience for modern web applications.',
  PostgreSQL: 'Relational database experience for production systems.',
  'REST APIs':
    'Integrated across authentication, payments, AI workflows, and enterprise administration.',
  Jest: 'Used for comprehensive unit-testing strategies and regression prevention.',
  'Vue Test Utils':
    'Used to test Vue component behavior in production codebases.',
  'Test-Driven Development':
    'A methodology used to improve application reliability and maintainability.',
  Agile:
    'Used for cross-functional product delivery and iterative development.',
  Scrum: 'Applied in collaborative product and engineering workflows.',
  'Technical Leadership':
    'Led frontend architecture, standards, roadmaps, and reusable foundations.',
  'Project Management':
    'Used to coordinate delivery across complex product initiatives.',
  'Cross-functional Collaboration':
    'Worked closely with backend, product, design, and QA teams.',
};

export interface Project {
  id: string;
  title: string;
  year: string;
  description: string;
  tech: string[];
  category: string;
  icon: React.ReactNode;
  url?: string;
  detail: ProjectDetail;
}

export interface ProjectDetail {
  tagline: string;
  accentColor: string;
  backgroundImage?: string;
  stats: { value: string; label: string }[];
  overview: string;
  problem: string;
  approach: string;
  outcome: string;
  highlights: { title: string; body: string }[];
  challenges: string;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 'ai-platform',
    title: 'AI Product Platform',
    year: '2026',
    description:
      'User and admin applications combining RAG discovery, natural-language actions, premium-feature metering, and visual workflow automation.',
    tech: [
      'React',
      'TypeScript',
      'REST APIs',
      'RAG',
      'AI Chat',
      'Unit Testing',
    ],
    category: 'AI · Enterprise SaaS',
    icon: <IconAI />,
    url: 'https://aidirectory.com',
    detail: {
      tagline:
        'Making advanced AI tools accessible through scalable, action-oriented interfaces.',
      accentColor: 'orange',
      backgroundImage: '/screenshot-ai-directory.png',
      stats: [
        { value: '2', label: 'Application Surfaces' },
        { value: 'RAG', label: 'Discovery Layer' },
        { value: 'AI Chat', label: 'Natural-Language Actions' },
        { value: 'Visual', label: 'Workflow Builder' },
      ],
      overview:
        'At Enyata, I lead frontend architecture across user and admin applications for an AI-powered product platform.',
      problem:
        'The product needed to make AI tools discoverable and actionable while supporting complex administration, premium-feature metering, automation, and reliable business workflows.',
      approach:
        'I defined scalable frontend structure and component standards, integrated REST APIs, established unit testing, and built natural-language, credit-metering, and visual workflow experiences.',
      outcome:
        'The frontend now supports RAG-powered discovery, AI-assisted platform actions, additional premium-feature revenue streams, and no-code automated task flows.',
      challenges:
        'The work requires a consistent architecture across AI interactions, authentication, application state, error handling, administration, monetization, and workflow automation.',
      highlights: [
        {
          title: 'RAG Discovery',
          body: 'Built a natural-language query interface that returns relevant AI-tool embeddings.',
        },
        {
          title: 'AI-Powered Actions',
          body: 'Enabled users to perform platform actions through conversational interfaces.',
        },
        {
          title: 'Credit Metering',
          body: 'Implemented premium-feature credits across AI chat, automation, Twilio provisioning, and messaging.',
        },
        {
          title: 'Workflow Automation',
          body: 'Designed an n8n-style visual engine for building automated task flows without code.',
        },
      ],
    },
  },
  {
    id: 'peniremit',
    title: 'Peniremit',
    year: '2026',
    description:
      'A bill-payment operations platform for managing providers, services, packages, fulfillment, access, and data-heavy administrative workflows.',
    tech: ['TypeScript', 'REST APIs', 'RBAC', 'Reusable Forms', 'File Uploads'],
    category: 'FinTech · Bill Payments',
    icon: <IconPayments />,
    url: 'https://remit.penilabs.com/',
    detail: {
      tagline:
        'Reusable operational foundations for multi-category bill-payment products.',
      accentColor: 'emerald',
      backgroundImage: '/screenshot-penilabs.jpg',
      stats: [
        { value: 'Multi', label: 'Utility Categories' },
        { value: 'RBAC', label: 'Access Control' },
        { value: 'Shared', label: 'Admin Modules' },
        { value: 'API', label: 'Driven Workflows' },
      ],
      overview:
        "For SMC DAO, I spearheaded the frontend architecture and implementation of Peniremit's bill-payment administration platform.",
      problem:
        'Operations teams needed dependable tools for managing providers, services, packages, fulfillment, permissions, files, and synchronized backend workflows.',
      approach:
        'I designed reusable administrative modules, shared data-management patterns, form systems, role-based access controls, file uploads, and API-driven experiences.',
      outcome:
        'The resulting frontend foundation accelerates feature delivery and improves maintainability across bill-payment products and operational workflows.',
      challenges:
        'The platform has to keep complex provider data, business rules, synchronization, permissions, and fulfillment states understandable and reliable.',
      highlights: [
        {
          title: 'Provider Operations',
          body: 'Supports providers, services, packages, and fulfillment workflows across utility categories.',
        },
        {
          title: 'Reusable Admin Modules',
          body: 'Shared patterns improve maintainability and speed up feature delivery.',
        },
        {
          title: 'Backend Collaboration',
          body: 'API contracts and synchronization rules were shaped closely with backend engineers.',
        },
        {
          title: 'Complex Forms & Access',
          body: 'Reusable forms, RBAC, and file uploads support demanding operational journeys.',
        },
      ],
    },
  },
  {
    id: 'pertinence-suite',
    title: 'Pertinence Product Suite',
    year: '2025',
    description:
      'Shared frontend architecture and component foundations across Realvest, Greenland, OneApp, and Pettysave.',
    tech: [
      'Vue.js',
      'TypeScript',
      'Capacitor',
      'Jest',
      'Vue Test Utils',
      'REST APIs',
    ],
    category: 'PropTech · Enterprise',
    icon: <IconLayers />,
    url: 'https://oneapp.pertinenceproperties.com',
    detail: {
      tagline:
        'A reusable frontend foundation spanning four enterprise products and mobile delivery.',
      accentColor: 'purple',
      backgroundImage: '/screenshot-oneapp.jpg',
      stats: [
        { value: '4', label: 'Enterprise Products' },
        { value: '100KB', label: 'Bundle Reduction' },
        { value: '2', label: 'Mobile Platforms' },
        { value: 'Shared', label: 'Component Library' },
      ],
      overview:
        'At Pertinence Group, I led frontend architecture across Realvest, Greenland, OneApp, and Pettysave while building shared systems used across products.',
      problem:
        'Multiple products needed faster delivery, consistent interfaces, less duplication, reliable testing, better performance, and a path from web to mobile.',
      approach:
        'I established scalable structures and coding standards, built a shared component library, replaced framework-dependent components, integrated APIs, and packaged applications with Capacitor.',
      outcome:
        'The product suite gained stronger reuse and maintainability, consistent UI foundations, production mobile delivery, and a 100KB bundle-size reduction in OneApp.',
      challenges:
        'The central challenge was evolving several active enterprise products without slowing feature delivery or fragmenting their frontend foundations.',
      highlights: [
        {
          title: 'Shared Component Library',
          body: 'Improved code reuse, UI consistency, maintainability, and developer productivity.',
        },
        {
          title: 'Product Architecture',
          body: 'Defined scalable project structures and standards across four applications.',
        },
        {
          title: 'Web to Mobile',
          body: 'Packaged web applications for Android and iOS using Capacitor.',
        },
        {
          title: 'Core Business Modules',
          body: 'Delivered wallets, subscriptions, referrals, marketplaces, authentication, and payments.',
        },
      ],
    },
  },
  {
    id: 'realvest',
    title: 'Realvest',
    year: '2025',
    description:
      'A property investment platform for discovering opportunities and managing real-estate investment activity.',
    tech: ['Vue.js', 'TypeScript', 'REST APIs', 'Payments'],
    category: 'PropTech',
    icon: <IconLayers />,
    url: 'https://realvest.ng',
    detail: {
      tagline: 'A clearer digital path from property discovery to investment.',
      accentColor: 'emerald',
      stats: [
        { value: 'Web', label: 'Investment Platform' },
        { value: 'API', label: 'Driven Experience' },
        { value: 'Live', label: 'Property Marketplace' },
        { value: 'Vue', label: 'Frontend Stack' },
      ],
      overview:
        'At Pertinence Group, I contributed to Realvest as part of the company’s connected property technology product suite.',
      problem:
        'Property investors needed a dependable interface for discovering opportunities and navigating investment, account, and payment workflows.',
      approach:
        'I applied reusable frontend foundations, responsive interface patterns, and REST API integrations shared across Pertinence products.',
      outcome:
        'Realvest delivers a consistent, maintainable experience across property discovery and investment journeys.',
      challenges:
        'The interface had to make data-heavy property and financial workflows understandable across desktop and mobile devices.',
      highlights: [
        { title: 'Property Discovery', body: 'Structured property information into clear, responsive browsing experiences.' },
        { title: 'Investment Workflows', body: 'Supported customer journeys spanning investment and account activity.' },
        { title: 'Reusable Foundations', body: 'Shared components improved consistency across the wider product suite.' },
        { title: 'API Integration', body: 'Connected frontend journeys to production property and payment services.' },
      ],
    },
  },
  {
    id: 'oneapp',
    title: 'OneApp',
    year: '2023',
    description:
      'A centralized real-estate platform for customer and internal product, subscription, and payment workflows.',
    tech: ['Vue.js', 'TypeScript', 'REST APIs', 'Performance'],
    category: 'PropTech',
    icon: <IconLayers />,
    url: 'https://oneapp.pertinenceproperties.com',
    detail: {
      tagline: 'A faster, more maintainable frontend for a centralized real-estate platform.',
      accentColor: 'orange',
      stats: [
        { value: '100KB', label: 'Bundle Reduction' },
        { value: 'Custom', label: 'UI Components' },
        { value: 'Web', label: 'Production Platform' },
        { value: 'Vue', label: 'Frontend Stack' },
      ],
      overview:
        'I maintained and enhanced OneApp at Pertinence Group across customer-facing and internal real-estate workflows.',
      problem:
        'The application depended heavily on framework components that increased bundle weight and limited interface flexibility.',
      approach:
        'I replaced Vuetify dependencies with custom reusable components and shipped improvements across product, subscription, and payment modules.',
      outcome:
        'The work reduced the application bundle by 100KB while improving reuse, performance, and maintainability.',
      challenges:
        'Modernizing an active production application required performance improvements without disrupting existing workflows.',
      highlights: [
        { title: 'Bundle Reduction', body: 'Replacing framework components reduced the frontend bundle by 100KB.' },
        { title: 'Custom Components', body: 'Reusable UI foundations improved consistency and delivery speed.' },
        { title: 'Production Features', body: 'Shipped improvements across product, subscription, and payment modules.' },
        { title: 'Platform Maintenance', body: 'Kept customer and internal workflows reliable while evolving the frontend.' },
      ],
    },
  },
];
