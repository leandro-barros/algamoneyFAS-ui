export const environment = {
  production: true,
  apiUrl: 'http://localhost:8080',
  // apiUrl: 'https://algamoneyfas-api.herokuapp.com',

  tokenWhitelistedDomains: [ new RegExp('localhost:8080') ],
  // tokenWhitelistedDomains: [ new RegExp('algamoneyfas-api.herokuapp.com') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};
