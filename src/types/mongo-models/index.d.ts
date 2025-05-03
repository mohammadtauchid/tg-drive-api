declare module 'mongo-models' {
  class MongoModels {
    static connect(x: any);
    static find(x?: any);
    static insertOne(x: any);
    
    constructor(payload: Object)
  }

  export = MongoModels;
}
