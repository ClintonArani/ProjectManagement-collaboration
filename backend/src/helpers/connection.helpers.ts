import mssql from 'mssql';
import { sqlConfig } from '../config/sql.config';


export default class Connection {
  static query(arg0: string) {
      throw new Error('Method not implemented.');
  }
  static execute(arg0: string, arg1: { id: string; FirstName: string; LastName: string; phone_number: string; email: string; password: string; user_image: string; createdAt: string; }) {
      throw new Error('Method not implemented.');
  }

  executeQuery(query: string) {
    let pool = mssql.connect(sqlConfig);
  }

}