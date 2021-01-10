import getAsyncQuery from '../dbConnectionUtils/getAsyncQuery';

class CardDataStore {
  private async getLastCard() {
    const { query } = getAsyncQuery();
    const queryString = 'select id, text from card order by id desc limit 1';

    try {
      const result = await query(queryString);
      return JSON.parse(JSON.stringify(result))[0];
    } catch (e){
      console.log(e);
      return null
    }
  }

  private async getCardById(cardId: Number){
    const {query} = getAsyncQuery();
    const queryString = `select id, text from card where id = ${cardId}`;

    try {
      const result = await query(queryString);
      return JSON.parse(JSON.stringify(result))[0];
    } catch (e){
      console.log(e)
      return null
    }
  };

  public async saveCard(text: String) {
    const { query, connection } = getAsyncQuery();
    const queryString = `insert into card (text) values ("${text}");`;

    try {
      await query(queryString);
      connection.commit();
      return await this.getLastCard();
    } catch (insertError) {
      console.log(insertError);
    }
  }
  public async removeCard(id: Number) {
    const { query, connection } = getAsyncQuery();
    const card = await this.getCardById(id);
    const queryString = `delete from card where id=${id}`;

    try {
      await query(queryString);
      connection.commit();
      return card;
    } catch (deleteError) {
      console.log(deleteError);
      return null
    }
  }

  public async getAll() {
    const { query } = getAsyncQuery();
    const queryString = `select * from card`;

    try {
      return await query(queryString);
    } catch (getAllError) {
      console.log(getAllError);
    }
  }
}
export default CardDataStore;
