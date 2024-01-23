export type TypeTextField = {
  value: string;
  id: string;
  itemId: string;
  onItemChange: (itemId: string, newValue: string) => void;
  onRemoveItem: (descriptionId: string, itemId: string) => void;
};

export type TypeImageField = {
  isValidUrl: boolean;
} & TypeTextField;
