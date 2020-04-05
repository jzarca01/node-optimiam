const axios = require("axios");

class Optimiam {
  constructor({ email, password }) {
    this.request = axios.create({
      baseURL: "https://api.optimiam.com",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "fr-FR",
      },
    });

    this.email = email;
    this.password = password;
    this.accessToken = null;

    this.request.interceptors.request.use(
      (axiosConfig) => {
        if (axiosConfig.url !== "/signin") {
          Object.assign(axiosConfig.headers, {
            Authorization: `Bearer ${this.accessToken}`,
          });
        }
        return axiosConfig;
      },
      (error) => Promise.reject(error)
    );
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async login() {
    try {
      const response = await this.request({
        url: "/signin",
        method: "POST",
        data: {
          email: this.email,
          password: this.password,
        },
      });
      const { token } = response.data;
      this.setAccessToken(token);
      return response.data;
    } catch (err) {
      console.log("error with login", err);
    }
  }

  async getProfile() {
    try {
      const response = await this.request({
        url: "/api/users/me",
        method: "GET",
      });
      return response.data;
    } catch (err) {
      console.log("error with getProfile", err);
    }
  }

  async getStores({ latitude, longitude }, radius = 2000) {
    try {
      const response = await this.request({
        url: "/api/stores",
        method: "GET",
        params: {
          category: "",
          limit: radius,
          location: `${latitude}|${longitude}`,
          max: 10,
          page: 0,
          sl: true,
          version: "13.3",
        },
      });
      return response.data;
    } catch (err) {
      console.log("error with getStores", err);
    }
  }

  async getDealsByStore(storeId) {
    try {
      const response = await this.request({
        url: `/api/stores/${storeId}/deals`,
        method: "GET",
      });
      return response.data;
    } catch (err) {
      console.log("error with getDealsByStore", err);
    }
  }

  async getDeal(dealId) {
    try {
      const response = await this.request({
        url: `/api/deals/${dealId}`,
        method: "GET",
      });
      return response.data;
    } catch (err) {
      console.log("error with getDeal", err);
    }
  }
}

module.exports = Optimiam;
