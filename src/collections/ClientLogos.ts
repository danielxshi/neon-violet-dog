import { CollectionConfig } from 'payload'

const ClientLogos: CollectionConfig = {
  slug: 'client-logos',
  admin: {
    useAsTitle: 'companyName',
    defaultColumns: ['companyName', 'logo'],
  },
  fields: [
    {
      name: 'companyName',
      label: 'Company Name',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      label: 'Logo Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}

export default ClientLogos
