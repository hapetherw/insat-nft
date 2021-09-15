export default {
  env: process.env.NODE_ENV,
  mode: process.env.MODE,
  apiEndpoint: process.env.API_ENDPOINT,
  instagramAppId: process.env.INSTAGRAM_APP_ID,
  web3ProviderURL: process.env.WEB3_PROVIDER_URL,
  serviceFee: 0.02,

  /* API URL */
  logInUrl: '/login',
  signUpUrl: '/signup',
  getProfileUrl: '/get-profile',
  logInWithInstagramUrl: '/login-instagram',
  connectInstagramUrl: '/user/connect-instagram',
  updateUserProflieUrl: '/update-profile',
  changePasswordUrl: '/change-password',
  contactUsUrl: '/contact',
  getPostUrl: '/get-post',
  postListUrl: '/posts',
  offerListUrl: '/offers',
  offerUrl: '/offer',
  acceptOfferUrl: '/accept-offer',
  cancelOfferUrl: '/cancel-offer',
  instagramExtraContentsUrl: '/instagram/posts'
}
