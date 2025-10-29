'use client';
import { useSelector, Provider } from "react-redux";
import store from "../../store";

function HelloReduxContent() {
  const { message } = useSelector((state: any) => state.helloReducer);
  return (
    <div id="wd-hello-redux">
      <h3>Hello Redux</h3>
      <h4>{message}</h4> <hr />
    </div>
  );
}

export default function HelloRedux() {
  return (
    <Provider store={store}>
      <HelloReduxContent />
    </Provider>
  );
}