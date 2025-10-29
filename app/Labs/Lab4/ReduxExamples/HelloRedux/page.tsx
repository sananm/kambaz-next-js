'use client';
import { useSelector, useDispatch, Provider } from "react-redux";
import store from "../../store";
export default function HelloRedux() {
  const { message } = useSelector((state: any) => state.helloReducer);
  return (
    <Provider store={store}>
    <div id="wd-hello-redux">
      <h3>Hello Redux</h3>
      <h4>{message}</h4> <hr />
    </div>
    </Provider>
  );
}
