
import { getTrackById, getTracks } from "../services/track";
import { getUserByToken } from "../services/user";
import { Track } from "../types/Track";
import { User } from "../types/user.types";

// export async function myTrack(track:Track, user:User){
//     const token=localStorage.getItem('user')
//     if(isValidToken(token)){
//         let response=await fetch(`https://localhost:7090/api/Track/MyTracks/${user.id}`);
//         if(response){
//             let tracks=await response.json() as Track[]
//             tracks.forEach(element => {
//                 if(element.id===track.id){
//                     return true;
//                 }
//             });
//         }
//     }
    
//     return false;
// }

export async function thisIsMe(user:User|undefined){
    const token=localStorage.getItem('user')
    if(token!==null&&token!==undefined&&token!==''){
        let myUser= (await getUserByToken()).data
        if(user!==undefined&&user.id===myUser.id){
            return true;
        }
    }
    return false;

}

export function isValidToken(token:string|null){
    return token!==null&&token!==undefined&&token!=='';
}

export function iAmLoggedIn(token:string|null|undefined, user:User|null|undefined){
    return token===null||token===undefined||token===''||user===undefined||user===null;
}