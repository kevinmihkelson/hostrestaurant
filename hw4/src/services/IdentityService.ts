import type { IJWTResponse } from "../domain/IJWTResponse";
import httpClient from "./HttpClient";
import type { AxiosError } from "axios";
import { data } from "jquery";
import type { IServiceResult } from "./IServiceResult";
import { IRegisterRequest } from "../domain/IRegisterRequest";

const login = async (email: string, password: string) => {
  try {
    let loginInfo = {
      email,
      password,
    };
    let response = await httpClient.post("/identity/account/login", loginInfo);
    localStorage.setItem("jwt", response.data.token);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    return {
      status: response.status,
      data: response.data as IJWTResponse,
    };
  } catch (e) {
    let response = {
      status: (e as AxiosError).response!.status,
      // errorMsg: (e as AxiosError).response!.data.error,
    };

    console.log(response);

    console.log((e as AxiosError).response);

    return response;
  }
};

const logout = () => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("refreshToken");
};

const refreshIdentity = async (): Promise<IServiceResult<IJWTResponse>> => {
  try {
    let response = await httpClient.post("/identity/account/refreshtoken", {
      jwt: localStorage.getItem("jwt"),
      refreshToken: localStorage.getItem("refreshToken"),
    });
    return {
      status: response.status,
      data: response.data as IJWTResponse,
    };
  } catch (e) {
    let response = {
      status: (e as AxiosError).response!.status,
    };
    return response;
  }
};

const register = async (
  registerReguest: IRegisterRequest
): Promise<IServiceResult<IJWTResponse>> => {
  try {
    let response = await httpClient.post(
      "/identity/account/register",
      registerReguest
    );
    localStorage.setItem("jwt", response.data.token);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    return {
      status: response.status,
      data: response.data as IJWTResponse,
    };
  } catch (e) {
    let response = {
      status: (e as AxiosError).response!.status,
    };

    console.log(response);

    console.log((e as AxiosError).response);

    return response;
  }
};

const IdentityService = {
  login,
  logout,
  refreshIdentity,
  register,
};

export default IdentityService;
