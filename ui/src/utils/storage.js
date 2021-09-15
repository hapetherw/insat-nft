import { isValidText } from "./validations"

const Keys = {
	Email: "Email",
	Password: "Password",
	AccessToken: "AccessToken",
	RefreshToken: "RefreshToken",
	RedirectUrl: "RedirectUrl"
}

function save(key, value) {
	localStorage.setItem(key, value)
}

function get(key) {
	return localStorage.getItem(key) || undefined
}

function accessToken() { return get(Keys.AccessToken) }
function saveAccessToken(accessToken) {
	if (!isValidText(accessToken, true)) {
		localStorage.removeItem(Keys.AccessToken)
		return
	}
	save(Keys.AccessToken, accessToken)
}

function refreshToken() { return get(Keys.RefreshToken) }
function setRefreshToken(refreshToken) {
	if (!isValidText(refreshToken)) {
		localStorage.removeItem(Keys.RefreshToken)
		return
	}

	save(Keys.RefreshToken, refreshToken)
}

function getRedirectUrl() { return get(Keys.RedirectUrl)}
function setRedirectUrl(url) {
	if (!isValidText(url, true)) {
		localStorage.removeItem(Keys.RedirectUrl)
		return
	}
	save(Keys.RedirectUrl, url)
}

const Storage = { Keys, save, get, accessToken, saveAccessToken, refreshToken, setRefreshToken, getRedirectUrl, setRedirectUrl }
export default Storage
