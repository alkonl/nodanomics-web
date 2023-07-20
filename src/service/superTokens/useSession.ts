import { useSessionContext , SessionContextType} from 'supertokens-auth-react/recipe/session';


export const useSession = (): SessionContextType & {
    userId: string;
} | undefined=> {
    const session = useSessionContext();
    if (session.loading) {
        return undefined;
    }
    if (session.doesSessionExist) {
        return session;
    }
}
