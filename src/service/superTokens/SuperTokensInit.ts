import SuperTokens from "supertokens-auth-react";
import ThirdPartyEmailPassword, {Google} from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import Session from "supertokens-auth-react/recipe/session";

export const SuperTokensInit = () => {
    SuperTokens.init({
        appInfo: {
            // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
            appName: "game",
            apiDomain: "http://localhost:8080",
            websiteDomain: "http://localhost:3000",
            apiBasePath: "/api/auth",
            websiteBasePath: "/auth"
        },
        recipeList: [
            Session.init({
                tokenTransferMethod: "header" // or "cookie"
            }),
            ThirdPartyEmailPassword.init({
                signInAndUpFeature: {
                    providers: [
                        Google.init(),
                    ]
                }
            }),
            Session.init()
        ]
    });
}