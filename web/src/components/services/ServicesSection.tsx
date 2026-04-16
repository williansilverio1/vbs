import {
  Building2,
  ClipboardList,
  DraftingCompass,
  Hammer,
  Home,
  Leaf,
  type LucideIcon,
} from 'lucide-react'
import { motion } from 'motion/react'

type ServiceItem = {
  num: string
  title: string
  description: string
  tag: string
  icon: LucideIcon
  featured?: boolean
  /** Featured media: prefer MP4 video when set (no poster — só o vídeo). */
  videoSrc?: string
  imageSrc?: string
  imageAlt?: string
}

const iconProps = { size: 22, strokeWidth: 1.5, className: 'text-charcoal' }

const SERVICES: ServiceItem[] = [
  {
    num: '01',
    title: 'Residential Construction',
    description:
      'Custom homes and luxury residences designed and built to the highest standards. From single-family homes to multi-unit developments, we turn architectural dreams into lasting realities.',
    tag: 'New Build & Custom',
    icon: Home,
    featured: true,
    videoSrc: '/valadaresbuilders-services-hero.mp4',
    imageAlt: 'Valadares Builders Solutions — team on site, residential construction',
  },
  {
    num: '02',
    title: 'Commercial Development',
    description:
      'Office buildings, retail spaces, and industrial facilities constructed with meticulous attention to structural integrity, functionality, and aesthetic excellence.',
    tag: 'Commercial & Industrial',
    icon: Building2,
  },
  {
    num: '03',
    title: 'Renovation & Remodelling',
    description:
      'Breathe new life into existing structures. Kitchen upgrades, bathroom transformations, full interior overhauls — no project too large or small.',
    tag: 'Interior & Exterior',
    icon: Hammer,
  },
  {
    num: '04',
    title: 'Architecture & Design',
    description:
      'Our in-house design team creates innovative blueprints and full 3D visualisations so you can see and shape your project before a single brick is laid.',
    tag: 'Concept to Blueprint',
    icon: DraftingCompass,
  },
  {
    num: '05',
    title: 'Sustainable Building',
    description:
      'Green construction practices, LEED-compliant materials, and energy-efficient systems that reduce environmental impact without compromising on quality.',
    tag: 'Eco & LEED Certified',
    icon: Leaf,
  },
  {
    num: '06',
    title: 'Project Management',
    description:
      "Full oversight from planning and permitting through to handover. We manage contractors, timelines, budgets, and compliance so you don't have to.",
    tag: 'Full Oversight',
    icon: ClipboardList,
  },
]

function ServiceCard({ item }: { item: ServiceItem }) {
  const featuredMedia = item.featured && (item.videoSrc || item.imageSrc)
  if (featuredMedia) {
    return (
      <motion.article
        className="srv srv--featured reveal"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="srv-featured-copy">
          <span className="srv-n">{item.num}</span>
          <div className="srv-icon" aria-hidden>
            <item.icon {...iconProps} />
          </div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <div className="srv-tag">{item.tag}</div>
        </div>
        <div className="srv-featured-media">
          {item.videoSrc ? (
            <video
              className="srv-featured-video"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label={item.imageAlt ?? item.title}
            >
              <source src={item.videoSrc} type="video/mp4" />
            </video>
          ) : (
            <img
              className="srv-featured-img"
              src={item.imageSrc}
              alt={item.imageAlt ?? item.title}
              loading="lazy"
              decoding="async"
            />
          )}
        </div>
      </motion.article>
    )
  }

  return (
    <motion.article
      className="srv reveal"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="srv-n">{item.num}</span>
      <div className="srv-icon" aria-hidden>
        <item.icon {...iconProps} />
      </div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <div className="srv-tag">{item.tag}</div>
    </motion.article>
  )
}

export function ServicesSection() {
  return (
    <section id="services" className="sec">
      <div className="container">
        <div className="sec-head center reveal">
          <p className="label">✦ What We Offer</p>
          <h2>Our expert services</h2>
          <p>
            Comprehensive construction and building solutions tailored to meet the unique demands of every project.
          </p>
        </div>
        <div className="services-grid">
          {SERVICES.map((item) => (
            <ServiceCard key={item.num} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
