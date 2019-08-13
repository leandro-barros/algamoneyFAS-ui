export const environment = {
  production: true,
  apiUrl: 'https://algamoneyfas-api.herokuapp.com',

  tokenWhitelistedDomains: [ new RegExp('algamoneyfas-api.herokuapp.com') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};
