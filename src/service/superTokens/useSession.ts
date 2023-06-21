import { useSessionContext } from 'supertokens-auth-react/recipe/session';


export const useSession = () => {
    const session = useSessionContext();
    if (session.loading) {
        return undefined;
    }
    if (session.doesSessionExist) {
        return session;
    }
}