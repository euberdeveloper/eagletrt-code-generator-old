/**
 * The type of a primitive contained in ConfigModel.
 */
export type ConfigPrimitive = string | number;
/**
 * The type of a primitive array contained in ConfigModel.
 */
export type ConfigPrimitiveArray = string[] | number[];

/**
 * The config model type, defining the content of a config.model.json.
 */
export type ConfigModel = { 
    [key: string]: ConfigPrimitive | ConfigPrimitiveArray | ConfigModel;
};
