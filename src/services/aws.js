var validateSubscription = (customerId, applicationId) => {
  var config = configuration.purecloud.endpoints;
  return fetchWrapper(config.subscription, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ customerId, applicationId }),
  });
};
