/**
 * The primitive types for StructureModel.
 */
export type StructurePrimitive = 'int' | 'long' | 'double' | 'char*';

/**
 * The type of the details of a message.
 */
export interface StructureMessagesDetails {
    timestamp: StructurePrimitive;
    value: StructurePrimitive | {
        [key: string]: StructurePrimitive;
    };
}

/**
 * The type of the maximum stored messages.
 */
export type StructureMessagesMax = number;

/**
 * The type of the arrray defining a type of messages.
 */
export type StructureMessages = [StructureMessagesDetails, StructureMessagesMax];

/**
 * The type of the value of a non-primitive key of StructureModel.
 */
export interface StructureGroup {
    [key: string]: StructureMessages | StructureGroup;
}

/**
 * The structure model type, defining the content of a structure.model.json.
 */
export type StructureModel = { 
    id: StructurePrimitive; 
    sessionName: StructurePrimitive; 
    timestamp: StructurePrimitive; 
} & StructureGroup;
