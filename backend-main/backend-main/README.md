# Juggle Traffic Analysis API

A REST API with WebSocket support for person footfall traffic analysis.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example` and set your environment variables:
```
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

3. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start
```

## API Endpoints

### REST API

Base URL: `http://localhost:8000/api/v1`

#### Traffic Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/traffic` | Create new traffic entry |
| GET | `/traffic` | Get all traffic entries |
| GET | `/traffic/:id` | Get traffic entry by ID |
| PUT | `/traffic/:id` | Update traffic entry |
| DELETE | `/traffic/:id` | Delete traffic entry |

### Request/Response Examples

#### Create Traffic Entry
```http
POST /api/v1/traffic
Content-Type: application/json

{
    "modelId": "model123",
    "cameraId": "cam456",
    "category": "person"
}
```

Response:
```json
{
    "success": true,
    "message": "Traffic entry created successfully",
    "data": {
        "modelId": "model123",
        "cameraId": "cam456",
        "category": "person",
        "uniqueId": "auto_generated",
        "timestamp": "2024-01-25T03:56:12.345Z",
        "_id": "generated_id"
    }
}
```

## WebSocket Events

The API uses Socket.IO for real-time updates. Connect to the WebSocket server at `ws://localhost:8000`.

### Events

| Event | Description | Data |
|-------|-------------|------|
| trafficCreated | Emitted when new traffic entry is created | Traffic object |
| trafficUpdated | Emitted when traffic entry is updated | Updated traffic object |
| trafficDeleted | Emitted when traffic entry is deleted | Deleted traffic ID |
| trafficList | Emitted when traffic list is retrieved | Array of traffic objects |

### WebSocket Client Example

```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000');

socket.on('connect', () => {
    console.log('Connected to WebSocket server');
});

socket.on('trafficCreated', (data) => {
    console.log('New traffic entry:', data);
});

socket.on('trafficUpdated', (data) => {
    console.log('Updated traffic entry:', data);
});

socket.on('trafficDeleted', (id) => {
    console.log('Deleted traffic entry id:', id);
});

socket.on('trafficList', (data) => {
    console.log('Traffic list:', data);
});
```

## Postman Collection

A Postman collection is included in the repository (`Juggle-Traffic-API.postman_collection.json`). To use it:

1. Open Postman
2. Click "Import" button
3. Select the `Juggle-Traffic-API.postman_collection.json` file
4. The collection includes both REST API endpoints and WebSocket connection examples
5. Set up environment variable:
   - Create a new environment
   - Add variable `base_url` with value `http://localhost:8000/api/v1`

## Models

### Traffic Model

```typescript
{
    modelId: string;      // ID of tracking model
    cameraId: string;     // Unique camera identifier
    uniqueId: string;     // Auto-generated unique event ID
    category: 'person' | 'vehicle';  // Type of detection
    timestamp: Date;      // Auto-generated timestamp
}
