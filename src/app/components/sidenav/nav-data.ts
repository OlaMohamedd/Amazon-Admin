import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
    {
        routeLink: 'dashboard',
        icon: 'fal fa-home',
        label: 'Dashboard'
    },
    {
        routeLink: 'products',
        icon: 'fal fa-box-open',
        label: 'Products',
       
    },
    {
        routeLink: 'statistics',
        icon: 'fal fa-chart-bar',
        label: 'Statistics'
    },
    {
        routeLink: 'coupens',
        icon: 'fal fa-tags',
        label: 'Coupens',
        items: [
            {
                routeLink: 'coupens/list',
                label: 'List Coupens'
            },
            {
                routeLink: 'coupens/create',
                label: 'Create Coupens'
            }
        ]
    },
    {
        routeLink: 'sellers',
        icon: 'fal fa-regular fa-user',
        label: 'Sellers List'
    },
    {
        routeLink: 'orders',
        icon: 'fal fa-solid fa-cart-arrow-down',
        label: 'Orders'
    },
    {
        routeLink: 'settings',
        icon: 'fal fa-cog',
        label: 'Settings',
        expanded: true,
        items: [
            {
                routeLink: 'settings/profile',
                label: 'Profile'
            },
            {
                routeLink: 'settings/customize',
                label: 'Customize'
            }
        ]
    },
    // {
    //     routeLink: 'login',
    //     icon: 'fal fa-solid fa-lock-open',
    //     label: 'login'
    // },
    // {
    //     routeLink: 'login',
    //     icon: "fal fa-solid fa-lock",
    //     label: 'logout'
    // }
];