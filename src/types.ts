export type URI = string;
export type HttpStatusCode = number;

// source https://github.com/microsoft/TypeScript/issues/1897#issuecomment-657294463
export type SerializableScalar = string | number | boolean | null;

export type SerializableObject = {
  [key: string]: SerializableScalar | SerializableObject | SerializableArray;
};

export type SerializableArray = Array<
  SerializableScalar | SerializableObject | SerializableArray
>;

export type Serializable =
  | SerializableScalar
  | SerializableObject
  | SerializableArray;
