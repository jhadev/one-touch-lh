class Site {
  constructor(name, url, id) {
    this.name = name;
    this.url = url;
    this.id = id;
  }

  createHTML() {
    return `<div><input type="checkbox" id=${this.id} name="site" value=${this.url} /><label for=${this.id}>${this.name}</label></div>`;
  }
}

const siteList = [
  new Site('Coach - HP', 'https://www.coach.com', 'coach-hp'),
  new Site(
    'Coach Outlet - HP',
    'https://www.coachoutlet.com',
    'coach-outlet-hp'
  ),
];
