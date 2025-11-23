pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                script {
                    env.FAILURE_STAGE = "Git Checkout Failed"
                }
                checkout scm
            }
        }

        stage('Setup Configuration') {
            steps {
                script {
                    env.FAILURE_STAGE = "Environment Configuration Failed"
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
                    // 1. Mark stage as Docker Build
                    env.FAILURE_STAGE = "Docker Image Build Failed"
                    echo "🔨 Building the Docker Image..."
                    bat 'docker build -t test-runner .'

                    // 2. If we get here, Docker worked. Now mark as Testing.
                    env.FAILURE_STAGE = "Selenium Tests Failed (Check Screenshots)"
                    echo "🧪 Running Automated Tests..."
                    bat 'docker run --rm -v %CD%:/app -v /app/node_modules test-runner ./entrypoint.sh'
                }
            }
        }

        stage('Deploy to Vercel') {
            steps {
                script {
                    env.FAILURE_STAGE = "Vercel Deployment Failed"
                    echo "✅ Tests Passed! Triggering Deployment..."
                    bat 'curl -X POST "https://api.vercel.com/v1/integrations/deploy/prj_LyRPNdvWHJb68X9A4kLWt31SRF3R/GUj6lCobnW"'
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: '*.png, *.html', allowEmptyArchive: true
        }
        failure {
            echo '❌ Pipeline Failed. Sending Alert Email...'
            
            emailext (
                subject: "🚨 FAILED: ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}",
                body: """
                    <h2 style="color:red;">Pipeline Failed</h2>
                    <p><b>Reason: ${env.FAILURE_STAGE}</b></p>
                    <hr>
                    <ul>
                        <li><b>Project:</b> ${env.JOB_NAME}</li>
                        <li><b>Build Number:</b> ${env.BUILD_NUMBER}</li>
                        <li><b>Console Logs:</b> <a href="${env.BUILD_URL}console">Click here to view logs</a></li>
                    </ul>
                    <p><i>Note: If the reason is 'Selenium Tests Failed', please check the attached screenshots.</i></p>
                """,
                attachmentsPattern: '*.png, *.html',
                to: 'dineshingale2003@gmail.com' // <--- DON'T FORGET TO CHANGE THIS!
            )
        }
        success {
            echo '✅ Pipeline Succeeded.'
        }
    }
}