import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import {BsTrash2Fill} from "react-icons/bs";
import {AiFillEdit} from "react-icons/ai";
import Message from "../components/Message";
import Link from "next/link";
export default function Dashboard() {
    const route = useRouter();
    const [user,loading] = useAuthState(auth);
    const [posts, setPosts] = useState([]);
    console.log(user)
    //See if users is logged in
   const getData = async () => {
       if(loading) return
       if(!user) route.push("/auth/login")
       const collectionRef = collection(db,"posts")
       const q = query(collectionRef, where("user", "==", user.uid))
       const unsubscribe = onSnapshot(q, (snapshot) => {
           setPosts(snapshot.docs.map((post) => ({...post.data(), id: post.id})))
       })
       return unsubscribe;
   }

   //delete post
    const deletePost = async (id) => {
        const docRef = doc(db, "posts", id);
        await deleteDoc(docRef);
    }
   console.log(posts)
   //Get users data
    useEffect(() => {
        getData()
    },[user,loading])
    return (
        <div>
            <h1>Your Posts</h1>
            <div>
                {posts.map((post) => {
                    return (
                        <div><Message {...post} key={post.id}>
                            <div className="flex gap-4">
                                <button onClick={() => deletePost(post.id)} className="text-pink-600 flex items-center justify-center gap-2 py-2 text-sm"><BsTrash2Fill className="text-2xl" /> Delete</button>
                               <Link href={{pathname: "/post", query:post}}><button className="text-teal-600 flex items-center justify-center gap-2 py-2 text-sm"><AiFillEdit className="text-2xl" />Edit</button></Link>
                            </div>

                        </Message></div>
                    )}
                )}
            </div>
            <button  className="font-medium text-white bg-gray-800 py-2 px-4 my-6" onClick={() => auth.signOut()}>
                Sign Out
            </button>
        </div>
    )
}

