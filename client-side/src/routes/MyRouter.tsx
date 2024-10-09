import React from 'react';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
export default function MyRouter(props:{router:any}){
    return <>
        <RouterProvider router={props.router} />
    </> 
}
