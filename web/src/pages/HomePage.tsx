import {
  ClipboardList,
  Clock,
  Headphones,
  Leaf,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from 'lucide-react'
import { motion } from 'motion/react'

import { EnquiryForm } from '@/components/EnquiryForm'
import { BlogSection } from '@/components/ui/blog-section'
import { CircularGallerySection } from '@/components/projects/CircularGallerySection'
import { ConstructionInProgressSection } from '@/components/projects/ConstructionInProgressSection'
import { ProjectsSection } from '@/components/projects/ProjectsSection'
import { ServicesSection } from '@/components/services/ServicesSection'
import { SiteFooter } from '@/components/SiteFooter'

const ABOUT_BRAND_IMAGE = '/valadares-logo.png'

const featIconProps = { size: 20, strokeWidth: 1.5, className: 'text-charcoal' }

export function HomePage({ portfolioUrls }: { portfolioUrls: string[] | undefined }) {
  return (
    <>
      <section id="hero">
        <div className="hero-media" aria-hidden="true">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/hero-poster.jpg"
          >
            {/* H.264 MP4 from gemini master (converted for all browsers). */}
            <source src="/hero-gemini-master.mp4" type="video/mp4" />
            <source src="/hero-background.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-scrim" aria-hidden="true" />

        <div className="hero-inner">
          <div className="hero-copy">
            <div className="hero-badge">
              <span />
              Construction &amp; renovation
            </div>
            <h1 className="hero-h1">
              Building your vision
              <br />
              <em>beyond expectation.</em>
            </h1>
            <p className="hero-p">
              Valadares Builders Solutions handles construction, renovation, and project management with a
              straight-talking crew, fair pricing, and workmanship built to last.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn-dark">
                Request a Free Quote
              </a>
              <a href="#services" className="btn-ghost">
                Explore Our Services →
              </a>
            </div>
            <div className="hero-scroll">
              <div className="scroll-bar" />
              <span className="scroll-txt">Scroll</span>
            </div>
          </div>

          <aside className="hero-visual" style={{ animation: 'fadeIn 1s 0.7s ease both' }} aria-label="Highlights">
            <div className="h-card">
              <div className="h-card-icon">🏆</div>
              <h4>Award-winning delivery</h4>
              <p>UK Construction Excellence Awards — recognised project delivery.</p>
              <div className="h-card-pill">2023 · 2024</div>
            </div>
            <div className="h-stat-grid">
              <div className="h-stat">
                <div className="num">500+</div>
                <div className="lbl">Projects</div>
              </div>
              <div className="h-stat">
                <div className="num">98%</div>
                <div className="lbl">Satisfaction</div>
              </div>
              <div className="h-stat">
                <div className="num">15+</div>
                <div className="lbl">Years</div>
              </div>
              <div className="h-stat">
                <div className="num">50+</div>
                <div className="lbl">Experts</div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <div className="strip">
        <div className="strip-inner">
          <div className="strip-item">
            <span>✦</span> ISO 9001 Certified
          </div>
          <div className="strip-item">
            <span>✦</span> NHBC Registered
          </div>
          <div className="strip-item">
            <span>✦</span> RICS Affiliated
          </div>
          <div className="strip-item">
            <span>✦</span> CHAS Accredited
          </div>
          <div className="strip-item">
            <span>✦</span> LEED Certified Builds
          </div>
          <div className="strip-item">
            <span>✦</span> FMB Member
          </div>
          <div className="strip-item">
            <span>✦</span> Construction Line Gold
          </div>
          <div className="strip-item">
            <span>✦</span> £10M Insured
          </div>
          <div className="strip-item">
            <span>✦</span> ISO 9001 Certified
          </div>
          <div className="strip-item">
            <span>✦</span> NHBC Registered
          </div>
          <div className="strip-item">
            <span>✦</span> RICS Affiliated
          </div>
          <div className="strip-item">
            <span>✦</span> CHAS Accredited
          </div>
          <div className="strip-item">
            <span>✦</span> LEED Certified Builds
          </div>
          <div className="strip-item">
            <span>✦</span> FMB Member
          </div>
          <div className="strip-item">
            <span>✦</span> Construction Line Gold
          </div>
          <div className="strip-item">
            <span>✦</span> £10M Insured
          </div>
        </div>
      </div>

      <section id="about" className="sec sec-alt">
        <div className="container">
          <div className="about-grid">
            <motion.div
              className="about-img-wrap"
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35, margin: '0px 0px -60px 0px' }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="about-img-main about-img-main--logo">
                <div className="about-img-pan">
                  <img
                    className="about-img-photo"
                    src={ABOUT_BRAND_IMAGE}
                    alt="Valadares Builders Solutions (VBS) logo"
                    width={560}
                    height={158}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              <div className="about-img-badge">
                <div className="badge-label">Est.</div>
                <div className="badge-val">2009</div>
              </div>
              <div className="about-img-tag">
                <div className="num">A+</div>
                <div className="lbl">Rated &amp; Certified</div>
              </div>
            </motion.div>

            <div className="about-text reveal-r">
              <p className="label">✦ Who We Are</p>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                Excellence in every
                <br />
                detail we build.
              </motion.h2>
              <p>
                Valadares Builders Solutions was founded with a single purpose: to deliver construction projects that
                exceed expectations — on time, on budget, and built to last generations.
              </p>
              <p>
                From residential renovations to large-scale commercial developments, our team of certified engineers,
                architects, and skilled tradespeople bring your vision to life with unparalleled precision.
              </p>
              <ul className="feat-list">
                <li>
                  <div className="feat-icon" aria-hidden>
                    <ShieldCheck {...featIconProps} />
                  </div>
                  <div className="feat-text">
                    <strong>Licensed &amp; Fully Insured</strong>
                    <span>Comprehensive £10M public liability coverage on every project.</span>
                  </div>
                </li>
                <li>
                  <div className="feat-icon" aria-hidden>
                    <ClipboardList {...featIconProps} />
                  </div>
                  <div className="feat-text">
                    <strong>Transparent Pricing</strong>
                    <span>Detailed itemised quotes — no hidden costs, no surprises.</span>
                  </div>
                </li>
                <li>
                  <div className="feat-icon" aria-hidden>
                    <Leaf {...featIconProps} />
                  </div>
                  <div className="feat-text">
                    <strong>Sustainable Practices</strong>
                    <span>Eco-friendly materials and energy-efficient building methods.</span>
                  </div>
                </li>
                <li>
                  <div className="feat-icon" aria-hidden>
                    <Headphones {...featIconProps} />
                  </div>
                  <div className="feat-text">
                    <strong>Dedicated Support</strong>
                    <span>A named project manager on hand from start to handover.</span>
                  </div>
                </li>
              </ul>
              <a href="#contact" className="btn-dark">
                Start Your Project
              </a>
            </div>
          </div>
        </div>
      </section>

      <ServicesSection />

      <div className="numbers-band">
        <div className="container">
          <div className="numbers-grid">
            <div className="nb-item reveal">
              <div className="nb-num">15+</div>
              <div className="nb-label">Years of Excellence</div>
              <div className="nb-sub">Founded 2009</div>
            </div>
            <div className="nb-item reveal">
              <div className="nb-num">500+</div>
              <div className="nb-label">Projects Completed</div>
              <div className="nb-sub">Residential &amp; Commercial</div>
            </div>
            <div className="nb-item reveal">
              <div className="nb-num">98%</div>
              <div className="nb-label">Client Satisfaction</div>
              <div className="nb-sub">Based on post-project surveys</div>
            </div>
            <div className="nb-item reveal">
              <div className="nb-num">50+</div>
              <div className="nb-label">Expert Team Members</div>
              <div className="nb-sub">Engineers, designers, trades</div>
            </div>
          </div>
        </div>
      </div>

      <section id="process" className="sec sec-alt">
        <div className="container">
          <div className="sec-head center reveal">
            <p className="label">✦ How It Works</p>
            <h2>Our proven process</h2>
          </div>
          <div className="process-list">
            <div className="proc reveal">
              <div className="proc-connector" />
              <div className="proc-ring">
                <span>01</span>
              </div>
              <h4>Initial Consultation</h4>
              <p>We listen and understand your vision, site conditions, and budget to shape the perfect brief.</p>
            </div>
            <div className="proc reveal">
              <div className="proc-connector" />
              <div className="proc-ring">
                <span>02</span>
              </div>
              <h4>Design &amp; Planning</h4>
              <p>Architects produce detailed plans, 3D renders, and all permit documentation for approval.</p>
            </div>
            <div className="proc reveal">
              <div className="proc-connector" />
              <div className="proc-ring">
                <span>03</span>
              </div>
              <h4>Transparent Quote</h4>
              <p>A detailed, itemised quote with no hidden costs — you know exactly where every penny goes.</p>
            </div>
            <div className="proc reveal">
              <div className="proc-connector" />
              <div className="proc-ring">
                <span>04</span>
              </div>
              <h4>Construction</h4>
              <p>Expert craftsmen execute with precision. Regular site updates keep you informed at every stage.</p>
            </div>
            <div className="proc reveal">
              <div className="proc-connector" />
              <div className="proc-ring">
                <span>05</span>
              </div>
              <h4>Handover &amp; Care</h4>
              <p>Full inspection, documentation handover, and ongoing aftercare for lasting satisfaction.</p>
            </div>
          </div>
        </div>
      </section>

      <ProjectsSection imageUrls={portfolioUrls} />
      <ConstructionInProgressSection />
      <CircularGallerySection />

      <BlogSection />

      <section id="testimonials" className="sec" style={{ overflow: 'hidden' }}>
        <div className="container">
          <div className="sec-head center reveal">
            <p className="label">✦ Client Stories</p>
            <h2>What our clients say</h2>
          </div>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div className="testi-track">
            <div className="testi-card">
              <div className="stars">★★★★★</div>
              <blockquote>
                &quot;VBS transformed our Victorian terrace into a stunning modern home. The attention to detail was
                extraordinary — every finish was immaculate.&quot;
              </blockquote>
              <div className="testi-author">
                <div className="testi-av">SR</div>
                <div>
                  <div className="testi-name">Sarah Richardson</div>
                  <div className="testi-role">Residential Client, London</div>
                </div>
              </div>
            </div>
            <div className="testi-card">
              <div className="stars">★★★★★</div>
              <blockquote>
                &quot;Our commercial build came in on time and under budget — unheard of in this industry. The project
                management was seamless from start to finish.&quot;
              </blockquote>
              <div className="testi-author">
                <div className="testi-av">JM</div>
                <div>
                  <div className="testi-name">James Morrison</div>
                  <div className="testi-role">Managing Director, TechSpace Ltd</div>
                </div>
              </div>
            </div>
            <div className="testi-card">
              <div className="stars">★★★★★</div>
              <blockquote>
                &quot;From the initial consultation to final handover, VBS exceeded every expectation. Our eco home is
                beautiful, efficient, and built to last.&quot;
              </blockquote>
              <div className="testi-author">
                <div className="testi-av">EP</div>
                <div>
                  <div className="testi-name">Elena Patel</div>
                  <div className="testi-role">Homeowner, Surrey</div>
                </div>
              </div>
            </div>
            <div className="testi-card">
              <div className="stars">★★★★★</div>
              <blockquote>
                &quot;The renovation of our restaurant was completed with minimal disruption and maximum quality. The
                team worked around our schedule perfectly.&quot;
              </blockquote>
              <div className="testi-author">
                <div className="testi-av">CL</div>
                <div>
                  <div className="testi-name">Carlos Lima</div>
                  <div className="testi-role">Restaurant Owner, Manchester</div>
                </div>
              </div>
            </div>
            <div className="testi-card">
              <div className="stars">★★★★★</div>
              <blockquote>
                &quot;I&apos;ve worked with many contractors over the years. VBS stands in a class of their own —
                professional, honest, and passionate about what they build.&quot;
              </blockquote>
              <div className="testi-author">
                <div className="testi-av">AW</div>
                <div>
                  <div className="testi-name">Amanda Wells</div>
                  <div className="testi-role">Property Developer</div>
                </div>
              </div>
            </div>
            <div className="testi-card">
              <div className="stars">★★★★★</div>
              <blockquote>
                &quot;VBS transformed our Victorian terrace into a stunning modern home. The attention to detail was
                extraordinary — every finish was immaculate.&quot;
              </blockquote>
              <div className="testi-author">
                <div className="testi-av">SR</div>
                <div>
                  <div className="testi-name">Sarah Richardson</div>
                  <div className="testi-role">Residential Client, London</div>
                </div>
              </div>
            </div>
            <div className="testi-card">
              <div className="stars">★★★★★</div>
              <blockquote>
                &quot;Our commercial build came in on time and under budget — unheard of in this industry. The project
                management was seamless from start to finish.&quot;
              </blockquote>
              <div className="testi-author">
                <div className="testi-av">JM</div>
                <div>
                  <div className="testi-name">James Morrison</div>
                  <div className="testi-role">Managing Director, TechSpace Ltd</div>
                </div>
              </div>
            </div>
            <div className="testi-card">
              <div className="stars">★★★★★</div>
              <blockquote>
                &quot;From the initial consultation to final handover, VBS exceeded every expectation. Our eco home is
                beautiful, efficient, and built to last.&quot;
              </blockquote>
              <div className="testi-author">
                <div className="testi-av">EP</div>
                <div>
                  <div className="testi-name">Elena Patel</div>
                  <div className="testi-role">Homeowner, Surrey</div>
                </div>
              </div>
            </div>
            <div className="testi-card">
              <div className="stars">★★★★★</div>
              <blockquote>
                &quot;The renovation of our restaurant was completed with minimal disruption and maximum quality. The
                team worked around our schedule perfectly.&quot;
              </blockquote>
              <div className="testi-author">
                <div className="testi-av">CL</div>
                <div>
                  <div className="testi-name">Carlos Lima</div>
                  <div className="testi-role">Restaurant Owner, Manchester</div>
                </div>
              </div>
            </div>
            <div className="testi-card">
              <div className="stars">★★★★★</div>
              <blockquote>
                &quot;I&apos;ve worked with many contractors over the years. VBS stands in a class of their own —
                professional, honest, and passionate about what they build.&quot;
              </blockquote>
              <div className="testi-author">
                <div className="testi-av">AW</div>
                <div>
                  <div className="testi-name">Amanda Wells</div>
                  <div className="testi-role">Property Developer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="cta-band">
        <div className="container">
          <p className="label">✦ Ready to Begin?</p>
          <h2>
            Let&apos;s build something
            <br />
            remarkable together.
          </h2>
          <p>
            Whether you have a detailed brief or just an idea, our team is ready to help you every step of the way.
          </p>
          <a href="#contact" className="btn-gold">
            Get Your Free Quote →
          </a>
        </div>
      </div>

      <section id="contact" className="sec sec-alt">
        <div className="container">
          <div className="contact-grid">
            <div className="cinfo reveal-l">
              <p className="label">✦ Get in Touch</p>
              <h2>
                Let&apos;s build
                <br />
                something great.
              </h2>
              <p>
                Fill in the enquiry form and one of our specialists will be in touch within 24 business hours. No
                commitment required — just an honest conversation about your project.
              </p>
              <div className="cinfo-items">
                <div className="c-item">
                  <div className="c-icon" aria-hidden>
                    <MapPin {...featIconProps} />
                  </div>
                  <div>
                    <div className="c-label">Our Office</div>
                    <div className="c-val">123 Builder&apos;s Row, London, UK</div>
                  </div>
                </div>
                <div className="c-item">
                  <div className="c-icon" aria-hidden>
                    <Phone {...featIconProps} />
                  </div>
                  <div>
                    <div className="c-label">Phone</div>
                    <div className="c-val">
                      <a
                        href="tel:+447748323194"
                        className="text-inherit no-underline hover:underline hover:decoration-gold/70"
                      >
                        +44 (0) 7748 323194
                      </a>
                    </div>
                  </div>
                </div>
                <div className="c-item">
                  <div className="c-icon" aria-hidden>
                    <Mail {...featIconProps} />
                  </div>
                  <div>
                    <div className="c-label">Email</div>
                    <div className="c-val">info@valadaresbuilders.com</div>
                  </div>
                </div>
                <div className="c-item">
                  <div className="c-icon" aria-hidden>
                    <Clock {...featIconProps} />
                  </div>
                  <div>
                    <div className="c-label">Office Hours</div>
                    <div className="c-val">Mon – Fri: 8:00am – 6:00pm</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal-r">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
