pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Setup Configuration') {
            steps {
                script {
                    echo "⚙️ Creating .env configuration file..."
                    if (isUnix()) {
                        sh 'echo REACT_APP_API_URL=https://gaganyatri-server.onrender.com > .env'
                        sh 'echo DANGEROUSLY_DISABLE_HOST_CHECK=true >> .env'
                    } else {
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
                    bat 'docker build -t test-runner .'

                    echo "🧪 Running Automated Tests..."
                    // We keep your working volume mount fix here
                    bat 'docker run --rm -v %CD%:/app -v /app/node_modules test-runner ./entrypoint.sh'
                }
            }
        }

        stage('Deploy to Vercel') {
            steps {
                echo "✅ Tests Passed! Triggering Deployment..."
                // I kept your working Vercel URL here
                bat 'curl -X POST "https://api.vercel.com/v1/integrations/deploy/prj_LyRPNdvWHJb68X9A4kLWt31SRF3R/GUj6lCobnW"'
            }
        }
    }

    post {
        always {
            // Always save screenshots so you can see them in Jenkins
            archiveArtifacts artifacts: '*.png, *.html', allowEmptyArchive: true
        }
        failure {
            echo '❌ Pipeline Failed. Sending Alert Email...'
            
            // THIS IS THE NEW PART THAT SENDS THE EMAIL
            emailext (
                subject: "🚨 FAILED: ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}",
                body: """
                    <h2 style="color:red;">Pipeline Failed</h2>
                    <p>The deployment pipeline has failed.</p>
                    <ul>
                        <li><b>Project:</b> ${env.JOB_NAME}</li>
                        <li><b>Build Number:</b> ${env.BUILD_NUMBER}</li>
                        <li><b>Check Logs:</b> <a href="${env.BUILD_URL}console">${env.BUILD_URL}console</a></li>
                    </ul>
                    <p><i>If this was a test failure, screenshots are attached to this email.</i></p>
                """,
                // Attach screenshots if they exist
                attachmentsPattern: '*.png, *.html',
                // CHANGE THIS TO YOUR REAL EMAIL
                to: 'dineshingale2003@gmail.com' 
            )
        }
        success {
            echo '✅ Pipeline Succeeded. New version deployed.'
        }
    }
}