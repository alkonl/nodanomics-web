import React, {useEffect} from 'react';
import {SuperTokensWrapper} from "supertokens-auth-react";
import {AppRouter} from "./service/router/router";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { ThirdPartyEmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui";
import * as reactRouterDom from "react-router-dom";
import {SuperTokensInit} from "./service/superTokens/SuperTokensInit";


SuperTokensInit();
const App = () => {
    useEffect(() => {
        fetch("http://localhost:8080/health")

    }, [])
  return (
    <SuperTokensWrapper>
      <AppRouter>
        {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [ThirdPartyEmailPasswordPreBuiltUI])}
      </AppRouter>
    </SuperTokensWrapper>
  )
}

export default App
