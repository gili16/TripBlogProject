import {Track} from './Track'
export type User={
    id:number,
    name:string,
    mail:string,
    birthDate:string,
    pictureBytes?:Blob
    addressX:number,
    addressY:number,
    statusId:number,
    experienceId:number,
    profilePicture?:string,
    pictureFile:File,
    myTracks?:Track[],
    favourites?:Track[]
}

export type AuthUser = {
    user: User,
    token: string
}