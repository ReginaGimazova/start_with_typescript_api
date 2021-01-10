import CardDataStore from "./CardDataStore";

class CardController{
  cardDataStore = new CardDataStore();

  public async saveCard({text}: any){
    return await this.cardDataStore.saveCard(text);
  }

  public async removeCard({id}: any){
    return await this.cardDataStore.removeCard(+id)
  }

  public async getAll(){
    return await this.cardDataStore.getAll();
  }
}

export default CardController;