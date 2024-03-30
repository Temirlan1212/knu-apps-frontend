interface CookieOptions {
  cookieName: string;
  cookieValue?: string;
  cookieLifespan?: number;
  httpOnly?: boolean;
}

export const cookieService = {
  setCookie({ cookieName, cookieValue, cookieLifespan }: CookieOptions): void {
    let d = new Date();
    d.setTime(d.getTime() + (cookieLifespan || 0) * 24 * 60 * 60 * 1000); // Set the cookie expiration time (cookieLifespan is in days).
    let expires = d.toUTCString();
    document.cookie = `${cookieName}=${cookieValue};expires=${expires};path=/;SameSite=Strict;`;
  },

  getCookie({ cookieName }: CookieOptions): string | null {
    let name = `${cookieName}=`;
    let cookieArray = document.cookie.split(';'); // Split the document's cookie string into an array.
    for (let i = 0; i < cookieArray.length; i++) {
      // For every cookie in the array.
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        // Remove any space from the start of the cookie name.
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length); // Return the value of the cookie.
      }
    }
    return null; // Return false if there were no matching cookies.
  },

  checkCookie({ cookieName }: CookieOptions): boolean {
    return !!cookieName && document.cookie.includes(`${cookieName}=`); // Return true if the requested cookie name exists in the document.
  },

  clearCookie({ cookieName }: CookieOptions): void {
    this.setCookie({ cookieName, cookieValue: '', cookieLifespan: -1 }); // Cause the browser to remove the cookie by setting its expiration to a date in the past.
  },
};
