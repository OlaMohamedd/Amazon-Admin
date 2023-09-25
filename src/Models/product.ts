export interface Product {
  _id?:string;
  title_en:string;
  title_ar:string;
  img:string;
  price:{
    old?:number;
    new:number;
    discount?:number;
    shipping?:number;
  }
  info_en?:Array<string>;
  info_ar?:Array<string>;
  aboutItem_en?:Array<string>;
  aboutItem_ar?:Array<string>;
  categoryId:{
    _id:string|undefined,
    name_en:string,
    name_ar:string,
  };
  quantity?:number
}
