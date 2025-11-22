pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Get the latest code from GitHub
                checkout scm
            }
        }

        stage('Setup Configuration') {
            steps {
                script {
                    echo "⚙️ Creating .env configuration file..."
                    // We need to recreate the .env file because GitHub ignores it.
                    // This sets your live backend URL and allows Docker to connect safely.
                    if (isUnix()) {
                        sh 'echo REACT_APP_API_URL=https://gaganyatri-server.onrender.com > .env'
                        sh 'echo DANGEROUSLY_DISABLE_HOST_CHECK=true >> .env'
                    } else {
                        // Windows Command Line Syntax
                        bat 'echo REACT_APP_API_URL=https://gaganyatri-server.onrender.com > .env'
                        bat 'echo DANGEROUSLY_DISABLE_HOST_CHECK=true >> .env'
                    }
                }
            }
        }

        stage('Build & Test') {
            steps {
                script {
                    echo "🔨 Building the Docker Image..."
                    // Build the image using the Dockerfile in the current folder
                    bat 'docker build -t test-runner .'

                    echo "🧪 Running Automated Tests..."
                    // Run the container.
                    // -v %CD%:/app mounts the current Jenkins workspace into the container
                    // This allows the container to read the .env file we just made
                    // AND allows Jenkins to see any screenshots saved if the test fails.
                    bat 'docker run --rm -v %CD%:/app test-runner ./entrypoint.sh'
                }
            }
        }

        stage('Deploy to Vercel') {
            steps {
                echo "✅ Tests Passed! Triggering Deployment..."
                // Replace this URL with your specific Vercel Deploy Hook
                // Found in Vercel Dashboard -> Settings -> Git -> Deploy Hooks
                bat 'curl -X POST "https://api.vercel.com/v1/integrations/deploy/prj_LyRPNdvWHJb68X9A4kLWt31SRF3R/GUj6lCobnW"'
            }
        }
    }

    post {
        always {
            // This step runs even if the tests fail.
            // It looks for .png or .html files (screenshots) and saves them
            // so you can view them in the Jenkins UI.
            archiveArtifacts artifacts: '*.png, *.html', allowEmptyArchive: true
        }
        failure {
            echo '❌ Pipeline Failed. Check the screenshots in the Build Artifacts.'
        }
        success {
            echo '✅ Pipeline Succeeded. New version deployed.'
        }
    }
}