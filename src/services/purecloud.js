var getOrganization = (environment, token) => {
  console.log("get organization api invoked.");
  return fetchWrapper(`https://api.${environment}/api/v2/organizations/me`, {
    method: "GET",
    headers: {
      "Content-Type": "applicaton/json",
      Authorization: `bearer ${token}`,
    },
  });
};
