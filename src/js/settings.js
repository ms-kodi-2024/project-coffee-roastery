export const select = {
  templateOf: {
    productList: '#template-list-product',
  },
  containerOf: {
    productList: '.product-list',
    pages: '#pages',
  },
  nav: {
    links: '.nav__list a',
    discoverLink: '#discoverLink',
    targetPage: '#pages',
  }
};

export const classNames = {
  nav: {
    active: 'active',
  },
  pages: {
    active: 'active',
  },
};

export const settings = {
  db: {
    url: '//localhost:3131',
    products: 'products',
    contacts: 'contacts',
  },
};

export const templates = {
  listProducts: Handlebars.compile(document.querySelector(select.templateOf.productList).innerHTML),
};