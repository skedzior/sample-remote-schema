const { RESTDataSource } = require("apollo-datasource-rest") 

class CoinGecko extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.coingecko.com/api/v3/";
  }

  async getChains() {
    console.log('get gchins')
    return await this.get(`asset_platforms`);
  }

  async getSimplePrice(
    id,
    currency = "usd"
  ){
    const data =  await this.get(`simple/price?ids=${id}&vs_currencies=${currency}`);

    return {
      currency,
      price: data[id][currency]
    }
  }

  async getGlobal() {
    return await this.get('global')
  }
}

module.exports = {
  CoinGecko
}