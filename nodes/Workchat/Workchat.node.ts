import type { OptionsWithUri } from 'request';

import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {
	messageFields,
	messageOperations,
	listFields,
	listOperations,
} from './EntryDescription';

export class Workchat implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Workchat',
		name: 'workchat',
		icon: 'file:workchat.svg',
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume Prinrcart API',
		defaults: {
			name: 'Workchat',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'workchatTokenApi',
				required: true,
				displayOptions: {
					show: {
						authentication: ['token'],
					},
				},
			},
		],
		properties: [
			{
				displayName: 'Authentication',
				name: 'authentication',
				type: 'options',
				options: [
					{
						name: 'API Token',
						value: 'token',
					},
				],
				default: 'token',
			},
			{
				displayName: 'Resource',
				name: 'resource',
				noDataExpression: true,
				type: 'options',
				options: [
					{
						name: 'Send Message',
						value: 'message',
					},
					{
						name: 'Get List',
						value: 'list',
					},
				],
				default: 'message',
			},
			...messageOperations,
			...messageFields,
			...listOperations,
			...listFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const length = items.length;
		let responseData;
		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);
		// const credentials = await this.getCredentials('workchatTokenApi');
		// const bearerToken = credentials.bearerToken;
		// const companyToken = credentials.companyToken;

		for (let i = 0; i < length; i++) {
			try {
				if (resource === 'message') {
					if (operation === 'sendMessage') {
						const messageImport = this.getNodeParameter('messageImport', i) as string;
						const userId = this.getNodeParameter('userId', i) as string;
						const options: OptionsWithUri = {
							headers: {
								Accept: 'application/json',
							},
							method: 'POST',
							body: {
								message: messageImport,
								user_id: userId,
							},
							uri: `https://erp-amz.cloodo.com/v4/messages/send`,
							json: true,
						};
						console.log(JSON.stringify(options, null, 2));
						responseData = await this.helpers.requestWithAuthentication.call(
							this,
							'workchatTokenApi',
							options,
						);
						returnData.push(responseData);
					}
					if (operation === 'getDetailMessage') {
						const userId = this.getNodeParameter('userId', i) as string;
						const options: OptionsWithUri = {
							headers: {
								Accept: 'application/json',
							},
							method: 'GET',
							uri: `https://erp-amz.cloodo.com/v4/messages/chat-message/${userId}`,
							json: true,
						};
						responseData = await this.helpers.requestWithAuthentication.call(
							this,
							'workchatTokenApi',
							options,
						);
						console.log(JSON.stringify(options, null, 2));
						returnData.push(responseData);
					}
				}
				if (resource === 'list') {
					if (operation === 'userChatList') {
						const options: OptionsWithUri = {
							headers: {
								Accept: 'application/json',
							},
							method: 'GET',
							uri: `https://erp-amz.cloodo.com/v4/messages/list-user-chat`,
							json: true,
						};
						responseData = await this.helpers.requestWithAuthentication.call(
							this,
							'workchatTokenApi',
							options,
						);
						console.log(JSON.stringify(options, null, 2));
						returnData.push(responseData);
					}
					if (operation === 'getContactList') {
						const options: OptionsWithUri = {
							headers: {
								Accept: 'application/json',
							},
							method: 'GET',
							uri: `https://erp-amz.cloodo.com/v4/messages/list-contact-chat`,
							json: true,
						};
						responseData = await this.helpers.requestWithAuthentication.call(
							this,
							'workchatTokenApi',
							options,
						);
						console.log(JSON.stringify(options, null, 2));
						returnData.push(responseData);
					}
				}
			} catch (error) {
				if (this.continueOnFail()) {
					const executionErrorData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: error.message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionErrorData);
					continue;
				}
				throw error;
			}
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}

