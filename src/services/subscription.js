// const crypto = require('crypto')
// const utils = require('./utils')

// Retrieves Customer Subscription Manager Backend API URI
const getUri = () => {
	switch (process.env.REACT_APP_CUSTOM_ENV.trim()) {
		case 'test': return 'https://api.customer-subscription-manager.genesyspsdevops.com/test'
		case 'production': return 'https://api.customer-subscription-manager.genesyspsdevops.com/prod'
		default: return 'https://api.customer-subscription-manager.genesyspsdevops.com/dev'
	}
}

/**
 * Validates a Genesys Cloud App Subscription
 * 
 * @param {string} token Genesys Cloud token
 * @param {string} env Genesys Cloud environment (e.g.: mypurecloud.com)
 * @param {string} organizationId Genesys Cloud Organization ID (GUID)
 * @param {string} solutionName Solution Name 
 * @param {string} [licenseName] Optional License Name. If not specified, backend will validate against license name 'Basic' that is automatically created for each solution
 * 
 */

const validateGCApp = (token, env, organizationId, solutionName, licenseName) => {
	const body = {
		deploymentId: organizationId,
		productName: solutionName
	}
	if (licenseName) body.licenseName = licenseName

	return utils.fetchWrapper(`${getUri()}/subscription/validate`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'tokensource': 'purecloud',
			env,
			token
		},
		body: JSON.stringify(body)
	})
}

/**
 * Validates an App Subscription.
 * 
 * @param {string} subscriptionId PS Subscription ID binding the solution license to a customer deployment. Retrieved from Customer Subscription Manager tool.
 * @param {string} solutionName Solution Name
 * 
 */

const validateApp = (subscriptionId, solutionName) => {
	const body = { productName: solutionName }
	return utils.fetchWrapper(`${getUri()}/subscription/validate`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'signature': crypto.createHmac('sha256', subscriptionId).update(JSON.stringify(body)).digest('base64')
		},
		body: JSON.stringify(body)
	})
}
