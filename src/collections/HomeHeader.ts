import { CollectionConfig } from 'payload'
import {
  lexicalEditor,
  HeadingFeature,
  InlineToolbarFeature,
  FixedToolbarFeature,
} from '@payloadcms/richtext-lexical'

const HeadingBlock: CollectionConfig = {
  slug: 'heading-block',
  admin: {
    useAsTitle: 'heading',
    defaultColumns: ['heading'],
  },
  labels: {
    singular: 'Heading Block',
    plural: 'Heading Blocks',
  },
  access: {
    read: () => true, // ✅ Enables public access
  },
  fields: [
    {
      name: 'heading',
      label: 'Heading',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature(),
          InlineToolbarFeature(),
          FixedToolbarFeature(),
        ],
      }),
    },
  ],
}

export default HeadingBlock
