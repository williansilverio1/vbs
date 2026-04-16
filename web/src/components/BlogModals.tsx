import { type ReactNode } from 'react'

import { useModal, type ModalId } from '@/context/ModalContext'

function ModalContactLink({ id, children }: { id: ModalId; children: React.ReactNode }) {
  const { closeModal } = useModal()
  return (
    <a
      href="#contact"
      className="font-semibold text-[var(--gold)]"
      onClick={() => closeModal(id)}
    >
      {children}
    </a>
  )
}

function BlogModalFrame({
  id,
  title,
  meta,
  children,
}: {
  id: ModalId
  title: string
  meta: string
  children: ReactNode
}) {
  const { activeId, closeModal } = useModal()
  const open = activeId === id
  return (
    <div
      className={'modal-overlay' + (open ? ' active' : '')}
      id={id}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal(id)
      }}
    >
      <div className="modal">
        <div className="modal-head">
          <h2>{title}</h2>
          <button type="button" className="modal-x" onClick={() => closeModal(id)}>
            ✕
          </button>
        </div>
        <div className="modal-body">
          <div className="modal-date">{meta}</div>
          {children}
        </div>
      </div>
    </div>
  )
}

export function BlogModals() {
  return (
    <>
      <BlogModalFrame
        id="blog-structural-survey"
        title="5 Signs Your Home Needs a Structural Survey Before Renovation"
        meta="Construction tips · March 2025 · 6 min read"
      >
        <p>
          A structural survey is not just paperwork — it is the clearest picture you can get of how your building
          behaves before you alter load paths, remove walls, or add storeys. In the UK, many period homes hide
          movement, timber decay, or past alterations that are not obvious until finishes come off.
        </p>
        <div className="modal-divider" />
        <h3>1. Visible cracks that track through brickwork</h3>
        <p>
          Stair-step cracks in masonry, widening gaps around openings, or movement that follows mortar joints can
          indicate foundation or lintel issues. Not every crack is catastrophic, but a survey tells you which need
          engineering input before you commit to a design.
        </p>
        <h3>2. Springy or uneven floors upstairs</h3>
        <p>
          Bounce in joists, noticeable dips, or floors that have been notched heavily for services can mean the
          structure is already working harder than it should. Opening up for an open-plan layout without checking
          spans is a common trigger for costly remedial steelwork.
        </p>
        <h3>3. You are removing or altering a chimney breast</h3>
        <p>
          Chimney stacks often provide lateral restraint and support intermediate floors. Taking them out without a
          calculated scheme can redistribute loads in ways the original house was never designed for.
        </p>
        <h3>4. The property has been extended more than once</h3>
        <p>
          Each phase may have been built to different standards. Junctions between old and new structures are where
          movement and water ingress often concentrate — a survey helps you plan repairs in the right sequence.
        </p>
        <h3>5. You are borrowing against the project or need building control sign-off</h3>
        <p>
          Lenders and insurers increasingly expect clarity on structural risk. Having a survey-backed brief also
          means builders can quote accurately instead of pricing unknowns that later appear as variations.
        </p>
        <div className="modal-divider" />
        <p>
          At Valadares Builders Solutions we coordinate surveys, structural engineers, and buildability so your
          renovation starts with facts, not assumptions.{' '}
          <ModalContactLink id="blog-structural-survey">Speak to our team</ModalContactLink> if you are unsure where to
          begin.
        </p>
      </BlogModalFrame>

      <BlogModalFrame
        id="blog-sustainability-uk"
        title="How Sustainable Practices Are Reshaping UK Construction"
        meta="Sustainability · February 2025 · 8 min read"
      >
        <p>
          Regulation, energy prices, and client expectations are all pushing UK construction toward lower carbon,
          higher comfort buildings. What used to be “nice to have” — better insulation, airtightness, and
          responsible sourcing — is now central to planning discussions and long-term running costs.
        </p>
        <div className="modal-divider" />
        <h3>Fabric-first still wins</h3>
        <p>
          The most cost-effective carbon savings usually come from reducing heat demand: high-performance envelopes,
          thermal bridge–aware detailing, and controlled ventilation with heat recovery where appropriate. Bolting on
          oversized plant to compensate for a leaky shell rarely ages well.
        </p>
        <h3>Materials and provenance</h3>
        <p>
          Timber from assured schemes, low-carbon concrete options, and reclaimed elements can all reduce embodied
          carbon when specified early. The key is matching products to the structural and fire strategy, not treating
          sustainability as a late swap-out.
        </p>
        <h3>On-site waste and logistics</h3>
        <p>
          Lean scheduling, segregated waste streams, and coordination between trades cut skip miles and rework. On
          tight urban sites, delivery sequencing is as much an environmental lever as product choice.
        </p>
        <h3>What this means for homeowners</h3>
        <p>
          A well-executed sustainable build should feel better day to day — stable temperatures, less draught, lower
          bills — while holding value in a market that increasingly asks for EPC and retrofit evidence.
        </p>
        <div className="modal-divider" />
        <p>
          If you are planning a new build, deep retrofit, or commercial fit-out, we can align your brief with
          realistic sustainability targets. <ModalContactLink id="blog-sustainability-uk">Request a consultation</ModalContactLink>.
        </p>
      </BlogModalFrame>

      <BlogModalFrame
        id="blog-extension-budget"
        title="How to Budget Your Extension Project: A Complete 2025 Guide"
        meta="Budget guide · January 2025 · 10 min read"
      >
        <p>
          Extensions fail budgets when scope, structure, and finishes are mixed into one vague number. A useful 2025
          budget splits the project into controllable work packages, includes a real contingency, and leaves room for
          statutory costs that are easy to underestimate.
        </p>
        <div className="modal-divider" />
        <h3>Professional fees and consents</h3>
        <p>
          Architectural design, structural engineering, surveys, Party Wall agreements, and planning or lawful
          development checks all sit outside “builder price per m²”. Planning for them upfront avoids pausing work
          when information is missing.
        </p>
        <h3>Shell and structure</h3>
        <p>
          Foundations suited to ground conditions, steel or timber frames, openings, and weathering account for a
          large share of cost volatility. A fixed quote needs resolved drawings — which is why we invest in detailing
          before we commit numbers.
        </p>
        <h3>Building services</h3>
        <p>
          Electrics, heating, and ventilation upgrades often scale with floor area and complexity. If you are
          extending a kitchen, assume appliance circuits, extraction, and possibly supply upgrades — not just
          “extra sockets”.
        </p>
        <h3>Finishes and fittings</h3>
        <p>
          Kitchens, bathrooms, flooring, and joinery are where personal taste moves the needle. Capture allowances per
          room so you can compare quotes fairly and decide where to splurge.
        </p>
        <h3>Contingency you can actually keep</h3>
        <p>
          For renovations and extensions, we typically advise holding contingency for concealed conditions once
          openings are formed. The right percentage depends on survey quality and age of the property — older stock
          usually needs more headroom.
        </p>
        <div className="modal-divider" />
        <p>
          Want an itemised view tailored to your plot?{' '}
          <ModalContactLink id="blog-extension-budget">Share your plans with VBS</ModalContactLink> and we will help you
          structure a budget you can trust.
        </p>
      </BlogModalFrame>
    </>
  )
}
