import {matchRoutes, useLocation} from "react-router-dom";
import {appRouter, ELinks} from "../service";

const routes = Object.values(ELinks).map((path) => ({path}))

export const useCurrentPath = () => {
    const location = useLocation()
    const agnosticRouteMatch = matchRoutes(routes, location)
    const route = agnosticRouteMatch !== null ? agnosticRouteMatch[0].route : undefined

    return route?.path
}
