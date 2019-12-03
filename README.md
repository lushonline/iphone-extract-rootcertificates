# iphone-extract-rootcertificate
This tool will extract the certificates from the iOS *TrustStore.sqlite3* database.

It can be used to remove Trusted Root Certificates when the Profile is no longer on your device.

## Extract the TrustStore.sqlite3 from your iPhone Backup
Use a tool like [iMazing](https://imazing.com/iphone-backup-browser-extractor) to locate and copy the *TrustStore.sqlite3* from your current iPhone backup

Save this into the ```input``` folder of this project, or change the configuration in ```config/config.default.js```

NOTE: You can do this manually by finding the *TrustStore.sqlite3* entry in your iPhone UNENCRYPTED backup *manifest.db* which is a SQLLITE DB, then copy the file this references as *TrustStore.sqlite3*. HINT: Look at the relativePath column

## Run the project

Run the project.

```bash
node app
```

The certificates present in the *TrustStore.sqlite3* will be extracted to ```output``` folder of this project, or change the configuration in ```config/config.default.js```, and will be named ```certn.crt``` where n is a number.

## Installing/Removing the Trusted Root Certificate
Assumption is your emails are accessed in the ios native email app.

1. Email each certificate individually to your iphone email account
1. Open the email and click the ```certn.crt``` attachment, this will create a new Profile on your device
1. Remove the new profile and this will also remove the Trusted Root Certificate.

[Apple iPhone Support - Removing Profiles](https://support.apple.com/en-gb/guide/iphone/iph6c493b19/ios)
 
## License

MIT © Martin Holden
