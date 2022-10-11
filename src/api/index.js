// for all API call functions
const BASE_URL = "http://localhost:3001/api";

const loginUser = async (username, password, setToken, setUser, setIsAdmin) => {
  let success;

  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await response.json();

    if (data.token) {
        delete data.user.password
      setToken(data.token);
      setUser(username);
      setIsAdmin(data.user.isAdmin);
      localStorage.setItem("418WhatsTeaToken", data.token);
      localStorage.setItem("418WhatsTeaUser", JSON.stringify(data.user));
      success = true;
    } else {
      success = false;
    }

    alert(data.message);
    return success;
  } catch (error) {
    console.error(error);
  }
};

const getAllProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getAllActiveProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getAllUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

const registerUser = async (
  firstname,
  lastname,
  username,
  password,
  email,
  address1,
  address2,
  city,
  state,
  zipcode
) => {
  try {
    console.log("STATEEEE", state);
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password,
        email: email,
        address1,
        //address2,
        city,
        state,
        zipcode,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

const getUserByUsername = async (username) => {
    try {
        const response = await fetch(`${BASE_URL}/users/${username}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });

        const data = await response.json()
        delete data.password
        console.log(data)

        return data
    } catch (error) {
        console.error(error)
    }
}

// getCart

//addtocart

//removefromcart

//placeorder

export {
  getAllProducts,
  getAllActiveProducts,
  registerUser,
  getAllUsers,
  loginUser,
  getUserByUsername
};
