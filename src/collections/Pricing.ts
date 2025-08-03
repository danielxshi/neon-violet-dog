import { CollectionConfig } from 'payload'

const Pricing: CollectionConfig = {
  slug: 'pricing',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'price'],
  },
  fields: [
    {
      name: 'title',
      label: 'Service Title',
      type: 'text',
      required: true,
    },
    {
      name: 'price',
      label: 'Price',
      type: 'number',
      required: false,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: false,
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      options: [
        { label: 'Package', value: 'PACKAGE' },
        { label: 'Photo', value: 'PHOTO' },
        { label: 'Video', value: 'VIDEO' },
        { label: 'Matterport', value: 'MATTERPORT' },
        { label: 'Floorplan', value: 'FLOORPLAN' },
        { label: 'Drone', value: 'DRONE' },
        { label: 'Reels', value: 'REELS' },
      ],
    },
  ],
}

export default Pricing
