import Cookies from "js-cookie";

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
  if (token) {
    Cookies.set("accessToken", token, {
      secure: true,
      sameSite: "strict",
    });
  } else {
    Cookies.remove("accessToken");
  }
};

export const getAccessToken = () => {
  if (accessToken) return accessToken;
  const cookieToken = Cookies.get("accessToken") || null;
  if (cookieToken) {
    accessToken = cookieToken;
  }
  return accessToken;
};
