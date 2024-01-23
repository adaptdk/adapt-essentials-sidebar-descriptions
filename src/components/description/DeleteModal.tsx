import { Button, Modal, Paragraph } from "@contentful/f36-components";
import { Portal } from "@contentful/f36-utils";
import React, { Dispatch, SetStateAction } from "react";

import { TypeContentType } from "../../utils/types";

type TypeDeleteModal = {
  id: string;
  contentType: TypeContentType;
  handleRemove: (descriptionId: string) => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
};

const DeleteModal = ({
  contentType,
  setOpen,
  isOpen,
  handleRemove,
  id,
}: TypeDeleteModal) => {
  const handleDelete = () => {
    handleRemove(id);
    setOpen(false);
  };

  return (
    <Portal>
      <Modal onClose={() => setOpen(false)} isShown={isOpen}>
        {() => (
          <>
            <Modal.Header
              title={`Delete ${contentType.name}?`}
              onClose={() => setOpen(false)}
            />
            <Modal.Content>
              <Paragraph>
                Are you sure you want to delete the{` `}
                <strong>{contentType.name}</strong>
                {` `}
                description configuration?
              </Paragraph>
              <Paragraph>
                This action can be reversed only by leaving or refreshing the
                page without saving changes, meaning you would lose all
                progress!
              </Paragraph>
            </Modal.Content>
            <Modal.Controls>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleDelete} variant={`negative`}>
                Delete
              </Button>
            </Modal.Controls>
          </>
        )}
      </Modal>
    </Portal>
  );
};

export default DeleteModal;
