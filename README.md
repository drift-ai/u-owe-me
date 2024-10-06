# U OWE ME

## 1. Frontend

### 1.1. Installation and Development

1. Clone the repository:
```bash
git clone https://github.com/your-username/u-owe-me.git
cd u-owe-me
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.


### 1.2. Deployment

1. create stack

```bash
aws cloudformation create-stack \
  --stack-name u-owe-me-front-end \
  --template-body file://cfn-front-end.yml \
  --parameters ParameterKey=Repository,ParameterValue=https://github.com/drift-ai/u-owe-me.git \
  --capabilities CAPABILITY_IAM
```

2. update stack

```bash
aws cloudformation update-stack \
  --stack-name u-owe-me-front-end \
  --template-body file://cfn-front-end.yml \
  --parameters ParameterKey=Repository,ParameterValue=https://github.com/drift-ai/u-owe-me.git \
  --capabilities CAPABILITY_IAM
```


## 2. Backend

- Get access token
```bash
export ACCESS_TOKEN="$(curl -X POST "https://bankaccountdata.gocardless.com/api/v2/token/new/" \
  -H "accept: application/json" \
  -H  "Content-Type: application/json" \
  -d "{\"secret_id\":\"$GOCARDLESS_SECRET_ID\", \"secret_key\":\"$GOCARDLESS_SECRET_KEY\"}" | jq -r ".access" )"
```
- list all banks
```bash
curl -X GET "https://bankaccountdata.gocardless.com/api/v2/institutions/?country=be" \
  -H  "accept: application/json" \
  -H  "Authorization: Bearer $ACCESS_TOKEN"

# {"id": "KBC_KREDBEBB", "name": "KBC", "bic": "KREDBEBB", "transaction_total_days": "365", "countries": ["BE"], "logo": "https://storage.googleapis.com/gc-prd-institution_icons-production/FR/PNG/kbc.png"}

```
- Connect
```bash
curl -X POST "https://bankaccountdata.gocardless.com/api/v2/requisitions/" \
  -H  "accept: application/json" -H  "Content-Type: application/json" \
  -H  "Authorization: Bearer $ACCESS_TOKEN" \
  -d "{\"redirect\": \"https://www.meet-drift.ai\",
       \"institution_id\": \"KBC_KREDBEBB\"}"

# {"id":"df753892-e81d-433f-aeb9-096209b286f0","created":"2024-09-29T14:36:46.730770Z","redirect":"https://www.meet-drift.ai","status":"CR","institution_id":"KBC_KREDBEBB","agreement":"a2379b4b-6c97-4c0b-b80b-f746b604ac78","reference":"df753892-e81d-433f-aeb9-096209b286f0",# "accounts":[],"link":"https://ob.gocardless.com/ob-psd2/start/7eb7467b-54ca-4bc6-af76-6efc4421e728/KBC_KREDBEBB","ssn":null,"account_selection":false,"redirect_immediate":false}
```

```bash
curl -X GET "https://bankaccountdata.gocardless.com/api/v2/requisitions/df753892-e81d-433f-aeb9-096209b286f0/" \
  -H  "accept: application/json" \
  -H  "Authorization: Bearer $ACCESS_TOKEN" 

  # {"id":"df753892-e81d-433f-aeb9-096209b286f0","created":"2024-09-29T14:36:46.730770Z","redirect":"https://www.meet-drift.ai","status":"LN","institution_id":"KBC_KREDBEBB","agreement":"a2379b4b-6c97-4c0b-b80b-f746b604ac78","reference":"df753892-e81d-433f-aeb9-096209b286f0","accounts":["4aba2b84-3aee-4977-a7e3-723d19f1a632"],"link":"https://ob.gocardless.com/ob-psd2/start/7eb7467b-54ca-4bc6-af76-6efc4421e728/KBC_KREDBEBB","ssn":null,"account_selection":false,"redirect_immediate":false}

```