in development

## Environment variables
### Development
Create .env file:
```
API_URL=<api_url>
SENTRY_DSN=<sentry_dsn>
SENTRY_ORGANIZATION=<sentry_organization>
SENTRY_PROJECT=<sentry_project>
SENTRY_AUTHTOKEN=<sentry_autktoken>
```

### Production
Variables from `.env` **will not be loaded** upon production build with `eas build`. 

In order to add environment variables, you need to use `eas secret:create` command. https://docs.expo.dev/build-reference/variables/#adding-secrets-with-eas-cli