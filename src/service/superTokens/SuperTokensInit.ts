import SuperTokens from "supertokens-web-js";
import Session from "supertokens-web-js/recipe/session";
import ThirdPartyEmailPassword from 'supertokens-web-js/recipe/thirdpartyemailpassword'

export const SuperTokensInit = () => {
    SuperTokens.init({
        appInfo: {
            // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
            appName: "game",
            apiDomain: "http://localhost:8080",
            // websiteDomain: "http://localhost:3000",
            apiBasePath: "/api/auth",
            // websiteBasePath: "/auth"
        },
        recipeList: [
            Session.init({
                tokenTransferMethod: "header" // or "cookie"
            }),
            ThirdPartyEmailPassword.init(),
        ]
    });
}