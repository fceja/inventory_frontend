import { jwtDecode } from "jwt-decode";

export const validateToken = (token: string) => {
  try {
    // check if token exists
    if (!token) {
      return false;
    }

    // decode token
    const decodedToken = jwtDecode(token.split("Bearer ")[1]);

    // check token expiration
    const currentTime = Math.floor(Date.now() / 1000);
    if (!decodedToken.exp || decodedToken.exp < currentTime) {
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
};
