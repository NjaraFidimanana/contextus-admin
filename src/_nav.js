export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      name: 'Simulation',
      url: '/simulation',
      icon: 'cui-audio-spectrum',
      badge: {
        variant: 'warning',
        text: 'TEST',
      },
    },
    {
      title: true,
      name: 'Segmentation',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Segments',
      url: '/segments',
      icon: 'icon-drop',
    },
    {
      name: 'Add New Segment',
      url: '/new/segment',
      icon: 'icon-pencil',
    },
    {
      title: true,
      name: 'Business Rules',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Rules',
      url: '/rules',
      icon: 'icon-puzzle'
    },
    {
      name: 'Create Custom Rule',
      url: '/create-rule',
      icon: 'icon-cursor',
    
    },
    {
      name: 'Components',
      url: '/base',
      icon: 'icon-puzzle'
    },
    {
      name: 'Pages',
      url: '/pages',
      icon: 'icon-star',
      children: [
        {
          name: 'Contents',
          url: '/contents',
          icon: 'icon-star',
        },
        {
          name: 'Register',
          url: '/register',
          icon: 'icon-star',
        },
        {
          name: 'Error 404',
          url: '/404',
          icon: 'icon-star',
        },
        {
          name: 'Error 500',
          url: '/500',
          icon: 'icon-star',
        },
      ],
    }
  ],
};
