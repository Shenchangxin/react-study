import React from "react";
import {useLocation,matchRoutes,Navigate} from "react-router-dom";
import {routes} from "../../router";
import {RootState, useAppDispatch} from "../../store";
import {Infos, infosAction, updateInfos} from "../../store/modules/users";
import {useSelector} from "react-redux";
import _ from 'lodash'

interface BeforeEachProps {
    children?: React.ReactNode
}

export default function BeforeEach(props: BeforeEachProps) {
    const token = useSelector((state: RootState)=> state.users.token)
    const infos = useSelector((state: RootState)=> state.users.infos)
    const location = useLocation()
    const dispatch = useAppDispatch()
    const matches = matchRoutes(routes,location)
    if (Array.isArray(matches)){
        const meta = matches[matches.length-1].route.meta
        
        if (meta?.auth && _.isEmpty(infos)){
            if (token){
                dispatch(infosAction()).then((action)=>{
                    const {errcode,infos} = (action.payload as {[index: string]: unknown}).data as {[index: string]: unknown}
                    if (errcode === 0){
                        dispatch(updateInfos(infos as Infos))
                    }
                })
            }else{
                return <Navigate to="/login"/>
            }
        }
    }
    if (token && location.pathname === '/login'){
        return <Navigate to="/" />
    }
    return (
        <>{props.children}</>
    )
}