import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA_uv_j7kOYyVNAE9z8DkxnOnyqW1yoyOA",
    authDomain: "react-store-rock.firebaseapp.com",
    databaseURL: "https://react-store-rock.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// Named Export
export { firebaseApp };

// this is a default export
export default base;