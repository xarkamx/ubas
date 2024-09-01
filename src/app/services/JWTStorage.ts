import { jwtDecode } from "jwt-decode";
export class JWTStorage {
   setToken(token: string) {
    console.log('setting token', token);
    sessionStorage.setItem('token', token);
  }
  getToken() {
    return sessionStorage.getItem('token');
  }

  clearToken() {
    sessionStorage.removeItem('token');
  }

  tokenDetails() {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const vals:jwtDetails = jwtDecode(token);

    return {
      email: vals.email,
      exp: new Date(vals.exp * 1000),
      iat: new Date(vals.iat * 1000),
    };
    
  }
}

type jwtDetails= {
  email: string;
  exp: number;
  iat: number;
}