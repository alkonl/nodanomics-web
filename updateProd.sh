# Exit on any error
set -e

# Step 1: Pull latest changes from GitHub
echo "Step 1: Pulling latest changes from GitHub..."
if ! git pull origin; then
  echo "Error: Failed to pull changes from GitHub."
  exit 1
fi

# Step 2: Run npm build
echo "Step 2: Running npm build..."
if ! npm run build; then
  echo "Error: Failed to run npm build."
  exit 1
fi

# Step 3: Copy build to Nginx
echo "Step 3: Copying build to Nginx..."
if ! cp -a dist/. /usr/share/nginx/html/; then
  echo "Error: Failed to copy build to Nginx directory."
  exit 1
fi

# Step 4: Restart Nginx
echo "Step 4: Restarting Nginx..."
if ! service nginx restart; then
  echo "Error: Failed to restart Nginx."
  exit 1
fi

echo "Deployment completed successfully!"
