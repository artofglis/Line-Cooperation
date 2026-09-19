import type { Section, HeroContent, TextContent, ImageTextContent } from '../../lib/sections'
import { HeroSection } from './HeroSection'
import { TextSection } from './TextSection'
import { ImageTextSection } from './ImageTextSection'

export function SectionRenderer({ section }: { section: Section }) {
  if (!section.visible) return null
  switch (section.type) {
    case 'hero':
      return <HeroSection content={section.content as HeroContent} />
    case 'text':
      return <TextSection content={section.content as TextContent} />
    case 'image_text':
      return <ImageTextSection content={section.content as ImageTextContent} />
    default:
      return null
  }
}

export function SectionList({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </>
  )
}
