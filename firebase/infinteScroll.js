import fire from '../config/fire-conf';

export const infiniteScroll = () => {

    var messages = [];
    var listeners = [];
    var start = null;
    var end = null;

    const getMessages = (collectionName, chatId, limit) => {
        // query reference for the messages we want
        let ref = fire.firestore().collection(collectionName)
        // single query to get startAt snapshot
        ref.orderBy('date', 'desc')
            .limit(limit).get()
            .then((snapshots) => {

                // save startAt snapshot
                start = snapshots.docs[snapshots.docs.length - 1]
                // create listener using startAt snapshot (starting boundary)    
                let listener = ref.orderBy('date')
                    .startAt(start)
                    .onSnapshot((messages) => {
                        if (messages.length != undefined) {
                            // append new messages to message array
                            messages.forEach((message) => {
                                // filter out any duplicates (from modify/delete events) 
                                messages = messages.filter(x => x.id !== message.id)
                                messages.push(message.data())
                            })
                        }

                    })
                // add listener to list
                listeners.push(listener)
            })
    }

    const getMoreMessages = (collectionPath, limit) => {
        let ref = fire.firestore()
            .collection(collectionPath)
        // single query to get new startAt snapshot
        ref.orderBy('date', 'desc')
            .startAt(start)
            .limit(limit).get()
            .then((snapshots) => {
                // previous starting boundary becomes new ending boundary
                end = start
                start = snapshots.docs[snapshots.docs.length - 1]
                // create another listener using new boundaries     
                let listener = ref.orderBy('date')
                    .startAt(start).endBefore(end)
                    .onSnapshot((messages) => {
                        messages.forEach((message) => {
                            messages = messages.filter(x => x.id !== message.id)
                            messages.push(message.data())
                        })
                    })
                listeners.push(listener)
            })
    }

    const detachListeners = () => {
        listeners.forEach(listener => listener())
    }

    return { getMessages, getMoreMessages, detachListeners, messages }
}