import { select, settings, classNames, templates } from './settings.js';

const app = {
  initPages: function () {
    const thisApp = this;
    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);
    const idFromHash = window.location.hash.replace('#/', '');
    let pageMatchingHash = thisApp.pages[0].id;
    for (let page of thisApp.pages) {
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }
    thisApp.activatePage(pageMatchingHash);
    for (let link of thisApp.navLinks) {
      link.addEventListener('click', function(event) {
        const clickedElement = this;
        event.preventDefault();
        const id = clickedElement.getAttribute('href').replace('#', '');
        thisApp.activatePage(id);
        window.location.hash = '#/' + id;
      });
    }
    window.addEventListener('hashchange', function() {
      const newPageId = window.location.hash.replace('#/', '');
      thisApp.activatePage(newPageId);
    });
  },
  
  activatePage: function(pageId){
    const thisApp = this;
    for(let page of thisApp.pages){
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }
    for(let link of thisApp.navLinks){
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') == '#' + pageId
      );
    }
  },

  initDiscoverLink: function() {
    document.addEventListener('DOMContentLoaded', function() {
      const discoverLink = document.querySelector(select.nav.discoverLink);
      const targetSection = document.querySelector(select.nav.targetPage);
      discoverLink.addEventListener('click', function(event) {
        event.preventDefault();
        targetSection.scrollIntoView({ behavior: 'smooth' });
      });
    });
  },

  initData: function() {
    const url = settings.db.url + '/' + settings.db.products;
    this.data = {};
    fetch(url)
      .then((rawResponse) => {
        return rawResponse.json();
      })
      .then((parsedResponse) => {
        this.data.products = parsedResponse;
        this.initList();
      });
  },

  initList: function() {
    const thisApp = this;
    thisApp.renderProductList(thisApp.data.products);
  },
  
  renderProductList: function(products) {
    const listContainers = document.querySelectorAll(select.containerOf.productList);
    const generatedHTML = templates.listProducts({ products: products });
    for (let listContainer of listContainers) {
      listContainer.innerHTML = generatedHTML;
    }
  },

  init: function() {
    const thisApp = this;
    thisApp.initDiscoverLink();
    thisApp.initPages();
    thisApp.initData();
  },
};

app.init();
