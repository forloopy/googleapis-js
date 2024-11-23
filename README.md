# @forloopy/googleapis

**@forloopy/googleapis** is an open-source JavaScript library, built with loose TypeScript (with plans to include comprehensive types and definitions in the future), designed for seamless interaction with Google APIs. It simplifies the process of granting Google users access to Google Drive and is both free and easy to use. Additional features are planned for future updates.

---

## Features

- Automatically grant a Google user access to Google Drive.
- Lightweight and easy-to-integrate API.
- Open source and free to use.

---

## Installation

Install the package using npm:

```bash
npm install @forloopy/googleapis
```

## Usage

Here’s a basic example of how to use googleapis with the ES module import syntax:

### Import & Initiate 

```javascript
// Initiate
import GoogleAPIs from '@forloopy/googleapis';
const googleapis = new GoogleAPIs({
	serviceAccount: '<GOOGLE_SERVICE_ACCOUNT>'
});
```

### Add Drive User

```javascript
const { data, error } = await googleapis.drive.addUser({
 	role: 'reader',
 	email: '<EMAIL_ADDRESS>',
 	target: '<FILE_OR_FOLDER_ID>'
 });
 if (data?.permission?.id) {
 	console.log( data )
 }
 else {
 	console.log( error )	
}
```

### Remove Drive user

```javascript
const { data, error } = await googleapis.drive.removeUser({
 	email: '<EMAIL_ADDRESS>',
 	target: '<FILE_OR_FOLDER_ID>'
});
if (data) {
 	console.log( data )
}
else {
 	console.log( error )	
}
```

## Configuration

Coming soon...

## Documentation

Coming soon...

## Contributing

At this time, this project isn't accepting contributions.

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit).
