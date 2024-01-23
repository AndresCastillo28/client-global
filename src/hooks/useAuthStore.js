import { useDispatch, useSelector } from "react-redux";
import projectApi from "../api/projectApi";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      
      const { data } = await projectApi.post("/login", { username: email, password });
      console.log(data);
      // console.log("La respuesta....", response);
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      // console.log(data.token, "MOSTRANDO EL TOKEN")
      dispatch(onLogin({ username: data.username }));
    } catch (error) {
      dispatch(onLogout(error.response.data?.msg || "--"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await projectApi.get("auth/re-new");

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.username }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
  };

  return {
    // Propiedades
    errorMessage,
    status,
    user,

    // Metodos
    checkAuthToken,
    startLogin,
    startLogout,
  };
};
