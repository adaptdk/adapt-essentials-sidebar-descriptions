export type TypeContentType = {
  id: string;
  name: string;
  description: string;
  sys: {
    createdAt: string;
  };
};

export type TypeDescriptionItem = {
  id: string;
  type: string;
  value: string;
};

export type TypeDescription = {
  id: string;
  contentType: TypeContentType;
  items: Array<TypeDescriptionItem>;
};
