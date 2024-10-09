import { Comment } from "./Comment"
import { Stop } from "./Stop"
export type Track={
    id:number,
    startX:number,
    startY:number,
    endX:number,
    endY:number,
    picture?:string,
    title:string,
    description:string,
    created:Date,
    length:number,
    viewId:number,
    levelId:number,
    pictureData?:Blob,
    companyForTripId:number,
    dayPartId:number,
    userId:number,
    favourites:number,
    pictureForm?:File,
    stops:Stop[],
    comments:Comment[]
}