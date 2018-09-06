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
      url: '',
      icon: 'icon-drop',
    },
    {
      name: 'Add New Segment',
      url: '/new/segment',
      icon: 'icon-pencil',
    },
    {
      title: true,
      name: 'Contents Rules',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Default',
      url: '/base',
      icon: 'icon-puzzle'
    },
    {
      name: 'Customs',
      url: '/buttons',
      icon: 'icon-cursor',
    
    },
    {
      title: true,
      name: 'Personalization',
      wrapper: {
        element: '',
        attributes: {},
      },
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
          name: 'Login',
          url: '/login',
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
