// import Fairmont from '../public/client-logos/';
// import AP from "../public/client-logos/ap.png";
// import HUBLOT from '../public/client-logos/';
// import FSP from '../public/client-logos/';
// import CK from '../public/client-logos/';
// import millenium from '../public/client-logos/';
// import burj from '../public/client-logos/';

const dummyText =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias cumque itaque harum doloremque inventore dolorem natus,'

const IntroMessage = [
  {
    ID: '1',
    Title: '/',
    cName: 'link',
    Message: dummyText,
  },
  {
    ID: '1',
    Title: '/',
    cName: 'link',
    Message: dummyText,
  },
  {
    ID: '1',
    Title: '/',
    cName: 'link',
    Message: dummyText,
  },
  {
    ID: '1',
    Title: '/',
    cName: 'link',
    Message: dummyText,
  },
]

const ServiceMessages = [
  {
    ID: 'SM1',
    Title: 'Creative Planning',
    Message: 'Bringing visions to fruition.',
    Link: '/services/creative-planning',
    Src: '/',
  },
  {
    ID: 'SM2',
    Title: 'Website Development',
    Message: 'Create the perfect first impression through our digital craftsmanship.',
    Link: '/services/website-development',
    Src: '/',
  },
  {
    ID: 'SM3',
    Title: 'Consumer Packaged Goods',
    Message: 'Unique marketing tactics, tailored to each brand.',
    Link: '/services/CPG',
    Src: '/',
  },
  {
    ID: 'SM4',
    Title: 'PR Work',
    Message: 'Strengthen the frontline of your company name.',
    Link: '/services/PR',
    Src: '/',
  },
  {
    ID: 'SM5',
    Title: 'Social Insights & Planning',
    Message: 'Data-driven approach to your next move.',
    Link: '/services/social-insight-and-planning',
    Src: '/',
  },
  {
    ID: 'SM6',
    Title: 'Influencer Work',
    Message: 'Leveraging established personalities to grow yours.',
    Link: '/services/influencer-work',
    Src: '/',
  },
  {
    ID: 'SM7',
    Title: 'Strategical & Fundamental Financial Analysis',
    Message: 'Expert consultancy from every angle.',
    Link: '/services/strat-analysis',
    Src: '/',
  },
  {
    ID: 'SM8',
    Title: 'Technological & Programmatic Advancements',
    Message: 'Innovating at lightning pace.',
    Link: '/services/tech',
    Src: '/',
  },
  {
    ID: 'SM9',
    Title: 'Production & Studio Set (Videography and Photography)',
    Message: 'Bringing drawings & concepts into existence.',
    Link: '/services/production',
    Src: '/',
  },
]

// Locations
const NY = 'New York, USA'
const VAN = 'Vancouver, CA'
const DUBAI = 'Dubai, UAE'

const RecruitingMessages = [
  {
    ID: 'RM1',
    Title: 'Project Manager',
    Location: NY,
    Description: 'Requisition ID: 467262 (full time)',
  },
  {
    ID: 'RM2',
    Title: 'Web UX/UI Designer',
    Location: NY,
    Description: 'Requisition ID: 532970 (full time)',
  },
  {
    ID: 'RM3',
    Title: 'Key Grip',
    Location: VAN,
    Description: 'Requisition ID: 910315 (full time)',
  },
  {
    ID: 'RM4',
    Title: 'Organizational CMS Consultant',
    Location: NY,
    Description: 'Requisition ID: 285726 (part time)',
  },
  {
    ID: 'RM5',
    Title: 'Logistics Consultant',
    Location: VAN,
    Description: 'Requisition ID: 822411 (part time)',
  },
  {
    ID: 'RM6',
    Title: 'Junior Data Analyst',
    Location: NY,
    Description: 'Requisition ID: 166984 (internship)',
  },
  {
    ID: 'RM7',
    Title: 'Project Manager',
    Location: DUBAI,
    Description: 'Requisition ID: 165626 (full time)',
  },
]

// const ClientLogos = [
//   {
//     Title: "/",
//     Src: AP,
//     alt: "alt",
//   },
// ];

const ProjectMessages = {
  IntroMessage: IntroMessage,
  ServiceMessages: ServiceMessages,
  RecruitingMessages: RecruitingMessages,
  // ClientLogos: ClientLogos,
}

export default ProjectMessages
