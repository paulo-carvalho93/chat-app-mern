import axios from "axios";

// axios.defaults.baseURL = `http://localhost:5000`;

interface IUserSignUp {
  name: string;
  email: string;
  password: string;
  picture?: File | string;
}

interface ILoginParams {
  email: string;
  password: string;
}

export async function createUser(data: IUserSignUp) {
  try {
    const response = await axios.post<IUserSignUp>("api/user", data, {
      headers: {
        "Content-type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
}

export async function loginUser(data: ILoginParams) {
  try {
    const response = await axios.post<ILoginParams>("api/user/login", data, {
      headers: {
        "Content-type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
}
