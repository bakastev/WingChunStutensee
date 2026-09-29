/* eslint-disable */
import type { DataModel as DM } from "./dataModel.js";

export type DataModel = DM;
export type Id<TableName extends keyof DataModel> = string & { __tableName: TableName };
export type Doc<TableName extends keyof DataModel> = DataModel[TableName]["document"];
