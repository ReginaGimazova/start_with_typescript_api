import getAsyncQuery from "../dbConnectionUtils/getAsyncQuery";

class CardDataStore {
  public async saveCard(text: String){
    const {query} = getAsyncQuery();
    const queryString = `insert into card (text) value ${text}`;

    try {
      await query(queryString);
    } catch (insertError){
      console.log(insertError);
    }
  }
  public async removeCard(id: Number){
    const {query} = getAsyncQuery();
    const queryString = `delete from card where id=${id}`;

    try {
      await query(queryString)
    } catch (deleteError){
      console.log(deleteError)
    }
  };

  public async getAll(){
    const {query} = getAsyncQuery();
    const queryString = `select * from card`;

    try {
      return await query(queryString);
    } catch (getAllError){
      console.log(getAllError)
    }
  }
}
export default CardDataStore