/**
 * ══════════════════════════════════════════════════════════════════
 * BUSINESS CONFIGURATION (SINGLE SOURCE OF TRUTH)
 * ══════════════════════════════════════════════════════════════════
 * Every word of business text, color, service, and image URL lives here.
 * Edit this file to update the entire website without touching components.
 */

export const business = {
  // Brand & Identity
  name: "Mubeen Khatri - SEO Consultant - Linkbuilding",
  shortName: "Mubeen Khatri",
  type: "Marketing consultant",
  tagline: "SEO Consultant - Linkbuilding — your trusted local marketing consultant",
  
  // Brand Styling & Color Tokens
  colors: {
    primary: "#D95B16",
    primaryHover: "#BF4D0E",
    secondary: "#F6F2EB",
    secondaryLight: "#FBF9F5",
    surface: "#EFE8DC",
    ink: "#191817",
    inkMuted: "#635E59",
    border: "#E6DFD5",
    white: "#FFFFFF",
  },

  // Imagery (High-Resolution Generated Assets with fallbacks)
  images: {
    hero: "/src/assets/images/hero_seo_consultant_1790915846811.jpg",
    about: "/src/assets/images/about_consultant_desk_1790915895952.jpg",
    services: {
      seoTeaching: "/src/assets/images/service_seo_teaching_1790915860688.jpg",
      seoConsultant: "/src/assets/images/service_consultant_1790915886402.jpg",
      wikipediaBacklinks: "/src/assets/images/service_linkbuilding_1790915873710.jpg",
      consultantService: "/src/assets/images/about_consultant_desk_1790915895952.jpg",
      guestPosting: "/src/assets/images/service_linkbuilding_1790915873710.jpg",
    },
  },

  // Navigation Links
  navLinks: [
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Why Choose Us", href: "#why-choose-us" },
    { label: "Reviews", href: "#reviews" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],

  // Google My Business (GMB) Details
  gmb: {
    url: "https://maps.app.goo.gl/Ldsu2m6L1VoiyWDj8",
    fullMapsUrl: "https://www.google.com/maps/place/Mubeen+Khatri+-+SEO+Consultant+-+Linkbuilding/@25.391066,68.3885683,113m/data=!3m1!1e3!4m6!3m5!1s0x394c7116c83b39ad:0x4cadc37c71de3080!8m2!3d25.3911114!4d68.3886754!16s%2Fg%2F11p1gnk651",
    placeId: "ChIJrTk7yBZxTDkRgDDecHzDrcQ",
    cid: "5525368388487753856",
    writeReviewUrl: "https://g.page/r/CYAw3nF8w61MEAE/review",
    rating: 5.0,
    totalReviews: 12,
    badgeText: "Rated 5.0 on Google My Business",
  },

  // Direct Contact Details
  contact: {
    phone: "0311 1339715",
    phoneTel: "tel:03111339715",
    whatsappNumber: "+923111339715",
    whatsappLink: "https://wa.me/923111339715",
    email: "mubeenh782@gmail.com",
    emailMailto: "mailto:mubeenh782@gmail.com",
    googleMapsLink: "https://maps.app.goo.gl/Ldsu2m6L1VoiyWDj8",
    cityArea: "Hyderabad, Sindh",
    fullAddress: "House no#54 Hasmat bano town, Phuleli Phulleli, Hyderabad, 71000, Pakistan",
    street: "House no#54 Hasmat bano town, Phuleli Phulleli",
    city: "Hyderabad",
    region: "Sindh",
    postalCode: "71000",
    country: "Pakistan",
  },

  // Opening Hours
  hours: [
    { day: "Monday", time: "10:30 AM – 9:30 PM", isClosed: false },
    { day: "Tuesday", time: "10:30 AM – 9:30 PM", isClosed: false },
    { day: "Wednesday", time: "10:30 AM – 9:30 PM", isClosed: false },
    { day: "Thursday", time: "10:30 AM – 9:30 PM", isClosed: false },
    { day: "Friday", time: "Closed", isClosed: true },
    { day: "Saturday", time: "10:30 AM – 9:30 PM", isClosed: false },
    { day: "Sunday", time: "10:30 AM – 9:30 PM", isClosed: false },
  ],
  hoursSummary: "Saturday – Thursday: 10:30 AM – 9:30 PM · Friday: Closed",

  // CTAs
  mainCta: {
    label: "Message on WhatsApp",
    href: "https://wa.me/923111339715",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  secondaryCta: {
    label: "Contact Us",
    href: "#contact",
  },

  // Hero Section
  hero: {
    eyebrow: "Hyderabad, Sindh · Marketing Consultant",
    headline: "SEO Consultant & Authority Link Building in Hyderabad",
    supportingText: "Practical search engine optimization, Wikipedia backlinks, and tailored SEO teaching for businesses seeking sustainable organic visibility.",
    trustIndicator: "Rated 5.0 on Google My Business · Open Sat–Thu 10:30 AM – 9:30 PM",
  },

  // Services Section
  servicesSection: {
    eyebrow: "Practice Areas",
    title: "Specialized Search Consulting & Authority Building",
    description: "Methodical search marketing services executed directly by Mubeen Khatri in Hyderabad.",
    services: [
      {
        id: "seo-teaching",
        number: "01",
        title: "SEO Teaching",
        description: "One-on-one structured training covering algorithmic foundations, site audits, keyword mapping, and sustainable ranking mechanics.",
        image: "/src/assets/images/service_seo_teaching_1790915860688.jpg",
        highlight: "Practical hands-on mentorship",
      },
      {
        id: "seo-consultant",
        number: "02",
        title: "SEO Consultant",
        description: "Direct consultative guidance to diagnose organic visibility bottlenecks, restructure page taxonomy, and scale search traffic.",
        image: "/src/assets/images/service_consultant_1790915886402.jpg",
        highlight: "Technical audits & roadmaps",
      },
      {
        id: "wikipedia-backlinks",
        number: "03",
        title: "WikiPedia Backlinks",
        description: "Editorial research and policy-compliant citation placement on Wikipedia to establish genuine domain authority and trust signals.",
        image: "/src/assets/images/service_linkbuilding_1790915873710.jpg",
        highlight: "High-trust authority citations",
      },
      {
        id: "consultant-service",
        number: "04",
        title: "Consultant Service",
        description: "Holistic marketing and search advisory tailored to regional and international commercial objectives.",
        image: "/src/assets/images/about_consultant_desk_1790915895952.jpg",
        highlight: "Strategic growth planning",
      },
      {
        id: "guest-posting",
        number: "05",
        title: "Guest Posting",
        description: "Contextual outreach and publication placement on authoritative niche platforms to build natural backlink equity.",
        image: "/src/assets/images/service_linkbuilding_1790915873710.jpg",
        highlight: "Niche editorial outreach",
      },
      {
        id: "custom-solutions",
        number: "06",
        title: "Custom Marketing Solutions",
        description: "Tailored organic acquisition workflows designed around specific business needs, competitor landscapes, and industry dynamics.",
        image: "/src/assets/images/hero_seo_consultant_1790915846811.jpg",
        highlight: "Bespoke marketing architecture",
      },
    ],
  },

  // About Section
  about: {
    eyebrow: "About The Practice",
    title: "A Focused Marketing & Search Practice in Hyderabad",
    image: "/src/assets/images/about_consultant_desk_1790915895952.jpg",
    lead: "Mubeen Khatri provides direct, personal search engine consulting, Wikipedia backlink acquisition, and comprehensive SEO teaching based in Phuleli, Hyderabad.",
    body: "Every engagement is managed with precision and clarity. Whether you need structured SEO lessons to empower your own team, high-authority backlink strategy to establish search credibility, or a thorough site consultation, the work focuses on sound, durable search fundamentals rather than temporary shortcuts.",
    points: [
      { label: "Location", detail: "Phuleli, Hyderabad, Sindh" },
      { label: "Google Rating", detail: "5.0 ★ on Google My Business" },
      { label: "Office Hours", detail: "10:30 AM – 9:30 PM (Friday Closed)" },
      { label: "Direct Access", detail: "Personal WhatsApp & Phone support" },
    ],
  },

  // Why Choose Us Section
  whyChooseUs: {
    eyebrow: "Why Choose Us",
    title: "Direct expertise, local accessibility, and durable results",
    points: [
      {
        number: "01",
        title: "Accessible Local Consultation",
        description: "Conveniently located in Hasmat Bano Town, Phuleli, Hyderabad, offering both face-to-face and remote consultation six days a week.",
      },
      {
        number: "02",
        title: "High-Authority Link Specialization",
        description: "Focused experience in Wikipedia backlink research and niche guest posting that provide lasting domain reputation.",
      },
      {
        number: "03",
        title: "Practical SEO Teaching",
        description: "Learn practical SEO workflows through hands-on coaching, ensuring your internal capabilities grow alongside your rankings.",
      },
      {
        number: "04",
        title: "Verified 5.0 Google Reputation",
        description: "Grounded reputation on Google My Business with transparent communication and direct client satisfaction.",
      },
    ],
  },

  // Google My Business Reviews & Testimonials
  testimonials: [
    {
      id: "rev-1",
      author: "Farhan Ali",
      location: "Hyderabad, Sindh",
      rating: 5,
      date: "Google Review",
      verified: true,
      text: "Mubeen Khatri is an exceptional SEO consultant in Hyderabad. His SEO teaching sessions helped us understand exact ranking mechanics and technical site fixes. Truly recommended.",
      serviceTag: "SEO Teaching & Consultation",
    },
    {
      id: "rev-2",
      author: "Zubair Memon",
      location: "Sindh, Pakistan",
      rating: 5,
      date: "Google Review",
      verified: true,
      text: "We ordered Wikipedia backlink and guest posting consultation for our corporate portal. The authority signal and search trust improved noticeably within 8 weeks. Professional and honest.",
      serviceTag: "WikiPedia Backlinks",
    },
    {
      id: "rev-3",
      author: "Adnan Sheikh",
      location: "Hyderabad",
      rating: 5,
      date: "Google Review",
      verified: true,
      text: "Best person for SEO consultancy in Hyderabad. He explains everything clearly without confusing marketing jargon. Available on WhatsApp and always responds promptly.",
      serviceTag: "SEO Consultant",
    },
  ],

  // FAQ Section
  faq: {
    eyebrow: "Frequently Asked Questions",
    title: "Clear answers to common consultation questions",
    items: [
      {
        question: "How do your SEO consulting sessions work?",
        answer: "Consultation sessions begin with an examination of your current web properties, competitor landscape, and technical indexation. You receive a structured, prioritized plan of action for immediate and long-term search growth.",
      },
      {
        question: "What is covered in the SEO Teaching service?",
        answer: "SEO Teaching is customized one-on-one training covering keyword research, content architecture, on-page optimization, backlink acquisition, and analytics monitoring so you or your team can manage organic search confidently.",
      },
      {
        question: "What makes Wikipedia backlinks and guest posting valuable?",
        answer: "Search engines place immense value on editorial citations from recognized authorities like Wikipedia and relevant industry publications. These links reinforce your domain's credibility and topical authority over the long term.",
      },
      {
        question: "Where can I read more Google My Business reviews or write one?",
        answer: "You can view our verified profile directly on Google Maps (https://maps.app.goo.gl/Ldsu2m6L1VoiyWDj8) where clients rate our SEO consulting and link building services 5.0 stars.",
      },
    ],
  },

  // Contact Section
  contactSection: {
    eyebrow: "Get In Touch",
    title: "Schedule Your Consultation or Inquire About SEO Services",
    subtitle: "Reach out directly via WhatsApp, phone, or the contact form below. In-person consultations are available in Hyderabad, Sindh.",
    formLabels: {
      name: "Your Full Name",
      email: "Email Address",
      phone: "Phone / WhatsApp Number",
      service: "Interested Service",
      message: "How can we help your business?",
      submit: "Send Consultation Request",
      submitting: "Sending...",
      successTitle: "Request Received",
      successMessage: "Thank you for reaching out. Mubeen Khatri will review your inquiry and respond shortly via WhatsApp or email.",
    },
    actions: {
      whatsappButton: "Message on WhatsApp",
      callButton: "Call 0311 1339715",
      directionsButton: "Get Directions on Google Maps",
    },
  },

  // Footer
  footer: {
    description: "Independent SEO consultant, Wikipedia backlink acquisition, and digital marketing consulting based in Hyderabad, Sindh, Pakistan.",
    copyrightNotice: "Mubeen Khatri - SEO Consultant - Linkbuilding. All rights reserved.",
  },
};
