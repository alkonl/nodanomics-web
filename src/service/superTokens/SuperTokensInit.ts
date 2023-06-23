import SuperTokens from "supertokens-auth-react";
import Session from "supertokens-auth-react/recipe/session";
import ThirdPartyEmailPassword from 'supertokens-auth-react/recipe/thirdpartyemailpassword'
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import {CONFIG} from "../../utils";

export const SuperTokensInit = () => {
    SuperTokens.init({
        appInfo: {
            // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
            appName: "game",
            apiDomain: CONFIG.API_URL,
            websiteDomain: CONFIG.WEB_URL,
            apiBasePath: "/api/auth",
            // websiteBasePath: "/222"
        },
        recipeList: [
            Session.init({
                tokenTransferMethod: "header" // or "cookie"
            }),
            EmailVerification.init(),
            ThirdPartyEmailPassword.init({}),
        ]
    });
}