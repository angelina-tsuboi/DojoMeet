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
  
    return { getDocument, saveDocument, getCollection, saveCollection, updateDocument }
  }