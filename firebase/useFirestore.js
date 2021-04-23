import fire from '../config/fire-conf';

export const useFirestore = () => {
    const getDocument = (documentPath, onUpdate) => {
      fire.firestore()
        .doc(documentPath)
        .onSnapshot(onUpdate);
    }
  
    const saveDocument = (documentPath, document) => {
      fire.firestore()
        .doc(documentPath)
        .set(document);
    }

    const createDocument = (collectionPath, document, onAdd) => {
      fire.firestore()
        .collection(collectionPath)
        .add(document)
        .then(onAdd)
    }

    const getDateDocuments = (date, onFetch) => {
      let dayDate = date.getDate();
      let start = dayDate - 1;
      let end =  dayDate + 1;
      fire.firestore()
      .collection("posts")
      .where('date', '<', end)
      .get('date', '>', start)
      .then(onFetch)
    }

    const deleteDocument = (documentPath, onDelete) => {
      fire.firestore()
      .doc(documentPath)
      .delete()
      .then(onDelete)
    }

    const updateDocument = (documentPath, properties, result) => {
        fire.firestore()
          .doc(documentPath)
          .update(properties)
          .then(result)
      }
  
    const getCollection = (collectionPath, onUpdate) => {
      fire.firestore()
        .collection(collectionPath)
        .onSnapshot(onUpdate);
    }
  
    const saveCollection = (collectionPath, collection) => {
      fire.firestore()
        .collection(collectionPath)
        .set(collection)
    }
  
    return { getDocument, saveDocument, getCollection, saveCollection, updateDocument, createDocument, deleteDocument, getDateDocuments }
  }