import dashboard from './views/Dashboard.js';
import posts from './views/Posts.js';
import settings from './views/Settings.js';

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}

const router = async () => {
    const routes = [
        { path: "/", view: dashboard },
        { path: "/posts", view: posts},
        { path: "/settings", view: settings},
        { path: "/404", view: () => console.log("404 page")}
    ];


    //test

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    if(!match){
        match = {
            route: routes[3],
            isMatch: true
        }
    }

    const view = new match.route.view();

    document.querySelector('#app').innerHTML = await view.getHtml();

    // console.log(match.route.view());
};

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (e) => {
        if(e.target.matches("[data-link]")){
            e.preventDefault();
            navigateTo(e.target.href);
        }
    })

    router();
})