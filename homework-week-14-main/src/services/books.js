import BASE_URL from "@/lib/baseUrl";

export async function createBook(params) {
  try {
    const response = await fetch(`${BASE_URL}/books`, {
      method: "POST",
      body: JSON.stringify(params),
    });
    console.log(response);
    return response;
  } catch (error) {
    throw new Error({ message: error.response.message });
  }
}

export async function updateBook(id, params) {
  try {
    const response = await fetch(`${BASE_URL}/books/${id}`, {
      method: "PUT",
      body: JSON.stringify(params),
    });
    return response;
  } catch (error) {
    console.log(error);
    throw new Error({ message: error.message });
  }
}

export async function deleteBook(id) {
  try {
    const response = await fetch(`${BASE_URL}/books/${id}`, {
      method: "DELETE",
    });

    return response;
  } catch (error) {
    throw new Error({ message: error.response.message });
  }
}

export async function uploadImage(params) {
  try {
    const response = await fetch(`${BASE_URL}/books/uploads`, {
      method: "POST",
      body: params,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error({ message: error.response.message });
  }
}
