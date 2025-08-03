import { CollectionConfig } from 'payload'

const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'description'],
  },
  fields: [
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
      required: false,
    },
  ],
}

export default Services
