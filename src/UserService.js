import axios from 'axios';



class UserService{
  static BASE_URL = "http://localhost:5000"
  
  static async register(requestBody){
    
    try{
      const response = await axios.post(`${UserService.BASE_URL}/auth/register`, requestBody)
      return response.data;

    }catch(err){

      throw err;
    }

  }

  static async login(requestBody){
    try{
      const response = await axios.post(`${UserService.BASE_URL}/auth/login`, requestBody);
      return response.data;

    }catch(err){
      
    }
  }

  static async getKeysGeneratedByUser(userId, token) {
    try {
      const response = await axios.get(`${UserService.BASE_URL}/user/accessKeys/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async generateKeyByUser(userId, token) {
    try {
      const response = await axios.post(`${UserService.BASE_URL}/user/generateKey/${userId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }



  static async adminGetActive(email, token) {
    try {
      const response = await axios.get(`${UserService.BASE_URL}/admin/getActiveKey/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
  


  static async updateKeyDetails(userId, token) {
    try {
      await axios.put(`${UserService.BASE_URL}/user/update/${userId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      throw error;
    }
  }
  static async revokeByAdmin(userId, token) {
    try {
     const response = await axios.put(`${UserService.BASE_URL}/admin/revokeKey/${userId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;

    } catch (error) {
      throw error;
    }
  }


  static async getKeysGeneratedByAdmin(token) {
    try {
      const response = await axios.get(`${UserService.BASE_URL}/admin/getAllKeys`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  

  static async forgotPassword(email, token) {
    try {
      const response = await axios.post(`${UserService.BASE_URL}/forgotPassword/${email}`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error in forgotPassword:', error); 
      throw error;
    }
  }
  


  static async forgotCode(otp, email, token) {
    try {
      const response = await axios.post(
        `${UserService.BASE_URL}/forgotPassword/verify`,
        { email, otp }, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error in forgotCode:', error); 
      throw error;
    }
  }

  static async changePassword(email, password1, password2, token) {
    try {
      const response = await axios.put(
        `${UserService.BASE_URL}/forgotPassword/changePassword`,
        { email, password: password1, repeatPassword: password2 },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error in changePassword:', error);
      throw error;
    }
  }
  


  
  







  static logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('role')
  }


  static isUserAuthenticated() {
    const token = localStorage.getItem("token")
    return !!token
  }

  static isAdmin() {
    const role = localStorage.getItem('role')
    return role === "ADMIN"
  }


}
export default UserService;