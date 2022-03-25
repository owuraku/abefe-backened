export interface IBaseController {
  findAll(args?: any): Promise<void | unknown | any> | any | unknown;
  findOneById(id: any): Promise<void | unknown | any>;
  create(data?: any): Promise<void | unknown | any>;
  update(id: any, data: any): Promise<void | unknown | any>;
  delete(id?: any): Promise<void | unknown | any>;
}
