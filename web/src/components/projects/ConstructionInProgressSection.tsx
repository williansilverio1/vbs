import { InteractiveImageBentoGallery } from '@/components/ui/bento-gallery'
import { constructionBentoItems } from '@/data/constructionInProgressMedia'

export function ConstructionInProgressSection() {
  return (
    <div className="scroll-mt-24">
      <InteractiveImageBentoGallery
        sectionId="construction-progress"
        imageItems={constructionBentoItems}
        title="Works in progress"
        description="A live look at construction on site — progress photos and short clips from the same week, straight from the build."
      />
    </div>
  )
}
