import { LazyImage } from '@/components/ui/lazy-image'
import { useModal } from '@/context/ModalContext'
import { blogPosts } from '@/data/blogPosts'

export function BlogSection() {
  const { openModal } = useModal()

  return (
    <section id="blog" className="sec sec-alt">
      <div className="container">
        <div className="sec-head center reveal">
          <p className="label">✦ Industry Insights</p>
          <h2 className="font-serif text-[clamp(1.75rem,4vw,2.5rem)] font-light capitalize tracking-[-0.02em] text-charcoal">
            Construction <span className="font-serif font-light text-gold not-italic">blog</span>
          </h2>
          <p className="mx-auto max-w-2xl text-[0.95rem] leading-relaxed text-[var(--slate)]">
            Expert knowledge, industry trends, and practical advice from our specialists.
          </p>
        </div>

        <div className="blog-grid">
          {blogPosts.map((post) => (
            <article key={post.modalId} className="blog-card reveal group flex flex-col p-0">
              <LazyImage
                alt={post.imageAlt}
                src={post.image}
                ratio={16 / 9}
                inView
                wrapClassName="border-b border-[var(--border-soft)]"
                className="transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="blog-body flex flex-1 flex-col">
                <span className="blog-tag">{post.category}</span>
                <h3>{post.title}</h3>
                <p className="flex-1">{post.description}</p>
                <div className="blog-meta mt-auto">
                  <span>
                    {post.dateLabel} <span className="text-[var(--mist)]">•</span> {post.readTime}
                  </span>
                  <button
                    type="button"
                    className="blog-read"
                    onClick={() => openModal(post.modalId)}
                  >
                    Read More →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
