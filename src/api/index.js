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
      setUser(data.user);
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
        
        return data
    } catch (error) {
        console.error(error)
    }
}

const getCartByUsername = async (username) => {
    try {
        const response = await fetch(`${BASE_URL}/orders_products/${username}`)
        const data = await response.json()

        return data
    } catch (error) {
        throw error
    }
}

//addtocart

const removeFromCart = async(userId, productId) => {
    try {
        const response = await fetch(`${BASE_URL}/orders_products/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                userId,
                productId
            }
        })
        const data = await response.json()

        return data
    } catch (error) {
        throw error
    }
}

//placeorder

export {
  getAllProducts,
  getAllActiveProducts,
  registerUser,
  getAllUsers,
  loginUser,
  getUserByUsername,
  getCartByUsername,
  removeFromCart
};
