export const environment = {
  production: true,
  apiUrl: 'https://algamoneyfas-api.herokuapp.com',

  tokenWhitelistedDomains: [ /algamoneyfas-api.herokuapp.com/ ],
  tokenBlacklistedRoutes: [/\/oauth\/token/]
};
