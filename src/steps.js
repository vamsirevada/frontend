//eslint-disable-next-line
export default [
  {
    id: 'welcome',
    title: 'Home',
    text: `A place where you can see your friends and your own posts`,
    attachTo: { element: '.classnamefeed', on: 'bottom' },
    classes: 'shepherd shepherd-welcome',
    buttons: [
      {
        type: 'next',
        text: 'Next',
      },
    ],
  },
  {
    id: 'installation',
    title: 'Portfolio',
    text: 'Where you can bulid and view your portfolio',
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
    text: [
      'A personalised place for your all information related to industry opportunities, film festivals etc.,',
    ],
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
    text: `This is the place where all the magic happens, here you can upload all your videos, images, audio files and link your blogs  `,
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
    id: 'centered-example',
    title: 'Add Profle',
    text: `This is the place where you can update about your education, experience, workshops attended, awards etc.,   `,
    attachTo: { element: '.profile-tour-button', on: 'bottom' },
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
    title: 'Thank you',
    text: 'End of the tour, Once again welcome to Vanity!',
    // attachTo: { element: '.end-tour-popup', on: 'top' },
    scrollTo: true,
    buttons: [
      {
        type: 'back',
        classes: 'shepherd-button-secondary',
        text: 'Back',
      },
      {
        type: 'next',
        text: 'End Tour',
      },
    ],
  },
];
