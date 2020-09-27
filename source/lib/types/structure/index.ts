export type StructurePrimitive = 'int' | 'long' | 'double' | 'char*';

export interface StructureMessagesDetails {
    timestamp: StructurePrimitive;
    value: StructurePrimitive | {
        [key: string]: StructurePrimitive;
    };
}

export type StructureMessagesMax = number;

export type StructureMessages = [StructureMessagesDetails, StructureMessagesMax];

export interface StructureGroup {
    [key: string]: StructureMessages | StructureGroup;
}

export type StructureModel = { 
    id: StructurePrimitive; 
    sessionName: StructurePrimitive; 
    timestamp: StructurePrimitive; 
} & StructureGroup;