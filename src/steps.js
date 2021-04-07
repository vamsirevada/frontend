//eslint-disable-next-line
export default [
  {
    id: 'welcome',
    title: 'Home',
    text: `You can see your and your friends posts`,
    attachTo: { element: '.classnamefeed', on: 'bottom' },
    classes: 'shepherd shepherd-welcome',
    buttons: [
      {
        type: 'cancel',
        classes: 'shepherd-button-secondary',
        text: 'Exit',
      },
      {
        type: 'next',
        text: 'Next',
      },
    ],
  },
  {
    id: 'installation',
    title: 'Portfolio',
    text: 'Where you can see your own portfolio',
    attachTo: { element: '.classnameportfolio', on: 'bottom' },
    buttons: [
      {
        type: 'back',
        classes: 'shepherd-button-secondary',
        text: 'Back',
      },
      {
        type: 'next',
        text: 'Next',
      },
    ],
  },
  {
    id: 'usage',
    title: 'NoticeBoard',
    text: ['Notices Regarding your Projects will appear here'],
    attachTo: { element: '.classnamenoticeboard', on: 'bottom' },
    buttons: [
      {
        type: 'back',
        classes: 'shepherd-button-secondary',
        text: 'Back',
      },
      {
        type: 'next',
        text: 'Next',
      },
    ],
  },
  {
    id: 'centered-example',
    title: 'ChatRoom',
    text: `Place where you can interact with friends and Projectmates`,
    attachTo: { element: '.classnamechat', on: 'bottom' },
    buttons: [
      {
        type: 'back',
        classes: 'shepherd-button-secondary',
        text: 'Back',
      },
      {
        type: 'next',
        text: 'Next',
      },
    ],
  },
  {
    id: 'centered-example',
    title: 'Add to Portfolio',
    text: `You can make your portfolio here`,
    attachTo: { element: '.addtoportfolio', on: 'bottom' },
    buttons: [
      {
        type: 'back',
        classes: 'shepherd-button-secondary',
        text: 'Back',
      },
      {
        type: 'next',
        text: 'Next',
      },
    ],
  },
  {
    id: 'followup',
    title: 'Learn more',
    text: 'End of the tour, Once again welcome to Vanity!',
    attachTo: { element: '#portfolio', on: 'top' },
    scrollTo: true,
    buttons: [
      {
        type: 'back',
        classes: 'shepherd-button-secondary',
        text: 'Back',
      },
      {
        type: 'next',
        text: 'Done',
      },
    ],
  },
];
