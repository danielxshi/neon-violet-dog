import type { CollectionConfig } from 'payload'

const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'description', 'heroImage', 'order'], // show order column
  },
  access: {
    read: () => true,
  },
  // populate uploads by default so `url` etc. are available without extra depth
  defaultPopulate: {
    heroImage: true,
    gallery: { media: true },
  },
  fields: [
    {
      name: 'order',
      label: 'Order',
      type: 'number',
      required: false,
      admin: {
        description: 'Lower numbers appear first',
      },
    },
    {
      name: 'title',
      label: 'Service Title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Short Description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'extendedDescription',
      label: 'Extended Description',
      type: 'textarea',
    },

    // --- Images area ---
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Images',
          fields: [
            {
              name: 'heroImage',
              label: 'Hero Image',
              type: 'upload',
              relationTo: 'media', // uses your Media collection
              admin: { description: 'Shown as the primary visual for this service.' },
              filterOptions: {
                mimeType: { contains: 'image/' }, // restrict to images
              },
            },
            {
              name: 'gallery',
              label: 'Gallery',
              type: 'array',
              labels: { singular: 'Media Item', plural: 'Gallery Items' },
              fields: [
                {
                  name: 'media',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  filterOptions: {
                    mimeType: { in: ['image/', 'video/'] }, // allow images or videos
                  },
                },
                {
                  name: 'caption',
                  type: 'text',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default Services
