#!/bin/bash

echo "🚀 Starting React App (Background)..."
# Start npm in the background (&) and ignore output to keep logs clean
npm start > /dev/null 2>&1 &

# Save the Process ID of the server so we can kill it later
SERVER_PID=$!

echo "⏳ Waiting for localhost:3000 to be ready..."
# Loop endlessly until we can connect to port 3000 (requires netcat-openbsd)
while ! nc -z localhost 3000; do   
  sleep 1
done

echo "✅ App is Up! Running Selenium Tests..."

# Run the specific Python Test file you verified manually
# Make sure this path matches exactly where your file is in the folder structure!
python "tests/E2E Selenium tests/login.py"

# Capture the exit code (0 = Success, 1 = Failure)
TEST_EXIT_CODE=$?

echo "🛑 Tests finished. Stopping React App..."
kill $SERVER_PID

# Exit the container with the same code as the test
exit $TEST_EXIT_CODE