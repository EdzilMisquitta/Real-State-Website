// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { useEffect, useState } from "react";

// function UseAuthStatus() {
//   const [LoggedIN, setLoggedIn] = useState(false);
//   const [Status, SetStatus] = useState(true);

//   useEffect(() => {
//     const auth = getAuth();
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setLoggedIn(true);
//       }
//       SetStatus(false);
//     });
//   },[]);

//   return { LoggedIN, Status };
  
// }
// export default UseAuthStatus
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function UseAuthStatus() {
  const [LoggedIN, setLoggedIn] = useState(false);
  const [Status, SetStatus] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      }
      SetStatus(false);
    });
  }, []);
  return { LoggedIN, Status };
}