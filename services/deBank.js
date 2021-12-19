const { RESTDataSource } = require("apollo-datasource-rest") 

class DeBank extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://openapi.debank.com/v1/";
  }

  async getChain(id) {
    return await this.get(`chain?id=${id}`);
  }

  async getChains() {
    return await this.get(`chain/list`);
  }
}

module.exports = {
  DeBank
}