import { google } from 'googleapis';

interface Permission {
  type: 'user' | 'group' | 'domain' | 'anyone';
  role: 'reader' | 'commenter' | 'writer';
  emailAddress?: string; // Optional, only if type is 'user' or 'group'
}

export default class Google_Drive {

	authorize: any;

	constructor(props: {
		authorize: any
	}) {
		this.authorize = props.authorize;
	}

	addUser = async (
		props: {
			role: 'reader' | 'commenter' | 'writer',
			email: string,
			target: string,
		}
	): Promise <object> => {
		const auth = await this.authorize();
		// Debug
		// console.log( auth );
		try {
			const drive = google.drive({ version: 'v3', auth });
			const permission: Permission = {
				type: 'user',
				role: props.role,
				emailAddress: props.email,
			};
			const res = await drive.permissions.create({
			    requestBody: permission,
			    fileId: props.target,
			    fields: 'id',
			});
			return {
				data: {
					permission: {
						id: `${res.data.id}`	
					}
				},
				error: null
			}
		} catch (error: any) {
			return {
				data: null,
				error: error
			}
		}
	}

	removeUser = async (
		props: {
			email: string,
			target: string,
		}
	): Promise <object> => {
		const auth = await this.authorize();
		try {
			const drive = google.drive({ version: 'v3', auth });
			const permissions = await drive.permissions.list({
				fileId: props.target,
				fields: 'permissions(id, emailAddress)'
			});
			let permissionId: string = ''; 
			if (permissions?.data?.permissions) {
				for(let permission of permissions?.data?.permissions) {
					if (permission.emailAddress === props.email) {
						permissionId = permission.id as string;
						break;
					}
				}
			}
			const res = await drive.permissions.delete({
				fileId: props.target,
				permissionId: permissionId
			});
			
			return {
				data: res,
				error: null
			}
		} catch (error: any) {
			return {
				data: null,
				error: error
			}
		}

		return [];
	}

	addGroup = async (
		
	): Promise <object> => {
		return ['@addGroup'];
	}

	addDomain = async (
		
	): Promise <object> => {
		return ['@addDomain'];
	}

	addAnyone = async (
		
	): Promise <object> => {
		return ['@addAnyone'];
	}

}

// https://developers.hubspot.com/docs/api/crm/associations#association-type-id-values