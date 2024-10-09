import React from 'react';
import { Navigate as BigNav, Navigate, createBrowserRouter, useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import HomePage from "../pages/HomePage";
import SignUpForm from '../sections/SignUpForm';
import SignUpPage from '../pages/SignUpPage';
import TrackPage from '../pages/TracksPage';
import MyTracks from '../sections/MyTracks';
import AddTrackPage from '../pages/AddTrackPage';
import MyTracksPage from '../pages/MyTracksPage';
import UpdateTrack from '../sections/UpdateTrack';
import { getMyTracks, getTrackByArea, getTrackById, getTrackByOption, getTracks } from '../services/track';
import UpdateUser from '../sections/UpdateUser';
import { getUser, getUserByToken } from '../services/user';
import MyFavoritesPage from '../pages/MyFavoritesPage';
import { Track } from '../types/Track';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/user/user.selector';
import { backHome } from '../utils/backHome.util';
import AuthGuard from '../auth/AuthGuard';
import { isValidToken, setAuthorizationHeader } from '../auth/auth.utils';
import { getOptionById } from '../utils/Mapper';
export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },

            {
                path: 'user/',
                children: [

                    {
                        path: 'myTracks/',
                        element: <AuthGuard />,
                        children: [
                            {
                                path: '',
                                element: <MyTracksPage />,
                                loader: async () => {
                                    let token = localStorage.getItem('user')
                                    
                                    if (isValidToken(token)) {
                                        try {
                                            setAuthorizationHeader(token!)
                                            const response = await getUserByToken()
                                            if (response) {
                                                if (response.status === 401) {
                                                    alert("you are not authorized")
                                                    return null;
                                                } else {
                                                    let id = response.data.id
                                                    try {
                                                        const response2 = await getMyTracks(id);
                                                        if (response2) {
                                                            let res =  response2.data
                                                            return res;

                                                        } else {
                                                            console.error('Failed to fetch picture');
                                                        }
                                                    } catch (error) {
                                                        console.error('Error fetching picture:', error);
                                                    }
                                                }
                                            } else {
                                                console.error('Failed to fetch picture');
                                            }
                                        } catch (error) {
                                            console.error('Error fetching picture:', error);
                                        }


                                    } else {
                                        return null;
                                    }
                                }
                            },
                            {
                                path: 'updateTrack/:id',
                                element: <UpdateTrack />,
                                loader: async ({ params }) => {
                                    const track = await getTrackById(Number(params.id!))
                                    return track

                                },
                            },
                            {
                                path: 'addTrack',
                                element: <AddTrackPage />
                            }
                        ]
                    },
                    {
                        path: 'favorites',
                        element: <MyFavoritesPage />,

                    },
                    {
                        path: 'myProfile',
                        element: <UpdateUser />,
                        loader: async () => {
                            const token = localStorage.getItem('user')
                            setAuthorizationHeader(token!)
                            let response = await getUserByToken()
                            return response.data;
                        }
                    }

                ]
            },
            {
                path: '/SignIn',
                element: <SignUpPage />
            },
            {
                path: '/findTrack',
                element: <TrackPage />,
                loader: async () => {
                    let tracks = await getTrackByArea("north");
                    return tracks
                }
            },
            {
                path: '/findTrack/:option',
                element: <TrackPage />,
                loader: async ({ params }) => {
                    let tracks = [] as Track[];

                    if (params.option !== "" && params.option !== undefined && params.option !== null) {
                        tracks = await getTrackByOption(params.option);
                         
                    } else {
                        tracks = await getTrackByArea("north");
                    }
                    return tracks;
                }
            }


        ]
    },

    {
        path: '*',
        element: <Navigate to="/" />,
    },

]);