import { Stop } from "../types/Stop";
import { Track } from "../types/Track";
import { User } from "../types/user.types";
import { Comment } from "../types/Comment";
import { InternalAxiosRequestConfig } from "axios";
import { ENDPOINTS } from "../api/endpoints";
export function isValidEmail(email: string): boolean {
    // Regular expression for validating email addresses
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function isValidUsername(username: string): boolean {
    // Regular expression for validating usernames consisting only of letters, numbers, and Hebrew characters
    const usernameRegex: RegExp = /^[a-zA-Z0-9\u0590-\u05FF]+$/;
    return usernameRegex.test(username);
}

export function isValidUserToUpdate(user:User){
    if(user.id===undefined||user.id===null||user.id===0){
        return false;
    }
    return isValidUserToAdd(user);
}

export function isValidUserToAdd(user:Omit<User,'id'>){
    if (
        
        user.name === undefined ||
        user.mail === undefined ||
        user.birthDate === undefined ||
        user.addressX === undefined ||
        user.addressY === undefined ||
        user.statusId === undefined ||
        user.experienceId === undefined ||
        user.pictureFile === undefined
    ) {
        return false;
    }

    // Check non-nullable fields for validity
    if (
       
        typeof user.name !== 'string' ||
        typeof user.mail !== 'string' ||
        typeof user.birthDate !== 'string' ||
        typeof user.addressX !== 'number' ||
        typeof user.addressY !== 'number' ||
        typeof user.statusId !== 'number' ||
        typeof user.experienceId !== 'number' ||
        (!(user.pictureFile instanceof File)&& typeof user.pictureFile !=="object")
    ) {
        return false;
    }
    if(!isValidEmail(user.mail)||!isValidUsername(user.name)){
        return false
    }
    if(user.experienceId===0||user.statusId===0){
        return false;
    }
    return true;

}
export function isValidTrackToAdd(track:Omit<Track,'id'>){
     // Check required fields
     if (
        // track.id === undefined ||
        track.startX === undefined ||
        track.startY === undefined ||
        track.endX === undefined ||
        track.endY === undefined ||
        track.title === undefined ||
        track.description === undefined ||
        track.created === undefined ||
        track.length === undefined ||
        track.viewId === undefined ||
        track.levelId === undefined ||
        track.companyForTripId === undefined ||
        track.dayPartId === undefined ||
        track.userId === undefined ||
        track.favourites === undefined ||
        track.stops === undefined ||
        track.comments === undefined
    ) {
        return false;
    }

    // Check non-nullable fields for validity
    if (
        // typeof track.id !== 'number' ||
        typeof track.startX !== 'number' ||
        typeof track.startY !== 'number' ||
        typeof track.endX !== 'number' ||
        typeof track.endY !== 'number' ||
        typeof track.title !== 'string' ||
        typeof track.description !== 'string' ||
        (typeof track.created !=='string'&&!(track.created instanceof Date)) ||
        typeof track.length !== 'number' ||
        typeof track.viewId !== 'number' ||
        typeof track.levelId !== 'number' ||
        typeof track.companyForTripId !== 'number' ||
        typeof track.dayPartId !== 'number' ||
        typeof track.userId !== 'number' ||
        typeof track.favourites !== 'number' 
        // ||!Array.isArray(track.stops) ||
        // !Array.isArray(track.comments)
    ) {
        return false;
    }
    if(track.companyForTripId===0
        ||track.dayPartId===0||
        track.levelId===0||
        track.length===0||
        track.viewId===0){
            return false;
        }
        
    // Check additional validation for specific fields if needed

    return true;
}

export function isValidTrackToUpdate(track:Track){
    return track.id!==undefined&&track.id!==null&&track.id!==0&&isValidTrackToAdd(track)
}

export function isValidStopToAdd(stop:Omit<Stop,'id'>){
     // Check required fields
     if (
        stop.trackId === undefined ||
        stop.x === undefined ||
        stop.y === undefined 
       
    ) {
        return false;
    }

    // Check non-nullable fields for validity
    if (
        typeof stop.y !== 'number' ||
        typeof stop.x !== 'number' ||
        typeof stop.trackId !== 'number' 
       
    ) {
        return false;
    }

    // Check additional validation for specific fields if needed

    return true;
}

export function isValidCommentToAdd(comment:Omit<Comment,'id'>){
    // Check required fields
    if (
       comment.postDate===undefined||
       comment.context===undefined||
       comment.trackId===undefined
      
   ) {
       return false;
   }

   // Check non-nullable fields for validity
   if (
    !(comment.postDate instanceof Date)||
       typeof comment.trackId!== 'number' ||
       typeof comment.context !== 'string' 
      
   ) {
       return false;
   }

   // Check additional validation for specific fields if needed

   return true;
}

export function needToken(request:InternalAxiosRequestConfig){
    return (
        request.url !== ENDPOINTS.user.base+ENDPOINTS.user.add 
        && request.url?.substring(0, request.url?.lastIndexOf("/") + 1) !== ENDPOINTS.track.base+ENDPOINTS.track.getTracksByArea 
        && request.url?.substring(0, request.url?.lastIndexOf("/") + 1) !== ENDPOINTS.track.base+ENDPOINTS.track.getTracksByOption 
        && request.url !== ENDPOINTS.track.base+ENDPOINTS.track.getTracksByText
        && request.url !== ENDPOINTS.track.base+ENDPOINTS.track.getAll
        && request.url!==ENDPOINTS.category.base+ENDPOINTS.category.getAll
        && request.url!==ENDPOINTS.company.base+ENDPOINTS.company.getAll
        && request.url!==ENDPOINTS.view.base+ENDPOINTS.view.getAll
        && request.url!==ENDPOINTS.level.base+ENDPOINTS.level.getAll
        && request.url!==ENDPOINTS.dayPart.base+ENDPOINTS.dayPart.getAll
        && request.url!==ENDPOINTS.status.base+ENDPOINTS.status.getAll
        && request.url!==ENDPOINTS.experience.base+ENDPOINTS.experience.getAll
        && request.url?.substring(0, request.url?.lastIndexOf("/") + 1) !== ENDPOINTS.user.base+ENDPOINTS.user.login
    );
}