# CAMS-Dashboard
This repo relates to the CAMS project UI.

Featuring the front end code, it includes:

- User data capture - Forms for users to add, update, and delete critical asset information
- Critical asset map GUI
- Critical asset list GUI

For more information about the full project, please visit the [CAMS Repo](https://github.com/CriticalAssetManagement/CAMS).

## Getting started

### Step 1 - TerminusX

TerminusX is used as our database back-end to store the critical assets.

- Sign into TerminusX https://terminusdb.com/

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
