import config from 'config'

const instagramClient = {
  login: (redirect_url) => {
    window.open(
      `https://api.instagram.com/oauth/authorize/?client_id=${
        config.instagramAppId
      }&redirect_uri=https://${window.location.host}/${redirect_url}&response_type=${
        'code'
      }&scope=user_profile,user_media`,
      '_self'
    )
  }
}

export default instagramClient