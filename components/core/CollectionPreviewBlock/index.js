import * as React from "react";
import * as Validations from "~/common/validations";

import ImageCollectionPreview from "./ImageCollectionPreview";
import FilesCollectionPreview from "./FilesCollectionPreview";

export default function CollectionPreview({ collection, viewer, owner, onAction }) {
  const objects = collection.objects.filter((file) =>
    Validations.isPreviewableImage(file.data.type)
  );

  if (objects.length > 0) {
    return (
      <ImageCollectionPreview
        collection={{ ...collection, objects }}
        viewer={viewer}
        owner={owner}
        onAction={onAction}
      />
    );
  }

  return (
    <FilesCollectionPreview
      collection={collection}
      viewer={viewer}
      owner={owner}
      onAction={onAction}
    />
  );
}
