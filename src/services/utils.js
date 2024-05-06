var fetchWrapper = async (url, init) => {
  const response = await fetch(url, init);
  let json;
  try {
    json = await response.json();
    console.log("result: " + JSON.stringify(json));
  } catch (error) {}
  const ret = { status: response.status, ...json };
  return response.ok ? ret : Promise.reject(ret);
};
