import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class WorkchatTokenApi implements ICredentialType {
	name = 'workchatTokenApi';

	displayName = 'Workchat Token API';

	documentationUrl = 'https://example.com/docs/auth';

	properties: INodeProperties[] = [
		{
			displayName: 'Bearer Token',
			name: 'bearerToken',
			type: 'string',
			default: '',
		},
		{
			displayName: 'X-WorkSuite-Company-Token',
			name: 'companyToken',
			type: 'string',
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Accept: 'application/json',
				Authorization: '=Bearer {{$credentials.bearerToken}}',
				'X-WorkSuite-Company-Token': '={{ $credentials.companyToken }}'
			},
		},
	};
	test: ICredentialTestRequest = {
		request: {
			method:"GET",
			baseURL: 'https://erp-amz.cloodo.com/v4/messages/list-user-chat'
		},
	};
}
