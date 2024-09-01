import axios from 'axios';

const basUrl = 'https://bas-gamma.vercel.app';
export class AuthService {
  constructor() {}
  
  async login(email: string, password: string): Promise<LoginDetails> {
      const resp = await axios.post(`${basUrl}/users/signup`, { email, password,company: 'superAdmin' });
      return resp.data;
   
  }
}



type LoginDetails = {
  token: string;
  ttl: number;
}
