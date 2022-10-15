// for all API call functions
const BASE_URL = "http://localhost:3001/api";

const loginUser = async (username, password, setToken, setIsAdmin) => {
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
      delete data.user.password;
      setToken(data.token);
      setIsAdmin(data.user.isAdmin);
      localStorage.setItem("418WhatsTeaToken", data.token);
      localStorage.setItem("418WhatsTeaUser", JSON.stringify(data.user));
      success = true;
    } else {
      success = false;
    }

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
    const response = await fetch(`${BASE_URL}/products/active`, {
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
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    delete data.password;

    return data;
  } catch (error) {
    console.error(error);
  }
};

const getCartByUsername = async (username) => {
  try {
    const response = await fetch(`${BASE_URL}/orders_products/${username}`);
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

const getOpenCart = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/orders_products/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getProductById = async (productId) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

const addToCart = async (productId, quantity = 1, price, token) => {
  try {
    const response = await fetch(`${BASE_URL}/orders_products/addtocart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId,
        quantity,
        price,
      }),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

const removeFromCart = async (token, productId) => {
  try {
    const response = await fetch(`${BASE_URL}/orders_products/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId,
      }),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

const editCartQuantity = async (token, productId, quantity) => {
  if (typeof quantity === "string") {
    quantity = parseInt(quantity);
  }
  try {
    const response = await fetch(`${BASE_URL}/orders_products/editquantity`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId,
        quantity,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const placeOrder = async (cartItems, token) => {
  try {
    const response = await fetch(`${BASE_URL}/orders/placeorder`, {
      method: "PATCH",
      headers: token
        ? {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        : { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItems: cartItems ? cartItems : null }),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

const showOrders = async (token) => {
  const response = await fetch(`${BASE_URL}/orders/userOrder`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

const editUserInformation = async (token, firstname, lastname, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/userInformation`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        firstname,
        lastname,
        password,
      }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

const updateProduct = async (
  token,
  productId,
  name,
  imgurl,
  price,
  stock,
  type,
  unit,
  description,
  isActive
) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        imgurl,
        price,
        stock,
        type,
        unit,
        description,
        isActive,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const addNewProduct = async (
  name,
  description,
  stock,
  price,
  unit,
  type,
  isActive,
  imgurl
) => {
  try {
    console.log(name, imgurl, description, stock, price, unit, type, isActive);
    const response = await fetch(`${BASE_URL}/products/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        imgurl,
        description,
        stock,
        price,
        unit,
        type,
        isActive,
      }),
    });
    const data = await response.json();
    console.log("DATAAAAA", data);
    return data;
  } catch (error) {
    throw error;
  }
};

export {
  getAllProducts,
  getAllActiveProducts,
  registerUser,
  getAllUsers,
  loginUser,
  getUserByUsername,
  getCartByUsername,
  getOpenCart,
  removeFromCart,
  editUserInformation,
  getProductById,
  addToCart,
  editCartQuantity,
  placeOrder,
  updateProduct,
  addNewProduct,
  showOrders
};
