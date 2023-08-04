export const rtcConfig = {
  iceServers: [
    {
      urls: ["stun:stun.l.google.com:19302"]
    },
    {
      urls: ["turn:wangxiang.website:3478"],
      username: "admin",
      credential: "admin"
    }
  ]
};