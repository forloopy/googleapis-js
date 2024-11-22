import { google } from 'googleapis';

import Google_Drive from './classes/drive';

export default class GoogleX {

	serviceAccount: string = '';
	serviceAccountJson: {};
	drive: any;

	constructor(props: {
		serviceAccount: string,
	}) {
		const authorize = async () => {
			const auth = new google.auth.GoogleAuth({
				  credentials: this.serviceAccountJson,
				  scopes: [
					'https://www.googleapis.com/auth/drive'
				],
			});
			return await auth.getClient();
		}
		this.serviceAccountJson = JSON.parse(props.serviceAccount);
		this.drive = new Google_Drive({ authorize });
	}

}