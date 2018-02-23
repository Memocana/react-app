import * as http from 'axios';
import * as Endpoints from '../const/endpoints';
import _ from 'lodash';

export function requestData(requestType, path, data, sendResponseObject, token) {
	let headers={};
	headers = token ?
	{
		"Content-Type":"application/json",
		"Authorization": "Bearer " + token,

	} : {"Content-Type":"application/json"}

	return new Promise((resolve, reject) => {
		http({
			url: path,
			baseURL:Endpoints.baseUrl,
			headers: headers,
			method: requestType,
			data: data,
			responseType: "json"
		})
			.then(response => {
				resolve(response)
			})
			.catch(error => {
				console.error(error); // For example when QueryService is unavailable (HTTP 503), error.response=null
				reject(error);
			});
	});
}

