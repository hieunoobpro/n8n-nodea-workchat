import type { INodeProperties } from 'n8n-workflow';

/* -------------------------------------------------------------------------- */
/*                        MESSAGE                                             */
/* -------------------------------------------------------------------------- */
export const messageOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		noDataExpression: true,
		type: 'options',
		displayOptions: {
			show: {
				resource: ['message'],
			},
		},
		options: [
			{
				name: 'Send Message',
				value: 'sendMessage',
				description: 'Send a message',
				action: 'Send message',
			},
			{
				name: 'Get Detail Message',
				value: 'getDetailMessage',
				description: 'Get a message detail',
				action: 'Get message detail',
			},
		],
		default: 'sendMessage',
	},
];
// entry
export const messageFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*              entry: send message and get message detail                    */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Message Import',
		name: 'messageImport',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendMessage'],
			},
		},
		description: 'Import the context of message',
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendMessage', 'getDetailMessage'],
			},
		},
		description: 'ID of user recieved',
	},
];

/* -------------------------------------------------------------------------- */
/*                                    LIST                                    */
/* -------------------------------------------------------------------------- */
export const listOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		noDataExpression: true,
		type: 'options',
		displayOptions: {
			show: {
				resource: ['list'],
			},
		},
		options: [
			{
				name: 'Get List of Chat User',
				value: 'userChatList',
				description: 'Get user chat list',
				action: 'Get list of chat user',
			},
			{
				name: 'Get List of Contact',
				value: 'getContactList',
				description: 'Get contact list',
				action: 'Get contact list',
			},
		],
		default: 'userChatList',
	},
];
// entry
export const listFields: INodeProperties[] = [
	// Add later if have any change in the future
];
