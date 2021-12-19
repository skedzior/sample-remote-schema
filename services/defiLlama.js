const { RESTDataSource } = require("apollo-datasource-rest") 

class DefiLlama extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.llama.fi/";
  }

  async getChain(id) {
    return await this.get(`chain?id=${id}`);
  }

  async getChains() {
    return await this.get(`chains`);
  }
}

module.exports = {
  DefiLlama
}