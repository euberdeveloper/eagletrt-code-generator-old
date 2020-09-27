export type ConfigPrimitive = string | number;
export type ConfigPrimitiveArray = string[] | number[];

export type ConfigModel = { 
    [key: string]: ConfigPrimitive | ConfigPrimitiveArray | ConfigModel;
};