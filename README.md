# CAMS
This repo relates to CAMS (Critical Asset Management System) and the project UI. It is where the magic happens, [report bugs, submit features, and see the current workload here](https://github.com/CriticalAssetManagement/CAMS-Dashboard/issues).

CAMS is an open-source project dedicated to helping nations, communities, cities, and people become disaster resilient. We want to enable people to plan for disasters so they can rebuild faster and save lives. It is a mobile and desktop application that users can securely access to learn more about their critical assets and the potential failure chains associated with each.

### CAMS Technology

CAMS is built with TerminusDB, the TerminusDB UI SDK, and React, the popular JS library. The maps are OpenStreetMap. JSON is the data-interchange format. TerminusDB is a document-oriented graph database that links JSON documents in a knowledge graph through a document API. The Document UI SDK builds the UI directly from documents in the database.

## Contributions

If you’re interested in contributing, [here is the contributions guide](https://github.com/CriticalAssetManagement/contributor-guide/blob/main/README.md)

This repo features the front end code, it includes:

- User data capture - Forms for users to add, update, and delete critical asset information
- Critical asset map GUI
- Critical asset list GUI

For more information about the full project, please visit the [CAMS Repo](https://github.com/CriticalAssetManagement/CAMS).

## Getting started locally with the Miami demo (fastest way to get started)

1. Be sure to install [Docker and the docker-compose plugin](https://docs.docker.com/engine/install/).
2. Copy `.env.default` to `.env`.
3. Run `docker compose up`. You might need root access depending on whether your user has been added to the Docker group.
4. Visit localhost:3036/Miami in your browser.

These steps will get you up and running and will allow you to contribute to CAMS.

## Getting started for online teams

How to install CAMS locally.

### Step 1 - TerminusDB

TerminusX, which is the hosted version of TerminusDB, is used as the database back-end to store the critical assets.

- Sign up or sign into TerminusDB https://dashboard.terminusdb.com

- Create a new Data Product by the ID ```CAMSDemo``` by clicking "New Data Product" in the upper right corner of the dashboard.

- Add the the CAMS schema from [https://github.com/CriticalAssetManagement/CAMS-Dashboard/blob/main/CAMSSchema.JSON](https://github.com/CriticalAssetManagement/CAMS-Dashboard/blob/main/CAMSSchema.json) by doing the following:
  - Open the schema by clicking on the upper link and copy the entire schema in your clipboard
  - Click on the added data product in the sidebar (called CAMSDemo in this README example)
  - Click on the bubbly icon on the sidebar on the left (the second entry in the three icons)
  - Click on the JSON View tab
  - Click the edit button
  - Paste the entire schema, overwrite the default schema and save it

### Step 2 - Clone CAMS Dashboard repo ```CAMS-Dashboard```

- Clone https://github.com/CriticalAssetManagement/CAMS-Dashboard locally
  ```
  git clone https://github.com/CriticalAssetManagement/CAMS-Dashboard.git
  cd CAMS-Dashboard
  ```

### Step 3: Set up ENV for TerminusX

- Create an ```.env``` file in the CAMS-Dashboard directory and include the below variables.

    ```
    let team = process.env.MY_TEAM                  // your team
    let token = process.env.MY_TOKEN                // your personal token
    let user = process.env.MY_USER                  // your email account used for signing into TerminusX
    let server = process.env.TERMINUSDB_SERVER      // TerminusX URL https://dashboard.terminusdb.com/
    ```

    Refer https://terminusdb.com/docs/index/terminusx/quick-start/get-api-key on how to get your team and token information
    from TerminusX.

### Step 4 - Run development environment (NodeJS locally)

Run inside the CAMS-dashboard directory:
- `npm install`


- Run locally `npm run start`

### Step 4 - Run development environment (docker-compose)

- Run `docker-compose up`
