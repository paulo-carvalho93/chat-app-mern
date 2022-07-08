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

export async function searchUsers(search: string, token: string) {
  try {
    const response = await axios.get(`api/user?search=${search}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
}

export async function accessChat(userId: string, token: string) {
  try {
    const response = await axios.post("api/chat", userId, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
}
