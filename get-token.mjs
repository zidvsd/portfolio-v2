// get-tokens.mjs
const client_id = "a28bf6234eca44f0b54f56e0c172dc2b"
const client_secret = "f3696db067a84052873c88b2b6290720"
const code =
  "AQCIzbaY3xWBJUGpF5f67JjZkCjVthwhxNZKNseQaDKJWbA1UPWbfH3ZSNPVbQVEdJhaenq5f4RCkgON0GB2NdlMAa9JFOppJq6zC7RrLalgRZ-VhxHex84CXU6kdSMTdPRd5qoaeVqNwrVor_m05XROtOMQ5QaxvTgr2XNfN2MDaB9v4I2l8ImFsQhfL-tOA8kmpTp1jr0xHP_FJPFEGkBx3_-rft5Ce8zFQKXcHZElP_Eoe3sEJ2PfnBfMpdbVcS2PeXJ9VsiqUmo" // Paste your code here
const redirect_uri = "http://127.0.0.1:3000/api/auth/callback/spotify"

const response = await fetch("https://accounts.spotify.com/api/token", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization:
      "Basic " +
      Buffer.from(client_id + ":" + client_secret).toString("base64"),
  },
  body: new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirect_uri,
  }),
})

const data = await response.json()
console.log(data)
