function createId(str) {
  return str
    .split('')
    .filter((char) => char !== ' ')
    .join('')
    .toLowerCase();
}

class Site {
  constructor(name, url) {
    this.name = name;
    this.url = url;
    this.id = createId(this.name);
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
  new Site('Coach Outlet - HP', 'https://www.coachoutlet.com'),
  new Site(
    'Coach Outlet - PLP',
    'https://www.coachoutlet.com/shop/event-whats-new-whats-new'
  ),
  new Site('Kate Spade - HP', 'https://www.katespade.com'),
  new Site('Kate Spade - PLP', 'https://www.katespade.com/new/'),
];
