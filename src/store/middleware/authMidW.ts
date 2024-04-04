import { Canceler } from "axios";
import { jwtDecode } from "jwt-decode";

import { clearAuth } from "@store/auth/authActions";

let tokenExpiryTimeout: NodeJS.Timeout | null = null;

const cancelTokenExpiryTimeout: Canceler = () => {
  // if timeout exists, cancel
  if (tokenExpiryTimeout) {
    clearTimeout(tokenExpiryTimeout);
    tokenExpiryTimeout = null;
  }
};

export const checkTokenExpiryMiddleware =
  (store: any) => (next: any) => (action: any) => {
    /**
     * if token exists, clear auth after time expires.
     * else, clear auth immediately.
     */

    if (action.payload.authToken) {
      const token = action.payload.authToken;
      const decodedToken = jwtDecode(token.split("Bearer ")[1]);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken && decodedToken.exp) {
        const timeDiff = decodedToken.exp - currentTime;

        // cancel previous timeout before setting new one
        cancelTokenExpiryTimeout();

        tokenExpiryTimeout = setTimeout(() => {
          store.dispatch(clearAuth());
        }, timeDiff * 1000);
      } else store.dispatch(clearAuth());
    }

    return next(action);
  };
