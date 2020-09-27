export type ConfigPrimitive = string | number | string[] | number[];

export type ConfigModel = { 
    [key: string]: ConfigPrimitive | ConfigModel;
};