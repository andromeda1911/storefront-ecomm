// export const base_url = "http://localhost:5000/api/"
// export const base_url = "https://storefront-app-402010.el.r.appspot.com/api/"
export const base_url = 'http://ec2-35-154-255-31.ap-south-1.compute.amazonaws.com/api/'
const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

export const config = {
  
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
    
  },
};
