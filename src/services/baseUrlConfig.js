const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getToken = () => {
  return typeof window !== "undefined" ? localStorage.getItem("token") : null;
};

const API_URL = {
  get: async (url, authRequired = true) => {
    try {
      let headers = {
        "Content-Type": "application/json", // Initialize with default value
      };

      if (authRequired) {
        const token = getToken();
        headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token ? token : ""}`,
        };
      } else {
        headers = {
          "Content-Type": "application/json",
        };
      }
      const response = await fetch(`${BASE_URL}${url}`, {
        method: "GET",
        // headers: Object.fromEntries(Object.entries(headers)),
      });
      const data = await response.json();

      if (
        data?.message === "Token Required" ||
        data?.message === "Token Expired"
      ) {
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
        sessionStorage.setItem("ShowMessage", "true");
        sessionStorage.setItem("route", window.location.pathname);
      }
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  },
  post: async (url, body, authRequired = true, isFormData = false) => {
    try {
      let headers = {};

      if (authRequired) {
        const token = getToken();
        headers = {
          Authorization: `${token ? `Bearer ${token}` : ""}`,
        };

        // Do not set Content-Type for FormData
        if (!isFormData) {
          headers["Content-Type"] = "application/json";
        }
      } else {
        if (!isFormData) {
          headers["Content-Type"] = "application/json";
        }
      }

      const response = await fetch(`${BASE_URL}${url}`, {
        method: "POST",
        headers: Object.fromEntries(Object.entries(headers)),
        body: isFormData ? body : JSON.stringify(body),
      });

      const data = await response.json();

      if (
        data?.message === "Token Required" ||
        data?.message === "Token Expired"
      ) {
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
        sessionStorage.setItem("ShowMessage", "true");
        sessionStorage.setItem("route", window.location.pathname);
      }

      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  },
  put: async (url, body, authRequired = true) => {
    try {
      let headers = {
        "Content-Type": "application/json", // Initialize with default value
      };
      if (authRequired) {
        const token = getToken();
        headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token ? token : ""}`,
        };
      } else {
        headers = {
          "Content-Type": "application/json",
        };
      }
      const response = await fetch(`${BASE_URL}${url}`, {
        method: "PUT",
        headers: Object.fromEntries(Object.entries(headers)),

        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (
        data?.message === "Token Required" ||
        data?.message === "Token Expired"
      ) {
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
        sessionStorage.setItem("ShowMessage", "true");
        sessionStorage.setItem("route", window.location.pathname);
      }

      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  },
  delete: async (url, bodyToSend, authRequired = true) => {
    try {
      let headers = {
        "Content-Type": "application/json", // Initialize with default value
      };
      if (authRequired) {
        const token = getToken();
        headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token ? token : ""}`,
        };
      } else {
        headers = {
          "Content-Type": "application/json",
        };
      }
      const response = await fetch(`${BASE_URL}${url}`, {
        method: "DELETE",
        headers: Object.fromEntries(Object.entries(headers)),

        body: bodyToSend ? JSON.stringify(bodyToSend) : undefined,
      });
      const data = await response.json();
      if (
        data?.message === "Token Required" ||
        data?.message === "Token Expired"
      ) {
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
        sessionStorage.setItem("ShowMessage", "true");
        sessionStorage.setItem("route", window.location.pathname);
      }

      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  },
  patch: async (url, body, authRequired = true) => {
    try {
      let headers = {
        "Content-Type": "application/json", // Initialize with default value
      };
      if (authRequired) {
        const token = getToken();
        headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token ? token : ""}`,
        };
      } else {
        headers = {
          "Content-Type": "application/json",
        };
      }
      const response = await fetch(`${BASE_URL}${url}`, {
        method: "PATCH",
        headers: Object.fromEntries(Object.entries(headers)),

        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (
        data?.message === "Token Required" ||
        data?.message === "Token Expired"
      ) {
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
        sessionStorage.setItem("ShowMessage", "true");
        sessionStorage.setItem("route", window.location.pathname);
      }

      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  },
};

export default API_URL;
