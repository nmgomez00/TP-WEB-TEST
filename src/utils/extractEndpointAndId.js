export function extractEndpointAndId(url) {
  try {
    const urlObj = new URL(url);
    const pathSegments = urlObj.pathname
      .split("/")
      .filter((segment) => segment !== "");

    const id = pathSegments.pop();

    const endpointType = pathSegments.pop();

    if (endpointType && id) {
      return [endpointType, parseInt(id)];
    } else {
      console.warn("Formato invalido", url);
      return null;
    }
  } catch (error) {
    console.error("URL invalida:", url, error);
    return null;
  }
}
