# URL Shortener Service

> API to create short urls using Node, Express and MongoDB

## Quick Start

```bash
# Install dependencies
npm install

export MONGO_URI="{your_mongodb_uri}"
# Edit the default.json file with your baseUrl
# Use production.json in production env

# Run
npm start
```

## Endpoint to create short url

### POST api/url/shorten

{ "longUrl": "xxxx" }
