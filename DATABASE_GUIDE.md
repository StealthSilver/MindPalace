# Mind Palace - Database Integration Guide

## Overview

Mind Palace is now a fully stateful application with MongoDB database integration. Users can sign up, log in, and have their data (widgets and nodes) persisted across sessions.

## Database Architecture

### MongoDB Connection

- **Database**: MongoDB Atlas (Cloud Database)
- **Connection**: `mongodb+srv://rajatsaraswat0409_db_user:z4s4N5BX98TBKw9C@cluster0.uzbre4h.mongodb.net/mindpalace`
- **Connection Pooling**: Implemented with global caching to reuse connections across requests

### Collections

#### 1. Users Collection

Stores user authentication data.

**Schema:**

```typescript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed with bcrypt),
  createdAt: Date,
  updatedAt: Date
}
```

#### 2. Widgets Collection

Stores dashboard widgets for each user.

**Schema:**

```typescript
{
  userId: ObjectId (ref: User, required, indexed),
  widgetId: String (unique, required),
  type: String (required),
  title: String,
  x: Number,
  y: Number,
  width: Number,
  height: Number,
  data: Object,
  createdAt: Date,
  updatedAt: Date
}
```

#### 3. Nodes Collection

Stores canvas nodes for each user.

**Schema:**

```typescript
{
  userId: ObjectId (ref: User, required, indexed),
  nodeId: String (unique, required),
  type: String (enum: ['note', 'link', 'todo', 'image', 'tweet']),
  x: Number (required),
  y: Number (required),
  width: Number,
  height: Number,
  content: String,
  color: String,
  topicId: String,
  completed: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Authentication System

### JWT-Based Authentication

- **Token Expiration**: 7 days
- **Storage**: Token stored in both localStorage and cookies
- **Password Security**: Bcrypt with salt rounds = 10

### API Endpoints

#### POST /api/auth/signup

Create a new user account.

**Request:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt_token_here"
}
```

#### POST /api/auth/login

Authenticate an existing user.

**Request:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt_token_here"
}
```

#### GET /api/auth/me

Verify authentication token and get user data.

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

## Data Persistence API

### Widget Endpoints

#### GET /api/widgets

Fetch all widgets for authenticated user.

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "widgets": [...]
}
```

#### POST /api/widgets

Create a new widget.

**Headers:**

```
Authorization: Bearer <token>
```

**Request:**

```json
{
  "widgetId": "widget-123",
  "type": "notes",
  "title": "My Notes",
  "x": 0,
  "y": 0,
  "width": 1,
  "height": 1
}
```

#### PUT /api/widgets

Batch update all widgets (replaces all existing widgets).

**Headers:**

```
Authorization: Bearer <token>
```

**Request:**

```json
{
  "widgets": [
    {
      "id": "widget-123",
      "type": "notes",
      "title": "My Notes",
      ...
    }
  ]
}
```

#### DELETE /api/widgets?id=widget-123

Delete a specific widget.

**Headers:**

```
Authorization: Bearer <token>
```

### Node Endpoints

#### GET /api/nodes

Fetch all canvas nodes for authenticated user.

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "nodes": [...]
}
```

#### POST /api/nodes

Create a new node.

**Headers:**

```
Authorization: Bearer <token>
```

**Request:**

```json
{
  "nodeId": "node-123",
  "type": "note",
  "x": 100,
  "y": 100,
  "width": 250,
  "height": 180,
  "content": "Note content"
}
```

#### PUT /api/nodes

Batch update all nodes (replaces all existing nodes).

**Headers:**

```
Authorization: Bearer <token>
```

**Request:**

```json
{
  "nodes": [
    {
      "id": "node-123",
      "type": "note",
      "x": 100,
      "y": 100,
      ...
    }
  ]
}
```

#### DELETE /api/nodes?id=node-123

Delete a specific node.

**Headers:**

```
Authorization: Bearer <token>
```

## Frontend Integration

### Authentication Context

The `AuthContext` provides authentication state and methods throughout the app:

```typescript
const { user, token, login, signup, logout, isLoading } = useAuth();
```

### API Helper Functions

Located in `lib/api.ts`:

```typescript
// Automatically adds Authorization header
await fetchWithAuth("/api/widgets");

// Widget operations
await getWidgets();
await saveWidgets(widgets);
await deleteWidget(widgetId);

// Node operations
await getNodes();
await saveNodes(nodes);
await deleteNode(nodeId);
```

### Protected Routes

Middleware in `middleware.ts` ensures:

- Unauthenticated users are redirected to `/login`
- Authenticated users accessing `/login` or `/signup` are redirected to `/palace/dashboard`

## Environment Variables

Create `.env.local` in the root directory:

```env
MONGODB_URI=mongodb+srv://rajatsaraswat0409_db_user:z4s4N5BX98TBKw9C@cluster0.uzbre4h.mongodb.net/mindpalace
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-change-this-in-production
```

## Running the Application

1. **Install Dependencies**

```bash
npm install
```

2. **Start Development Server**

```bash
npm run dev
```

3. **Access the Application**

- Landing Page: http://localhost:3000
- Login: http://localhost:3000/login
- Signup: http://localhost:3000/signup
- Dashboard: http://localhost:3000/palace/dashboard (requires authentication)
- Canvas: http://localhost:3000/palace/canvas (requires authentication)

## Features

### Authentication

- ✅ User signup with password hashing
- ✅ User login with JWT token
- ✅ Token verification
- ✅ Auto-redirect for protected routes
- ✅ Logout functionality

### Dashboard

- ✅ Fetch user's widgets on load
- ✅ Auto-save on widget creation
- ✅ Auto-save on widget deletion
- ✅ Loading states
- ✅ Per-user widget isolation

### Canvas

- ✅ Fetch user's nodes on load
- ✅ Auto-save on node creation
- ✅ Auto-save on node editing
- ✅ Auto-save on node deletion
- ✅ Auto-save on node movement
- ✅ Loading states
- ✅ Per-user node isolation

## Security Considerations

### Implemented

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Server-side token verification
- ✅ Protected API routes
- ✅ User data isolation (userId in all queries)

### Recommendations for Production

- [ ] Use environment-specific secrets (not committed to repo)
- [ ] Implement rate limiting on auth endpoints
- [ ] Add CSRF protection
- [ ] Use HTTPS in production
- [ ] Implement token refresh mechanism
- [ ] Add input validation and sanitization
- [ ] Set up database indexes for performance
- [ ] Implement proper error logging
- [ ] Add API request/response validation with Zod or similar

## Troubleshooting

### Database Connection Issues

- Check MongoDB connection string in `.env.local`
- Verify database user has proper permissions
- Check network access in MongoDB Atlas (whitelist your IP)

### Authentication Issues

- Clear localStorage and cookies
- Verify JWT_SECRET is set in `.env.local`
- Check token expiration (7 days by default)

### Data Not Saving

- Check browser console for API errors
- Verify Authorization header is being sent
- Check MongoDB Atlas for connection limits

## Next Steps

Potential improvements:

- Add email verification
- Implement forgot password flow
- Add profile editing
- Implement real-time collaboration
- Add file upload for images
- Implement search functionality
- Add data export/import
- Implement sharing and permissions
- Add analytics and insights
- Optimize database queries with proper indexing
