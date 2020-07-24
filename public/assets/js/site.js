class Site {
  constructor(name, url, id) {
    this.name = name;
    this.url = url;
    this.id = id;
  }

  createHTML() {
    return `
    <input type="checkbox" id="${this.id}" name="site" value="${this.url}" />
    <label for="${this.id}">${this.name}</label>
    `;
  }
}

const siteList = [
  // new Site('Coach - HP', 'https://www.coach.com', 'coach-hp'),
  new Site(
    'Coach Outlet - HP',
    'https://www.coachoutlet.com',
    'coach-outlet-hp'
  ),
  new Site(
    'Coach Outlet - PLP',
    'https://www.coachoutlet.com/shop/event-whats-new-whats-new',
    'coach-outlet-plp'
  ),
  new Site('Kate Spade - HP', 'https://www.katespade.com', 'kate-spade-hp'),
  new Site(
    'Kate Spade - PLP',
    'https://www.katespade.com/new/',
    'kate-spade-plp'
  ),
];
