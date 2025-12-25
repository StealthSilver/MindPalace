// API helper functions

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Token expired or invalid
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("Authentication required");
  }

  return response;
}

export async function getWidgets() {
  const res = await fetchWithAuth("/api/widgets");
  if (!res.ok) throw new Error("Failed to fetch widgets");
  return res.json();
}

export async function saveWidgets(widgets: any[]) {
  const res = await fetchWithAuth("/api/widgets", {
    method: "PUT",
    body: JSON.stringify({ widgets }),
  });
  if (!res.ok) throw new Error("Failed to save widgets");
  return res.json();
}

export async function deleteWidget(id: string) {
  const res = await fetchWithAuth(`/api/widgets?id=${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete widget");
  return res.json();
}

export async function getNodes() {
  const res = await fetchWithAuth("/api/nodes");
  if (!res.ok) throw new Error("Failed to fetch nodes");
  return res.json();
}

export async function saveNodes(nodes: any[]) {
  const res = await fetchWithAuth("/api/nodes", {
    method: "PUT",
    body: JSON.stringify({ nodes }),
  });
  if (!res.ok) throw new Error("Failed to save nodes");
  return res.json();
}

export async function deleteNode(id: string) {
  const res = await fetchWithAuth(`/api/nodes?id=${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete node");
  return res.json();
}
