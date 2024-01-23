import { UserProps } from "contentful-management";

export const getUserById = (id?: string, users?: UserProps[]) => {
  if (!id || !users) {
    return null;
  }

  return users.find((user) => user.sys.id === id);
};
