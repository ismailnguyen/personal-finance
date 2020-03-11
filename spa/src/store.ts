import { createStore, applyMiddleware, Middleware, Store, Reducer, AnyAction } from "redux";
import thunk from "redux-thunk";
import { enableBatching } from "redux-batched-actions";
import { composeWithDevTools } from "redux-devtools-extension";
import { ApplicationApi } from "./business/api";
import { ExtraArgument } from "./business/definitions";
import { rootReducer } from "./business/reducer";
import { applicationSelectors } from "./business/selectors";
import { applicationThunksCreators } from "./business/thunks";
import { ApplicationState } from "./business/state";

export function makeGetStore(api: ApplicationApi) {
  return function getStore(...additionalMiddlewares: Middleware[]): Store {
    const extraArgument: ExtraArgument = {
      thunkCreators: applicationThunksCreators,
      selectors: applicationSelectors,
      api
    };
    const thunkMiddleware: Middleware = thunk.withExtraArgument(extraArgument);
    const middlewares: Middleware[] = [thunkMiddleware, ...additionalMiddlewares];
    return createStore(
      enableBatching(rootReducer as Reducer<ApplicationState, AnyAction>),
      composeWithDevTools(applyMiddleware(...middlewares))
    );
  };
}
