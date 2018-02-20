import * as http from 'axios';
import endpoints from '../const/endpoints';
import _ from 'lodash';

export function requestData( requestType, path, data, customHeaders, sendResponseObject, isFile) {

	var headers = {
		Authorization: "Bearer ", //getToken(),
		"Api-Version": "2.0",
		"Content-Type": "application/json",
		"Cache-Control": "no-cache",
		"If-Modified-Since" : "0"
	};
	if (headers !== undefined) {
		headers = _.merge(headers, customHeaders);
	}
	return new Promise((resolve, reject) => {
		http({
			url: path,
			baseURL:endpoints.endpoints.baseURL,
			headers: headers,
			method: requestType,
			data: data,
			responseType: isFile ? "blob" : "json"
		})
			.then(response => {
				if (typeof sendResponseObject === "undefined" || !sendResponseObject) {
					resolve(response.data);
				} else {
					resolve(response);
				}
			})
			.catch(error => {
				console.error(error); // For example when QueryService is unavailable (HTTP 503), error.response=null
				reject(error);
			});
	});
}

